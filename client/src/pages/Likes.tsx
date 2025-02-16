/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useLoadingContext } from "../contexts/LoadingContext";
import getUserLikesCount from "../api/getUserLikesCount";
import getLikedWallpapers from "../api/getLikedWallpapers";
import ContentWidthContainer from "../components/ContentWidthContainer";
import CopyRight from "../components/CopyRight";
import FooterContainer from "../components/FooterContainer";
import HeaderContainer from "../components/HeaderContainer";
import MainContainer from "../components/MainContainer";
import SectionGrid from "../components/SectionGrid";
import SectionInfoContainer from "../components/SectionInfoContainer";
import SectionTitle from "../components/SectionTitle";
import StandardNavbar from "../components/StandardNavbar";
import WallpapersInfiniteScroll from "../components/WallpapersInfiniteScroll";
import "../styles/Likes.scss";

function Likes() {
  const { startLoading, finishLoading } = useLoadingContext();

  const [page, setPage] = useState(1);
  const limit = 8;

  const [userLikesCount, setUserLikesCount] = useState(0);
  const [wallpapers, setWallpapers] = useState([]);
  const [wallpapersFinished, setWallpapersFinished] = useState(false);

  useEffect(() => {
    (async () => {
      startLoading();

      await addUserLikesCount();
      await addLikedWallpapers();

      finishLoading();
    })();
  }, []);

  useEffect(() => {
    if (page !== 1) addLikedWallpapers();
  }, [page]);

  async function addUserLikesCount() {
    const count = await getUserLikesCount();
    setUserLikesCount(count);
  }

  async function addLikedWallpapers() {
    const wallpapers = await getLikedWallpapers(page, limit);
    setWallpapers((prevState) => [...prevState, ...(wallpapers as never[])]);

    if (wallpapers.length < limit) {
      setWallpapersFinished(true);
    }
  }

  return (
    <ContentWidthContainer>
      <div className="likes">
        <HeaderContainer>
          <StandardNavbar />
        </HeaderContainer>

        <div className="likes__container">
          <MainContainer>
            <SectionGrid>
              <SectionInfoContainer>
                <SectionTitle>
                  {userLikesCount} <br />
                  LIKED <br />
                  WALLPAPERS
                </SectionTitle>
              </SectionInfoContainer>

              <WallpapersInfiniteScroll
                wallpapers={wallpapers}
                wallpapersFinished={wallpapersFinished}
                setPage={setPage}
              />
            </SectionGrid>
          </MainContainer>

          <FooterContainer>
            <CopyRight />
          </FooterContainer>
        </div>
      </div>
    </ContentWidthContainer>
  );
}

export default Likes;
