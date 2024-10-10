import {
  FieldName,
  FormId,
  useField,
  useInputControl,
} from '@conform-to/react';
import { AriaTextFieldProps, useTextField } from '@react-aria/textfield';
import { mergeProps } from '@react-aria/utils';
import get from 'lodash-es/get';
import React, { useRef } from 'react';

interface AriaTextFieldConfig<
  FieldSchema,
  FormSchema extends Record<string, unknown>,
  FormError,
> {
  name: FieldName<FieldSchema, FormSchema, FormError>;
  formId?: FormId<FormSchema, FormError>;
  label?: string;
  type?: string;
}

interface AriaTextFieldApi {
  descriptionProps?: React.HTMLAttributes<HTMLDivElement>;
  errorMessageProps?: React.HTMLAttributes<HTMLDivElement>;
  inputProps: React.InputHTMLAttributes<HTMLInputElement>;
  isInvalid: boolean;
  labelProps: React.LabelHTMLAttributes<HTMLLabelElement> & { htmlFor: string };
  validationDetails: ValidityState;
  validationErrors: string[];
}

export const useAriaTextField = <
  FieldSchema = string,
  FormSchema extends Record<string, unknown> = Record<string, unknown>,
  FormError = string[],
>(
  config: AriaTextFieldConfig<FieldSchema, FormSchema, FormError>,
): AriaTextFieldApi => {
  const { name, label, formId } = config;

  const inputRef: React.RefObject<HTMLInputElement> =
    useRef<HTMLInputElement>(null);

  const [meta] = useField(name, { formId });
  const control = useInputControl({
    name: meta.name,
    formId: meta.formId,
  });

  const errorMessage = Array.isArray(meta.errors)
    ? meta.errors.toString()
    : undefined;

  const labelWithFallback = label
    ? label
    : `label-${get(meta, ['descriptionId'])}`;

  const ariaTextFieldProps: AriaTextFieldProps & { htmlFor: string } = {
    label,
    'aria-details': '',
    htmlFor: labelWithFallback,
    'aria-describedby': get(meta, ['descriptionId']),
    'aria-errormessage': errorMessage,
    'aria-label': labelWithFallback,
    'aria-labelledby': labelWithFallback,
    defaultValue: meta.initialValue as string,
    errorMessage: Array.isArray(meta.errors)
      ? meta.errors.toString()
      : undefined,
    isInvalid: meta.valid,
    value: control.value as string,
    onBlur: control.blur,
    onChange: control.change,
    validationBehavior: 'aria',
    name: meta.name,
  };

  const {
    labelProps,
    inputProps,
    errorMessageProps,
    descriptionProps,
    validationErrors,
    validationDetails,
  } = useTextField(ariaTextFieldProps, inputRef);

  const combinedInputProps = mergeProps(inputProps, {
    ref: inputRef,
  });

  return {
    labelProps: {
      ...labelProps,
      htmlFor: labelWithFallback,
    },
    inputProps: combinedInputProps,
    descriptionProps: {
      ...descriptionProps,
      id: meta.descriptionId,
    },
    errorMessageProps: {
      ...errorMessageProps,
      id: meta.errorId,
      children: validationErrors.length
        ? validationErrors.toString()
        : undefined,
    },
    isInvalid: meta.valid,
    validationDetails,
    validationErrors,
  };
};
