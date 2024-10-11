import { FieldName, FormId } from '@conform-to/react';
import {
  AriaTextFieldProps as RACAriaTextFieldProps,
  TextFieldAria,
} from '@react-aria/textfield';
import React, { LabelHTMLAttributes, ReactNode } from 'react';

export interface AdditionalAriaTextFieldProps {
  htmlFor: string;
  required?: boolean;
}

export type InputProps = TextFieldAria['inputProps'] & {
  ref: React.Ref<HTMLInputElement>;
  'aria-invalid': boolean;
};

export type DescriptionProps = TextFieldAria['descriptionProps'] & {
  children?: React.ReactNode;
  id: string;
};

export type ErrorMessageProps = TextFieldAria['errorMessageProps'] & {
  children?: React.ReactNode;
  id: string;
};

export type LabelProps = LabelHTMLAttributes<HTMLLabelElement> & {
  htmlFor: string;
  required?: boolean;
  children?: ReactNode;
};

export interface TextFieldApi {
  descriptionProps?: React.HTMLAttributes<HTMLDivElement>;
  errorMessageProps?: React.HTMLAttributes<HTMLDivElement>;
  inputProps: React.InputHTMLAttributes<HTMLInputElement> & {
    ref: React.Ref<HTMLInputElement>;
  };
  isInvalid: boolean;
  labelProps: React.LabelHTMLAttributes<HTMLLabelElement> &
    AdditionalAriaTextFieldProps;
  validationDetails: ValidityState;
  validationErrors: string[];
}

export interface TextFieldMeta<
  FormSchema extends Record<string, unknown>,
  FormError,
> {
  formId?: FormId<FormSchema, FormError>;
}

export type TextFieldProps<
  FieldSchema = string,
  FormSchema extends Record<string, unknown> = Record<string, unknown>,
  FormError = string[],
> = RACAriaTextFieldProps & {
  autoCapitalize?:
    | 'none'
    | 'off'
    | 'on'
    | 'sentences'
    | 'words'
    | 'characters'
    | undefined;
  onChange?: React.Dispatch<
    React.SetStateAction<string | string[] | undefined>
  >;
  name: FieldName<FieldSchema, FormSchema, FormError> | string;
  label?: string;
  type?: string;
};

export type ValidityStateProps = ValidityState;
