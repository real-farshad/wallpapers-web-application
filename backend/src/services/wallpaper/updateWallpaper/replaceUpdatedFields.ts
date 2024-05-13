const replaceUpdatedFields = (wallpaper: any, update: any) => {
  const updatedWallpaper = { ...wallpaper };

  if (update.title) updatedWallpaper.title = update.title;

  if (update.image) {
    const thumbnail = update.image.thumbnail;
    if (thumbnail) updatedWallpaper.image.thumbnail = thumbnail;

    const large = update.image.large;
    if (large) updatedWallpaper.image.large = large;
  }

  if (update.categoryId) updatedWallpaper.categoryId = update.categoryId;

  return updatedWallpaper;
};

export default replaceUpdatedFields;
