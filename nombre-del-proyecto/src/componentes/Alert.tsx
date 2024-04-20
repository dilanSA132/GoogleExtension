import React, { useState } from 'react';

export interface AlertProps {
  type: 'success' | 'info' | 'warning' | 'error';
  message: string;
}

const Alert: React.FC<AlertProps> = ({ type, message }) => {
  const [visible, setVisible] = useState(true);

  const handleClose = () => {
    setVisible(false);
  };

  return (
    <>
      {visible && (
        <div className={`alert alert-${type} items-center mr-2 mt-1 bg-purple-500 text-white`} role="alert">
          {message}
          <button type="button" className="close" onClick={handleClose}>
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
      )}
    </>
  );
};

export default Alert;
