# Refract

A smart Sketch plugin that switches components between light and dark variants based on naming conventions.

## Features

- 🔄 **Smart Mode Switching**: Automatically switches between light/dark variants
- 🎯 **Intelligent Detection**: Skips components already in the target mode
- 🏗️ **Recursive Processing**: Handles nested components and groups
- 🎨 **Shared Style Support**: Works with text styles and layer styles
- ⚡ **Batch Operations**: Process entire pages at once
- 💾 **Override Clearing**: Ensures new styles are fully applied without manual overrides

## Installation

1. Download the latest release from the [releases page](https://github.com/kocheck/Refract/releases)
2. Double-click `light-dark-switcher.sketchplugin` to install
3. Find the plugin under **Plugins → Refract**

## Usage

### Naming Convention

The plugin relies on a consistent naming pattern:
```
[component]/[mode]/[variant]
```

**Examples:**
- `test/light/bg` and `test/dark/bg`
- `text/light/primary` and `text/dark/primary`
- `button/light/default` and `button/dark/default`
- `card/light/surface` and `card/dark/surface`

### Keyboard Shortcuts

| Action | Shortcut |
|--------|----------|
| Switch to Dark Mode | `Cmd + Shift + D` |
| Switch to Light Mode | `Cmd + Shift + L` |
| Toggle Mode | `Cmd + Shift + T` |
| Switch Page to Dark | `Cmd + Alt + Shift + D` |
| Switch Page to Light | `Cmd + Alt + Shift + L` |

### Basic Workflow

1. **Create your shared styles** following the naming convention (e.g., `text/light/primary`, `text/dark/primary`)
2. **Apply shared styles** to your text and layers (not manual styling)
3. **Select layers** you want to switch
4. **Use keyboard shortcut** or go to **Plugins → Refract**
5. **Choose action**:
   - Switch to specific mode (light/dark)
   - Toggle between modes
   - Process entire page

### What Gets Switched

The plugin focuses on **shared styles** - the most reliable way to manage design systems:

#### Shared Text Styles
- Switches text layers with shared text styles applied
- Clears manual text overrides to ensure new style is fully applied
- Example: `text/light/primary` → `text/dark/primary`

#### Shared Layer Styles
- Switches layers (shapes, frames) with shared layer styles applied
- Clears manual fill/border overrides to ensure new style is fully applied
- Example: `test/light/bg` → `test/dark/bg`

#### Symbol Instances (Basic Support)
- Switches symbol instances to their light/dark variants
- Preserves symbol overrides when possible
- Example: `button/light/primary` → `button/dark/primary`

## How It Works

### Smart Detection
The plugin analyzes shared style names to detect the current mode:
- Uses `/` as separator (e.g., `component/mode/variant`)
- Extracts the mode from the middle part
- Skips layers already in the target mode
- Reports switched vs. skipped counts

### Override Clearing
**Key Feature**: The plugin clears manual style overrides to ensure the new shared style is fully applied:
- Sets new shared style: `layer.sharedStyle = newStyle`
- Clears overrides: `layer.style = newStyle.style`
- This prevents old manual colors from persisting over new shared styles

### Recursive Processing
- Processes selected layers and all their children
- Handles nested groups and frames
- Maintains layer hierarchy and structure

## Examples

### Example 1: Basic Shared Style Switching

```
Before: Text layer with "text/light/primary" style applied
Action: Switch to Dark Mode
After:  Text layer with "text/dark/primary" style applied
Result: "Switched to Dark Mode: 1 changed, 0 skipped"
```

### Example 2: Mixed State Handling

```
Selection:
- Frame with "test/light/bg" layer style
- Text with "text/dark/primary" style (already dark)
- Shape with "component/light/surface" style

Action: Switch to Dark Mode
Result: "Switched to Dark Mode: 2 changed, 1 skipped"
```

### Example 3: Nested Components

```
Selection: Frame containing:
- Background with "test/light/bg" layer style
- Text with "text/light/primary" text style
- Button symbol "button/light/primary"

Action: Switch to Dark Mode
Result: All nested components switch to dark variants
```

## Troubleshooting

### Common Issues

**Plugin doesn't switch my component**
- ✅ Check naming convention: `[component]/[mode]/[variant]` (no spaces around `/`)
- ✅ Ensure shared styles are applied (not manual styling)
- ✅ Ensure target variant exists (e.g., if switching to dark, `component/dark/variant` must exist)
- ✅ Check console for error messages (View → Show Console)

**Colors aren't changing after switching**
- ✅ Make sure you're using **shared styles**, not manual fills/text colors
- ✅ Plugin only works with shared text styles and shared layer styles
- ✅ Manual overrides are cleared automatically, but base layer must use shared style

**Some layers are skipped**
- ✅ Layers already in target mode are intentionally skipped
- ✅ Layers without shared styles are skipped
- ✅ Layers without proper naming convention are skipped
- ✅ Layers without target variants are skipped

### Best Practices

**For Shared Styles:**
- Use shared text styles and shared layer styles consistently
- Follow naming convention exactly: `component/mode/variant`
- Create both light and dark versions of every style you need
- Avoid manual styling - always use shared styles

**For Performance:**
- Use selection-based switching instead of page-level for better performance
- Test with a few layers first before processing entire pages

**For Design Systems:**
- Document your naming conventions
- Keep style libraries organized
- Test color combinations for accessibility
- Use semantic naming (`primary`, `secondary`, `background`)

## Technical Details

### Supported Layer Types
- Text layers with shared text styles (`MSTextLayer`)
- Shape layers with shared layer styles (rectangles, circles, etc.)
- Symbol instances (basic support)
- Groups and frames (recursive processing)

### Sketch API Compatibility
- **Minimum version**: Sketch 3.0+
- **Tested versions**: Sketch 70+
- **API usage**: Modern Sketch DOM API with `sketch/dom`

### Key Implementation Details
- Uses modern `sketch.fromNative()` for reliable layer access
- Clears style overrides with `layer.style = targetStyle.style`
- Processes layers recursively for nested structures
- Smart mode detection from shared style names

## Changelog

### v1.0.0 (Initial Release)
- ✅ Shared text style switching with override clearing
- ✅ Shared layer style switching with override clearing
- ✅ Symbol instance support with override preservation
- ✅ Recursive processing of nested layers
- ✅ Smart detection and skipping logic
- ✅ Toggle functionality with automatic mode detection
- ✅ Batch page processing
- ✅ Modern Sketch API implementation
- ✅ Comprehensive error handling and debugging

## License

MIT License - see [LICENSE](LICENSE) file for details.

## Support

- 📧 **Email**: hello@refract.com
- 🐛 **Issues**: [GitHub Issues](https://github.com/kocheck/Refract/issues)
- 💬 **Discussions**: [GitHub Discussions](https://github.com/kocheck/Refract/discussions)

---

Made with ❤️ by [Refract](https://github.com/kocheck/Refract)
