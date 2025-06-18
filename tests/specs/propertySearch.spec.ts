import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage.ts';
import { SearchPage } from '../pages/SearchPage.ts';
import { BasePage } from '../pages/BasePage.ts';
import { PropertyListPage } from '../pages/PropertyListPage.ts';

import testData from '../fixtures/testData.json';

test.describe('Property Search', () => {
    let homePage: HomePage;
    let searchPage: SearchPage;
    let basePage: BasePage;
    let propertyListPage: PropertyListPage;

    test.beforeEach(async ({ page }) =>{
        homePage = new HomePage(page);
        searchPage = new SearchPage(page);
        basePage = new BasePage(page);
        propertyListPage = new PropertyListPage(page);
        await homePage.navigateTo(process.env.BASE_URL);
    });

    // testData.locationsWithPriceRanges.forEach(({ location, minPrice, maxPrice }, i) => {
    //     test(`User can search properties by location and price range, (${location})`, async ({ page }) => {
    //         await homePage.searchLocation(location, 'forSale');
    //         await page.waitForLoadState('domcontentloaded');
    //         await expect(page).toHaveTitle(`Find property for sale in ${location}`);
    //         await searchPage.applySearchFilters({minPrice: minPrice, maxPrice: maxPrice});
    //         await basePage.clickElement(searchPage.searchButton);
    //         await page.waitForLoadState('domcontentloaded');
    //         await propertyListPage.verifySearchedLocation(location);
    //         await propertyListPage.verifyAppliedSearchFilters({minPrice: minPrice, maxPrice: maxPrice});
    //     });
    // });

    test(`User can search properties by location and price range`, async ({ page }) => {
            await homePage.searchLocation(testData.locations[0], 'forSale');
            await page.waitForLoadState('domcontentloaded');
            await expect(page).toHaveTitle(`Find property for sale in ${testData.locations[0]}`);
            await searchPage.applySearchFilters(testData.priceRanges[1]);
            await basePage.clickElement(searchPage.searchButton);
            await page.waitForLoadState('domcontentloaded');
            await propertyListPage.verifySearchedLocation(testData.locations[0]);
            await propertyListPage.verifyAppliedSearchFilters(testData.priceRanges[1]);
    });

    test('Invalid search inputs show appropriate error messages', async ({ page }) => {
        await homePage.searchLocation(testData.invalidLocationInputs[0], 'toRent');
        await page.waitForLoadState('domcontentloaded');
        await searchPage.verifyTitle("Search using 'town name', 'postcode' or 'station'")
    });

    test('Search results display accurate property information', async ({ page }) => {
        await homePage.searchLocation(testData.locations[1], 'forSale');
        await searchPage.applySearchFilters(testData.propertyFilters[2]);
        await basePage.clickElement(searchPage.searchButton);
        await page.waitForLoadState('domcontentloaded');
        await propertyListPage.verifySearchedLocation(testData.locations[1]);
        await propertyListPage.verifyAppliedSearchFilters(testData.propertyFilters[2]);
    });

    test('@crossbrowser Property search works across different browsers', async ({ page }) => {
            await homePage.searchLocation(testData.locations[1], 'forSale');
            await page.waitForLoadState('domcontentloaded');
            await expect(page).toHaveTitle(`Find property for sale in ${testData.locations[1]}`);
            await searchPage.applySearchFilters(testData.propertyFilters[1]);
            await basePage.clickElement(searchPage.searchButton);
            await page.waitForLoadState('domcontentloaded');
    });
})
