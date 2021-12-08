import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import "./styles/App.scss";

function App() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/popular" element={<Home />} />
            <Route path="/new" element={<Home />} />
            <Route path="/collections" element={<Home />} />
        </Routes>
    );
}

export default App;
