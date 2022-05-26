import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import CastActor from "../../component/CastActor/CastActor";
import CommentSection from "../../component/Comment/CommentSection";
import DetailHead from "../../component/DetailHead/DetailHead";
import { changeState, fetchMoviesById } from "../../stores/moviesSlice";
import Footer from "../../component/Footer/Footer";
import Loading from "../../component/Loading/Loading";

function MovieDetail() {
  const movies = useSelector((state) => state.movies.movies);
  const error = useSelector((state) => state.movies.error);
  const moviesStatus = useSelector((state) => state.movies.moviesStatus);
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    dispatch(changeState());
  }, [id, dispatch]);

  useEffect(() => {
    if (moviesStatus === "idle") {
      dispatch(fetchMoviesById(id));
    }
  }, [moviesStatus, dispatch, id]);

  if (moviesStatus === "loading") {
    return (
      <div className="mt-60 text-center">
        <Loading />
      </div>
    );
  } else if (error) {
    return (
      <div className="mt-16 pb-20 mx-5 md:ml-60 sm:mt-20 text-4xl text-white">
        {/* Add Other Component to handle null */}
        Movies Not Found
      </div>
    );
  }
  return (
    <>
      <DetailHead movies={movies} />
      <div className="grid grid-cols-1 mx-16 gap-3 my-6 md:grid-cols-3 md:my-10 xl:mx-44 justify-items-stretch pb-16">
        <CastActor />
        <CommentSection />
      </div>
      <Footer />
    </>
  );
}

export default MovieDetail;
