import { useCallback, useEffect, useState } from 'react';
import type { FC } from 'react';
import { observer } from 'mobx-react-lite';
import { reaction } from 'mobx';

import Search from './Search';
import Filter from './Filter';
import { FILTER_OPTIONS } from './Filter/config';
import Header from './Header';
import Footer from './Footer';
import Tags from './Tags';
import type { Tag as TagType } from '../../types/widget-types';
import { activeTagsStore, elementsStore } from '../../stores/store';
import styles from './Widget.module.scss';

interface WidgetProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (widgetTags: TagType[]) => void;
}

const Widget: FC<WidgetProps> = observer(({ isOpen, onClose, onSave }) => {
  const [searchValue, setSearchValue] = useState<string>('');
  const [filterValue, setFilterValue] = useState<string>(FILTER_OPTIONS[0].value);
  const [widgetTags, setWidgetTags] = useState<TagType[]>(activeTagsStore.activeTags);

  useEffect(() => {
    // Subscribe to changes in activeTagsStore.activeTags to keep widgetTags in sync
    const disposer = reaction(() => activeTagsStore.activeTags, (newActiveTags) => {
      setWidgetTags(newActiveTags);
    });

    return () => {
      setSearchValue('');
      setFilterValue(FILTER_OPTIONS[0].value);
      setWidgetTags(activeTagsStore.activeTags);
      disposer();
   };
  }, []);

  const generateOptions = useCallback(() => {
    const elements = elementsStore.elements
      .filter(element => 
        (filterValue === FILTER_OPTIONS[0].value || element.value > parseInt(filterValue)) &&
        (!searchValue || element.label.toLowerCase().includes(searchValue.toLowerCase()))
      )
      .map(element => ({ value: element.value.toString(), label: element.label }));
    return elements;
  }, [filterValue, searchValue]);

  const onItemChange = ({ value, label }: TagType) => {
    if (widgetTags.find(tag => tag.value === value)) {
      setWidgetTags(prev => prev.filter(tag => tag.value !== value));
    } else {
      setWidgetTags(prev => [...prev, { value, label }]);
    }
  };

  const onCancel = () => {
    setSearchValue('');
    setFilterValue(FILTER_OPTIONS[0].value);
    setWidgetTags(activeTagsStore.activeTags);
    onClose();
  };

  return isOpen && (
    <>
      <div className={styles.widgetContainer}>
        <Header onClose={onCancel} />
        <div className={styles.widgetFeatures}>
          <Search value={searchValue} onChange={e => setSearchValue(e.target.value)} />
          <Filter value={filterValue} onChange={e => setFilterValue(e.target.value)} />
        </div>
        <div className={styles.widgetOptionsContainer}>
        {generateOptions().map(option => {
          const selectedTag = widgetTags.find(tag => tag.value === option.value);
          return (
            <div key={option.value} className={styles.widgetOption}>
              <input
                id={`checkbox-${option.value}`}
                type="checkbox"
                className={styles.widgetCheckbox}
                checked={!!selectedTag}
                disabled={widgetTags.length === 3 && !selectedTag}
                value={option.value}
                onChange={() => onItemChange(option)}
              />
              <label htmlFor={`checkbox-${option.value}`}>{option.label}</label>
            </div>
          );
        })} 
        </div>
        <Tags tags={widgetTags} onClose={onItemChange} />
        <Footer onClose={onCancel} onSave={() => onSave(widgetTags)}  />
      </div>
      {/* The logic below was added based on default projects requirements */}
      <div className={styles.overlay} onClick={onCancel} />
    </>
  );
});

export default Widget;
