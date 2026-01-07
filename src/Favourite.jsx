import { useFav } from "./components/FavouriteContext";
import { useNavigate } from "react-router-dom";
import MovieCard from "./components/MovieCard";
import {Link} from "react-router-dom";
import { useTheme } from './components/ThemeContext';

export default function Favourite() {
    const {favourites} = useFav();
    const navigate = useNavigate();
    const {theme} = useTheme();

    if (favourites.length === 0) {
        return (
            <div className={`min-h-screen text-white p-4 sm:p-8  ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-black'}`}>
                <p className={`mt-55 text-3xl sm:text-4xl py-10 font-extrabold text-transparent bg-clip-text ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-slate-200 text-black '} mb-10 text-center flex flex-col justify-center items-center`}>No Favourite Movies yet</p>
                
                <div className="flex justify-center  items-center">
                      <button
                         onClick={() => navigate("/")}
                         className=" px-4 py-2 bg-yellow-500 text-black font-semibold rounded-lg hover:bg-yellow-600"
                        >
                         Get some movies
                        </button>
                </div>
            </div>
        )
    }

    return (
    <div className={`min-h-screen bg-gray-900 text-white p-4 sm:p-8 transition-colors duration-300 ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-neutral-300 text-black'}`}>
            <header className="mb-10 text-center flex justify-between">
                <h1 className='text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-red-600'>My Favourites </h1>
                <span><button
                    onClick={() => navigate("/")}
                    className="mb-6 px-4 py-2 bg-yellow-500 text-black font-semibold rounded-lg hover:bg-yellow-600"
                    >
                    ← Back to Home
                    </button>
                </span>
                
            </header>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
           
           {favourites.map(movie=>(
            <Link to={`/movie/${movie.id}`} key={movie.id}>
             <div className="movie-card bg-gray-800 rounded-xl overflow-hidden shadow-2xl transition-transform duration-300 hover:scale-[1.03] hover:shadow-blue-300/100 group">
            <MovieCard movie={movie} key={movie.id}/>
            </div>
            </Link>
           ))}
           </div>
           
    
        </div>
    )
}