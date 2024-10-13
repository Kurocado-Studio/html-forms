import { useField } from '@conform-to/react';
import { render, screen } from '@testing-library/react';
import { Mock, vi } from 'vitest';

import { TextFieldProps } from '../../types';
import { TestForm } from '../../utils/TestForm';
import { testA11y } from '../../utils/a11yTestUtils';
import {
  mockFieldMetadata,
  mockFormMetadata,
} from '../../utils/mockConformUtils';
import { useAriaTextField } from './useAriaTextField';

vi.mock('@conform-to/react', async () => {
  return {
    ...(await vi.importActual('@conform-to/react')),
    useField: vi.fn(),
    useInputControl: vi.fn(),
  };
});

describe('useAriaTextField Hook - Accessibility Tests', () => {
  const useFieldMock = useField as Mock<typeof useField>;

  beforeEach(() => {
    vi.resetAllMocks();
  });

  it('should have no accessibility violations with default props', async () => {
    useFieldMock.mockReturnValue([
      mockFieldMetadata({
        name: 'test',
        valid: true,
        descriptionId: 'desc-id',
        errorId: 'error-id',
        initialValue: '',
      }),
      mockFormMetadata(),
    ]);

    const results = await testA11y(
      <SampleComponent name='test' label='Test Label' />,
      TestForm,
    );

    expect(results).toHaveNoViolations();
  });

  it('should have no accessibility violations when there is an error', async () => {
    useFieldMock.mockReturnValue([
      mockFieldMetadata({
        name: 'test',
        errors: ['Field is required'],
        valid: false,
        descriptionId: 'desc-id',
        errorId: 'error-id',
      }),
      mockFormMetadata(),
    ]);

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
    useFieldMock.mockReturnValue([
      mockFieldMetadata({
        name: 'test',
        valid: true,
        descriptionId: 'desc-id',
        errorId: 'error-id',
      }),
      mockFormMetadata(),
    ]);

    render(
      <TestForm>
        <SampleComponent name='test' label='Test Label' />
      </TestForm>,
    );

    const input = screen.getByLabelText('Test Label');
    expect(input).toBeInTheDocument();
  });

  it('should include aria-describedby when description is provided', () => {
    useFieldMock.mockReturnValue([
      mockFieldMetadata({
        name: 'test',
        valid: true,
        descriptionId: 'desc-id',
        errorId: 'error-id',
      }),
      mockFormMetadata(),
    ]);

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
    useFieldMock.mockReturnValue([
      mockFieldMetadata({
        name: 'test',
        errors: ['Error message'],
        valid: false,
        descriptionId: 'desc-id',
        errorId: 'error-id',
      }),
      mockFormMetadata(),
    ]);

    render(
      <TestForm>
        <SampleComponent name='test' label='Test Label' />
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
