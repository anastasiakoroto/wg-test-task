
import Tag from '../../../components/Tag';
import type { Tag as TagType } from '../../../types/widget-types';
import styles from '../Widget.module.scss';

const Tags = (
  { tags, onClose }: { tags: TagType[], onClose: (tag: TagType) => void }
) => (      
  <div className={styles.widgetSelectedItems}>
    Current selected items:
    <div className={styles.widgetTagsContainer}>
      {tags.map(tag => (
        <Tag
          key={`widget-tag-${tag.value}`}
          label={tag.label} 
          value={tag.value} 
          onClose={() => onClose(tag)} 
        />
      ))}
    </div>
  </div>
);

export default Tags;
