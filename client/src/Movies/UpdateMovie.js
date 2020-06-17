import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import axios from "axios";
import MovieList from "./MovieList";

const initialUpdateMovie = {
  id: "",
  title: "",
  director: "",
  metascore: "",
  stars: "",
};

export const UpdateMovie = (props) => {
  const [updatingMovie, setUpdatingMovie] = useState(initialUpdateMovie);
  const { id } = useParams();
  const { push } = useHistory();

  useEffect(() => {
    axios.get(`http://localhost:5000/api/movies/${id}`).then((res) => {
      setUpdatingMovie(res.data);
    });
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put(
        `http://localhost:5000/api/movies/${updatingMovie.id}`,
        updatingMovie
      )
      .then((res) => {
        console.log(res.data);
        const newList = props.movieList.map((item) => {
            if(item.id === res.data.id) {
                return res.data
            }else{
                return item
            }
        })
        props.setMovieList([ ...newList]);
        push(`/movies/${id}`);
      })
      .catch((err) => console.error(err.message, err.response));
  };

  const handleChanges = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setUpdatingMovie({ ...updatingMovie, [name]: value });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          {" "}
          Title
          <input
            type="text"
            name="title"
            value={updatingMovie.title}
            onChange={handleChanges}
          />
        </label>
        <label>
          {" "}
          Director
          <input
            type="text"
            name="director"
            value={updatingMovie.director}
            onChange={handleChanges}
          />
        </label>
        <label>
          {" "}
          Metascore
          <input
            type="text"
            name="metascore"
            value={updatingMovie.metascore}
            onChange={handleChanges}
          />
        </label>
        <label>
          {" "}
          Stars
          <input
            type="text"
            name="stars"
            value={updatingMovie.stars}
            onChange={handleChanges}
          />
        </label>
        <button>Update</button>
      </form>
    </div>
  );
};

export default UpdateMovie;
