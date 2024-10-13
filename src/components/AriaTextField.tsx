import { clsx } from 'clsx';
import React from 'react';

import { useAriaTextField } from '~/hooks/useAriaTextField/useAriaTextField';
import { TextFieldProps } from '~/types';

export function AriaTextField(props: TextFieldProps): React.ReactNode {
  const {
    labelProps,
    inputProps,
    errorMessageProps,
    descriptionProps,
    isInvalid,
  } = useAriaTextField(props);

  return (
    <div className={clsx('mb-4')}>
      <label {...labelProps}>{labelProps.children}</label>
      <input
        {...inputProps}
        className={clsx(
          'mt-1 block w-full rounded-md border shadow-sm focus:ring-blue-500 focus:border-blue-500',
          isInvalid && 'border-red-500',
          !isInvalid && 'border-gray-300',
        )}
      />
      {descriptionProps?.children ? (
        <div {...descriptionProps} className='text-gray-500 text-sm mt-1' />
      ) : null}
      {errorMessageProps?.children ? (
        <div {...errorMessageProps} className='text-red-600 text-sm mt-1' />
      ) : null}
    </div>
  );
}
