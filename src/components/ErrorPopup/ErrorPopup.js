import React from "react";
import closeIcon from "../../images/closeIcon.svg";
import './ErrorPopup.css';

function ErrorPopup({ text, isOpen, onClose }) {
  return (
    <div className={`error-popup ${isOpen && "error-popup_opened"}`}>
      <div className="error-popup__container">
      
          <h2 className="error-popup__text">{text}</h2>
          <button
            type="button"
            className="error-popup__close-button"
            aria-label="Close"
            onClick={onClose}
          ><img src={closeIcon} alt="Кнопка Закрыть" aria-label="Close" /></button>
        
      </div>
    </div>
  );
}

export default ErrorPopup;