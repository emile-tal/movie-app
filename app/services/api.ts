export const TMDB_CONFIG = {
    BASE_URL: process.env.EXPO_PUBLIC_TMDB_URL,
    API_KEY: process.env.EXPO_PUBLIC_TMDB_KEY,
    headers: {
        accept: "application/json",
        Authorization: `Bearer ${process.env.EXPO_PUBLIC_TMDB_TOKEN}`,
    },
}

export const fetchMovies = async (query: string) => {
    const endpoint = query ? `/search/movie?query=${encodeURIComponent(query)}` : '/discover/movie?sort_by=popularity.desc';
    const fullUrl = `${TMDB_CONFIG.BASE_URL}${endpoint}`;

    try {
        const response = await fetch(fullUrl, {
            method: 'GET',
            headers: TMDB_CONFIG.headers,
        });

        const data = await response.json();
        return data.results;
    } catch (error) {
        console.error('Error fetching movies:', error);
        return null;
    }
}