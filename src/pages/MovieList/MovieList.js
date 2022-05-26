import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  fetchMovies,
  fetchMoviesByGenre,
  changeState,
} from "../../stores/moviesSlice";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Pagination } from "antd";
import Loading from "../../component/Loading/Loading";

function MovieList() {
  const [movePage, setMovePage] = useState("1");
  const movies = useSelector((state) => state.movies.movies);
  const error = useSelector((state) => state.movies.error);
  const moviesStatus = useSelector((state) => state.movies.moviesStatus);

  const dispatch = useDispatch();
  const { genre } = useParams();
  let navigate = useNavigate();

  useEffect(() => {
    dispatch(changeState());
  }, [genre, movePage]);

  useEffect(() => {
    setMovePage(1);
  }, [genre]);

  useEffect(() => {
    if (moviesStatus === "idle" && genre) {
      let data = {
        genre: genre,
        page: movePage,
      };
      dispatch(fetchMoviesByGenre(data));
    } else if (moviesStatus === "idle" && !genre) {
      dispatch(fetchMovies(movePage));
    }
  }, [moviesStatus, dispatch]);

  function changePage(page) {
    setMovePage(page);
    if (genre) {
      navigate(`${page}`);
    } else if (!genre) {
      navigate(`/all/${page}`);
    }
  }

  const itemRender = (_, type, originalElement) => {
    if (type === "prev") {
      return <div className="mr-4 font-medium text-white">Previous</div>;
    }

    if (type === "next") {
      return <div className="ml-4 font-medium text-white">Next</div>;
    }

    return originalElement;
  };

  console.log(movies);

  if (moviesStatus === "loading") {
    return (
      <div className="mt-16 pb-20 mx-5 md:ml-60 sm:mt-20">
        <div className="text-center mt-60">
          <Loading />
        </div>
      </div>
    );
  } else if (error) {
    return (
      <div className="mt-16 pb-20 mx-5 md:ml-60 sm:mt-20 text-4xl text-white">
        {/* Add Other Component to handle null */}
        Movies Not Found
      </div>
    );
  } else {
    return (
      <div className="mt-16 pb-20 mx-5 md:ml-60 sm:mt-20">
        <Pagination
          className="mb-8 mt-20 md:mb-12 md:mt-24 sm:mx-auto"
          itemRender={itemRender}
          showLessItems={true}
          defaultCurrent={movePage}
          total={movies.totalDocs}
          showSizeChanger={false}
          onChange={changePage}
        />

        <div className="grid grid-cols-2 gap-3  md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {movies.docs ? (
            movies.docs.map((item) => {
              return (
                <Link to={`/movie/${item._id}`} key={item._id}>
                  <div className="border-4 rounded-sm border-main-color md:w-44 lg:w-48 xl:w-60">
                    <img
                      className="md:h-full w-full"
                      src={`https://image.tmdb.org/t/p/original/${item.poster}`}
                      alt="..."
                    />
                  </div>
                </Link>
              );
            })
          ) : (
            <div></div>
          )}
        </div>
      </div>
    );
  }
}

export default MovieList;
