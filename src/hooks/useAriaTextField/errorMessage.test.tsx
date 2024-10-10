import { useField } from '@conform-to/react';
import { render } from '@testing-library/react';
import { vi } from 'vitest';

import { useAriaTextField } from './useAriaTextField';

function TestInputFieldWithError() {
  const { labelProps, inputProps, errorMessageProps } = useAriaTextField({
    name: 'email',
    formId: 'signUpForm',
  });
  return (
    <div>
      <label htmlFor={labelProps.htmlFor} {...labelProps}>
        Email
      </label>
      <input {...inputProps} />
      <div {...errorMessageProps} />
    </div>
  );
}

test('error message is announced by screen readers using aria-live', () => {
  vi.mock('@conform-to/react', async () => ({
    ...(await vi.importActual('@conform-to/react')),
    useField: vi.fn().mockReturnValue([
      {
        name: 'email',
        value: 'test value',
        errors: ['Invalid email address'],
      },
    ]),
  }));

  const { getByText } = render(<TestInputFieldWithError />);
  const errorMessage = getByText('Invalid email address');
  expect(errorMessage).toHaveAttribute('aria-live', 'assertive');
});
