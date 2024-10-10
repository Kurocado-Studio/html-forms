import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { TestForm } from '../../utils/TestForm';
import { useAriaTextField } from './useAriaTextField';

function TestInputField() {
  const { labelProps, inputProps } = useAriaTextField({
    name: 'email',
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

test('input can be focused and interacted with via keyboard', async () => {
  const user = userEvent.setup();
  const { getByLabelText } = render(
    <TestForm>
      <TestInputField />
    </TestForm>,
  );
  const input = getByLabelText('Email');

  await user.click(input);
  expect(input).toHaveFocus();

  await user.type(input, 'new@example.com');
  expect(input.getAttribute('value')).toBe('new@example.com');
});
