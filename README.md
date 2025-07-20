# Light/Dark Mode Switcher for Sketch

A smart Sketch plugin that switches components between light and dark variants based on naming conventions.

## Features

- 🔄 **Smart Mode Switching**: Automatically switches between light/dark variants
- 🎯 **Intelligent Detection**: Skips components already in the target mode
- 🏗️ **Recursive Processing**: Handles nested components and groups
- 🎨 **Comprehensive Support**: Works with symbols, colors, and styles
- ⚡ **Batch Operations**: Process entire pages at once
- 💾 **Preserves Overrides**: Maintains symbol overrides during switching

## Installation

1. Download the latest release from the [releases page](https://github.com/kocheck/Refract/releases)
2. Double-click `light-dark-switcher.sketchplugin` to install
3. Find the plugin under **Plugins → Light/Dark Switcher**

## Usage

### Naming Convention

The plugin relies on a consistent naming pattern:
```
[component] / [mode] / [variant]
```

**Examples:**
- `button / light / primary`
- `button / dark / primary`
- `color / light / text-primary`
- `color / dark / text-primary`
- `input / light / default`
- `input / dark / error`

### Keyboard Shortcuts

| Action | Shortcut |
|--------|----------|
| Switch to Dark Mode | `Cmd + Shift + D` |
| Switch to Light Mode | `Cmd + Shift + L` |
| Toggle Mode | `Cmd + Shift + T` |
| Switch Page to Dark | `Cmd + Alt + Shift + D` |
| Switch Page to Light | `Cmd + Alt + Shift + L` |

### Basic Workflow

1. **Select layers** you want to switch (symbols, text, shapes, etc.)
2. **Use keyboard shortcut** or go to **Plugins → Light/Dark Switcher**
3. **Choose action**:
   - Switch to specific mode (light/dark)
   - Toggle between modes
   - Process entire page

### What Gets Switched

The plugin intelligently handles multiple layer types:

#### Symbol Instances
- Switches symbol instances to their light/dark variants
- Preserves symbol overrides when possible
- Example: `button / light / primary` → `button / dark / primary`

#### Color Variables
- Updates fill colors using color variables
- Updates border colors using color variables
- Updates text colors using color variables
- Example: `color / light / background` → `color / dark / background`

#### Shared Styles
- Switches text styles to their mode variants
- Switches layer styles to their mode variants
- Example: `heading / light / large` → `heading / dark / large`

## How It Works

### Smart Detection
The plugin analyzes layer names to detect the current mode:
- Extracts the mode from the naming convention
- Skips layers already in the target mode
- Reports switched vs. skipped counts

### Recursive Processing
- Processes selected layers and all their children
- Handles nested groups and artboards
- Maintains layer hierarchy and structure

### Mode Switching Logic
1. **Detect current mode** from layer name
2. **Skip if already correct** mode to avoid unnecessary work
3. **Build target name** by replacing mode in naming convention
4. **Find target variant** in document (symbol, style, or variable)
5. **Switch reference** while preserving overrides/properties
6. **Report results** to user

## Examples

### Example 1: Basic Symbol Switching
```
Before: button / light / primary (selected)
Action: Switch to Dark Mode
After:  button / dark / primary
Result: "Switched to Dark Mode: 1 changed, 0 skipped"
```

### Example 2: Mixed State Handling
```
Selection:
- button / light / primary
- text / dark / body (already dark)
- icon / light / arrow

Action: Switch to Dark Mode
Result: "Switched to Dark Mode: 2 changed, 1 skipped"
```

### Example 3: Nested Components
```
Selection: Card component containing:
- background (light color variable)
- button / light / secondary
- text / light / heading

Action: Switch to Dark Mode
Result: All nested components switch to dark variants
```

### Example 4: Page-Level Switching
```
Action: Switch Page to Dark Mode
Result: Entire page content switches to dark mode variants
```

## Troubleshooting

### Common Issues

**Plugin doesn't switch my component**
- ✅ Check naming convention: `[component] / [mode] / [variant]`
- ✅ Ensure target variant exists (e.g., if switching to dark, `component / dark / variant` must exist)
- ✅ Check console for error messages

**Overrides are lost after switching**
- ✅ This happens when target symbol has different override structure
- ✅ Plugin attempts to preserve compatible overrides
- ✅ Consider aligning override structures between light/dark variants

**Some layers are skipped**
- ✅ Layers already in target mode are intentionally skipped
- ✅ Layers without proper naming convention are skipped
- ✅ Layers without target variants are skipped

**Plugin seems slow on large documents**
- ✅ Use selection-based switching instead of page-level for better performance
- ✅ Consider breaking large designs into multiple pages
- ✅ Plugin processes recursively, so deeply nested structures take longer

### Error Messages

**"Please select layers to switch modes"**
- No layers selected. Select one or more layers before running the plugin.

**"Target symbol not found: [name]"**
- The dark/light variant doesn't exist. Create the missing variant symbol.

**"Error: [technical details]"**
- Check Sketch console (View → Show Console) for detailed error information.

## Best Practices

### Naming Convention
- **Be consistent** with spacing around separators (`/`)
- **Use lowercase** for mode names (`light`, `dark`)
- **Be descriptive** with component and variant names
- **Avoid special characters** in names

### Symbol Organization
- **Group related symbols** together in symbol page
- **Keep light/dark variants adjacent** for easy management
- **Maintain consistent override structure** between variants
- **Use descriptive symbol names** that clearly indicate purpose

### Color Variables
- **Create color libraries** with light/dark variants
- **Use semantic naming** (`primary`, `secondary`, `background`)
- **Test color combinations** for accessibility
- **Document color usage** in design system

### Performance
- **Use selection-based switching** for targeted changes
- **Avoid deeply nested structures** when possible
- **Process in batches** rather than individual layers
- **Test with sample content** before applying to full designs

## Technical Details

### Supported Layer Types
- Symbol instances (`MSSymbolInstance`)
- Text layers (`MSTextLayer`)
- Shape layers with fills and borders
- Groups and artboards (recursive processing)

### Sketch API Compatibility
- **Minimum version**: Sketch 3.0+
- **Tested versions**: Sketch 70+
- **API usage**: Native Sketch plugin API

### File Structure
```
light-dark-switcher.sketchplugin/
├── Contents/
│   └── Sketch/
│       ├── manifest.json     # Plugin configuration
│       └── script.js         # Main plugin code
```

## Contributing

We welcome contributions! See [CONTRIBUTING.md](docs/CONTRIBUTING.md) for:
- Development setup
- Code style guidelines
- Testing procedures
- Submission process

### Development Setup
1. Clone the repository
2. Edit `script.js` in your preferred editor
3. Test in Sketch using **Plugins → Run Script**
4. Submit pull request with changes

## Changelog

### v1.0.0 (Initial Release)
- ✅ Basic light/dark mode switching
- ✅ Symbol instance support with override preservation
- ✅ Color variable switching (fill, border, text)
- ✅ Shared style switching (text and layer styles)
- ✅ Recursive processing of nested layers
- ✅ Smart detection and skipping logic
- ✅ Batch page processing
- ✅ Toggle functionality
- ✅ Comprehensive error handling

## License

MIT License - see [LICENSE](LICENSE) file for details.

## Support

- 📧 **Email**: hello@refract.com
- 🐛 **Issues**: [GitHub Issues](https://github.com/kocheck/Refract/issues)
- 💬 **Discussions**: [GitHub Discussions](https://github.com/kocheck/Refract/discussions)

---

Made with ❤️ by [Refract](https://github.com/kocheck/Refract)
