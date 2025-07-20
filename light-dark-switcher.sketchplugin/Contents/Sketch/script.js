/**
 * Light/Dark Mode Switcher for Sketch
 * A smart plugin that switches components between light and dark variants
 * Based on naming convention: [component] / [mode] / [variant]
 */

// ========================================
// CONSTANTS
// ========================================

const MODES = {
  LIGHT: 'light',
  DARK: 'dark',
};

const NAMING_SEPARATOR = '/';

// ========================================
// MAIN ENTRY POINTS
// ========================================

/**
 * Switch selected layers to dark mode
 * @param {Context} context - Sketch plugin context
 */
function switchToDark(context) {
  switchMode(context, MODES.DARK);
}

/**
 * Switch selected layers to light mode
 * @param {Context} context - Sketch plugin context
 */
function switchToLight(context) {
  switchMode(context, MODES.LIGHT);
}

/**
 * Toggle selected layers between light and dark mode
 * @param {Context} context - Sketch plugin context
 */
function toggleMode(context) {
  const selection = context.selection;
  if (selection.count() === 0) {
    showMessage(context, 'Please select layers to toggle');
    return;
  }

  // Find the first symbol instance in the selection to detect current mode
  let detectedMode = null;

  for (let i = 0; i < selection.count(); i++) {
    const layer = selection.objectAtIndex(i);
    detectedMode = findModeInLayer(layer);
    if (detectedMode) {
      break;
    }
  }

  console.log(`Toggle detected current mode: ${detectedMode}`);

  // Default to switching to dark if no mode detected
  const targetMode =
    detectedMode === MODES.LIGHT ? MODES.DARK : MODES.DARK;
  console.log(`Toggle target mode: ${targetMode}`);

  switchMode(context, targetMode);
}

/**
 * Switch entire page to dark mode
 * @param {Context} context - Sketch plugin context
 */
function switchPageToDark(context) {
  switchEntirePage(context, MODES.DARK);
}

/**
 * Switch entire page to light mode
 * @param {Context} context - Sketch plugin context
 */
function switchPageToLight(context) {
  switchEntirePage(context, MODES.LIGHT);
}

// ========================================
// CORE PROCESSING FUNCTIONS
// ========================================

/**
 * Main mode switching function for selected layers
 * @param {Context} context - Sketch plugin context
 * @param {string} targetMode - Target mode ('light' or 'dark')
 */
function switchMode(context, targetMode) {
  try {
    const selection = context.selection;

    if (selection.count() === 0) {
      showMessage(context, 'Please select layers to switch modes');
      return;
    }

    let totalSwitched = 0;
    let totalSkipped = 0;

    // Process each selected layer
    for (let i = 0; i < selection.count(); i++) {
      const layer = selection.objectAtIndex(i);
      const result = processLayer(layer, targetMode);
      totalSwitched += result.switched;
      totalSkipped += result.skipped;
    }

    // Show completion message
    const modeText =
      targetMode.charAt(0).toUpperCase() + targetMode.slice(1);
    showMessage(
      context,
      `Switched to ${modeText} Mode: ${totalSwitched} changed, ${totalSkipped} skipped`
    );
  } catch (error) {
    console.error(`Error in switchMode: ${error.message}`);
    showMessage(context, `Error: ${error.message}`);
  }
}

/**
 * Switches a layer and all its children to the target mode
 * @param {Layer} layer - The Sketch layer to process
 * @param {string} targetMode - Target mode ('light' or 'dark')
 * @returns {Object} Result object with {switched: number, skipped: number}
 */
function processLayer(layer, targetMode) {
  let result = { switched: 0, skipped: 0 };

  try {
    // Process the current layer
    const layerResult = processCurrentLayer(layer, targetMode);
    result.switched += layerResult.switched;
    result.skipped += layerResult.skipped;

    // Process children recursively
    if (layer.layers && layer.layers()) {
      const children = layer.layers();
      for (let i = 0; i < children.count(); i++) {
        const child = children.objectAtIndex(i);
        const childResult = processLayer(child, targetMode);
        result.switched += childResult.switched;
        result.skipped += childResult.skipped;
      }
    }
  } catch (error) {
    console.error(
      `Error processing layer ${layer.name()}: ${error.message}`
    );
  }

  return result;
}

