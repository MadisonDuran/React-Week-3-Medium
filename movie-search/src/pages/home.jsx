import { useEffect, useState } from "react";
import MovieCard from "../components/moviecard.jsx";

export default function Home() {
    const [q, setQ] = useState("");
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    async function searchMovies(term) {
        if (!term) { setResults([]); return; }
        try {
            setLoading(true); setError(""); 
            const key = import.meta.env.VITE_OMDB_KEY;
            const res = await fetch(`https://www.omdbapi.com/?apikey=${key}&s=${encodeURIComponent(term)}`);
        }
    }
}