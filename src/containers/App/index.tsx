import { useEffect, useState } from 'react'

import Tag from '../../components/Tag';
import Button from '../../components/Button';
import Widget from '../Widget';
import type { Tag as TagType } from '../../types/widget-types';
import styles from './App.module.scss';

const App = () => {
  const [tagCount, setTagCount] = useState(0);
  const [isWidgetOpen, setIsWidgetOpen] = useState(false);
  const [tags, setTags] = useState<TagType[]>([]);

  useEffect(() => {
    setTagCount(tags.length);
  }, [tags]);

  const onTagClose = (value: string) => {
    setTags(prev => prev.filter(item => item.value !== value));
  };

  const onWidgetClose = () => {
    setIsWidgetOpen(false);
  };

  return (
    <div className={styles.mainContainer}>
      <h1>Select items</h1>
      <div>
        <div className={styles.selectedTags}>
          <h3>
            You currently have
            {' '}
            <span className={styles.tagCount}>{tagCount}</span>
            {' '}
            selected items
          </h3>
          <div className={styles.tags}>
            {tags.map(tag => (
              <Tag label={tag.label} value={tag.value} onClose={onTagClose} />
            ))}
          </div>
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
