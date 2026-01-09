const API_KEY = '8b48bd28b87b424d9651a5af09c9cf89';
const BASE_URL = 'https://api.rawg.io/api';

export interface Game {
    id: number;
    name: string;
    background_image: string;
    rating: number;
    released: string;
    genres: { name: string }[];
    added: number;
    metacritic?: number;
}

export async function fetchGames(params: Record<string, string> = {}) {
    const queryParams = new URLSearchParams({
        key: API_KEY,
        page_size: '12',
        ...params,
    });

    const response = await fetch(`${BASE_URL}/games?${queryParams.toString()}`);
    if (!response.ok) {
        throw new Error('Failed to fetch games');
    }
    const data = await response.json();
    return data.results;
}

export async function fetchGameDetails(id: string | number) {
    const response = await fetch(`${BASE_URL}/games/${id}?key=${API_KEY}`);
    if (!response.ok) {
        throw new Error('Failed to fetch game details');
    }
    return await response.json();
}

export async function fetchGameScreenshots(id: string | number) {
    const response = await fetch(`${BASE_URL}/games/${id}/screenshots?key=${API_KEY}`);
    if (!response.ok) {
        throw new Error('Failed to fetch screenshots');
    }
    const data = await response.json();
    return data.results;
}

export async function fetchRelatedGames(id: string | number) {
    const response = await fetch(`${BASE_URL}/games/${id}/suggested?key=${API_KEY}`);
    if (!response.ok) {
        throw new Error('Failed to fetch related games');
    }
    const data = await response.json();
    return data.results;
}
