/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useLoadingContext } from "../contexts/LoadingContext";
import searchWallpapers from "../api/searchWallpapers";
import ContentWidthContainer from "../components/ContentWidthContainer";
import HeaderContainer from "../components/HeaderContainer";
import StandardNavbar from "../components/StandardNavbar";
import MainContainer from "../components/MainContainer";
import SectionGrid from "../components/SectionGrid";
import SectionInfoContainer from "../components/SectionInfoContainer";
import SectionTitle from "../components/SectionTitle";
import WallpapersInfiniteScroll from "../components/WallpapersInfiniteScroll";
import FooterContainer from "../components/FooterContainer";
import CopyRight from "../components/CopyRight";

function New() {
  const { startLoading, finishLoading } = useLoadingContext();

  const sort = "new";
  const [page, setPage] = useState(1);
  const limit = 8;

  const [newWallpapers, setNewWallpapers] = useState([]);
  const [wallpapersFinished, setWallpapersFinished] = useState(false);

  useEffect(() => {
    (async () => {
      startLoading();
      await addNewWallpapers();
      finishLoading();
    })();
  }, []);

  useEffect(() => {
    if (page !== 1) addNewWallpapers();
  }, [page]);

  async function addNewWallpapers() {
    const wallpapers = await searchWallpapers({ sort, page, limit });
    setNewWallpapers((prevState) => [...prevState, ...(wallpapers as never[])]);

    if (wallpapers.length < limit) {
      setWallpapersFinished(true);
    }
  }

  return (
    <ContentWidthContainer>
      <HeaderContainer>
        <StandardNavbar />
      </HeaderContainer>

      <MainContainer>
        <SectionGrid>
          <SectionInfoContainer>
            <SectionTitle>
              MOST <br />
              RECENT <br />
              WALLPAPERS
            </SectionTitle>
          </SectionInfoContainer>

          <WallpapersInfiniteScroll
            wallpapers={newWallpapers}
            wallpapersFinished={wallpapersFinished}
            setPage={setPage}
          />
        </SectionGrid>
      </MainContainer>

      <FooterContainer>
        <CopyRight />
      </FooterContainer>
    </ContentWidthContainer>
  );
}

export default New;
