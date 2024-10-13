import { useField, useInputControl } from '@conform-to/react';
import { useTextField } from '@react-aria/textfield';
import { mergeProps } from '@react-aria/utils';
import get from 'lodash-es/get';
import React, { useRef } from 'react';

import {
  AriaDescription,
  AriaErrorMessage,
  AriaInput,
  AriaLabel,
  AriaValidityState,
} from '~/models';
import {
  LabelProps,
  TextFieldApi,
  TextFieldMeta,
  TextFieldProps,
} from '~/types';

export const useAriaTextField = <
  FieldSchema = string,
  FormSchema extends Record<string, unknown> = Record<string, unknown>,
  FormError = string[],
>(
  config: TextFieldProps<FieldSchema, FormSchema, FormError>,
  formMeta?: TextFieldMeta<FormSchema, FormError>,
): TextFieldApi => {
  const { name, label } = config;

  const inputRef: React.RefObject<HTMLInputElement> =
    useRef<HTMLInputElement>(null);

  const [meta] = useField(name, formMeta);

  const control = useInputControl({
    name: get(meta, ['name']),
    formId: get(meta, ['formId']),
  });

  const required = get(config, ['isRequired'], false);

  const metaErrors = Array.isArray(meta.errors) ? meta.errors : [];

  const combinedErrors = config.errorMessage
    ? [config.errorMessage, ...metaErrors]
    : meta.errors;

  const errorMessage = Array.isArray(combinedErrors)
    ? combinedErrors.toString()
    : undefined;

  const labelOrFallback = label
    ? label
    : `label-${get(meta, ['descriptionId'], `descriptionId-${new Date().toISOString()}`)}`;

  const ariaTextFieldProps: TextFieldProps<FieldSchema, FormSchema, FormError> &
    LabelProps = {
    'aria-describedby': get(meta, ['descriptionId']),
    'aria-details': get(config, ['aria-details']),
    'aria-errormessage': errorMessage,
    'aria-label': labelOrFallback,
    'aria-labelledby': labelOrFallback,
    autoCapitalize: get(config, ['autoCapitalize'], 'off'),
    defaultValue: get(
      config,
      ['defaultValue'],
      get(meta, ['initialValue']) as string,
    ),
    errorMessage,
    htmlFor: labelOrFallback,
    isInvalid: get(config, ['isInvalid'], !get(meta, ['valid'])),
    label,
    name: get(meta, ['name'], name),
    onBlur: get(control, ['blur']),
    // @ts-expect-error we are relying on @conform/react to handle this
    onChange: get(control, ['change']),
    validationBehavior: get(config, ['validationBehavior'], 'aria'),
    value: get(control, ['value']) as string,
  };

  const {
    labelProps,
    inputProps,
    errorMessageProps,
    descriptionProps,
    validationErrors,
    validationDetails,
  } = useTextField(ariaTextFieldProps, inputRef);

  const combinedInputProps = mergeProps(
    {
      ...inputProps,
      'aria-invalid': !get(meta, ['valid']),
      ref: inputRef,
    },
    {
      ref: inputRef,
    },
  );

  return {
    labelProps: AriaLabel.create({
      ...labelProps,
      children: get(config, ['label']),
      htmlFor: labelOrFallback,
      required,
    }),
    inputProps: AriaInput.create(combinedInputProps),
    descriptionProps: AriaDescription.create({
      ...descriptionProps,
      children: get(config, ['description']),
      id: get(meta, ['descriptionId']),
    }),
    errorMessageProps: AriaErrorMessage.create({
      ...errorMessageProps,
      id: get(meta, ['errorId']),
      children: errorMessage,
    }),
    isInvalid: !get(meta, ['valid']),
    validationDetails: AriaValidityState.create(validationDetails),
    validationErrors,
  };
};
