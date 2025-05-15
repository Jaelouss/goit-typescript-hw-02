import { useState } from "react";
import ImageGallery from "../ImageGallery/ImageGallery";
import { notify } from "../Toast/Toast";
import SearchBar from "../SearchBar/SearchBar";
import { Toaster } from "react-hot-toast";
import { BarLoader } from "react-spinners";
import PageOf from "../PageOf/PageOf";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import LoadMoreBtn from "../LoadMoreBtn/LoadMoreBtn";
import ImageModal from "../ImageModal/ImageModal";
import s from "./App.module.css";
import { StringVoidFn, voidFn } from "../../types/global";
import { PartialPhoto, imageSearch } from "../ImagesApi/ImagesApi";

export type HandleSearch = (topic: string, page: number) => Promise<void>;

export type OpenModal = (arg: PartialPhoto) => void;

const App = () => {
  const [query, setQuery] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [imagesData, setImagesData] = useState<PartialPhoto[] | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [maxPage, setMaxPage] = useState<number>(1);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [imageInfo, setImageInfo] = useState<PartialPhoto | null>(null);

  const handleSubmit: StringVoidFn = (userQuery) => {
    setQuery(userQuery);
    setCurrentPage(1);
    setImagesData([]);
    handleSearch(userQuery, 1);
  };

  const handleSearch: HandleSearch = async (topic, page) => {
    try {
      setError(false);
      setLoading(true);
      const { results, totalPages } = await imageSearch(topic, page);

      setImagesData((prevImages) => [...(prevImages ?? []), ...results]);
      setMaxPage(totalPages);

      if (results.length === 0) {
        notify("error", "Nothing was found on your request");
        return;
      }
    } catch (error) {
      notify("error", "Something went wrong. Try again");
      setError(true);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const handleNextPage: voidFn = () => {
    if (currentPage < maxPage) {
      const nextPage = currentPage + 1;
      setCurrentPage(nextPage);

      window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: "smooth",
      });

      handleSearch(query, nextPage);
    }
  };
  const openModal: OpenModal = (info) => {
    setShowModal(true);
    setImageInfo(info);
  };

  const closeModal: voidFn = () => {
    setShowModal(false);
    setImageInfo({});
  };

  return (
    <>
      <SearchBar onSubmit={handleSubmit} />
      <Toaster />
      {loading && (
        <div className={s.loader}>
          <BarLoader width="300px" />
        </div>
      )}
      {error && <ErrorMessage />}
      {imagesData != null && imagesData.length > 0 && (
        <ImageGallery gallery={imagesData} openModal={openModal} />
      )}
      {currentPage >= 1 && (
        <div className={s.panel}>
          <PageOf currentPage={currentPage} maxPage={maxPage} />
          <LoadMoreBtn
            nextPage={handleNextPage}
            currentPage={currentPage}
            maxPage={maxPage}
          />
        </div>
      )}
      {imageInfo && (
        <ImageModal
          image={imageInfo}
          isOpen={showModal}
          closeModal={closeModal}
        />
      )}
    </>
  );
};

export default App;