/**
 * Process a single layer (non-recursive)
 * @param {Layer} layer - The Sketch layer to process
 * @param {string} targetMode - Target mode ('light' or 'dark')
 * @returns {Object} Result object with {switched: number, skipped: number}
 */
function processCurrentLayer(layer, targetMode) {
  let result = { switched: 0, skipped: 0 };

  try {
    // Log layer info for debugging
    console.log(
      `Processing layer: ${layer.name()}, class: ${layer.class()}`
    );

    // Focus primarily on shared styles - this is the main functionality
    const styleResult = switchLayerStyle(layer, targetMode);
    result.switched += styleResult.switched;
    result.skipped += styleResult.skipped;

    // Only attempt symbol switching if no styles were switched and it's actually a symbol
    if (result.switched === 0) {
      const isSymbolInstance =
        layer.class() === MSSymbolInstance ||
        layer.class().toString().includes('MSSymbolInstance') ||
        (layer.symbolMaster && layer.symbolMaster());

      if (isSymbolInstance) {
        console.log(`Found symbol instance: ${layer.name()}`);
        const symbolResult = switchSymbolMode(layer, targetMode);
        result.switched += symbolResult.switched;
        result.skipped += symbolResult.skipped;
      }
    }

    // Skip variable switching for now - focus on styles
    console.log(`Style switching complete for: ${layer.name()}`);
  } catch (error) {
    console.error(
      `Error processing current layer ${layer.name()}: ${
        error.message
      }`
    );
  }

  return result;
}

/**
 * Switch symbol instance to target mode variant
 * @param {MSSymbolInstance} symbolInstance - The symbol instance to switch
 * @param {string} targetMode - Target mode ('light' or 'dark')
 * @returns {Object} Result object with {switched: number, skipped: number}
 */
function switchSymbolMode(symbolInstance, targetMode) {
  let result = { switched: 0, skipped: 0 };

  try {
    const currentSymbol = symbolInstance.symbolMaster();
    if (!currentSymbol) {
      console.log(
        `No symbol master found for: ${symbolInstance.name()}`
      );
      return result;
    }

    const currentName = currentSymbol.name();
    console.log(`Current symbol name: ${currentName}`);

    const currentMode = detectCurrentMode({
      name: () => currentName,
    });
    console.log(
      `Current mode detected: ${currentMode}, target mode: ${targetMode}`
    );

    // Skip if already in target mode
    if (currentMode === targetMode) {
      console.log(
        `Symbol already in target mode: ${targetMode} (no switch needed)`
      );
      result.skipped = 1;
      return result;
    }

    // Find target symbol
    const targetSymbolName = buildTargetName(currentName, targetMode);
    console.log(`Looking for target symbol: ${targetSymbolName}`);
    console.log(
      `Need to switch from "${currentName}" to "${targetSymbolName}"`
    );

    const targetSymbol = findSymbolByName(
      symbolInstance.documentData(),
      targetSymbolName
    );

    if (targetSymbol) {
      console.log(`Found target symbol, switching...`);

      // Preserve overrides
      const overrides = symbolInstance.overrides();

      // Switch to new symbol
      symbolInstance.changeInstanceToSymbol(targetSymbol);

      // Restore compatible overrides
      if (overrides) {
        symbolInstance.setOverrides(overrides);
      }

      console.log(
        `Successfully switched symbol from ${currentName} to ${targetSymbolName}`
      );
      result.switched = 1;
    } else {
      console.log(`Target symbol not found: ${targetSymbolName}`);
      result.skipped = 1;
    }
  } catch (error) {
    console.error(`Error switching symbol mode: ${error.message}`);
    result.skipped = 1;
  }

  return result;
}

/**
 * Switch shared styles to target mode
 * @param {Layer} layer - The layer to process
 * @param {string} targetMode - Target mode ('light' or 'dark')
 * @returns {Object} Result object with {switched: number, skipped: number}
 */
