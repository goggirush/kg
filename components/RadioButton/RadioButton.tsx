import React from 'react';
import styles from './RadioButton.module.scss';

type RadioOption = {
  label: string;
  value: string;
};

type RadioButtonProps = {
    label: string;
  name: string;
  options: RadioOption[];
  selectedValue: string;
  onChange: (value: string) => void;
};

const RadioButton: React.FC<RadioButtonProps> = ({
  name,
  options,
  selectedValue,
  onChange,
  label
}) => {
  return (
    <div className={styles.radioGroup}>
    <label className={styles.label}>{label}</label>
      {options.map(option => (
        <label key={option.value} className={styles.radioLabel}>
          <input
            type="radio"
            name={name}
            value={option.value}
            checked={selectedValue === option.value}
            onChange={() => onChange(option.value)}
            className={styles.radioInput}
          />
          {option.label}
        </label>
      ))}
    </div>
  );
};

export default RadioButton;
