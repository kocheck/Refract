# Contributing to Light/Dark Mode Switcher

Thank you for your interest in contributing to the Light/Dark Mode Switcher! This document provides guidelines and information for contributors.

## Development Environment Setup

### Prerequisites

- **Sketch** (version 3.0 or higher)
- **macOS** (required for Sketch development)
- **Code Editor** (VS Code, Sublime Text, or similar)
- **Git** for version control

### Getting Started

1. **Fork the repository**
   ```bash
   git clone https://github.com/kocheck/Refract.git
   cd Refract
   ```

2. **Install the plugin locally**
   ```bash
   # Copy plugin to Sketch plugins directory
   cp -r light-dark-switcher.sketchplugin ~/Library/Application\ Support/com.bohemiancoding.sketch3/Plugins/
   ```

3. **Set up development workflow**
   - Edit `script.js` in your preferred editor
   - Test changes in Sketch using **Plugins → Run Script**
   - Use Sketch Console (**View → Show Console**) for debugging

## Project Structure

```
light-dark-switcher.sketchplugin/
├── Contents/
│   └── Sketch/
│       ├── manifest.json     # Plugin configuration and commands
│       └── script.js         # Main plugin implementation
├── examples/
│   ├── test-scenarios.md     # Comprehensive test cases
│   └── sample-components.sketch  # Test document (create)
├── docs/
│   ├── API.md               # Complete API documentation
│   └── CONTRIBUTING.md      # This file
├── PROJECT.md               # Development tracking
├── README.md               # User documentation
└── LICENSE                 # MIT license
```

## Code Style Guidelines

### JavaScript Standards

- **ES5 Compatibility**: Use ES5 syntax for Sketch plugin compatibility
- **Function Declarations**: Use function declarations over arrow functions
- **Error Handling**: Wrap risky operations in try-catch blocks
- **Documentation**: All functions must have JSDoc comments

### JSDoc Documentation Format

```javascript
/**
 * Brief description of what the function does
 * @param {Type} paramName - Description of parameter
 * @param {Type} paramName - Description of parameter
 * @returns {Type} Description of return value
 */
function functionName(paramName, paramName) {
    // Implementation
}
```

### Naming Conventions

- **Functions**: camelCase (`processLayer`, `switchSymbolMode`)
- **Constants**: UPPER_SNAKE_CASE (`MODES`, `NAMING_SEPARATOR`)
- **Variables**: camelCase (`targetMode`, `currentSymbol`)
- **Private Functions**: Prefix with underscore (`_helperFunction`)

### Code Organization

1. **Constants** at the top of file
2. **Main entry points** (exported functions)
3. **Core processing functions**
4. **Helper/utility functions**
5. **Export statements** at the bottom

### Error Handling Pattern

```javascript
function exampleFunction(param) {
    try {
        // Main logic here
        return successResult;
    } catch (error) {
        console.error(`Error in exampleFunction: ${error.message}`);
        return defaultResult;
    }
}
```

## Development Workflow

### Making Changes

1. **Create feature branch**
   ```bash
   git checkout -b feature/description-of-change
   ```

2. **Make incremental changes**
   - Edit `script.js` for functionality changes
   - Update `manifest.json` for new commands or shortcuts
   - Update documentation as needed

3. **Test thoroughly**
   - Create test document with sample components
   - Run through test scenarios in `examples/test-scenarios.md`
   - Test edge cases and error conditions

4. **Update documentation**
   - Update `PROJECT.md` with progress
   - Update `API.md` for function changes
   - Update `README.md` for user-facing changes

### Testing Your Changes

#### Manual Testing
1. Install plugin in Sketch
2. Create test document with sample components following naming convention
3. Test each command:
   - Switch to Dark Mode
   - Switch to Light Mode
   - Toggle Mode
   - Switch Page to Dark/Light
4. Verify error handling with invalid components
5. Test performance with large documents

#### Test Document Setup
Create symbols with this naming pattern:
```
button / light / primary
button / dark / primary
button / light / secondary
button / dark / secondary
card / light / default
card / dark / default
```

Create color variables:
```
color / light / background
color / dark / background
color / light / text-primary
color / dark / text-primary
```

#### Console Debugging
Use Sketch console for debugging:
- **View → Show Console** in Sketch
- Add `console.log()` statements for debugging
- Check for error messages and warnings

### Performance Testing

Test with documents containing:
- 100+ symbol instances
- Deep nesting (5+ levels)
- Multiple artboards
- Large numbers of color variables

Verify:
- Reasonable execution time (< 30 seconds for large documents)
- No memory leaks
- Accurate progress reporting

## Contribution Types

### Bug Fixes

