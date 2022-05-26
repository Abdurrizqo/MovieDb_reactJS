import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchMovies = createAsyncThunk(
  "movies/fetchMovies",
  async (page, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `http://notflixtv.herokuapp.com/api/v1/movies?page=${page}&limit=10`
      );

      return response.data;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const fetchGenres = createAsyncThunk(
  "genre/fetchGenres",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        "http://notflixtv.herokuapp.com/api/v1/movies/genres"
      );
      return response.data;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const fetchMoviesByGenre = createAsyncThunk(
  "movieByGenre/fetchMovieBygenre",
  async (data, { rejectWithValue }) => {
    try {
      let { genre, page } = data;
      const response = await axios.get(
        `http://notflixtv.herokuapp.com/api/v1/movies?page=${page}&limit=10&genre=${genre}`
      );
      return response.data;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const fetchMoviesById = createAsyncThunk(
  "movieById/fetchMovieById",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `http://notflixtv.herokuapp.com/api/v1/movies/${data}`
      );
      return response.data;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

const initialState = {
  movies: {},
  genres: [],
  moviesStatus: "idle",
  genresStatus: "idle",
  error: null,
};

export const movieSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    changeState: (state) => {
      state.moviesStatus = "idle";
    },
    removeMovie: (state) => {
      state.movies = {};
    },
  },
  extraReducers: {
    [fetchMovies.pending]: (state) => {
      state.moviesStatus = "loading";
    },

    [fetchMovies.fulfilled]: (state, { payload }) => {
      state.movies = payload.data;
      state.moviesStatus = "succeeded";
    },

    [fetchMovies.rejected]: (state, { payload }) => {
      state.movies = null;
      state.error = payload;
      state.moviesStatus = "succeeded";
    },

    [fetchGenres.pending]: (state) => {
      state.genresStatus = "loading";
    },

    [fetchGenres.fulfilled]: (state, { payload }) => {
      state.genres = payload.data;
      state.genresStatus = "succeeded";
    },

    [fetchGenres.rejected]: (state, { payload }) => {
      state.genres = null;
      state.error = payload;
      state.genresStatus = "succeeded";
    },

    [fetchMoviesByGenre.pending]: (state) => {
      state.moviesStatus = "loading";
    },

    [fetchMoviesByGenre.fulfilled]: (state, { payload }) => {
      state.movies = payload.data;
      state.moviesStatus = "succeeded";
    },

    [fetchMoviesByGenre.rejected]: (state, { payload }) => {
      state.movies = null;
      state.error = payload;
      state.moviesStatus = "succeeded";
    },

    [fetchMoviesById.pending]: (state) => {
      state.moviesStatus = "loading";
    },

    [fetchMoviesById.fulfilled]: (state, { payload }) => {
      state.movies = payload.data;
      state.moviesStatus = "succeeded";
    },

    [fetchMoviesById.rejected]: (state, { payload }) => {
      state.movies = null;
      state.error = payload;
      state.moviesStatus = "succeeded";
    },
  },
});

export const { changeState, removeMovie } = movieSlice.actions;

export default movieSlice.reducer;
