import { render } from '@testing-library/react';
import { axe } from 'vitest-axe';

import { useAriaTextField } from '~/hooks/useAriaTextField/useAriaTextField';
import { TestForm } from '~/utils/TestForm';

function TestInputField() {
  const { labelProps, inputProps } = useAriaTextField({
    name: 'email',
  });

  return (
    <div>
      <label {...labelProps} htmlFor={labelProps.htmlFor}>
        Email
      </label>
      <input {...inputProps} />
    </div>
  );
}

test('passes automated accessibility audit when creating a custom input field', async () => {
  const { container } = render(
    <TestForm>
      <TestInputField />
    </TestForm>,
  );

  expect(await axe(container)).toHaveNoViolations();
});
