import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home.jsx";
import Detail from "./pages/Detail.jsx";

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/movie/:imdbID" element={<Detail />} />
            </Routes>
        </BrowserRouter>
    );
}