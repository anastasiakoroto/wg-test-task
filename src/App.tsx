import { useState } from 'react'
import './App.css'
import Button from './components/Button';
import Widget from './containers/Widget';
import Tag from './components/Tag';

function App() {
  const [tagCount, setTagCount] = useState(0);
  const [isWidgetOpen, setIsWidgetOpen] = useState(false);
  const [tags, setTags] = useState([]);

  const onCloseTag = (value) => {
    setTags(prev => prev.filter(item => item.value !== value));
    setTagCount(tagCount - 1);
  };

  const onWidgetClose = () => {
    setIsWidgetOpen(false);
  };

  return (
    <div>
      <h1>Select items</h1>
      <div>
        <h3>You currently have {tagCount} selected items</h3>
        <div>
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

  // return (
  //   <>
  //     <div>
  //       <a href="https://vite.dev" target="_blank">
  //         <img src={viteLogo} className="logo" alt="Vite logo" />
  //       </a>
  //       <a href="https://react.dev" target="_blank">
  //         <img src={reactLogo} className="logo react" alt="React logo" />
  //       </a>
  //     </div>
  //     <h1>Vite + React</h1>
  //     <div className="card">
  //       <button onClick={() => setCount((count) => count + 1)}>
  //         count is {count}
  //       </button>
  //       <p>
  //         Edit <code>src/App.tsx</code> and save to test HMR
  //       </p>
  //     </div>
  //     <p className="read-the-docs">
  //       Click on the Vite and React logos to learn more
  //     </p>
  //   </>
  // )
}

export default App
