import type { FC } from "react";

import styles from "../Widget.module.scss";

interface SearchProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Search: FC<SearchProps> = ({ value, onChange }) => {
  return (
    <div className={styles.featureContainer}>
      Search
      <input 
        id="search"
        className={styles.searchInput}
        type="text"
        placeholder="Element search"
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default Search;
