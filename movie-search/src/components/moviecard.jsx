import { Link } from "react-router-dom";


export default function MovieCard({ movie }) {
    return (
        <Link to={`/movie/${movie.imdbID}`} style={{ textDecoration: "none", color: "inherit" }}>
            <article style={{ border: "1px solid #ddd", borderRadius: 12, padding: 12 }}>
                <img 
                    src={movie.Poster !== "N/A" ? movie.Poster : "https://via.placeholder.com/300x445?text=No+Image"} 
                    alt={movie.Title} 
                    style={{ width: "100%", borderRadius: 8 }} 
                />
                <h3 style={{ marginTop: 8 }}>{movie.Title}</h3>
                <p>{movie.Year}</p>
            </article>
        </Link>
    );
}