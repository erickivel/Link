import React, { InputHTMLAttributes, useEffect, useRef } from 'react';

import { useField } from '@unform/core';

import { Container } from './styles';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  textArea?: boolean;
}

const Input: React.FC<InputProps> = ({ name, textArea, ...rest }) => {
  const inputRef = useRef(null);

  const { fieldName, defaultValue, registerField, error } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value',
    });
  }, [fieldName, registerField]);

  return (
    <Container>
      {textArea ? (
        <textarea
          maxLength={120}
          id={fieldName}
          ref={inputRef}
          defaultValue={defaultValue}
          placeholder="Escreva um recado (aparecerá para outros usuários)"
        />
      ) : (
        <>
          <input
            type="text"
            id={fieldName}
            ref={inputRef}
            defaultValue={defaultValue}
            {...rest}
          />

          {error && <span>{error}</span>}
        </>
      )}
    </Container>
  );
};

export default Input;
