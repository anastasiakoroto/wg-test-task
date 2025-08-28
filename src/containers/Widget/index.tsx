import type { FC } from 'react';

import CloseIcon from '../../assets/cross.svg';
import Button from '../../components/Button';
import styles from './Widget.module.scss';
import Search from './Search';
import Filter from './Filter';
import React, { useCallback, useEffect } from 'react';
import { FILTER_OPTIONS } from './Filter/config';
import Tag from '../../components/Tag';

interface WidgetProps {
  activeTags: { value: string; label: string }[];
  isOpen: boolean;
  onClose: () => void;
  onSave: (widgetTags: { label: string; value: string }) => void;
}

const Widget: FC<WidgetProps> = ({ activeTags, isOpen, onClose, onSave }) => {
  const [searchValue, setSearchValue] = React.useState('');
  const [filterValue, setFilterValue] = React.useState(FILTER_OPTIONS[0].value);
  const [widgetTags, setWidgetTags] = React.useState<{ value: string; label: string }[]>(activeTags);

  useEffect(() => {
    console.log({filter: filterValue, searchValue})
  }, [filterValue, searchValue]);

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

  const onCheckboxChange = (value: string, label: string) => {
    if (widgetTags.find(tag => tag.value === value)) {
      setWidgetTags(prev => prev.filter(tag => tag.value !== value));
    } else {
      setWidgetTags(prev => [...prev, { value, label }]);
    }
  };

  return isOpen && (
    <>
    <div className={styles.widgetContainer}>
      <div className={styles.widgetHeader}>
        <span>Select items</span>
        <div className={styles.widgetCloseButton}>
          <img src={CloseIcon} alt="closeIcon" onClick={onClose} />
        </div>
      </div>

      <div className={styles.widgetFeatures}>
        <Search value={searchValue} onChange={e => setSearchValue(e.target.value)} />
        <Filter value={filterValue} onChange={e => {
          console.log(e.target);
          setFilterValue(e.target.value);
          }} />
      </div>

      <div className={styles.widgetOptionsContainer}>
      {generateOptions().map(option => (
          <div key={option.value} className={styles.widgetOption}>
            <input
              checked={!!widgetTags.find(tag => tag.value === option.value)}
              type="checkbox" 
              id={option.value} 
              value={option.value}
              onChange={() => onCheckboxChange(option.value, option.label)}
              disabled={widgetTags.length === 3 && !widgetTags.find(tag => tag.value === option.value)} 
            />
            <span>{option.label}</span>
          </div>
      ))} 
      </div>

      <div className={styles.widgetSelectedItems}>
        <span>Current selected items:</span>
        <div className={styles.widgetTagsContainer}>
          {widgetTags.map(tag => (
            <Tag 
              label={tag.label} 
              value={tag.value} 
              onClose={() => onCheckboxChange(tag.value, tag.label)} 
            />
          ))}
        </div>

      </div>

      <div className={styles.widgetFooter}>
        <Button 
          text="Save" 
          isPrimary 
          isSmall 
          onClick={() => onSave(widgetTags)} 
        />
        <Button 
          text="Cancel" 
          isSmall 
          onClick={onClose} 
        />
      </div>

    </div>
    <div className={styles.overlay} onClick={onClose}></div>
    </>
  );
}

export default Widget;
