import type { FC } from "react";

import styles from "./Button.module.scss";

interface ButtonProps {
  text: string;
  onClick: () => void;
  isPrimary?: boolean;
  isSmall?: boolean;
}

const Button: FC<ButtonProps> = ({ isPrimary, isSmall, text, onClick }) => {
  return (
    <button
      className={`
        ${styles.buttonContainer}
        ${isPrimary ? styles.primary : styles.secondary}
        ${isSmall ? styles.small : styles.large}
      `}
      key={text} // can be with spaces?
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default Button;
