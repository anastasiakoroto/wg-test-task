import type { FC } from "react";

import styles from "../Widget.module.scss";
import { FILTER_OPTIONS } from "./config";

interface FilterProps {
  value: string | undefined;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const Filter: FC<FilterProps> = ({ value, onChange }) => {
  return (
    <div className={styles.featureContainer}>
      Filter
      <select value={value} onChange={onChange}>
        {FILTER_OPTIONS.map(option => (
          <option key={option.key} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Filter;
