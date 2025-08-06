import { useState, useEffect } from 'react';

import type { UseInputProps } from '../Input.d';

export default function useInput({
  value,
  onChange,
  disabled = false,
  type = 'text',
}: UseInputProps) {
  const [isFocused, setIsFocused] = useState(false);
  const [isChecked, setIsChecked] = useState(type === 'checkbox' ? !!value : false);

  useEffect(() => {
    if (type === 'checkbox') {
      setIsChecked(!!value);
    }
  }, [value, type]);

  const handleFocus = () => {
    if (!disabled) {
      setIsFocused(true);
    }
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  const handleChange = (newValue: string) => {
    if (!disabled && type !== 'checkbox') {
      onChange(newValue);
    }
  };

  const handleClick = () => {
    if (!disabled && type === 'checkbox') {
      setIsChecked(!isChecked);
      onChange(!isChecked);
    }
  };

  return {
    isFocused,
    isChecked,
    handleFocus,
    handleBlur,
    handleChange,
    handleClick,
  };
}
