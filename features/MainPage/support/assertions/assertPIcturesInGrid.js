import mainPage from "../../pageobjects/main.page";

export default async (numberOfPics) => {
    await expect(await mainPage.picturesInGrid).toHaveLength(numberOfPics);
};