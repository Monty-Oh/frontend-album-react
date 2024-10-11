
import "components/modal/Modal.css";

export default function Modal({ isOpen, onClose, content }) {
    if (!isOpen) return null;

    return (
        <div className="modal-container" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <button className="modal-close-button" onClick={onClose}>X</button>
                <img
                    src={content.src}
                    alt={content.description}
                />
                <div className="modal-description">
                    {content.description}
                </div>
            </div>
        </div>
    )
}
