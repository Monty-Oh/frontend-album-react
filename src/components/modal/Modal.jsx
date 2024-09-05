import "components/modal/Modal.css";

export default function Modal({ isOpen, onClose, content }) {
    if (!isOpen) return null;

    return (
        <div className="modal-container">
            <div className="modal-content">
                <img
                    src={content.src}
                    alt={content.description}
                    onClick={onClose}
                />
            </div>
        </div>
    )
}