import React from "react";
import s from "./SearchBar.module.css";
import { notify } from "../Toast/Toast";
import { StringVoidFn } from "../../types/global";

export type SearchBarProps = {
  onSubmit: StringVoidFn;
};

export type HandleSubmit = (arg: React.FormEvent<HTMLFormElement>) => void;

const SearchBar = ({ onSubmit }: SearchBarProps) => {
  const handleSubmit: HandleSubmit = (evt) => {
    evt.preventDefault();
    const form = evt.currentTarget;
    const input = form.elements.namedItem("userQuery");

    if (input && input instanceof HTMLInputElement) {
      const userQuery = input.value.trim();
      if (userQuery === "" || userQuery.length < 2) {
        notify("error", "The request should consist of at least 2 letters");
        return;
      }
      onSubmit(userQuery);
      form.reset();
    }
  };

  return (
    <header className={s.header}>
      <form onSubmit={handleSubmit}>
        <input
          className={s.input}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          name="userQuery"
        />
        <button className={s.button} type="submit">
          Search
        </button>
      </form>
    </header>
  );
};

export default SearchBar;
