import { useState, useEffect } from 'react';
import { fetchPopularmovie }  from './service/apiService'; 
import Pagination from './components/Pagination';
import { Link } from 'react-router-dom';
import MovieDetails from './MovieDetails';
import MovieCard from './components/MovieCard';
import AppDrawer from './components/AppDrawer';
import ThemeToggle from './ThemeToggle';
import { useTheme } from './components/ThemeContext';

const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';

export default function App () {
  const [movies, setMovies] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPages] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  
  const {theme} = useTheme();
  
 

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

  return (
    <div className={`min-h-screen transition-colors duration-300 ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-neutral-300 text-black'}`}>

    <nav className={`mb-3 text-center flex flex-col justify-center items-center sticky top-0 z-10 ${theme === 'dark' ? 'bg-gray/30 text-white backdrop-blur-2xl shadow-md' : 'bg-neutral/30 text-black backdrop-blur-2xl shadow-md'}`}>
         
        <h1 className='text-3xl sm:text-4xl py-5 font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-red-600 max-w-7xl mx-auto '>⭐POPULAR MOVIES</h1>
          
          <AppDrawer />
          <ThemeToggle />
        
        <p className='mt-2 text-gray-400'>Enjoy your days with our movies</p>
      
       <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        handlePageChange={handlePageChange}
        isLoading={isLoading}
      />
      </nav>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 ">
        {movies.map(movie => (
          <Link to={`/movie/${movie.id}`} key={movie.id}>
            <div className="movie-card movie-card bg-gray-800 rounded-xl overflow-hidden shadow-2xl transition-transform duration-300 hover:scale-[1.03] hover:shadow-blue-300/100 group">
              <MovieCard movie={movie} key={movie.id} />
            </div>
          </Link>
        ))}
      </div>

    </div>

  );
}