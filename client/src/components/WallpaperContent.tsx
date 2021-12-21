import { Fragment } from "react";
import "../styles/WallpaperContent.scss";
import WallpaperComments from "./WallpaperComments";
import WallpaperInfo from "./WallpaperInfo";

interface WallpaperContentTypes {
    data: {
        title: string;
        category: {
            title: string;
        };
        publisher: {
            avatar: string;
            username: string;
        };
        createdAt: number;
        likeCount: number;
        comments: [
            {
                _id: string;
                description: string;
                createdAt: number;
                user: {
                    avatar: string;
                    username: string;
                };
            }
        ];
    };
}

function WallpaperContent({ data }: WallpaperContentTypes) {
    return (
        <Fragment>
            <div className="wallpaper-content">
                <div className="wallpaper-content__info-section">
                    <WallpaperInfo info={data} />
                </div>

                <div className="wallpaper-content__comment-section">
                    <WallpaperComments comments={data.comments} />
                </div>
            </div>
        </Fragment>
    );
}

export default WallpaperContent;
