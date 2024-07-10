import React from 'react';

const Modal = ({ isVisible, onClose, children }) => {
  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded shadow-md">
        <button onClick={onClose} className="mb-4 font-bold text-gray-600">
          Close
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;