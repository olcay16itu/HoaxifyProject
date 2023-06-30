import React from 'react';

const ButtonWithProgress = (props) => {
  const {wait, disabled , text, onClick} = props
  return (
    <div>
      <button disabled={disabled} className="btn btn-primary mb-3"
              onClick={onClick}>{
        wait && <span disabled={wait} className="spinner-border spinner-border-sm" role="status"
                      aria-hidden="true"></span>
      }{text}
      </button>
    </div>
  );
};

export default ButtonWithProgress;