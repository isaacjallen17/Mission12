import { useState } from 'react';
import './App.css';
import BookList from './BookList';
import Filter from './Filter';
import MainWelcome from './MainWelcome';

function App() {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-12">
            <MainWelcome />
          </div>
        </div>
        <div className="row">
          <div className="col-3">
            <Filter
              selectedCategories={selectedCategories}
              setSelectedCategories={setSelectedCategories}
            />
          </div>
          <div className="col-9">
            <BookList selectedCategories={selectedCategories} />
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
