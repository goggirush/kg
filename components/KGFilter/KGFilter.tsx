import React, { useState } from 'react';
import styles from './KGFilter.module.scss';
import Toggle from '../Toggle/Toggle.tsx';

type Props = {
  showInferred: boolean;
  setShowInferred: (value: boolean) => void;
  showLiterals: boolean;
  setShowLiterals: (value: boolean) => void;
};

const KGFilter = ({ showInferred, setShowInferred, visibleNodeTypes, toggleNodeType }: Props) => {
  const [open, setOpen] = useState(false);

  return (
    <div className={styles.container}>
      <span className={styles.trigger} onClick={() => setOpen((prev) => !prev)}>
        Filter ▾
      </span>

      {open && (
        <div className={styles.panel}>
          <h5>Display</h5>
          <Toggle
            checked={showInferred}
            onChange={setShowInferred}
            label="Show inferals"
          />
          <Toggle
            label="Show Classes"
            checked={visibleNodeTypes.has('class')}
            onChange={() => toggleNodeType('class')}
          />
          <Toggle
            label="Show Individuals"
            checked={visibleNodeTypes.has('individual')}
            onChange={() => toggleNodeType('individual')}
          />
          <Toggle
            label="Show Literals"
            checked={visibleNodeTypes.has('literal')}
            onChange={() => toggleNodeType('literal')}
          />
        </div>
      )}
    </div>
  );
};

export default KGFilter;
