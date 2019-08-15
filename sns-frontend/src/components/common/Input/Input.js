import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const InputModule = ({
  value,
  onChange,
  onBlur,
  name,
  placeholder,
  type = 'text',
  icon,
  maxLength,
  target,
  error,
  message,
  readOnly,
  theme = "input-style" 
}) => {    
    
  return (
    <div className={theme}>
    {
        icon &&
      <div>
        <FontAwesomeIcon icon={icon} />
      </div>
    }
      <input        
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        name={name}
        maxLength={maxLength}        
        readOnly={readOnly}
        required={true}
      />
      <div className="error-alert">
        {error && message}
      </div>
    </div>   
  );
};

export default InputModule;
