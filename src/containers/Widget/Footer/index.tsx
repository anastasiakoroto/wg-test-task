import Button from "../../../components/Button";
import styles from '../Widget.module.scss';

const Footer = ({ onClose, onSave }: { onClose: () => void, onSave: () => void }) => (
  <div className={styles.widgetFooter}>
    <Button isPrimary isSmall onClick={onSave}>
      Save
    </Button>
    <Button isSmall onClick={onClose}>
      Cancel
    </Button>
  </div>
);

export default Footer;
