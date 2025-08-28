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
      className={styles.buttonContainer}
      key={text} // can be with spaces?
      style={{
        backgroundColor: isPrimary ? "#729B79" : "#475B63",
        width: isSmall ? "100px" : "200px",
      }}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default Button;