function switchLayerStyle(layer, targetMode) {
  let result = { switched: 0, skipped: 0 };

  try {
    // Import sketch DOM API once at the top of this function
    const sketch = require('sketch/dom');

    // Handle text styles first - using the correct Sketch API
    if (layer.class() === MSTextLayer) {
      console.log(`Checking text layer: ${layer.name()}`);

      // Convert to the proper DOM object to access the modern API
      const textLayer = sketch.fromNative(layer);

      console.log(`Text layer sharedStyle: ${textLayer.sharedStyle}`);
      console.log(
        `Text layer sharedStyleId: ${textLayer.sharedStyleId}`
      );

      // Let's also check what styles are available in the document
      const document = sketch.fromNative(layer.documentData());
      console.log(
        `Document has ${document.sharedTextStyles.length} text styles:`
      );
      document.sharedTextStyles.forEach((style, index) => {
        console.log(`  ${index}: ${style.name}`);
      });

      // Check if there's any style applied at all
      console.log(`Text layer style properties:`);
      console.log(`  fontFamily: ${textLayer.style.fontFamily}`);
      console.log(`  fontSize: ${textLayer.style.fontSize}`);
      console.log(`  textColor: ${textLayer.style.textColor}`);

      if (textLayer.sharedStyle) {
        const currentName = textLayer.sharedStyle.name;
        console.log(`Current text style name: ${currentName}`);

        const currentMode = detectCurrentMode({
          name: () => currentName,
        });
        console.log(
          `Text style current mode: ${currentMode}, target: ${targetMode}`
        );

        if (currentMode && currentMode !== targetMode) {
          const targetStyleName = buildTargetName(
            currentName,
            targetMode
          );
          console.log(`Looking for text style: ${targetStyleName}`);

          // Find the target style using the document's sharedTextStyles
          const document = sketch.fromNative(layer.documentData());
          const targetStyle = document.sharedTextStyles.find(
            (style) => style.name === targetStyleName
          );

          if (targetStyle) {
            // Set the new shared style
            textLayer.sharedStyle = targetStyle;

            // Clear any manual overrides by resetting the style to match the shared style
            // This ensures the new style's properties are fully applied
            textLayer.style = targetStyle.style;

            console.log(
              `✅ Switched text style from ${currentName} to ${targetStyleName}`
            );
            result.switched = 1;
          } else {
            console.log(
              `❌ Text style not found: ${targetStyleName}`
            );
            result.skipped = 1;
          }
        } else if (currentMode === targetMode) {
          console.log(
            `Text style already in target mode: ${targetMode}`
          );
          result.skipped = 1;
        } else {
          console.log(
            `Text style doesn't follow naming convention: ${currentName}`
          );
          result.skipped = 1;
        }

        return result; // Return early if we processed a text style
      } else {
        console.log(
          `Text layer has no shared style: ${layer.name()}`
        );
        result.skipped = 1;
        return result;
      }
    }

    // Handle layer styles (fills, borders, etc.) - using the correct Sketch API
    console.log(`Checking layer styles for: ${layer.name()}`);

    // Convert to the proper DOM object to access the modern API
    const domLayer = sketch.fromNative(layer);

    console.log(`Layer sharedStyle: ${domLayer.sharedStyle}`);
    console.log(`Layer sharedStyleId: ${domLayer.sharedStyleId}`);

    // Let's also check what layer styles are available in the document
    const document = sketch.fromNative(layer.documentData());
    console.log(
      `Document has ${document.sharedLayerStyles.length} layer styles:`
    );
    document.sharedLayerStyles.forEach((style, index) => {
      console.log(`  ${index}: ${style.name}`);
    });

    // Check if there's any style applied at all
    console.log(`Layer style properties:`);
    if (domLayer.style) {
      console.log(
        `  fills: ${
          domLayer.style.fills ? domLayer.style.fills.length : 'none'
        }`
      );
      console.log(
        `  borders: ${
          domLayer.style.borders
            ? domLayer.style.borders.length
            : 'none'
        }`
      );
    }

    if (domLayer.sharedStyle) {
      console.log(`Found layer with shared style: ${layer.name()}`);

      const currentName = domLayer.sharedStyle.name;
      console.log(`Current layer style: ${currentName}`);

      const currentMode = detectCurrentMode({
        name: () => currentName,
      });
      console.log(
        `Layer style current mode: ${currentMode}, target: ${targetMode}`
      );

      if (currentMode && currentMode !== targetMode) {
        const targetStyleName = buildTargetName(
          currentName,
          targetMode
        );
        console.log(`Looking for layer style: ${targetStyleName}`);

        // Find the target style using the document's sharedLayerStyles
        const targetStyle = document.sharedLayerStyles.find(
          (style) => style.name === targetStyleName
        );

        if (targetStyle) {
          domLayer.sharedStyle = targetStyle;

          // Clear any manual overrides by resetting the style to match the shared style
          // This ensures the new style's properties are fully applied
          domLayer.style = targetStyle.style;

          console.log(
            `✅ Switched layer style from ${currentName} to ${targetStyleName}`
          );
          result.switched = 1;
        } else {
          console.log(`❌ Layer style not found: ${targetStyleName}`);
          result.skipped = 1;
        }
      } else if (currentMode === targetMode) {
        console.log(
          `Layer style already in target mode: ${targetMode}`
        );
        result.skipped = 1;
      } else {
        console.log(
          `Layer style doesn't follow naming convention: ${currentName}`
        );
        result.skipped = 1;
      }
    } else {
      console.log(`Layer has no shared style: ${layer.name()}`);
      result.skipped = 1;
    }
  } catch (error) {
    console.error(`Error switching layer style: ${error.message}`);
    result.skipped = 1;
  }

  return result;
}

