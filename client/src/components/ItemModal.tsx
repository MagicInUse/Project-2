import React, { ReactNode } from 'react';

interface ItemModalProps {
  title: string;
  body: ReactNode;
  // equipButton: string;
  exitButton: string;
  show: boolean;
  // onEquip: () => void;
  onClose: () => void;
}

// TODO: Implement the ItemModal component
// const ModalComponent: React.FC<ItemModalProps> = ({ title, body, equipButton, exitButton, show, onEquip, onClose }) => {
  const ModalComponent: React.FC<ItemModalProps> = ({ title, body, exitButton, show, onClose }) => {
  if (!show) {
    return null;
  }

  return (
    <>
      <div className="modal-backdrop show"></div>
      <div className="modal d-block" tabIndex={-1} role="dialog">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">{title}</h5>
              <button type="button" className="btn-close ms-auto" onClick={onClose}></button>
            </div>
            <div className="modal-body">{body}</div>
            <div className="modal-footer">
              <button type="button" className="btn btn-dark" onClick={onClose}>
                {exitButton}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ModalComponent;