1. **Identify the issue**
   - Reproduce the bug consistently
   - Check if it's already reported in GitHub Issues
   - Test with different Sketch versions if possible

2. **Fix the bug**
   - Make minimal changes to fix the specific issue
   - Add error handling if applicable
   - Test the fix thoroughly

3. **Regression testing**
   - Ensure fix doesn't break existing functionality
   - Test with various document types and sizes

### New Features

1. **Propose the feature**
   - Open GitHub Issue to discuss the feature
   - Explain use case and benefits
   - Get feedback from maintainers

2. **Implementation**
   - Follow existing code patterns
   - Add comprehensive error handling
   - Document new functions thoroughly

3. **Testing**
   - Create test scenarios for new functionality
   - Test integration with existing features
   - Consider edge cases and error conditions

### Documentation Improvements

- Fix typos and grammar issues
- Add missing examples or clarifications
- Improve code comments and JSDoc
- Update API documentation for changes

### Performance Optimizations

- Profile performance issues
- Implement optimizations without breaking functionality
- Test performance improvements with realistic documents
- Document performance characteristics

## Pull Request Process

### Before Submitting

1. **Update PROJECT.md**
   - Mark completed items
   - Note any architectural changes
   - Document testing performed

2. **Code review checklist**
   - [ ] All functions have JSDoc comments
   - [ ] Error handling is comprehensive
   - [ ] Code follows style guidelines
   - [ ] No debugging console.log statements left in code
   - [ ] Performance considerations addressed

3. **Testing checklist**
   - [ ] Manual testing completed
   - [ ] Edge cases tested
   - [ ] Performance testing done
   - [ ] Documentation updated

### Pull Request Template

```markdown
## Description
Brief description of changes made.

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Documentation update
- [ ] Performance improvement
- [ ] Code refactoring

## Testing Performed
- [ ] Manual testing with sample documents
- [ ] Edge case testing
- [ ] Performance testing
- [ ] Regression testing

## Documentation Updates
- [ ] README.md updated
- [ ] API.md updated
- [ ] PROJECT.md updated
- [ ] JSDoc comments added/updated

## Screenshots (if applicable)
Add screenshots showing the feature/fix in action.

## Additional Notes
Any additional context or considerations.
```

### Review Process

1. **Automated checks** (if available)
   - Code style validation
   - Basic functionality tests

2. **Manual review**
   - Code quality and style
   - Architecture and design decisions
   - Documentation completeness

3. **Testing review**
   - Test coverage adequacy
   - Edge case handling
   - Performance implications

## Release Process

### Version Numbering

Follow semantic versioning (SemVer):
- **Major** (1.0.0): Breaking changes
- **Minor** (1.1.0): New features, backward compatible
- **Patch** (1.0.1): Bug fixes, backward compatible

### Release Checklist

1. **Pre-release testing**
   - [ ] Full test suite execution
   - [ ] Performance benchmarking
   - [ ] Documentation review
   - [ ] Cross-version compatibility testing

2. **Release preparation**
   - [ ] Update version in `manifest.json`
   - [ ] Update changelog in `README.md`
   - [ ] Tag release in Git
   - [ ] Package plugin for distribution

3. **Post-release**
   - [ ] Update GitHub release notes
   - [ ] Announce in relevant communities
   - [ ] Monitor for issues and feedback

## Getting Help

### Community Support

- **GitHub Issues**: Report bugs and request features
- **GitHub Discussions**: Ask questions and share ideas
- **Email**: hello@refract.com for direct support

### Documentation Resources

- **README.md**: User-facing documentation
- **API.md**: Complete technical documentation
- **test-scenarios.md**: Comprehensive testing guide
- **Sketch Plugin Documentation**: [Official Sketch docs](https://developer.sketch.com/plugins)

### Development Resources

- **Sketch API Reference**: [sketch.com/docs](https://developer.sketch.com/reference/api/)
- **Plugin Examples**: [Official Sketch examples](https://github.com/sketch-hq/SketchAPI)
- **JavaScript Resources**: MDN Web Docs for JavaScript fundamentals

## Code of Conduct

### Our Standards

- **Be respectful** in all interactions
- **Be constructive** in feedback and criticism
- **Be collaborative** and help others learn
- **Be patient** with new contributors

### Unacceptable Behavior

- Harassment or discrimination of any kind
- Trolling, insulting, or derogatory comments
- Public or private harassment
- Publishing others' private information

### Enforcement

Project maintainers are responsible for clarifying and enforcing standards. They have the right to remove, edit, or reject contributions that don't align with this Code of Conduct.

## License

By contributing to this project, you agree that your contributions will be licensed under the MIT License that covers this project.

---

Thank you for contributing to the Light/Dark Mode Switcher! Your efforts help make design workflows more efficient for the entire community.
