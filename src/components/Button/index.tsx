import type { FC } from "react";

import styles from "./Button.module.scss";

interface ButtonProps {
  children: React.ReactNode;
  onClick: () => void;
  isPrimary?: boolean;
  isSmall?: boolean;
}

const Button: FC<ButtonProps> = ({ isPrimary, isSmall, children, onClick }) => {
  return (
    <button
      className={`
        ${styles.buttonContainer}
        ${isPrimary ? styles.primary : styles.secondary}
        ${isSmall ? styles.small : styles.large}
      `}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
