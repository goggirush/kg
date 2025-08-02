import React, { useState } from 'react';
import styles from './ConnectionSettings.module.scss';


const ConnectionSettings: React.FC<Props> = ({  }) => {

  
  const [endpoint, setEndpoint] = useState(process.env.NEXT_PUBLIC_STARDOG_ENDPOINT);
  const [database, setDatabase] = useState('');
  const [username, setUsername] = useState(process.env.NEXT_PUBLIC_STARDOG_USERNAME);
  const [password, setPassword] = useState('');
  const [reasoning, setReasoning] = useState(true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    //onSave({ endpoint, database, username, password, reasoning });
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <label>Stardog Endpoint</label>
      <input type="text" value={endpoint} onChange={(e) => setEndpoint(e.target.value)} />

      <label>Database Name</label>
      <input type="text" value={database} onChange={(e) => setDatabase(e.target.value)} />

      <label>Username</label>
      <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />

      <label>Password</label>
      <input disabled type="password" value={'***********'} onChange={(e) => setPassword(e.target.value)} />

      <label className={styles.checkbox}>
        <input type="checkbox" checked={reasoning} onChange={(e) => setReasoning(e.target.checked)} />
        Enable Reasoning
      </label>

      <div className={styles.buttons}>
        <button type="submit">Save</button>
      </div>
    </form>
  );
};

export default ConnectionSettings;