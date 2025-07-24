import React from 'react';
import styles from './Input.module.scss';

type InputProps = {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  type?: string;
  styled?: boolean;
};

const Input: React.FC<InputProps> = ({
  label,
  value,
  onChange,
  styled = true,
  placeholder = '',
  type = 'text',
}) => {
  return (
    <div className={styled && styles.inputField}>
      {label &&
      <label className={styles.label}>{label}</label>
      }
      <input
        className={styles.input}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
    </div>
  );
};

export default Input;
