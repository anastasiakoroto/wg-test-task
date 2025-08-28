import React, { useCallback, useEffect } from 'react';
import type { FC } from 'react';

import Search from './Search';
import Filter from './Filter';
import { FILTER_OPTIONS } from './Filter/config';
import Header from './Header';
import Footer from './Footer';

import Tag from '../../components/Tag';
import styles from './Widget.module.scss';
import type { Tag as TagType } from '../../types/widget-types';
import Tags from './Tags';




interface WidgetProps {
  activeTags: TagType[];
  isOpen: boolean;
  onClose: () => void;
  onSave: (widgetTags: TagType[]) => void;
}

const Widget: FC<WidgetProps> = ({ activeTags, isOpen, onClose, onSave }) => {
  const [searchValue, setSearchValue] = React.useState<string>('');
  const [filterValue, setFilterValue] = React.useState<string>(FILTER_OPTIONS[0].value);
  const [widgetTags, setWidgetTags] = React.useState<TagType[]>(activeTags);

  const generateOptions = useCallback(() => {
    const elements = [];
    for (let i = 0; i < 300; i++) {
      const elementNumber = i + 1;
      const label = `Element ${elementNumber}`;
      if (
        (filterValue !== "-1" && elementNumber <= parseInt(filterValue)) ||
        (searchValue && !label.toLowerCase().includes(searchValue.toLowerCase()))
      ) {
        continue;
      }
      elements.push({ value: i.toString(), label: `Element ${i + 1}`});
    }
    return elements;
  }, [filterValue, searchValue]);

  const onCheckboxChange = ({ value, label }: TagType) => {
    if (widgetTags.find(tag => tag.value === value)) {
      setWidgetTags(prev => prev.filter(tag => tag.value !== value));
    } else {
      setWidgetTags(prev => [...prev, { value, label }]);
    }
  };

  const onCrossClick = () => {
    setSearchValue('');
    setFilterValue(FILTER_OPTIONS[0].value);
    setWidgetTags(activeTags);
    onClose();
  };

  return isOpen && (
    <>
      <div className={styles.widgetContainer}>
        <Header onClose={onCrossClick} />
        <div className={styles.widgetFeatures}>
          <Search value={searchValue} onChange={e => setSearchValue(e.target.value)} />
          <Filter value={filterValue} onChange={e => setFilterValue(e.target.value)} />
        </div>
        <div className={styles.widgetOptionsContainer}>
        {generateOptions().map(option => (
            <div key={option.value} className={styles.widgetOption}>
              <input
                className={styles.widgetCheckbox}
                checked={!!widgetTags.find(tag => tag.value === option.value)}
                type="checkbox" 
                id={option.value} 
                value={option.value}
                onChange={() => onCheckboxChange(option)}
                disabled={widgetTags.length === 3 && !widgetTags.find(tag => tag.value === option.value)} 
              />
              <span>{option.label}</span>
            </div>
        ))} 
        </div>
        <Tags tags={widgetTags} onClose={onCheckboxChange} />
        <Footer onClose={onCrossClick} onSave={() => onSave(widgetTags)}  />
      </div>
      <div className={styles.overlay} onClick={onClose}></div>
    </>
  );
}

export default Widget;
