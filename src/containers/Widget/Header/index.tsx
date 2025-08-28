import CloseIcon from '../../../assets/cross.svg';
import styles from '../Widget.module.scss';

const Header = ({ onClose }: { onClose: () => void }) => (
  <div className={styles.widgetHeader}>
    <span className={styles.widgetTitle}>Select items</span>
    <div className={styles.widgetCloseButton}>
      <img 
        src={CloseIcon} 
        alt="closeIcon" 
        onClick={onClose} 
      />
    </div>
  </div>
);

export default Header;
