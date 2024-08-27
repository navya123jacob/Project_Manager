import React from 'react';

interface ConfirmationModalProps {
  show: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({ show, onConfirm, onCancel }) => {
  if (!show) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <p>Are you sure you want to delete this project?</p>
        <button 
          className="btn btn-danger" 
          onClick={onConfirm} 
          style={{ width: '120px' }} 
        >
          Yes, delete it
        </button>
        <button 
          className="btn btn-secondary mt-3" 
          onClick={onCancel} 
          style={{ width: '120px'}} 
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default ConfirmationModal;
