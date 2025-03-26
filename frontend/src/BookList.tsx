import { Book } from './types/Books';
import { useEffect, useState } from 'react';

function BookList({ selectedCategories }: { selectedCategories: string[] }) {
  const [books, setBooks] = useState<Book[]>([]);
  const [numBooksPage, setNumBooksPage] = useState<number>(5);
  const [pageNum, setPageNum] = useState<number>(0);
  const [totNumBooks, setTotNumBooks] = useState<number>(0);
  const [totPages, setTotPages] = useState<number>(0);
  const [order, setOrder] = useState<string>('title');

  useEffect(() => {
    const fetchBooks = async () => {
      const categoryParams = selectedCategories
        .map((c) => `categories=${encodeURIComponent(c)}`)
        .join('&');
      const response = await fetch(
        `https://localhost:7088/Bookstore/check?numBooks=${numBooksPage}&pageNum=${pageNum}&order=${order}${selectedCategories.length ? `&${categoryParams}` : ''}`
      );
      const data = await response.json();
      setBooks(data.listOfBooks);
      setTotNumBooks(data.totNumBooks);
      setTotPages(Math.ceil(totNumBooks / numBooksPage));
      setOrder(order);
    };
    fetchBooks();
  }, [numBooksPage, pageNum, totNumBooks, order, selectedCategories]);
  return (
    <>
      <label>
        Sort Books:
        <select
          value={order}
          onChange={(o) => {
            setOrder(o.target.value);
            setPageNum(0);
          }}
        >
          <option value="title">Title (alphabetical)</option>
          <option value="pagesHighLow">Number of Pages (high to low)</option>
          <option value="pagesLowHigh">Number Of Pages (low to high)</option>
          <option value="price">Price (low to high)</option>
        </select>
      </label>
      <br />
      <br />
      {books.map((b) => (
        <div id="bookCard" className="card" key={b.bookID}>
          <h3 className="card-title">
            <strong>{b.title}</strong>
            <br />
            By {b.author}
          </h3>
          <div className="card-body">
            <ul className="list-unstyled">
              <li>
                <strong>Published By:</strong> {b.publisher}
              </li>
              <li>
                <strong>ISBN:</strong> {b.isbn}
              </li>
              <li>
                <strong>Category:</strong> {b.category}
              </li>
              <li>
                <strong>Classification:</strong> {b.classification}
              </li>
              <li>
                <strong>Number of Pages:</strong> {b.pageCount}
              </li>
              <li>
                <strong>Price:</strong> ${b.price}
              </li>
            </ul>
          </div>
        </div>
      ))}
      <br />
      <button disabled={pageNum === 0} onClick={() => setPageNum(pageNum - 1)}>
        Previous
      </button>
      {[...Array(totPages)].map((_, i) => (
        <button key={i} onClick={() => setPageNum(i)} disabled={pageNum === i}>
          {i + 1}
        </button>
      ))}
      <button
        disabled={pageNum === totPages - 1}
        onClick={() => setPageNum(pageNum + 1)}
      >
        Next
      </button>
      <br />
      <label>
        Number Of Books Per Page:
        <select
          value={numBooksPage}
          onChange={(x) => {
            setNumBooksPage(Number(x.target.value));
            setPageNum(0);
          }}
        >
          <option value="3">3</option>
          <option value="5">5</option>
        </select>
      </label>
      <br />
    </>
  );
}

export default BookList;
