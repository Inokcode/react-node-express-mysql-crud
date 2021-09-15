import { useState, useEffect } from 'react';
import './App.css';
import Axios from 'axios';

function App() {
  const [movieName, setMovieName] = useState('');
  const [review, setReview] = useState('');
  const [movieReviewList, setMovieReviewList] = useState([]);

  //
  const submitReview = () => {
    Axios.post('http://localhost:3006/api/insert', {
      movieName: movieName,
      movieReview: review,
    }).then(() => {
      alert('Done');
    });
  };
  //
  useEffect(() => {
    Axios.get('http://localhost:3006/api/get').then((response) => {
      setMovieReviewList(response.data);
      // console.log(movieReviewList);
    });
  }, []);
  //
  return (
    <div className="App">
      <h1>ReactJS, NodeJS, Express, MySQL CURD</h1>
      <div className="form">
        <label>Movie Name:</label>
        <input
          type="text"
          name="movieName"
          onChange={(e) => {
            setMovieName(e.target.value);
          }}
        />
        <label>Review:</label>
        <input
          type="text"
          name="review"
          onChange={(e) => {
            setReview(e.target.value);
          }}
        />
        <button onClick={submitReview}>Submit</button>

        {movieReviewList.map((val) => {
          return (
            <h2 key={val.id}>
              Movie Name{val.movieName} | Movie Review: {val.movieReview}
            </h2>
          );
        })}
      </div>
    </div>
  );
}

export default App;
