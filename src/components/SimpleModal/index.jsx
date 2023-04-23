import React, { useEffect } from "react";
import "./SimpleModal.css";

const SimpleModal = ({
  timeoutDelay,
  onTimeout,
  body,
  onOk,
  title,
  closeModal,
  okText = "Ok",
}) => {
  useEffect(() => {
    if (timeoutDelay) {
      setTimeout(() => {
        closeModal();
        onTimeout();
      }, timeoutDelay);
    }
  }, []);
  return (
    <div className="modal-backdrop">
      <div className="modal-content simple-modal">
        {title && <div className="modal-title">{title}</div>}
        <div className="modal-body">{body}</div>
        {!!onOk && (
          <section className="modal-footer">
            <button
              className="btn btn-small waves-effect indigo"
              onClick={closeModal}
            >
              Cancel
            </button>
            <button
              className="btn btn-small waves-effect indigo"
              onClick={onOk}
            >
              {okText}
            </button>
          </section>
        )}
      </div>
    </div>
  );
};

export default SimpleModal;
