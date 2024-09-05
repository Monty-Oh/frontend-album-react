import React, {useState} from "react";
import "components/content/ContentListItem.css";
import Modal from "../modal/Modal";

export default function ContentListItem({content}) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const onClickImage = function()  {
        setIsModalOpen(true);
    }
    const onCloseImage = function() {
        setIsModalOpen(false);
    }

    return (
        <div className="content-list-item-container">
            <div className="item-container">
                        <img src={content.src}
                             alt={content.description}
                             onClick={onClickImage}
                        />
            </div>
            <Modal isOpen={isModalOpen} onClose={onCloseImage} content={content} />
        </div>
    )
}