/**
 * Switch text color variables to target mode
 * @param {MSTextLayer} textLayer - The text layer to process
 * @param {string} targetMode - Target mode ('light' or 'dark')
 * @returns {Object} Result object with {switched: number, skipped: number}
 */
function switchTextColorVariable(textLayer, targetMode) {
  let result = { switched: 0, skipped: 0 };

  try {
    // Skip color variable switching for now due to API complexity
    // Focus on symbol and style switching which are more reliable
    console.log(
      `Skipping text color variable switching for: ${textLayer.name()}`
    );
  } catch (error) {
    console.error(
      `Error switching text color variable: ${error.message}`
    );
  }

  return result;
}

/**
 * Switch fill color variables to target mode
 * @param {Layer} layer - The layer to process
 * @param {string} targetMode - Target mode ('light' or 'dark')
 * @returns {Object} Result object with {switched: number, skipped: number}
 */
function switchFillVariables(layer, targetMode) {
  let result = { switched: 0, skipped: 0 };

  try {
    // Skip fill variable switching for now due to API complexity
    // Focus on symbol and style switching which are more reliable
    console.log(
      `Skipping fill variable switching for: ${layer.name()}`
    );
  } catch (error) {
    console.error(`Error switching fill variables: ${error.message}`);
  }

  return result;
}

/**
 * Switch border color variables to target mode
 * @param {Layer} layer - The layer to process
 * @param {string} targetMode - Target mode ('light' or 'dark')
 * @returns {Object} Result object with {switched: number, skipped: number}
 */
function switchBorderVariables(layer, targetMode) {
  let result = { switched: 0, skipped: 0 };

  try {
    // Skip border variable switching for now due to API complexity
    // Focus on symbol and style switching which are more reliable
    console.log(
      `Skipping border variable switching for: ${layer.name()}`
    );
  } catch (error) {
    console.error(
      `Error switching border variables: ${error.message}`
    );
  }

  return result;
}

/**
 * Switch entire page to target mode
 * @param {Context} context - Sketch plugin context
 * @param {string} targetMode - Target mode ('light' or 'dark')
 */
function switchEntirePage(context, targetMode) {
  try {
    const page = context.document.currentPage();
    let totalSwitched = 0;
    let totalSkipped = 0;

    const layers = page.layers();
    for (let i = 0; i < layers.count(); i++) {
      const layer = layers.objectAtIndex(i);
      const result = processLayer(layer, targetMode);
      totalSwitched += result.switched;
      totalSkipped += result.skipped;
    }

    const modeText =
      targetMode.charAt(0).toUpperCase() + targetMode.slice(1);
    showMessage(
      context,
      `Page switched to ${modeText} Mode: ${totalSwitched} changed, ${totalSkipped} skipped`
    );
  } catch (error) {
    console.error(`Error switching entire page: ${error.message}`);
    showMessage(context, `Error: ${error.message}`);
  }
}

