import { FieldName, FormValue } from '@conform-to/dom';
import { FieldMetadata, FormMetadata } from '@conform-to/react';
import { useInputControl } from '@conform-to/react/integrations';
import get from 'lodash-es/get';
import { vi } from 'vitest';

export const composeRandomId = () => new Date().toISOString();

export const mockFieldMetadata = <
  FieldSchema = string,
  FormSchema extends Record<string, unknown> = Record<string, unknown>,
  FormError = string[],
>(
  config?: Partial<FieldMetadata<FieldSchema, FormSchema, FormError>>,
): FieldMetadata<FieldSchema, FormSchema, FormError> => {
  // @ts-expect-error we are mocking this
  return {
    ...(config ? { ...config } : {}),
    allErrors: get(config, ['allErrors'], {}),
    descriptionId: get(config, ['descriptionId'], ''),
    dirty: get(config, ['dirty'], false),
    errorId: get(config, ['errorId'], composeRandomId()),
    errors: get(config, ['errors']),
    formId: get(config, ['formId'], composeRandomId()),
    id: get(config, ['id'], composeRandomId()),
    initialValue: get(config, ['initialValue'], '') as FormValue<FieldSchema>,
    key: get(config, ['key']),
    name: get(config, ['name'], `test-name-${composeRandomId()}`) as FieldName<
      FieldSchema,
      FormSchema,
      FormError
    >,
    valid: get(config, ['valid'], true),
    value: get(config, ['value'], '') as FormValue<FieldSchema>,
  };
};

export const mockFormMetadata = <
  FormSchema extends Record<string, unknown> = Record<string, unknown>,
  FormError = string[],
>(
  config?: Partial<FormMetadata<FormSchema, FormError>>,
): FormMetadata<FormSchema, FormError> => {
  return {
    allErrors: get(config, ['allErrors'], {}),
    // @ts-expect-error we are mocking this
    context: {},
    descriptionId: '',
    dirty: false,
    errorId: '',
    errors: undefined,
    getFieldset: get(config, ['getFieldset'], vi.fn()),
    id: get(config, ['id'], composeRandomId()),
    initialValue: get(config, ['initialValue'], '') as FormValue<FormSchema>,
    // @ts-expect-error we are mocking this
    insert: get(config, ['insert'], vi.fn()),
    // @ts-expect-error we are mocking this
    key: get(config, ['insert'], composeRandomId()),
    name: get(config, ['name'], ''),
    noValidate: get(config, ['noValidate'], true),
    onSubmit: get(config, ['onSubmit'], vi.fn()),
    // @ts-expect-error we are mocking this
    remove: vi.fn(),
    // @ts-expect-error we are mocking this
    reorder: vi.fn(),
    // @ts-expect-error we are mocking this
    reset: vi.fn(),
    status: get(config, ['status'], 'success'),
    // @ts-expect-error we are mocking this
    update: vi.fn(),
    valid: false,
    // @ts-expect-error we are mocking this
    validate: vi.fn(),
    // @ts-expect-error we are mocking this
    value: get(config, ['value']),
  };
};

export const mockInputControl = <
  Value extends string | string[] | (string | undefined)[],
>(
  params?: Partial<Parameters<typeof useInputControl<Value>>>,
): ReturnType<typeof useInputControl<Value>> => {
  return {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    value: get(params, [0, 'value'], ''),
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    change: get(params, [0, 'change'], vi.fn()),
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    focus: get(params, [0, 'focus'], vi.fn()),
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    blur: get(params, [0, 'blur'], vi.fn()),
  };
};
