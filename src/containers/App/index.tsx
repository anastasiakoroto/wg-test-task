import { useEffect, useState } from 'react'
// import './App.css'
import Tag from '../../components/Tag';
import Button from '../../components/Button';
import Widget from '../Widget';
import styles from './App.module.scss';
// import Button from './components/Button';
// import Widget from './containers/Widget';
// import Tag from './components/Tag';

const App = () => {
  const [tagCount, setTagCount] = useState(0);
  const [isWidgetOpen, setIsWidgetOpen] = useState(false);
  const [tags, setTags] = useState([]);

  const onCloseTag = (value) => {
    setTags(prev => prev.filter(item => item.value !== value));
    };

  useEffect(() => {
    setTagCount(tags.length);
  }, [tags]);

  const onWidgetClose = () => {
    setIsWidgetOpen(false);
  };

  return (
    <div className={styles.mainContainer}>
      <h1>Select items</h1>
      <div>
        <h3>You currently have {tagCount} selected items</h3>
        <div className={styles.tags}>
          {tags.map(tag => (
            <Tag label={tag.label} value={tag.value} onClose={onCloseTag} />
          ))}
        </div>
        <Button text="Change my choice" isPrimary onClick={() => setIsWidgetOpen(true)} />
      </div>
      <Widget
        activeTags={tags}
        isOpen={isWidgetOpen}
        onClose={onWidgetClose}
        onSave={tags => {
          setTags(tags);
          onWidgetClose();
        }}
      />
    </div>
  );
}

export default App;
