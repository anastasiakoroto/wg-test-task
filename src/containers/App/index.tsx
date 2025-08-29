import { useState } from 'react'
import { observer } from 'mobx-react-lite';

import Tag from '../../components/Tag';
import Button from '../../components/Button';
import Widget from '../Widget';
import { activeTagsStore } from '../../stores/store';
import styles from './App.module.scss';

const App = observer(() => {
  const [isWidgetOpen, setIsWidgetOpen] = useState(false);

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
            <span className={styles.tagCount}>{activeTagsStore.activeTagsCount}</span>
            {' '}
            selected {activeTagsStore.activeTagsCount === 1 ? 'item' : 'items'}
          </h3>
          <div className={styles.tags}>
            {activeTagsStore.activeTags.map(tag => (
              <Tag 
                key={`active-tag-${tag.value}`}
                label={tag.label}
                value={tag.value}
                onClose={activeTagsStore.closeTag}
              />
            ))}
          </div>
        </div>
        <Button isPrimary onClick={() => setIsWidgetOpen(true)}>
          Change my choice
        </Button>
      </div>
      <Widget
        isOpen={isWidgetOpen}
        onClose={onWidgetClose}
        onSave={tags => {
          activeTagsStore.setActiveTags(tags);
          onWidgetClose();
        }}
      />
    </div>
  );
});

export default App;
