import React, { useEffect } from "react";
import Modal from "react-modal";
import s from "./ImageModal.module.css";
import { PartialPhoto } from "../ImagesApi/ImagesApi";
import { voidFn } from "../../types/global";
import { ImageInfo } from "../ImageCard/ImageCard";

Modal.setAppElement("#root");

export type ImageModalProps = {
  image: ImageInfo;
  isOpen: boolean;
  closeModal: voidFn;
};

const ImageModal = ({
  image: { url, description, name, location, portfolio, alt },
  isOpen,
  closeModal,
}: ImageModalProps) => {
  const googleMapsUrl: string = `https://www.google.com/maps/search/?q=${encodeURIComponent(
    location ?? ""
  )}`;

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeModal();
      }
    };

    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [closeModal]);

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      className={s.modalContent}
      overlayClassName={s.modalOverlay}
    >
      <div className={s.imageContainer}>
        <button onClick={closeModal} className={s.closeButton}>
          close
        </button>
        <img src={url} alt={alt} className={s.modalImage} />
      </div>
      <ul className={s.list}>
        {name && <li className={s.itemFirst}>Author: {name}</li>}
        {description && (
          <li className={s.itemThird}>
            <p className={s.description}>Description: {description}</p>
          </li>
        )}
        {location && (
          <li className={s.itemSecond}>
            <a href={googleMapsUrl} target="_blank" rel="noopener noreferrer">
              Made in: {location}
            </a>
          </li>
        )}
        {portfolio && (
          <li className={s.itemFour}>
            <a href={portfolio} target="_blank" rel="noopener noreferrer">
              Author Portfolio
            </a>
          </li>
        )}
      </ul>
    </Modal>
  );
};

export default ImageModal;
