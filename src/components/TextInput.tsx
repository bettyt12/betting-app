import React, { useEffect, useState } from 'react';

interface TextInputProps {
  name: string;
  label: string;
  onChangeHandler: (event: React.ChangeEvent<HTMLInputElement>) => void; 
  value: number | string;
  placeholder?: string; // Optional placeholder
  formValidation?: (name: string, value: number | string) => string | undefined; // Optional form validation function with optional return type (error message)
}

const TextInput: React.FC<TextInputProps> = ({
  name,
  label,
  onChangeHandler,
  value,
  placeholder = '0.0000000',
  formValidation,
}) => {
  const [valid, setValid] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    setValid((prev) => {
      if (formValidation) {
        const res = formValidation(name, value);
        if (res) {
          setErrorMessage(res);
          return false;
        }
      }
      return true;
    });
  // eslint-disable-next-line
  }, [value]);

  return (
    <div className='flex flex-col w-full'>
      <p className='text-white'>{label}</p>
      <div className='flex-grow mt-2'>
        <input
          disabled={!onChangeHandler}
          type='text'
          className={`w-full rounded-lg bg-accent-blue text-slate-400 text-sm border-[1px] disabled:border-slate-400 focus:outline-none py-2 md:py-3 px-3`}
          onChange={onChangeHandler}
          value={value}
          name={name}
          placeholder={placeholder}
        />
      </div>
      {!valid && <p className='text-primary-red text-[13px]'>{errorMessage}</p>}
    </div>
  );
};

export default TextInput;
