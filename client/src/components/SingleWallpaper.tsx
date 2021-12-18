import CoverImage from "./CoverImage";
import "../styles/SingleWallpaper.scss";

import wallpaperBg from "../assets/wallpaper-bg.jpg";
import avatar from "../assets/avatar.jpg";
import ContentWidthContainer from "./ContentWidthContainer";
import AuthBtns from "./AuthBtns";
import SectionTitle from "./SectionTitle";
import UserAvatar from "./UserAvatar";
import StandardTime from "./StandardTime";

function SingleWallpaper() {
    return (
        <div className="single-wallpaper">
            <div className="single-wallpaper__background">
                <CoverImage src={wallpaperBg} />

                <div className="single-wallpaper__background-overlay" />
            </div>

            <ContentWidthContainer>
                <div className="single-wallpaper__layout">
                    <div className="single-wallpaper__navbar">
                        <button className="single-wallpaper__go-back-btn">GO BACK</button>

                        <div>
                            <AuthBtns />
                        </div>
                    </div>

                    <div>
                        <div className="single-wallpaper__info">
                            <div className="single-wallpaper__title-and-category-container">
                                <SectionTitle>Darling In The Franxx</SectionTitle>

                                <p className="single-wallpaper__category">
                                    Anime Wallpaper
                                </p>
                            </div>

                            <div className="single-wallpaper__wallpaper-info">
                                <div className="single-wallpaper__publisher">
                                    <div className="single-wallpaper__user-avatar">
                                        <UserAvatar src={avatar} />
                                    </div>

                                    <div>
                                        <p className="single-wallpaper__username">
                                            By @Kara
                                        </p>

                                        <p className="single-wallpaper__wallpaper-publish-date">
                                            Published At{" "}
                                            <StandardTime time={Date.now()} />
                                        </p>
                                    </div>
                                </div>

                                <div className="single-wallpaper__btns-container">
                                    <div className="single-wallpaper__download-container">
                                        <button className="single-wallpaper__download-btn">
                                            Download Wallpaper
                                        </button>

                                        <p className="single-wallpaper__download-btn-description">
                                            High Resolution
                                        </p>
                                    </div>

                                    <div className="single-wallpaper__like-container">
                                        <button className="single-wallpaper__like-btn">
                                            Like
                                        </button>

                                        <p className="single-wallpaper__like-count">
                                            1.2k
                                        </p>
                                    </div>

                                    <div className="single-wallpaper__save-container">
                                        <button className="single-wallpaper__save-btn">
                                            Save
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="single-wallpaper__comments">
                            <div className="single-wallpaper__comment">
                                <div className="single-wallpaper__comment-publisher single-wallpaper__comment-publisher--with-form">
                                    <div className="single-wallpaper__user-avatar">
                                        <UserAvatar src={avatar} />
                                    </div>

                                    <div>
                                        <p className="single-wallpaper__username">
                                            By @Kara
                                        </p>

                                        <p className="single-wallpaper__wallpaper-publish-date">
                                            Published At{" "}
                                            <StandardTime time={Date.now()} />
                                        </p>
                                    </div>
                                </div>

                                <form className="single-wallpaper__message-form">
                                    <input
                                        className="single-wallpaper__user-message"
                                        placeholder="Say Something"
                                    />

                                    <button className="single-wallpaper__send-message-btn">
                                        SEND
                                    </button>
                                </form>
                            </div>

                            <div className="single-wallpaper__comment">
                                <div className="single-wallpaper__comment-publisher">
                                    <div className="single-wallpaper__user-avatar">
                                        <UserAvatar src={avatar} />
                                    </div>

                                    <div>
                                        <p className="single-wallpaper__username">
                                            By @Kara
                                        </p>

                                        <p className="single-wallpaper__wallpaper-publish-date">
                                            Published At{" "}
                                            <StandardTime time={Date.now()} />
                                        </p>
                                    </div>
                                </div>

                                <p className="single-wallpaper__message">
                                    Vestibulum sollicitudin, lectus quis dignissim
                                    lobortis, nisi lectus venenatis nulla, a dignissim
                                    enim tellus ut nisl dolor orci.
                                </p>
                            </div>

                            <div className="single-wallpaper__comment">
                                <div className="single-wallpaper__comment-publisher">
                                    <div className="single-wallpaper__user-avatar">
                                        <UserAvatar src={avatar} />
                                    </div>

                                    <div>
                                        <p className="single-wallpaper__username">
                                            By @Kara
                                        </p>

                                        <p className="single-wallpaper__wallpaper-publish-date">
                                            Published At{" "}
                                            <StandardTime time={Date.now()} />
                                        </p>
                                    </div>
                                </div>

                                <p className="single-wallpaper__message">
                                    Cras molestie sapien eget elit interdum, sit amet
                                    interdum justo facilisis.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </ContentWidthContainer>
        </div>
    );
}

export default SingleWallpaper;
