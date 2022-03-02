type searchWallpapersTypes = ({
    title,
    sort,
    page,
    limit,
}: any) => Promise<any>;

const searchWallpapers: searchWallpapersTypes = async ({
    title,
    sort,
    page,
    limit,
}) => {
    const url = `/api/wallpapers/?title=${title}&sort=${sort}&page=${page}&limit=${limit}`;
    const res = await fetch(url);
    const wallpapers = await res.json();
    return wallpapers;
};

export default searchWallpapers;
