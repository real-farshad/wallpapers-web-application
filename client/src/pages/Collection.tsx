/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useLoadingContext } from "../contexts/LoadingContext";
import getCollectionWallpapers from "../api/getCollectionWallpapers";
import getCollectionInfo from "../api/getCollectionInfo";
import ContentWidthContainer from "../components/ContentWidthContainer";
import CopyRight from "../components/CopyRight";
import FooterContainer from "../components/FooterContainer";
import HeaderContainer from "../components/HeaderContainer";
import WallpapersInfiniteScroll from "../components/WallpapersInfiniteScroll";
import MainContainer from "../components/MainContainer";
import StandardNavbar from "../components/StandardNavbar";
import SectionGrid from "../components/SectionGrid";
import SectionInfoContainer from "../components/SectionInfoContainer";
import SectionTitle from "../components/SectionTitle";
import "../styles/Collection.scss";

function Collection() {
  const { id } = useParams();

  const { startLoading, finishLoading } = useLoadingContext();

  const [page, setPage] = useState(1);
  const limit = 8;

  const [collectionInfo, setCollectionInfo] = useState(null as any);
  const [collectionWallpapers, setCollectionWallpapers] = useState([]);
  const [wallpapersFinished, setWallpapersFinished] = useState(false);

  useEffect(() => {
    (async () => {
      startLoading();
      await addCollectionInfo();
      finishLoading();
    })();
  }, []);

  useEffect(() => {
    addCollectionWallpapers();
  }, [page]);

  async function addCollectionInfo() {
    const collection = await getCollectionInfo(id as string);
    setCollectionInfo(collection);
  }

  async function addCollectionWallpapers() {
    const wallpapers = await getCollectionWallpapers({ id, page, limit });
    setCollectionWallpapers((prevCollectionWallpapers) => [
      ...prevCollectionWallpapers,
      ...(wallpapers as never[]),
    ]);

    if (wallpapers.length < 8) setWallpapersFinished(true);
  }

  if (!collectionInfo || collectionWallpapers.length === 0) return null;

  return (
    <ContentWidthContainer>
      <div className="collection">
        <HeaderContainer>
          <StandardNavbar />
        </HeaderContainer>

        <div className="collection__container">
          <MainContainer>
            <SectionGrid>
              <SectionInfoContainer>
                <SectionTitle>{collectionInfo.title}</SectionTitle>
              </SectionInfoContainer>

              <WallpapersInfiniteScroll
                wallpapers={collectionWallpapers}
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

export default Collection;
