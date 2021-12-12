import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Popular from "./pages/Popular";
import New from "./pages/New";
import Collections from "./pages/Collections";
import "./styles/App.scss";

function App() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/popular" element={<Popular />} />
            <Route path="/new" element={<New />} />
            <Route path="/collections" element={<Collections />} />
        </Routes>
    );
}

export default App;
