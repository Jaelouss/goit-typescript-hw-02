import React from "react";
import s from "./LoadMoreBtn.module.css";
import { voidFn } from "../../types/global";

export type LoadMoreBtnProps = {
  nextPage: voidFn;
  currentPage: number;
  maxPage: number;
};

const LoadMoreBtn = ({ nextPage, currentPage, maxPage }: LoadMoreBtnProps) => {
  return (
    <button
      className={s.button}
      onClick={nextPage}
      disabled={currentPage >= maxPage}
    >
      Load more
    </button>
  );
};

export default LoadMoreBtn;
