import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGears } from '@fortawesome/free-solid-svg-icons';


const SettingsButton = ({onClick}) => {


  return (
    <div onClick={onClick} style={{cursor: 'pointer'}}>
        <FontAwesomeIcon color="lightgrey" width="16" height="16" icon={faGears} />
    </div>
  );
};

export default SettingsButton;
