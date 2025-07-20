# Troubleshooting Guide - Plugin Skipping Components

## The Issue
Your plugin shows "0 changed, 1 skipped" which means the detection logic is working, but it thinks your component is already in the target mode.

## Debugging Steps

### Step 1: Check Component Naming Convention

The plugin expects this **exact** naming pattern:
```
[component] / [mode] / [variant]
```

**Critical Requirements:**
- Use exactly ` / ` (space-slash-space) as separators
- Mode must be exactly `light` or `dark` (lowercase)
- Must have at least 2 parts (component and mode)

**✅ Correct Examples:**
- `button / light / primary`
- `button / dark / primary`
- `card / light / default`
- `input / dark / error`

**❌ Incorrect Examples:**
- `button/light/primary` (no spaces)
- `button - light - primary` (wrong separators)
- `button / Light / primary` (uppercase mode)
- `button_light_primary` (underscores)
- `light button` (wrong order)

### Step 2: Verify Your Test Components

1. **Create a symbol** with the exact name: `button / light / primary`
2. **Create another symbol** with name: `button / dark / primary`
3. **Place the light symbol** on your artboard
4. **Select the symbol instance** (not the symbol master)
5. **Run "Switch to Dark Mode"**

### Step 3: Check Console for Debug Info

1. In Sketch, go to **View → Show Console**
2. Run the plugin again
3. Look for any error messages or warnings

### Step 4: Common Issues and Solutions

#### Issue: "Plugin skips my symbol"
**Check:**
- Are you selecting the symbol **instance** on the artboard (not the symbol master in symbols page)?
- Is the symbol named with exact convention: `component / mode / variant`?
- Does the target symbol exist? (e.g., if switching to dark, `component / dark / variant` must exist)

#### Issue: "Wrong mode detected"
**Check:**
- Mode part is exactly `light` or `dark` (lowercase, no extra characters)
- Separators are exactly ` / ` (space-slash-space)
- No hidden characters or unusual spaces

#### Issue: "Plugin doesn't find target symbol"
**Check:**
- Target symbol exists in document
- Target symbol has correct naming
- Both symbols are in same document

### Step 5: Manual Test Checklist

Create this exact setup to test:

**Symbols to Create:**
1. Symbol named: `test / light / button`
2. Symbol named: `test / dark / button`

**Test Process:**
1. Place `test / light / button` on artboard
2. Select the instance
3. Run "Switch to Dark Mode"
4. Should change to `test / dark / button`

### Step 6: Enable Debug Mode

Replace your `script.js` temporarily with this debug version:

```javascript
// Add this to the beginning of your script.js
console.log("🔧 DEBUG MODE ENABLED");

// Replace the detectCurrentMode function with this debug version:
function detectCurrentMode(layer) {
  try {
    const name = layer.name();
    console.log(`🔍 Layer name: "${name}"`);

    const parts = name.split(' / ');
    console.log(`📋 Split parts:`, parts);

    if (parts.length >= 2) {
      const modePart = parts[1].toLowerCase().trim();
      console.log(`🎯 Mode part: "${modePart}"`);

      if (modePart === 'light' || modePart === 'dark') {
        console.log(`✅ Valid mode detected: ${modePart}`);
        return modePart;
      } else {
        console.log(`❌ Invalid mode: "${modePart}"`);
      }
    } else {
      console.log(`❌ Not enough parts: ${parts.length}`);
    }

    return null;
  } catch (error) {
    console.error(`💥 Error: ${error.message}`);
    return null;
  }
}
```

### Step 7: Expected Console Output

When working correctly, you should see:
```
🔍 Layer name: "button / light / primary"
📋 Split parts: ["button", "light", "primary"]
🎯 Mode part: "light"
✅ Valid mode detected: light
```

When there's an issue, you might see:
```
🔍 Layer name: "button-light-primary"
📋 Split parts: ["button-light-primary"]
❌ Not enough parts: 1
```

### Step 8: Quick Fixes for Common Problems

#### Problem: Plugin always skips
**Solution:** Check if you're trying to switch a "light" component to "light" mode (it will skip correctly)

#### Problem: Names look correct but still skip
**Solution:** Copy-paste this exact name: `button / light / primary`

#### Problem: Plugin doesn't run at all
**Solution:** Check Sketch console for JavaScript errors

### Step 9: Test with Minimal Example

Create the absolute minimal test:

1. **New Sketch document**
2. **Create symbol:** `test / light / default`
3. **Create symbol:** `test / dark / default`
4. **Place light symbol on artboard**
5. **Select instance, run plugin**

If this doesn't work, the issue is in the plugin code. If it works, the issue is in your component naming.

### Step 10: Report Back

After trying these steps, let me know:
1. **What names** you're using exactly
2. **Console output** when running debug mode
3. **Which step** revealed the issue

This will help me provide a more specific solution!
