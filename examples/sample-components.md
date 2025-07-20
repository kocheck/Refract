# Sample Components

This document describes the components you should create in a Sketch file to test the Light/Dark Mode Switcher plugin.

## Symbol Library

Create these symbols in your Symbols page:

### Buttons
- `button / light / primary`
- `button / dark / primary`
- `button / light / secondary`
- `button / dark / secondary`
- `button / light / danger`
- `button / dark / danger`

### Cards
- `card / light / default`
- `card / dark / default`
- `card / light / elevated`
- `card / dark / elevated`

### Input Fields
- `input / light / default`
- `input / dark / default`
- `input / light / error`
- `input / dark / error`

### Icons
- `icon / light / arrow`
- `icon / dark / arrow`
- `icon / light / close`
- `icon / dark / close`

## Color Variables

Create these color swatches in your Color Variables:

### Background Colors
- `color / light / background`
- `color / dark / background`
- `color / light / surface`
- `color / dark / surface`

### Text Colors
- `color / light / text-primary`
- `color / dark / text-primary`
- `color / light / text-secondary`
- `color / dark / text-secondary`

### Accent Colors
- `color / light / primary`
- `color / dark / primary`
- `color / light / secondary`
- `color / dark / secondary`

### Border Colors
- `color / light / border`
- `color / dark / border`
- `color / light / divider`
- `color / dark / divider`

## Text Styles

Create these text styles:

### Headings
- `heading / light / large`
- `heading / dark / large`
- `heading / light / medium`
- `heading / dark / medium`
- `heading / light / small`
- `heading / dark / small`

### Body Text
- `body / light / regular`
- `body / dark / regular`
- `body / light / small`
- `body / dark / small`

### Labels
- `label / light / default`
- `label / dark / default`
- `label / light / muted`
- `label / dark / muted`

## Layer Styles

Create these layer styles for shapes:

### Containers
- `container / light / default`
- `container / dark / default`
- `container / light / elevated`
- `container / dark / elevated`

### Borders
- `border / light / thin`
- `border / dark / thin`
- `border / light / thick`
- `border / dark / thick`

## Test Scenarios

### Scenario 1: Basic Component
1. Create an artboard
2. Add `button / light / primary` symbol
3. Test switching to dark mode

### Scenario 2: Complex Card
1. Create card component with:
   - Background using `color / light / surface`
   - `heading / light / medium` text
   - `button / light / secondary`
   - Border using `border / light / thin`
2. Test switching entire card to dark mode

### Scenario 3: Mixed States
1. Create artboard with:
   - `button / light / primary`
   - `icon / dark / arrow` (already dark)
   - `text / light / body`
2. Test switching - should skip already dark components

### Scenario 4: Nested Groups
1. Create group containing:
   - Subgroup with button and text
   - Another subgroup with icons
2. Test recursive processing

## Color Values

### Light Mode Palette
- Background: #FFFFFF
- Surface: #F8F9FA
- Text Primary: #212529
- Text Secondary: #6C757D
- Primary: #007BFF
- Secondary: #6C757D
- Border: #DEE2E6

### Dark Mode Palette
- Background: #121212
- Surface: #1E1E1E
- Text Primary: #FFFFFF
- Text Secondary: #AAAAAA
- Primary: #4FC3F7
- Secondary: #AAAAAA
- Border: #333333

## Testing Checklist

- [ ] All symbols created with proper naming
- [ ] All color variables created
- [ ] All text styles created
- [ ] All layer styles created
- [ ] Test document created with sample layouts
- [ ] Plugin tested with each scenario
- [ ] Edge cases tested (missing variants, etc.)

## File Organization

Organize your Sketch file:

### Pages
1. **Symbols** - All symbol masters
2. **Color Variables** - Color palette and swatches
3. **Text Styles** - Typography samples
4. **Test Scenarios** - Sample layouts for testing

### Symbol Organization
Group symbols by component type:
- 📱 Buttons
- 🎯 Cards
- ✏️ Inputs
- 🔘 Icons
- 📐 Layout

This organization makes it easier to find and manage variants during development and testing.
