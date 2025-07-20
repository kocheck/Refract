/**
 * DEBUG VERSION - Light/Dark Mode Switcher for Sketch
 * This version includes extra console logging to help troubleshoot issues
 */

// ========================================
// CONSTANTS
// ========================================

const MODES = {
  LIGHT: 'light',
  DARK: 'dark',
};

const NAMING_SEPARATOR = ' / ';

// ========================================
// DEBUG FUNCTIONS
// ========================================

/**
 * Debug version of detectCurrentMode with detailed logging
 */
function detectCurrentModeDebug(layer) {
  try {
    const name = layer.name();
    console.log(`🔍 Analyzing layer: "${name}"`);

    const parts = name.split(NAMING_SEPARATOR);
    console.log(`📋 Split parts:`, parts);
    console.log(`📊 Parts count: ${parts.length}`);

    if (parts.length >= 2) {
      const modePart = parts[1].toLowerCase().trim();
      console.log(`🎯 Mode part (raw): "${parts[1]}"`);
      console.log(`🎯 Mode part (processed): "${modePart}"`);
      console.log(
        `✅ Available modes: light="${MODES.LIGHT}", dark="${MODES.DARK}"`
      );

      if (modePart === MODES.LIGHT || modePart === MODES.DARK) {
        console.log(`✅ Detected mode: "${modePart}"`);
        return modePart;
      } else {
        console.log(
          `❌ Mode part "${modePart}" doesn't match available modes`
        );
      }
    } else {
      console.log(
        `❌ Not enough parts in name (need at least 2, got ${parts.length})`
      );
    }

    console.log(`❌ No mode detected for layer: "${name}"`);
    return null;
  } catch (error) {
    console.error(
      `💥 Error detecting current mode: ${error.message}`
    );
    return null;
  }
}

/**
 * Debug version of switchMode
 */
function switchModeDebug(context, targetMode) {
  try {
    console.log(`🚀 Starting switch to ${targetMode} mode`);
    const selection = context.selection;

    if (selection.count() === 0) {
      showMessage(context, 'Please select layers to switch modes');
      return;
    }

    console.log(`📦 Processing ${selection.count()} selected layers`);

    let totalSwitched = 0;
    let totalSkipped = 0;

    // Process each selected layer
    for (let i = 0; i < selection.count(); i++) {
      const layer = selection.objectAtIndex(i);
      console.log(
        `\n🔄 Processing layer ${
          i + 1
        }/${selection.count()}: "${layer.name()}"`
      );
      console.log(`📝 Layer class: ${layer.class()}`);

      // Check current mode
      const currentMode = detectCurrentModeDebug(layer);
      console.log(
        `🎯 Current mode: ${currentMode}, Target mode: ${targetMode}`
      );

      if (currentMode === targetMode) {
        console.log(`⏭️ Skipping - already in ${targetMode} mode`);
        totalSkipped++;
      } else if (currentMode === null) {
        console.log(
          `⏭️ Skipping - no mode detected (not following naming convention)`
        );
        totalSkipped++;
      } else {
        console.log(
          `🔄 Needs switching from ${currentMode} to ${targetMode}`
        );

        // For now, just log what we would do
        if (layer.class() === MSSymbolInstance) {
          console.log(`🔧 Would switch symbol instance`);
          const currentSymbol = layer.symbolMaster();
          if (currentSymbol) {
            console.log(
              `📄 Current symbol: "${currentSymbol.name()}"`
            );
            const targetName = buildTargetNameDebug(
              currentSymbol.name(),
              targetMode
            );
            console.log(`🎯 Target symbol: "${targetName}"`);
          }
        }

        totalSwitched++;
      }
    }

    // Show completion message
    const modeText =
      targetMode.charAt(0).toUpperCase() + targetMode.slice(1);
    const message = `DEBUG - ${modeText} Mode: ${totalSwitched} would change, ${totalSkipped} skipped`;
    console.log(`\n📊 Final result: ${message}`);
    showMessage(context, message);
  } catch (error) {
    console.error(`💥 Error in switchModeDebug: ${error.message}`);
    showMessage(context, `Error: ${error.message}`);
  }
}

/**
 * Debug version of buildTargetName
 */
function buildTargetNameDebug(currentName, targetMode) {
  try {
    console.log(
      `🏗️ Building target name from: "${currentName}" to mode: "${targetMode}"`
    );
    const parts = currentName.split(NAMING_SEPARATOR);
    console.log(`📋 Name parts:`, parts);

    if (parts.length >= 2) {
      const oldMode = parts[1];
      parts[1] = targetMode;
      const newName = parts.join(NAMING_SEPARATOR);
      console.log(`🔄 Changed "${oldMode}" to "${targetMode}"`);
      console.log(`✅ New name: "${newName}"`);
      return newName;
    }

    console.log(`❌ Not enough parts to build target name`);
    return currentName;
  } catch (error) {
    console.error(`💥 Error building target name: ${error.message}`);
    return currentName;
  }
}

/**
 * Show message to user
 */
function showMessage(context, message) {
  try {
    context.document.showMessage(message);
  } catch (error) {
    console.error(`Error showing message: ${error.message}`);
  }
}

// ========================================
// DEBUG ENTRY POINTS
// ========================================

function switchToDarkDebug(context) {
  console.log(`\n🌙 DEBUG: Switch to Dark Mode triggered`);
  switchModeDebug(context, MODES.DARK);
}

function switchToLightDebug(context) {
  console.log(`\n☀️ DEBUG: Switch to Light Mode triggered`);
  switchModeDebug(context, MODES.LIGHT);
}

function debugSelection(context) {
  console.log(`\n🔍 DEBUG: Analyzing current selection`);
  const selection = context.selection;

  if (selection.count() === 0) {
    console.log(`❌ No layers selected`);
    showMessage(context, 'No layers selected');
    return;
  }

  console.log(`📦 Found ${selection.count()} selected layers:`);

  for (let i = 0; i < selection.count(); i++) {
    const layer = selection.objectAtIndex(i);
    console.log(`\n📄 Layer ${i + 1}:`);
    console.log(`  📝 Name: "${layer.name()}"`);
    console.log(`  🏷️ Class: ${layer.class()}`);

    const currentMode = detectCurrentModeDebug(layer);
    console.log(`  🎯 Detected Mode: ${currentMode || 'none'}`);

    if (layer.class() === MSSymbolInstance) {
      const symbol = layer.symbolMaster();
      if (symbol) {
        console.log(`  🔗 Symbol Master: "${symbol.name()}"`);
      }
    }
  }

  showMessage(
    context,
    `Analyzed ${selection.count()} layers - check console for details`
  );
}

// Export the debug functions
var switchToDarkDebug = switchToDarkDebug;
var switchToLightDebug = switchToLightDebug;
var debugSelection = debugSelection;