// ========================================
// HELPER FUNCTIONS
// ========================================

/**
 * Find mode by searching for shared styles in a layer and its children
 * @param {Layer} layer - Layer to search
 * @returns {string|null} Detected mode or null
 */
function findModeInLayer(layer) {
  try {
    // Check for text styles first
    if (layer.class() === MSTextLayer && layer.sharedStyle()) {
      const styleName = layer.sharedStyle().name();
      const mode = detectCurrentMode({ name: () => styleName });
      if (mode) {
        console.log(
          `Found text style mode: ${mode} from style: ${styleName}`
        );
        return mode;
      }
    }

    // Check for layer styles
    if (
      layer.style &&
      layer.style() &&
      layer.style().sharedObjectID
    ) {
      const sharedStyles = layer.documentData().layerStyles();
      const currentStyle = sharedStyles.sharedStyleWithID(
        layer.style().sharedObjectID
      );
      if (currentStyle) {
        const styleName = currentStyle.name();
        const mode = detectCurrentMode({ name: () => styleName });
        if (mode) {
          console.log(
            `Found layer style mode: ${mode} from style: ${styleName}`
          );
          return mode;
        }
      }
    }

    // Check if this layer is a symbol instance (fallback)
    const isSymbolInstance =
      layer.class() === MSSymbolInstance ||
      layer.class().toString().includes('MSSymbolInstance') ||
      (layer.symbolMaster && layer.symbolMaster());

    if (
      isSymbolInstance &&
      layer.symbolMaster &&
      layer.symbolMaster()
    ) {
      const symbolName = layer.symbolMaster().name();
      const mode = detectCurrentMode({ name: () => symbolName });
      if (mode) {
        console.log(
          `Found symbol mode: ${mode} from symbol: ${symbolName}`
        );
        return mode;
      }
    }

    // Search children recursively
    if (layer.layers && layer.layers()) {
      const children = layer.layers();
      for (let i = 0; i < children.count(); i++) {
        const child = children.objectAtIndex(i);
        const childMode = findModeInLayer(child);
        if (childMode) {
          return childMode;
        }
      }
    }

    return null;
  } catch (error) {
    console.error(`Error finding mode in layer: ${error.message}`);
    return null;
  }
}

/**
 * Detect current mode from layer name
 * @param {Layer} layer - Layer with name() method
 * @returns {string} Current mode ('light', 'dark', or null if undetermined)
 */
function detectCurrentMode(layer) {
  try {
    const name = layer.name();
    const parts = name.split(NAMING_SEPARATOR);

    if (parts.length >= 2) {
      const modePart = parts[1].toLowerCase().trim();
      if (modePart === MODES.LIGHT || modePart === MODES.DARK) {
        return modePart;
      }
    }

    return null;
  } catch (error) {
    console.error(`Error detecting current mode: ${error.message}`);
    return null;
  }
}

/**
 * Build target name with new mode
 * @param {string} currentName - Current layer/component name
 * @param {string} targetMode - Target mode ('light' or 'dark')
 * @returns {string} New name with target mode
 */
function buildTargetName(currentName, targetMode) {
  try {
    const parts = currentName.split(NAMING_SEPARATOR);

    if (parts.length >= 2) {
      parts[1] = targetMode;
      return parts.join(NAMING_SEPARATOR);
    }

    return currentName;
  } catch (error) {
    console.error(`Error building target name: ${error.message}`);
    return currentName;
  }
}

/**
 * Find symbol by name in document
 * @param {MSDocument} document - Sketch document
 * @param {string} symbolName - Name of symbol to find
 * @returns {MSSymbolMaster|null} Found symbol or null
 */
