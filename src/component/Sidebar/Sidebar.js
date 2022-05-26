import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { fetchGenres } from "../../stores/moviesSlice";

function Sidebar({ statusDisplay }) {
  const genres = useSelector((state) => state.movies.genres);
  const genresStatus = useSelector((state) => state.movies.genresStatus);
  const dispatch = useDispatch();

  useEffect(() => {
    if (genresStatus === "idle") {
      dispatch(fetchGenres());
    }
  }, [genresStatus, dispatch]);

  return (
    <div
      className={`drop-shadow-md bg-side-color h-full w-44 md:w-56 fixed top-0 left-0 md:block overflow-y-auto ${
        statusDisplay ? "hidden" : "block"
      }`}
    >
      <div className="py-16 sm:pt-20 sm:pb-10 pl-6 pr-4 md:pl-8">
        <h1 className="text-white font-medium text-xl md:text-2xl">
          Genre Movies
        </h1>
        <div className="text-white mt-3 text-sm md:text-base">
          <NavLink
            to={`/`}
            className={({ isActive }) =>
              isActive
                ? "block py-2 mb-3 border-l-4 pl-3 bg-second-color/30 rounded-r-md border-l-second-color"
                : "block py-2 mb-3 hover:border-l-4 hover:pl-3 hover:bg-second-color/30 hover:rounded-r-md hover:border-l-second-color"
            }
          >
            All
          </NavLink>

          {genres ? (
            genres.map((item, key) => {
              return (
                <NavLink
                  key={key}
                  to={`/genres/${item}`}
                  className={({ isActive }) =>
                    isActive
                      ? "block py-2 mb-3 border-l-4 pl-3 bg-second-color/30 rounded-r-md border-l-second-color"
                      : "block py-2 mb-3 hover:border-l-4 hover:pl-3 hover:bg-second-color/30 hover:rounded-r-md hover:border-l-second-color"
                  }
                >
                  {item}
                </NavLink>
              );
            })
          ) : (
            <div></div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
