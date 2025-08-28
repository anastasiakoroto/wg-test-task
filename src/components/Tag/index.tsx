import type { FC } from "react";

import styles from "./Tag.module.scss";
import CloseIcon from '../../assets/cross_dark.svg';

interface TagProps {
  label: string;
  value: string;
  onClose: (value: string) => void;
}

const Tag: FC<TagProps> = ({ label, value, onClose }) => (
  <div className={styles.tagContainer} key={value}>
    {label}
    <img
      className={styles.tagCloseIcon}
      src={CloseIcon}
      alt="Close icon"
      onClick={() => onClose(value)}
    />
  </div>
);

export default Tag;
