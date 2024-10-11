import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';

import { TextFieldProps } from '../../types';
import { TestForm } from '../../utils/TestForm';
import { testA11y } from '../../utils/a11yTestUtils';
import { mockFieldMetadata } from '../../utils/mockConformUtils';
import { useAriaTextField } from './useAriaTextField';

const useField = vi.fn();
const useInputControl = vi.fn();

vi.doMock('@conform-to/react', () => ({
  useField,
  useInputControl,
}));

describe('useAriaTextField Hook - Accessibility Tests', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it('should have no accessibility violations with default props', async () => {
    useField.mockReturnValue([
      {
        name: 'test',
        errors: [],
        valid: true,
        descriptionId: 'desc-id',
        errorId: 'error-id',
        initialValue: '',
      },
    ]);

    useInputControl.mockReturnValue({
      value: '',
      blur: vi.fn(),
      change: vi.fn(),
    });

    const results = await testA11y(
      <SampleComponent name='test' label='Test Label' />,
      TestForm,
    );

    expect(results).toHaveNoViolations();
  });

  it('should have no accessibility violations when there is an error', async () => {
    useField.mockReturnValue([
      {
        name: 'test',
        errors: ['Field is required'],
        valid: false,
        descriptionId: 'desc-id',
        errorId: 'error-id',
        initialValue: '',
      },
    ]);

    useInputControl.mockReturnValue({
      value: '',
      blur: vi.fn(),
      change: vi.fn(),
    });

    const results = await testA11y(
      <SampleComponent
        name='test'
        label='Test Label'
        errorMessage='Field is required'
      />,
      TestForm,
    );

    expect(results).toHaveNoViolations();
  });

  it('should associate label and input correctly', () => {
    useField.mockReturnValue([
      {
        name: 'test',
        errors: [],
        valid: true,
        descriptionId: 'desc-id',
        errorId: 'error-id',
        initialValue: '',
      },
    ]);

    useInputControl.mockReturnValue({
      value: '',
      blur: vi.fn(),
      change: vi.fn(),
    });

    render(
      <TestForm>
        <SampleComponent name='test' label='Test Label' />
      </TestForm>,
    );

    const input = screen.getByLabelText('Test Label');
    expect(input).toBeInTheDocument();
  });

  it('should include aria-describedby when description is provided', () => {
    useField.mockReturnValue([
      mockFieldMetadata({
        name: 'test',
        errors: [],
        valid: true,
        descriptionId: 'desc-id',
        errorId: 'error-id',
        initialValue: '',
      }),
    ]);

    useInputControl.mockReturnValue({
      value: '',
      blur: vi.fn(),
      change: vi.fn(),
    });

    render(
      <TestForm>
        <SampleComponent
          name='test'
          label='Test Label'
          description='This is a description'
        />
      </TestForm>,
    );

    const input = screen.getByLabelText('Test Label');
    expect(input).toHaveAttribute('aria-describedby', 'desc-id');

    const description = screen.getByText('This is a description');
    expect(description).toBeInTheDocument();
    expect(description.id).toBe('desc-id');
  });

  it('should include aria-errormessage when there is an error', () => {
    useField.mockReturnValue([
      {
        name: 'test',
        errors: ['Error message'],
        valid: false,
        descriptionId: 'desc-id',
        errorId: 'error-id',
        initialValue: '',
      },
    ]);

    useInputControl.mockReturnValue({
      value: '',
      blur: vi.fn(),
      change: vi.fn(),
    });

    render(
      <TestForm>
        <SampleComponent
          name='test'
          label='Test Label'
          errorMessage='Error message'
        />
      </TestForm>,
    );

    const input = screen.getByLabelText('Test Label');
    expect(input).toHaveAttribute('aria-invalid', 'true');
    expect(input).toHaveAttribute('aria-errormessage', 'Error message');

    const errorMessage = screen.getByText('Error message');
    expect(errorMessage).toBeInTheDocument();
    expect(errorMessage.id).toBe('error-id');
  });
});

function SampleComponent(props: TextFieldProps) {
  const { labelProps, inputProps, errorMessageProps, descriptionProps } =
    useAriaTextField(props);

  return (
    <div>
      <label {...labelProps}>{labelProps.children}</label>
      <input {...inputProps} />
      {descriptionProps?.children ? (
        <div {...descriptionProps}>{descriptionProps.children}</div>
      ) : null}
      {errorMessageProps?.children ? (
        <div {...errorMessageProps}>{errorMessageProps.children}</div>
      ) : null}
    </div>
  );
}
