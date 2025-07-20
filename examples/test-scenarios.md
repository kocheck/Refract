# Test Scenarios

## Test Environment Setup

### Prerequisites
- Sketch installed (version 3.0+)
- Light/Dark Mode Switcher plugin installed
- Test document with sample components

### Sample Components Needed
Create these symbols and components for comprehensive testing:

#### Symbols
- `button / light / primary`
- `button / dark / primary`
- `button / light / secondary`
- `button / dark / secondary`
- `card / light / default`
- `card / dark / default`
- `input / light / default`
- `input / dark / error`

#### Color Variables
- `color / light / background`
- `color / dark / background`
- `color / light / text-primary`
- `color / dark / text-primary`
- `color / light / border`
- `color / dark / border`

#### Text Styles
- `heading / light / large`
- `heading / dark / large`
- `body / light / regular`
- `body / dark / regular`

## Scenario 1: Basic Symbol Switching

### Setup
- Create artboard with `button / light / primary` symbol instance
- Select the button symbol

### Test Steps
1. Run "Switch to Dark Mode" command
2. Verify button changes to `button / dark / primary`
3. Check that symbol overrides are preserved
4. Verify message shows "1 changed, 0 skipped"

### Expected Results
- ✅ Symbol switches to dark variant
- ✅ Overrides maintained
- ✅ Correct success message displayed

### Edge Cases
- **Missing dark variant**: Should show "Target symbol not found" error
- **Already dark**: Should show "0 changed, 1 skipped"

## Scenario 2: Mixed State Handling

### Setup
- Create artboard with multiple components:
  - `button / light / primary` (needs switching)
  - `icon / dark / arrow` (already dark)
  - `text / light / body` (needs switching)

### Test Steps
1. Select all three components
2. Run "Switch to Dark Mode" command
3. Verify only light components switch

### Expected Results
- ✅ Light button switches to dark
- ✅ Dark icon stays unchanged (skipped)
- ✅ Light text switches to dark
- ✅ Message shows "2 changed, 1 skipped"

## Scenario 3: Nested Components

### Setup
- Create card component containing:
  - Background shape with `color / light / background` fill
  - `button / light / secondary` symbol
  - Text with `heading / light / large` style
  - Nested group with `icon / light / close`

### Test Steps
1. Select the parent card component
2. Run "Switch to Dark Mode" command
3. Verify all nested elements switch recursively

### Expected Results
- ✅ Background color switches to dark variant
- ✅ Nested button switches to dark variant
- ✅ Text style switches to dark variant
- ✅ Icon in nested group switches to dark variant
- ✅ All components processed recursively

## Scenario 4: Color Variable Switching

### Setup
- Create shapes with:
  - Fill using `color / light / background`
  - Border using `color / light / border`
- Create text with `color / light / text-primary`

### Test Steps
1. Select all shapes and text
2. Run "Switch to Dark Mode" command
3. Verify all color variables update

### Expected Results
- ✅ Fill colors switch to dark variants
- ✅ Border colors switch to dark variants
- ✅ Text colors switch to dark variants
- ✅ Original shapes/text remain, only colors change

## Scenario 5: Toggle Functionality

### Setup
- Create mixed content:
  - Some light components
  - Some dark components

### Test Steps
1. Select all components
2. Run "Toggle Light/Dark Mode" command
3. Verify intelligent toggling behavior

### Expected Results
- ✅ Plugin detects predominant mode
- ✅ Switches all to opposite mode
- ✅ Consistent state after toggle

## Scenario 6: Page-Level Switching

### Setup
- Create page with multiple artboards
- Each artboard has mix of light/dark components

### Test Steps
1. Run "Switch Page to Dark Mode" command
2. Verify all components across all artboards process

### Expected Results
- ✅ All artboards processed
- ✅ All eligible components switched
- ✅ Performance acceptable for large pages
- ✅ Accurate count of total changes

## Scenario 7: Shared Style Switching

### Setup
- Create text layers with:
  - `heading / light / large` text style
  - `body / light / regular` text style
- Create shapes with:
  - Custom layer styles named with convention

### Test Steps
1. Select all styled elements
2. Run "Switch to Dark Mode" command
3. Verify styles update correctly

### Expected Results
- ✅ Text styles switch to dark variants
- ✅ Layer styles switch to dark variants
- ✅ Style properties maintained
- ✅ No style corruption

## Scenario 8: Error Handling

### Setup
- Create components with:
  - Invalid naming convention
  - Missing target variants
  - Broken symbol references

### Test Steps
1. Select problematic components
2. Run switching commands
3. Verify graceful error handling

### Expected Results
- ✅ Plugin doesn't crash
- ✅ Clear error messages shown
- ✅ Partial success when some components work
- ✅ Console logs detailed error info

## Scenario 9: Performance Testing

### Setup
- Create document with 1000+ components
- Mix of symbols, styles, and variables
- Deep nesting (10+ levels)

### Test Steps
1. Select large batch of components
2. Run "Switch to Dark Mode" command
3. Monitor performance and memory usage

### Expected Results
- ✅ Completes in reasonable time (<30 seconds)
- ✅ No memory leaks
- ✅ Sketch remains responsive
- ✅ Accurate processing count

## Scenario 10: Override Preservation

### Setup
- Create symbol with text overrides
- Create symbol with nested symbol overrides
- Switch to target mode variant

### Test Steps
1. Apply custom overrides to symbol instances
2. Run mode switching
3. Verify override preservation

### Expected Results
- ✅ Compatible overrides preserved
- ✅ Text overrides maintained
- ✅ Nested symbol overrides maintained
- ✅ Invalid overrides gracefully removed

## Regression Testing Checklist

### Before Each Release
- [ ] Run all 10 scenarios
- [ ] Test on different Sketch versions
- [ ] Test with various document sizes
- [ ] Verify keyboard shortcuts work
- [ ] Test plugin menu functionality
- [ ] Check error handling robustness
- [ ] Validate performance benchmarks
- [ ] Test with edge case naming conventions

### Automated Testing Setup
Create test document with:
- Standard component library
- Automated test runner script
- Expected result validation
- Performance benchmarking

### User Acceptance Testing
- [ ] Designer workflow testing
- [ ] Real-world design system testing
- [ ] Accessibility validation
- [ ] Cross-platform compatibility

## Known Issues Log

### Current Issues
[Track any known issues here]

### Resolved Issues
[Archive resolved issues with solutions]

## Test Data

### Sample Sketch File
Include `examples/sample-components.sketch` with:
- All test scenarios pre-built
- Comprehensive component library
- Edge case examples
- Performance testing content

### Test Scripts
Create automated test scripts for:
- Batch testing multiple scenarios
- Performance benchmarking
- Regression testing
- Error case validation
