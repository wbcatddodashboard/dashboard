import React from 'react';

import { InputProvider } from './context/InputContext';
import useInput from './hooks/useInput';
import type { InputContextType, InputProps } from './Input.d';

function Input({
  value,
  onChange,
  placeholder = '',
  disabled = false,
  type = 'text',
  children,
  ...rest
}: InputProps) {
  const hookProps = {
    value,
    onChange,
    disabled,
    type,
  };
  const inputState = useInput(hookProps);

  const { isFocused, handleFocus, handleBlur, handleChange, handleClick } = inputState;

  const contextValue: InputContextType = {
    value,
    isChecked: inputState.isChecked,
    isFocused,
    disabled,
    type,
    placeholder,
    handleFocus,
    handleBlur,
    handleChange,
    handleClick,
  };

  return (
    <InputProvider value={contextValue}>
      <div {...rest}>{children ? children(contextValue) : null}</div>
    </InputProvider>
  );
}

export default Input;
