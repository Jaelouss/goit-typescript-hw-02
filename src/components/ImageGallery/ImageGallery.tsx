import React from "react";
import ImageCard from "../ImageCard/ImageCard";
import s from "./ImageGallery.module.css";
import { PartialPhoto } from "../ImagesApi/ImagesApi";
import { OpenModal } from "../App/App";

export type ImageGalleryProps = {
  gallery: PartialPhoto[];
  openModal: OpenModal;
};

const ImageGallery = ({ gallery, openModal }: ImageGalleryProps) => {
  return (
    <>
      <ul className={s.list}>
        {gallery.map((image) => (
          <li className={s.item} key={image.id}>
            <ImageCard image={image} openModal={openModal} />
          </li>
        ))}
      </ul>
    </>
  );
};
export default ImageGallery;
