import { useState, useEffect } from 'react';
import './App.css';
import Axios from 'axios';

function App() {
  const [movieName, setMovieName] = useState('');
  const [review, setReview] = useState('');
  const [movieReviewList, setMovieReviewList] = useState([]);
  const [newReview, setNewReview] = useState('');

  //
  useEffect(() => {
    Axios.get('http://localhost:3006/api/get').then((response) => {
      setMovieReviewList(response.data);
      // console.log(movieReviewList);
    });
  }, []);
  //
  const submitReview = () => {
    Axios.post('http://localhost:3006/api/insert', {
      movieName: movieName,
      movieReview: review,
    });
    setMovieReviewList([
      ...movieReviewList,
      {
        movieName: movieName,
        movieReview: review,
      },
    ]);
  };

  //
  const deleteReview = (movie) => {
    Axios.delete(`http://localhost:3006/api/delete/${movie}`);
  };
  //
  const updateReview = (movie) => {
    Axios.put('http://localhost:3006/api/update', {
      movieName: movie,
      movieReview: newReview,
    });
    setNewReview('');
    setMovieReviewList([movieReviewList]);
  };
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
            <div className="card" key={val.id}>
              <h1>{val.movieName}</h1>
              {val.movieReview}
              <div>
                <button onClick={() => deleteReview(val.movieName)}>
                  Delete
                </button>
                <input
                  type="text"
                  id="updateInput"
                  onChange={(e) => setNewReview(e.target.value)}
                />
                <button onClick={() => updateReview(val.movieName)}>
                  Update
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
