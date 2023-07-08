import React from 'react';

const ButtonWithProgress = (props) => {
  const {wait, disabled , text, onClick,className} = props
  return (
      <button disabled={disabled} className={className||"btn btn-primary mb-3"}
              onClick={onClick}>{
        wait && <span disabled={wait} className="spinner-border spinner-border-sm" role="status"
                      aria-hidden="true"></span>
      }{text}
      </button>
  );
};

export default ButtonWithProgress;