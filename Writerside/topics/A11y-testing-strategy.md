# A11y Testing Strategy

## Testing Strategy

- should pass A11y audit by jest-axe to detect any accessibility violations
- should include aria-invalid and aria-describedby when there is an error
- should not include aria-invalid and aria-describedby when there is no error
- should be focusable and operable via keyboard
- should announce error messages to screen reader using aria-live
- should not introduce accessibility violations through the hook
- should provide correct label properties

## Testing Utils

`src/tests/utils/`
