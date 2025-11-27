import { useState, useEffect } from 'react';
import { fetchPopularmovie }  from './service/apiService'; 
import Pagination from './components/Pagination';
import { Link } from 'react-router-dom';
import MovieDetails from './MovieDetails';

const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';

export default function App () {
  const [movies, setMovies] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPages] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [mode, setMode] = useState('dark');

  useEffect(()=> {
    async function getMovies() {
      try{
        const data = await fetchPopularmovie(currentPage);
        setMovies(data.results);
        setTotalPages(data.total_pages > 500 ? 500 : data.total_pages);
      }
      catch(err) {
        setError(err.message);
      }
      finally {
        setIsLoading(false);
      }
    }
    getMovies();
  }, [currentPage]);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPages(newPage);
    }
  };
  if (isLoading && currentPage === 1) {
    return (
      <div className='flex justify-center items-center h-screen bg-gray-900 text-white'>
        <div className='text-xl animate-pulse'>Movies are loading...</div>
      </div>
    )
  }
  if(error) {
    return(
      <div p-6 bg-red-800 text-white rounded-lg text-center m-8 shadow-xl>
         <h1 className="text-2xl font-bold mb-4">API Error</h1>
        <p>{error}</p>
        <p className="mt-2 text-sm opacity-80">
          Please check the console for more details on the failure.
        </p>
      </div>
    )
  }
  console.log("Movies:", movies)
  console.log("Loading:", isLoading)
  console.log("Movies:", movies)
  return (
    <div className='min-h-screen bg-gray-900 text-white p-4 sm:p-8' style={{backgroundColor: mode==='dark'?'#111':'#f5f5f5', color: mode==='dark'?'#fff':'#000'}}>

      <header className='mb-10 text-center'>
        
        <h1 className='text-3xl sm:text-4xl py-10 font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-red-600 shadow-lg'>⭐POPULAR MOVIES <span style={{display:'flex', justifyContent:'flex-end', marginBottom:'16px'}}>
        <button className='font-bold' onClick={()=> setMode(mode==='dark'?'light':'dark')} style={{padding:'8px 12px', borderRadius:'6px', cursor:'pointer', border:'none', fontSize:"25px"}}>
          {mode==='dark'?'☀️':'🌙'}
        </button>
      </span> </h1>
        <p className='mt-4 text-gray-400'>Enjoy your days with our movies</p>
      </header>
       <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        handlePageChange={handlePageChange}
        isLoading={isLoading}
      />

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {movies.map(movie => (
          <Link to={`/movie/${movie.id}`} key={movie.id}>
            <div className="movie-card movie-card bg-gray-800 rounded-xl overflow-hidden shadow-2xl transition-transform duration-300 hover:scale-[1.03] hover:shadow-blue-300/100 group" style={{backgroundColor: mode==='dark'?'#1b1b1b':'#fff', color: mode==='dark'?'#fff':'#000'}}>
              <div className='aspect-w-2 aspect-h-2'>
                <img 
                  src={`${IMAGE_BASE_URL}${movie.poster_path}`} 
                  alt={`${movie.title} Poster`} 
                  className="poster"
                />
              </div>
              <div className="p-4">
                <h3 className='text-lg font-semibold  group-hover:text-green-400 transition-colors duration-300'>
                  {movie.title}
                </h3>
                <div className='flex justify-between items-center mt-2'>
                  <p>
                    <span className='text-yellow-500'>★</span>Rating: {movie.vote_average}
                  </p>
                  <p className="text-xs text-gray-500">
                    {movie.release_date ? new Date(movie.release_date).getFullYear() : 'N/A'}
                  </p>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>

  );
}