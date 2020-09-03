import { useState } from 'react';

export default function (defaultValue = '', validator) {
  const hasValidator = typeof validator === 'function';
  const [value, setValue] = useState(defaultValue);
  const [className, setClassName] = useState('');
  const onChange = (evt) => {
    const { value } = evt.target;
    if (hasValidator) {
      const isValid = validator(value);
      setClassName(`${isValid || value === '' ? 'valid' : 'invalid'}`);
    }
    setValue(value);
  };

  return { value, onChange, className };
}
