import { useEffect, useState } from "react";
import MovieCard from "../components/Moviecard.jsx";

export default function Home() {
    const [q, setQ] = useState("");
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    async function searchMovies(term) {
        if (!term) { setResults([]); return; }
        try {
            setLoading(true); setError(""); 
            const key = import.meta.env.VITE_TMDB_KEY;
            const res = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${key}&query=${encodeURIComponent(term)}`);
            const data = await res.json();
            
            if (data.results && data.results.length > 0) {
                // Transform TMDB data to match OMDB-like structure
                const transformedResults = data.results.map(movie => ({
                    imdbID: movie.id.toString(),
                    Title: movie.title,
                    Year: movie.release_date ? movie.release_date.split('-')[0] : 'N/A',
                    Poster: movie.poster_path ? `https://image.tmdb.org/t/p/w300${movie.poster_path}` : 'N/A'
                }));
                setResults(transformedResults);
            } else {
                setError("No results found");
                setResults([]);
            }
        } catch (err) {
            setError("Failed to search movies");
            setResults([]);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        const id = setTimeout(() => searchMovies(q), 400); 
        return () => clearTimeout(id);
    }, [q]);

    return (
        <main style={{ maxWidth: 960, margin: "40px auto", padding: 16 }}>
            <h1>Movie Search</h1>
            <input
                value={q}
                onChange={e => setQ(e.target.value)}
                placeholder="Search for a movie…"
                style={{ width: "100%", padding: 12, fontSize: 16 }}
            />
            {loading && <p>Loading…</p>}
            {error && <p style={{ color: "crimson" }}>{error}</p>}
            <section style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))", gap: 16, marginTop: 16 }}>
                {results.map(m => <MovieCard key={m.imdbID} movie={m} />)}
            </section>
        </main>
    );
}