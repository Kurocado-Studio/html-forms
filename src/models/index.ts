import get from 'lodash-es/get';
import React from 'react';

import {
  DescriptionProps,
  ErrorMessageProps,
  InputProps,
  LabelProps,
  ValidityStateProps,
} from '../types';

export class AriaLabel implements LabelProps {
  children = null;
  required = false;
  htmlFor = '';

  public static create = (labelProps?: Partial<LabelProps>): LabelProps => {
    const ariaLabel = new AriaLabel();

    return {
      ...labelProps,
      children: get(labelProps, ['children'], ariaLabel.children),
      htmlFor: get(labelProps, ['htmlFor'], ariaLabel.htmlFor),
      required: get(labelProps, ['required'], ariaLabel.required),
    };
  };
}

export class AriaInput implements InputProps {
  'aria-invalid' = false;
  ref = { current: null };

  public static create = (
    inputProps?: Partial<InputProps> & {
      ref?: React.Ref<HTMLInputElement>;
    },
  ): InputProps => {
    const ariaInput = new AriaInput();

    return {
      ...inputProps,
      ref: get(inputProps, ['ref'], ariaInput.ref),
      'aria-invalid': get(
        inputProps,
        ['aria-invalid'],
        ariaInput['aria-invalid'],
      ),
    };
  };
}

export class AriaDescription implements DescriptionProps {
  id = '';

  public static create = (
    descriptionProps?: Partial<DescriptionProps>,
  ): DescriptionProps => {
    const ariaDescription = new AriaDescription();

    return {
      ...descriptionProps,
      id: get(descriptionProps, ['id'], ariaDescription.id),
    };
  };
}

export class AriaErrorMessage implements ErrorMessageProps {
  id = '';
  children = null;

  public static create = (
    descriptionProps?: Partial<ErrorMessageProps>,
  ): ErrorMessageProps => {
    const ariaErrorMessage = new AriaErrorMessage();

    return {
      ...descriptionProps,
      id: get(descriptionProps, ['id'], ariaErrorMessage.id),
      children: get(descriptionProps, ['children'], ariaErrorMessage.children),
    };
  };
}

export class AriaValidityState implements ValidityStateProps {
  badInput = false;
  customError = false;
  patternMismatch = false;
  rangeOverflow = false;
  rangeUnderflow = false;
  stepMismatch = false;
  tooLong = false;
  tooShort = false;
  typeMismatch = false;
  valid = true;
  valueMissing = false;
  id = '';
  children = null;

  public static create = (
    validityStateProps?: Partial<ValidityStateProps>,
  ): ValidityStateProps => {
    const ariaValidityState = new AriaValidityState();

    return {
      ...validityStateProps,
      badInput: get(
        validityStateProps,
        ['badInput'],
        ariaValidityState.badInput,
      ),
      customError: get(
        validityStateProps,
        ['customError'],
        ariaValidityState.customError,
      ),
      patternMismatch: get(
        validityStateProps,
        ['patternMismatch'],
        ariaValidityState.patternMismatch,
      ),
      rangeOverflow: get(
        validityStateProps,
        ['rangeOverflow'],
        ariaValidityState.rangeOverflow,
      ),
      rangeUnderflow: get(
        validityStateProps,
        ['rangeUnderflow'],
        ariaValidityState.rangeUnderflow,
      ),
      stepMismatch: get(
        validityStateProps,
        ['stepMismatch'],
        ariaValidityState.stepMismatch,
      ),
      tooLong: get(validityStateProps, ['tooLong'], ariaValidityState.tooLong),
      tooShort: get(
        validityStateProps,
        ['tooShort'],
        ariaValidityState.tooShort,
      ),
      typeMismatch: get(
        validityStateProps,
        ['typeMismatch'],
        ariaValidityState.typeMismatch,
      ),
      valid: get(validityStateProps, ['valid'], ariaValidityState.valid),
      valueMissing: get(
        validityStateProps,
        ['valueMissing'],
        ariaValidityState.valueMissing,
      ),
    };
  };
}
