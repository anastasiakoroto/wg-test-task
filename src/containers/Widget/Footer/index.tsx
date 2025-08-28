import Button from "../../../components/Button";
import styles from '../Widget.module.scss';

const Footer = ({ onClose, onSave }: { onClose: () => void, onSave: () => void }) => (
  <div className={styles.widgetFooter}>
    <Button 
      text="Save" 
      isPrimary 
      isSmall 
      onClick={onSave} 
    />
    <Button 
      text="Cancel" 
      isSmall 
      onClick={onClose} 
    />
  </div>
);

export default Footer;
