import React from "react";

function DetailHead({ movies }) {
  console.log(movies);
  return (
    <div
      style={{
        backgroundImage: `url(https://image.tmdb.org/t/p/original${movies.poster})`,
      }}
      className="w-full bg-cover bg-center"
    >
      <div className="w-full h-full bg-black/80 mt-12">
        <div className="text-white grid grid-cols-1 justify-items-center p-12 md:grid-cols-2 xl:px-40 xl:py-24">
          <div className="border-4 rounded-sm border-main-color w-56 md:w-64">
            <img
              src={`https://image.tmdb.org/t/p/original/${movies.poster}`}
              alt="..."
            />
          </div>
          <div className="my-4">
            <h1 className="text-white text-2xl text-center md:text-left md:text-4xl font-medium mb-2">
              {movies.title}
            </h1>
            <p className="text-justify text-base">{movies.synopsis}</p>
            <h5 className="text-white text-base font-medium mt-2 md:mt-4">
              Genre :
            </h5>
            <div className="flex-wrap flex">
              {movies.genres ? (
                movies.genres.map((item) => {
                  return (
                    <span className="text-white mr-2 inline-block  border-2 rounded-full border-second-color px-2 py-1 mt-2">
                      {item}
                    </span>
                  );
                })
              ) : (
                <></>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DetailHead;
