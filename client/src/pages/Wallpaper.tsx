import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import CoverImage from "../components/CoverImage";
import ContentWidthContainer from "../components/ContentWidthContainer";
import Navbar from "../components/Navbar";
import WallpaperInfo from "../components/WallpaperInfo";
import WallpaperComments from "../components/WallpaperComments";
import "../styles/Wallpaper.scss";

function Wallpaper() {
    const [data, setData] = useState(null as any);
    const { id } = useParams();

    useEffect(() => {
        (async () => {
            (async () => {
                const res = await fetch("/api/posts/" + id);
                if (res.status !== 200) window.location.href = "/";
                const wallpaper = await res.json();
                setData(wallpaper);
            })();
        })();
    }, []);

    if (!data) return null;

    return (
        <div className="wallpaper">
            <div className="wallpaper__background">
                <CoverImage src={data.imageUrl.large} />

                <div className="wallpaper__background-overlay" />
            </div>

            <ContentWidthContainer>
                <div className="wallpaper__layout">
                    <header>
                        <div className="wallpaper__navbar">
                            <Navbar />
                        </div>
                    </header>

                    <main>
                        <div className="wallpaper__content-container">
                            <div className="wallpaper__info">
                                <WallpaperInfo info={data} />
                            </div>

                            <div className="wallpaper__comment-section">
                                <WallpaperComments comments={data.comments} />
                            </div>
                        </div>
                    </main>
                </div>
            </ContentWidthContainer>
        </div>
    );
}

export default Wallpaper;