function findSymbolByName(document, symbolName) {
  try {
    const symbols = document.documentData().allSymbols();

    for (let i = 0; i < symbols.count(); i++) {
      const symbol = symbols.objectAtIndex(i);
      if (symbol.name() === symbolName) {
        return symbol;
      }
    }

    return null;
  } catch (error) {
    console.error(`Error finding symbol: ${error.message}`);
    return null;
  }
}

/**
 * Find text style by name in document
 * @param {MSDocument} document - Sketch document
 * @param {string} styleName - Name of style to find
 * @returns {MSSharedStyle|null} Found style or null
 */
function findTextStyleByName(document, styleName) {
  try {
    const textStyles = document.documentData().layerTextStyles();

    for (let i = 0; i < textStyles.count(); i++) {
      const style = textStyles.objectAtIndex(i);
      if (style.name() === styleName) {
        return style;
      }
    }

    return null;
  } catch (error) {
    console.error(`Error finding text style: ${error.message}`);
    return null;
  }
}

/**
 * Find layer style by name in document
 * @param {MSDocument} document - Sketch document
 * @param {string} styleName - Name of style to find
 * @returns {MSSharedStyle|null} Found style or null
 */
function findLayerStyleByName(document, styleName) {
  try {
    const layerStyles = document.documentData().layerStyles();

    for (let i = 0; i < layerStyles.count(); i++) {
      const style = layerStyles.objectAtIndex(i);
      if (style.name() === styleName) {
        return style;
      }
    }

    return null;
  } catch (error) {
    console.error(`Error finding layer style: ${error.message}`);
    return null;
  }
}

/**
 * Find variable by name in document
 * @param {MSDocument} document - Sketch document
 * @param {string} variableName - Name of variable to find
 * @returns {MSVariable|null} Found variable or null
 */
function findVariableByName(document, variableName) {
  try {
    // Try different API approaches for color variables
    let variables = null;

    // Modern Sketch API
    if (document.swatches) {
      variables = document.swatches();
    }
    // Fallback for older versions
    else if (
      document.documentData &&
      document.documentData().swatches
    ) {
      variables = document.documentData().swatches;
    }
    // Another fallback
    else if (
      document.documentData &&
      document.documentData().colorVariables
    ) {
      variables = document.documentData().colorVariables();
    }

    if (!variables) {
      console.log('No color variables/swatches found in document');
      return null;
    }

    for (let i = 0; i < variables.count(); i++) {
      const variable = variables.objectAtIndex(i);
      if (variable.name() === variableName) {
        return variable;
      }
    }

    return null;
  } catch (error) {
    console.error(`Error finding variable: ${error.message}`);
    return null;
  }
}

/**
 * Find variable by ID in document
 * @param {MSDocument} document - Sketch document
 * @param {string} variableID - ID of variable to find
 * @returns {MSVariable|null} Found variable or null
 */
function findVariableByID(document, variableID) {
  try {
    // Try different API approaches for color variables
    let variables = null;

    // Modern Sketch API
    if (document.swatches) {
      variables = document.swatches();
    }
    // Fallback for older versions
    else if (
      document.documentData &&
      document.documentData().swatches
    ) {
      variables = document.documentData().swatches;
    }
    // Another fallback
    else if (
      document.documentData &&
      document.documentData().colorVariables
    ) {
      variables = document.documentData().colorVariables();
    }

    if (!variables) {
      console.log('No color variables/swatches found in document');
      return null;
    }

    for (let i = 0; i < variables.count(); i++) {
      const variable = variables.objectAtIndex(i);
      if (variable.objectID() === variableID) {
        return variable;
      }
    }

    return null;
  } catch (error) {
    console.error(`Error finding variable by ID: ${error.message}`);
    return null;
  }
}

/**
 * Show message to user
 * @param {Context} context - Sketch plugin context
 * @param {string} message - Message to display
 */
function showMessage(context, message) {
  try {
    context.document.showMessage(message);
  } catch (error) {
    console.error(`Error showing message: ${error.message}`);
  }
}

// ========================================
// EXPORTS
// ========================================

// Export handlers for manifest.json
var switchToDark = switchToDark;
var switchToLight = switchToLight;
var toggleMode = toggleMode;
var switchPageToDark = switchPageToDark;
var switchPageToLight = switchPageToLight;
