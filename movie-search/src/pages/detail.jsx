import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Detail() {
    const { imdbID } = useParams();
    const [data, setData] = useState(null);
    const [error, setError] = useState("");

    useEffect(() => {
        (async () => {
            try {
                const key = import.meta.env.VITE_TMDB_KEY;
                // Fetch movie details and credits in parallel
                const [movieRes, creditsRes] = await Promise.all([
                    fetch(`https://api.themoviedb.org/3/movie/${imdbID}?api_key=${key}`),
                    fetch(`https://api.themoviedb.org/3/movie/${imdbID}/credits?api_key=${key}`)
                ]);
                
                const [movieData, creditsData] = await Promise.all([
                    movieRes.json(),
                    creditsRes.json()
                ]);
                
                if (movieData.id) {
                    // Find director from credits
                    const director = creditsData.crew?.find(person => person.job === 'Director');
                    
                    // Transform TMDB data to match OMDB-like structure
                    const transformedData = {
                        Title: movieData.title,
                        Year: movieData.release_date ? movieData.release_date.split('-')[0] : 'N/A',
                        Genre: movieData.genres ? movieData.genres.map(g => g.name).join(', ') : 'N/A',
                        Director: director ? director.name : 'N/A',
                        Plot: movieData.overview || 'No plot available',
                        Poster: movieData.poster_path ? `https://image.tmdb.org/t/p/w500${movieData.poster_path}` : 'N/A'
                    };
                    setData(transformedData);
                } else {
                    setError("Movie not found");
                }
            } catch {
                setError("Network error");
            }
        })();
    }, [imdbID]);

    if (error) return <main><p style={{ color: "crimson" }}>{error}</p></main>;
    if (!data) return <main><p>Loading…</p></main>;

    return (
        <main style={{ maxWidth: 960, margin: "40px auto", padding: 16 }}>
            <Link to="/">← Back</Link>
            <h1>{data.Title} ({data.Year})</h1>
            <img 
                src={data.Poster !== "N/A" ? data.Poster : "https://via.placeholder.com/300x445?text=No+Image"} 
                alt={data.Title} 
                style={{ maxWidth: 300, borderRadius: 8 }} 
            />
            <p><strong>Genre:</strong> {data.Genre}</p>
            <p><strong>Director:</strong> {data.Director}</p>
            <p><strong>Plot:</strong> {data.Plot}</p>
        </main>
    );
}