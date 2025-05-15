import React from "react";
import s from "./PageOf.module.css";
import { NumericProps } from "../../types/global";

const PageOf = ({ currentPage, maxPage }: NumericProps) => {
  return (
    <span className={s.page}>
      Page {currentPage} of {maxPage}
    </span>
  );
};

export default PageOf;
