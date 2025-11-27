const API_KEY = "12b40aed8c9d804a8011a03a25512c34"; 
const BASE_URL = "https://api.themoviedb.org/3";

const AUTH_TOKEN =
  "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxMmI0MGFlZDhjOWQ4MDRhODAxMWEwM2EyNTUxMmMzNCIsIm5iZiI6MTc1NzY1MDAyMS43NzUsInN1YiI6IjY4YzM5YzY1YjU1MDhkNmU5OWJhYzhhYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.AiPdxroDk1UPwdpcMSTC5cNkWIOUlTHUoj0k0h9kqn4";

const headers = {
  accept: "application/json",
  Authorization: AUTH_TOKEN,
};

export async function fetchPopularmovie(page = 1) {
  const url = `${BASE_URL}/movie/popular?api_key=${API_KEY}&language=en-US&page=${page}`;

  try {
    const response = await fetch(url, { headers });

    if (!response.ok) {
      throw new Error(`Failed to fetch popular movies: ${response.status}`);
    }

    return await response.json();
  } catch (err) {
    console.error("Error fetching popular movies:", err);
    throw err;
  }
}

export async function fetchMovieDetails(movieId) {
  const url = `${BASE_URL}/movie/${movieId}?api_key=${API_KEY}&language=en-US`;

  try {
    const response = await fetch(url, { headers });

    if (!response.ok) {
      throw new Error(`Failed to fetch movie details: ${response.status}`);
    }

    return await response.json();
  } catch (err) {
    console.error("Error fetching movie details:", err);
    throw err;
  }
}

export async function fetchMovieCredits(movieId) {
  const url = `${BASE_URL}/movie/${movieId}/credits?api_key=${API_KEY}&language=en-US`;

  try {
    const response = await fetch(url, { headers });

    if (!response.ok) {
      throw new Error(`Failed to fetch movie credits: ${response.status}`);
    }

    return await response.json();
  } catch (err) {
    console.error("Error fetching movie credits:", err);
    throw err;
  }
}

export async function fetchMovieVideos(movieId) {
  const url = `${BASE_URL}/movie/${movieId}/videos?api_key=${API_KEY}&language=en-US`;

  try {
    const response = await fetch(url, { headers });

    if (!response.ok) {
      throw new Error(`Failed to fetch movie videos: ${response.status}`);
    }

    return await response.json();
  } catch (err) {
    console.error("Error fetching movie movies:", err);
    throw err;
  }
}

export function getYouTubeTrailer(videos) {
  if (!videos || !videos.results) return null;

  const trailer = videos.results.find(
    (video) => video.site === "YouTube" && video.type === "Trailer"
  );

  if (!trailer) return null;
  return `https://www.youtube.com/watch?v=${trailer.key}`;
}
