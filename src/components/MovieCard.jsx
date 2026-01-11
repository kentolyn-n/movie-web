import {useState, useEffect} from 'react';
import {useFav} from "./FavouriteContext";

const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';

export default function MovieCard({ movie }) {

  const { isFav, ToggleFav } = useFav();
  const [showMessage, setShowMessage]= useState(false);

  useEffect(()=>{
    if(!showMessage) return ;

    const timer = setTimeout(()=>{
      setShowMessage(false);  
    }, 1500);

    return () => clearTimeout(timer);
  }, [showMessage]);

  const handleStarClick = (e) => {
    e.stopPropagation(); 
    e.preventDefault();   
    ToggleFav(movie);
    setShowMessage(true);
  };

  

    return (
        <div className='rounded-xl overflow-hidden bg-gray-800 rounded-xl overflow-hidden shadow-2xl transition-transform duration-300 hover:scale-[1.03] hover:shadow-blue-300/100 group shadow-2xl flex flex-col'>
            <div className='w-full aspect-[2/3] flex-shrink-0'>
                <img 
                  src={`${IMAGE_BASE_URL}${movie.poster_path}`} 
                  alt={`${movie.title} Poster`} 
                  className="poster w-full h-full object-cover"
                />
                
            </div>
           
            <div className="p-4 flex flex-col justify-between flex-1">
                <h3 className='text-sm font-semibold group-hover:text-green-400 transition-colors duration-300 overflow-hidden'
                style={{
                  display: "-webkit-box",
                  WebkitBoxOrient: "vertical",
                  WebkitLineClamp: 2,
                }}
                >
                  {movie.title}
                </h3>
                <div className='flex items-center text-sm text-gray-400 justify-between mt-2 '>
                  <p>
                    <span className='text-yellow-500 '>★</span>Rating: {Number(movie.vote_average.toFixed(1))}
                  </p>
   
                  <button
                        onClick={handleStarClick}
                        aria-label="Toggle favourite"
                        className={`
                          text-lg
                          transition-transform duration-300 ease-out
                          ${isFav(movie.id) ? "scale-125" : "scale-100"}
                          active:scale-150 pr-10
                          flex flex-row justify-between
                        `}
                      >
                        <span
                          className={`
                            inline-block transition-colors duration-300
                            ${isFav(movie.id) ? "text-yellow-400" : "text-gray-400"}
                            hover:text-yellow-300
                          `}
                        >
                          {isFav(movie.id) ? "⭐" : "☆"}
                        </span>
                      </button>
                  {showMessage && (<div className={`absolute top-2 ${isFav(movie.id)? "bg-green-500" :"bg-red-500"} text-white text-sm px-1 py-1 rounded shadow`}>
                    {`${isFav(movie.id)? "Added to favourite" : "Removed from favourite"}`}
                  </div>)}
                </div>
            </div>
        </div>
    )

}