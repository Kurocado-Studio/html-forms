import { renderHook } from '@testing-library/react';
import { vi } from 'vitest';

import { TestForm } from '../../utils/TestForm';
import { mockFieldMetadata } from '../../utils/mockConformUtils';
import { useAriaTextField } from './useAriaTextField';

const useField = vi.fn();
const useInputControl = vi.fn();
const useTextField = vi.fn();
const mergeProps = vi.fn();

vi.doMock('@conform-to/react', async () => {
  const actual =
    await vi.importActual<typeof import('@conform-to/react')>(
      '@conform-to/react',
    );
  return {
    ...actual,
    useField,
    useInputControl,
  };
});

vi.doMock('@react-aria/textfield', async () => {
  const actual = await vi.importActual<typeof import('@react-aria/textfield')>(
    '@react-aria/textfield',
  );
  return {
    ...actual,
    useTextField,
  };
});

vi.doMock('@react-aria/utils', async () => {
  const actual =
    await vi.importActual<typeof import('@react-aria/utils')>(
      '@react-aria/utils',
    );
  return {
    ...actual,
    mergeProps,
  };
});

describe('useAriaTextField Hook - Unit Tests', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it('should return correct props with default configuration', () => {
    useField.mockReturnValue([
      mockFieldMetadata({
        name: 'test',
        errors: [],
        valid: true,
        descriptionId: 'desc-id',
        errorId: 'error-id',
        initialValue: '',
        formId: 'form-id',
      }),
    ]);

    useInputControl.mockReturnValue({
      value: '',
      blur: vi.fn(),
      change: vi.fn(),
    });

    useTextField.mockReturnValue({
      labelProps: { htmlFor: 'test' },
      inputProps: { name: 'test', ref: { current: null } },
      errorMessageProps: { id: 'error-id', children: undefined },
      descriptionProps: { id: 'desc-id', children: undefined },
      validationErrors: [],
      validationDetails: {} as ValidityState,
    });

    mergeProps.mockImplementation(
      (...args: Record<string, unknown>[]): Record<string, unknown> =>
        Object.assign({}, ...args),
    );

    const { result } = renderHook(
      () =>
        useAriaTextField({
          name: 'test',
        }),
      { wrapper: TestForm },
    );

    expect(result.current).toBeDefined();
    expect(result.current.labelProps).toEqual({
      htmlFor: 'test',
      required: false,
      children: undefined,
    });
    expect(result.current.inputProps).toEqual({
      name: 'test',
      ref: { current: null },
      'aria-invalid': true,
    });
    expect(result.current.descriptionProps).toEqual({
      id: 'desc-id',
      children: undefined,
    });
    expect(result.current.errorMessageProps).toEqual({
      id: 'error-id',
      children: undefined,
    });
    expect(result.current.isInvalid).toBe(true);
    expect(result.current.validationDetails).toEqual({});
    expect(result.current.validationErrors).toEqual([]);
  });

  it('should handle validation errors correctly', () => {
    useField.mockReturnValue([
      {
        name: 'test',
        errors: ['Field is required'],
        valid: false,
        descriptionId: 'desc-id',
        errorId: 'error-id',
        initialValue: '',
        formId: 'form-id',
      },
    ]);

    useInputControl.mockReturnValue({
      value: '',
      blur: vi.fn(),
      change: vi.fn(),
    });

    useTextField.mockReturnValue({
      labelProps: { htmlFor: 'test' },
      inputProps: {
        name: 'test',
        'aria-invalid': true,
        ref: { current: null },
      },
      errorMessageProps: {
        id: 'error-id',
        children: 'Field is required',
      },
      descriptionProps: { id: 'desc-id', children: undefined },
      validationErrors: ['Field is required'],
      validationDetails: {} as ValidityState,
    });

    mergeProps.mockImplementation(
      (...args: Record<string, unknown>[]): Record<string, unknown> =>
        Object.assign({}, ...args),
    );

    const { result } = renderHook(
      () =>
        useAriaTextField({
          name: 'test',
          label: 'Test Field',
        }),
      { wrapper: TestForm },
    );

    expect(result.current.isInvalid).toBe(false);
    expect(result.current.errorMessageProps?.children).toBe(
      'Field is required',
    );
    expect(result.current.inputProps['aria-invalid']).toBe(true);
  });

  it('should include appropriate ARIA attributes for accessibility', () => {
    useField.mockReturnValue([
      {
        name: 'test',
        errors: [],
        valid: true,
        descriptionId: 'desc-id',
        errorId: 'error-id',
        initialValue: '',
        formId: 'form-id',
      },
    ]);

    useInputControl.mockReturnValue({
      value: '',
      blur: vi.fn(),
      change: vi.fn(),
    });

    useTextField.mockReturnValue({
      labelProps: { htmlFor: 'test', id: 'label-id' },
      inputProps: {
        name: 'test',
        'aria-labelledby': 'label-id',
        'aria-describedby': 'desc-id',
        ref: { current: null },
      },
      errorMessageProps: { id: 'error-id', children: undefined },
      descriptionProps: {
        id: 'desc-id',
        children: 'This is a description',
      },
      validationErrors: [],
      validationDetails: {} as ValidityState,
    });

    mergeProps.mockImplementation(
      (...args: Record<string, unknown>[]): Record<string, unknown> =>
        Object.assign({}, ...args),
    );

    const { result } = renderHook(
      () =>
        useAriaTextField({
          name: 'test',
          label: 'Test Label',
          description: 'This is a description',
        }),
      { wrapper: TestForm },
    );

    expect(result.current.inputProps['aria-labelledby']).toBe('label-id');
    expect(result.current.inputProps['aria-describedby']).toBe('desc-id');
    expect(result.current.labelProps.children).toBe('Test Label');
    expect(result.current.descriptionProps?.children).toBe(
      'This is a description',
    );
  });

  it('should handle custom errorMessage prop', () => {
    useField.mockReturnValue([
      {
        name: 'test',
        errors: [],
        valid: true,
        descriptionId: 'desc-id',
        errorId: 'error-id',
        initialValue: '',
        formId: 'form-id',
      },
    ]);

    useInputControl.mockReturnValue({
      value: '',
      blur: vi.fn(),
      change: vi.fn(),
    });

    useTextField.mockReturnValue({
      labelProps: { htmlFor: 'test' },
      inputProps: { name: 'test', ref: { current: null } },
      errorMessageProps: {
        id: 'error-id',
        children: 'Custom error message',
      },
      descriptionProps: { id: 'desc-id', children: undefined },
      validationErrors: ['Custom error message'],
      validationDetails: {} as ValidityState,
    });

    mergeProps.mockImplementation(
      (...args: Record<string, unknown>[]): Record<string, unknown> =>
        Object.assign({}, ...args),
    );

    const { result } = renderHook(
      () =>
        useAriaTextField({
          name: 'test',
          errorMessage: 'Custom error message',
        }),
      { wrapper: TestForm },
    );

    expect(result.current.errorMessageProps?.children).toBe(
      'Custom error message',
    );
    expect(result.current.validationErrors).toEqual(['Custom error message']);
  });

  it('should correctly handle required fields', () => {
    useField.mockReturnValue([
      {
        name: 'test',
        errors: [],
        valid: true,
        descriptionId: 'desc-id',
        errorId: 'error-id',
        initialValue: '',
        formId: 'form-id',
      },
    ]);

    useInputControl.mockReturnValue({
      value: '',
      blur: vi.fn(),
      change: vi.fn(),
    });

    useTextField.mockReturnValue({
      labelProps: { htmlFor: 'test', required: true },
      inputProps: { name: 'test', ref: { current: null } },
      errorMessageProps: { id: 'error-id', children: undefined },
      descriptionProps: { id: 'desc-id', children: undefined },
      validationErrors: [],
      validationDetails: {} as ValidityState,
    });

    mergeProps.mockImplementation(
      (...args: Record<string, unknown>[]): Record<string, unknown> =>
        Object.assign({}, ...args),
    );

    const { result } = renderHook(
      () =>
        useAriaTextField({
          name: 'test',
          isRequired: true,
        }),
      { wrapper: TestForm },
    );

    expect(result.current.labelProps.required).toBe(true);
  });

  it('should handle defaultValue and initialValue correctly', () => {
    useField.mockReturnValue([
      {
        name: 'test',
        errors: [],
        valid: true,
        descriptionId: 'desc-id',
        errorId: 'error-id',
        initialValue: 'Initial Value',
        formId: 'form-id',
      },
    ]);

    useInputControl.mockReturnValue({
      value: 'Control Value',
      blur: vi.fn(),
      change: vi.fn(),
    });

    useTextField.mockReturnValue({
      labelProps: { htmlFor: 'test' },
      inputProps: {
        name: 'test',
        value: 'Control Value',
        ref: { current: null },
      },
      errorMessageProps: { id: 'error-id', children: undefined },
      descriptionProps: { id: 'desc-id', children: undefined },
      validationErrors: [],
      validationDetails: {} as ValidityState,
    });

    mergeProps.mockImplementation(
      (...args: Record<string, unknown>[]): Record<string, unknown> =>
        Object.assign({}, ...args),
    );

    const { result } = renderHook(
      () =>
        useAriaTextField({
          name: 'test',
          defaultValue: 'Default Value',
        }),
      { wrapper: TestForm },
    );

    expect(result.current.inputProps.value).toBe('Control Value');
  });

  it('should handle isInvalid prop overriding meta.valid', () => {
    useField.mockReturnValue([
      {
        name: 'test',
        errors: [],
        valid: true,
        descriptionId: 'desc-id',
        errorId: 'error-id',
        initialValue: '',
        formId: 'form-id',
      },
    ]);

    useInputControl.mockReturnValue({
      value: '',
      blur: vi.fn(),
      change: vi.fn(),
    });

    useTextField.mockReturnValue({
      labelProps: { htmlFor: 'test' },
      inputProps: {
        name: 'test',
        'aria-invalid': false,
        ref: { current: null },
      },
      errorMessageProps: { id: 'error-id', children: undefined },
      descriptionProps: { id: 'desc-id', children: undefined },
      validationErrors: [],
      validationDetails: {} as ValidityState,
    });

    mergeProps.mockImplementation(
      (...args: Record<string, unknown>[]): Record<string, unknown> =>
        Object.assign({}, ...args),
    );

    const { result } = renderHook(
      () =>
        useAriaTextField({
          name: 'test',
          isInvalid: false,
        }),
      { wrapper: TestForm },
    );

    expect(result.current.isInvalid).toBe(false);
    expect(result.current.inputProps['aria-invalid']).toBe(false);
  });

  it('should handle meta.errors not being an array', () => {
    useField.mockReturnValue([
      {
        name: 'test',
        errors: undefined,
        valid: true,
        descriptionId: 'desc-id',
        errorId: 'error-id',
        initialValue: '',
        formId: 'form-id',
      },
    ]);

    useInputControl.mockReturnValue({
      value: '',
      blur: vi.fn(),
      change: vi.fn(),
    });

    useTextField.mockReturnValue({
      labelProps: { htmlFor: 'test' },
      inputProps: {
        name: 'test',
        ref: { current: null },
      },
      errorMessageProps: { id: 'error-id', children: undefined },
      descriptionProps: { id: 'desc-id', children: undefined },
      validationErrors: [],
      validationDetails: {} as ValidityState,
    });

    mergeProps.mockImplementation(
      (...args: Record<string, unknown>[]): Record<string, unknown> =>
        Object.assign({}, ...args),
    );

    const { result } = renderHook(
      () =>
        useAriaTextField({
          name: 'test',
        }),
      { wrapper: TestForm },
    );

    expect(result.current.validationErrors).toEqual([]);
    expect(result.current.errorMessageProps?.children).toBeUndefined();
  });

  it('should use label prop correctly', () => {
    useField.mockReturnValue([
      {
        name: 'test',
        errors: [],
        valid: true,
        descriptionId: 'desc-id',
        errorId: 'error-id',
        initialValue: '',
        formId: 'form-id',
      },
    ]);

    useInputControl.mockReturnValue({
      value: '',
      blur: vi.fn(),
      change: vi.fn(),
    });

    useTextField.mockReturnValue({
      labelProps: { htmlFor: 'test', id: 'label-id' },
      inputProps: {
        name: 'test',
        'aria-labelledby': 'label-id',
        ref: { current: null },
      },
      errorMessageProps: { id: 'error-id', children: undefined },
      descriptionProps: { id: 'desc-id', children: undefined },
      validationErrors: [],
      validationDetails: {} as ValidityState,
    });

    mergeProps.mockImplementation(
      (...args: Record<string, unknown>[]): Record<string, unknown> =>
        Object.assign({}, ...args),
    );

    const { result } = renderHook(
      () =>
        useAriaTextField({
          name: 'test',
          label: 'Custom Label',
        }),
      { wrapper: TestForm },
    );

    expect(result.current.labelProps.children).toBe('Custom Label');
    expect(result.current.inputProps['aria-labelledby']).toBe('label-id');
  });

  it('should correctly assign refs to inputProps', () => {
    useField.mockReturnValue([
      {
        name: 'test',
        errors: [],
        valid: true,
        descriptionId: 'desc-id',
        errorId: 'error-id',
        initialValue: '',
        formId: 'form-id',
      },
    ]);

    useInputControl.mockReturnValue({
      value: '',
      blur: vi.fn(),
      change: vi.fn(),
    });

    useTextField.mockReturnValue({
      labelProps: { htmlFor: 'test' },
      inputProps: {
        name: 'test',
        ref: { current: null },
      },
      errorMessageProps: { id: 'error-id', children: undefined },
      descriptionProps: { id: 'desc-id', children: undefined },
      validationErrors: [],
      validationDetails: {} as ValidityState,
    });

    mergeProps.mockImplementation(
      (...args: Record<string, unknown>[]): Record<string, unknown> =>
        Object.assign({}, ...args),
    );

    const { result } = renderHook(
      () =>
        useAriaTextField({
          name: 'test',
        }),
      { wrapper: TestForm },
    );

    expect(result.current.inputProps.ref).toBeDefined();
    expect(typeof result.current.inputProps.ref).toBe('object');
  });
});
