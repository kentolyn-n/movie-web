import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchMovieDetails, fetchMovieCredits} from "./service/apiService";
import Trailers from "./components/Trailers";

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

export default function MovieDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [movie, setMovie] = useState(null);
  const [credits, setCredits] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showTrailers, setShowTrailer] = useState(false);

  useEffect(() => {
    async function loadData() {
      try {
        const movieData = await fetchMovieDetails(id);
        const creditData = await fetchMovieCredits(id);
      

        setMovie(movieData);
        setCredits(creditData);
        
      } catch (err) {
        console.error("Error loading movie:", err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen">
        <div className="text-center py-10 text-white mt-55 text-3xl sm:text-4xl">Loading...</div>
      </div>
    );
  }

  if (!movie) {
    return <div className="text-center py-10 text-white">Movie not found</div>;
  }

  const director = credits?.crew?.find((p) => p.job === "Director");
  const cast = credits?.cast?.slice(0, 9) || [];

  return (
    <div className="relative min-h-screen text-white bg-black">

      <div
        className="absolute inset-0 bg-cover bg-center blur-2xl opacity-40"
        style={{
          backgroundImage: `url(${IMAGE_BASE_URL}${movie.backdrop_path})`,
        }}
      ></div>

      <div className="relative z-10 max-w-6xl mx-auto p-6">

        <button
          onClick={() => navigate("/")}
          className="mb-6 px-4 py-2 bg-yellow-500 text-black font-semibold rounded-lg hover:bg-yellow-600"
        >
          ← Back to Home
        </button>

        <div className="flex flex-col md:flex-row gap-8">
          
          <img
            src={`${IMAGE_BASE_URL}${movie.poster_path}`}
            className="w-full md:w-1/3 rounded-xl shadow-lg"
            alt={movie.title}
          />

          <div className="flex-1">
            <h1 className="text-4xl font-bold mb-3">{movie.title}</h1>

            <p className="text-gray-300 mb-4 leading-relaxed">{movie.overview}</p>

            <p className="mb-2">
              <span className="font-semibold text-yellow-400">⭐ Rating:</span>{" "}
              {movie.vote_average}
            </p>

            <p className="mb-2">
              <span className="font-semibold text-yellow-400">⏳ Runtime:</span>{" "}
              {movie.runtime} mins
            </p>

            <p className="mb-2">
              <span className="font-semibold text-yellow-400">🎭 Genres:</span>{" "}
              {movie.genres.map((g) => g.name).join(", ")}
            </p>

            {director && (
              <p className="mt-4">
                <span className="font-semibold text-yellow-400">🎬 Director:</span>{" "}
                {director.name}
              </p>
            )}

            <button
              onClick={() => setShowTrailer(!showTrailers)} className= 'mt-4 px-4 py-2 text-black font-semibold rounded-lg  bg-yellow-500 text-black font-semibold rounded-lg hover:bg-yellow-600'>
              🎬 watch Trailer
            </button>
          </div>
        </div>
        

        <div className="mt-10">
          <div className="mt-5">
          <Trailers movieId={movie.id} open={showTrailers} />
        </div>
          <h2 className="text-2xl font-bold mb-4">Top Cast</h2>

          <div
            className="
              flex flex-wrap 
              gap-6 
              justify-start
            "
          >
            {cast.map((actor) => (
              <div
                key={actor.id}
                className="flex flex-col items-center w-24 text-center"
              >
                <img
                  src={
                    actor.profile_path
                      ? `${IMAGE_BASE_URL}${actor.profile_path}`
                      : "https://via.placeholder.com/80x80?text=No+Img"
                  }
                  alt={actor.name}
                  className="w-20 h-20 rounded-full object-cover shadow-md"
                />

                <p className="mt-2 text-sm font-semibold leading-tight">
                  {actor.name}
                </p>

                <p className="text-xs text-gray-400 leading-tight break-words">
                  {actor.character}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
