import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';

import { useAriaTextField } from './useAriaTextField';

vi.mock('@conform-to/react', async () => ({
  ...(await vi.importActual('@conform-to/react')),
  useField: vi.fn().mockReturnValue([
    {
      name: 'TEST NAME',
      value: 'TEST VALUE',
      errors: ['JKKJJKJK email address', 'ERROR 2'],
      disabled: false,
    },
  ]),
}));

test('aria-invalid and aria-describedby are correctly applied when errors are present', async () => {
  render(<TestInputFieldWithError />);
  const input = await screen.findByLabelText('Email');
  const errorMessage = await screen.findByText('Invalid email address');

  expect(input).toHaveAttribute('aria-invalid', 'true');
  expect(input).toHaveAttribute('aria-describedby', errorMessage.id);
});

function TestInputFieldWithError() {
  const ariaTextFieldProps = useAriaTextField({
    name: 'email',
  });

  console.log(ariaTextFieldProps);
  return (
    <div>
      <label
        {...ariaTextFieldProps.labelProps}
        htmlFor={ariaTextFieldProps.labelProps.htmlFor}
      >
        Email
      </label>
      <input {...ariaTextFieldProps.inputProps} />
      <div {...ariaTextFieldProps.errorMessageProps} />
    </div>
  );
}
