import React, { ButtonHTMLAttributes } from 'react';

import { Container } from './styles';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
}

const Button: React.FC<ButtonProps> = ({ children, loading, ...rest }) => {
  return (
    <Container>
      <button type="button" {...rest}>
        {loading ? 'Carregando...' : children}
      </button>
    </Container>
  );
};
export default Button;
