import React from "react";
import styles from "./Button.module.scss";

type ButtonProps = {
  text: string;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
  fullWidth?: boolean;
  variant?: 'primary' | 'secondary' | 'soft' | 'danger' | 'softSecondary';
};

const Button: React.FC<ButtonProps> = ({
  text,
  onClick,
  disabled,
  className,
  fullWidth,
  variant = 'primary'
}) => {
  const combinedClassName = [
    styles.container,
    styles[variant],
    fullWidth ? styles.fullWidth : '',
    className || ''
  ].join(' ').trim();

  return (
    <button className={combinedClassName} onClick={onClick} disabled={disabled}>
      {text}
    </button>
  );
};

export default Button;
