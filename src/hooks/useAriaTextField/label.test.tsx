import { render } from '@testing-library/react';

import { useAriaTextField } from './useAriaTextField';

function TestInputField() {
  const { labelProps, inputProps } = useAriaTextField({
    name: 'email',
    label: 'EMAIL',
  });

  return (
    <div>
      <label htmlFor={labelProps.htmlFor} {...labelProps}>
        Email
      </label>
      <input {...inputProps} />
    </div>
  );
}

test('label is correctly associated with the input', () => {
  const { getByLabelText } = render(<TestInputField />);
  const input = getByLabelText('Email');

  expect(input).toBeInTheDocument();
  expect(input.getAttribute('id')).toBe('email');
});
