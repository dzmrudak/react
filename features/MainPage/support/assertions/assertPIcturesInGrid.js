import mainPage from "../../pageobjects/main.page";

export default async (numberOfPics) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    expect(await mainPage.picturesInGrid).toHaveLength(numberOfPics);
};