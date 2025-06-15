import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { BasePage } from '../pages/BasePage';

import testData from '../fixtures/testData.json';

test.describe('Property Search Functionality', () => {
    let homePage: HomePage;
    let basePage: BasePage;

    test.beforeEach(async ({ page }) =>{
        homePage = new HomePage(page);
        basePage = new BasePage(page);
        await homePage.navigateTo(process.env.BASE_URL);
    })

    test('Search for properties in ', async ({ page } ) => {
        await homePage.searchLocation(testData.locations[0]);
        await basePage.waitForElementVisible(homePage.page.getByText('Properties for sale in ' + testData.locations[0]));
    })

    // testData.locations.forEach(location => {
    //     test('Search for properties in ' + location, async ({ page } ) => {
    //         await homePage.searchLocation(location);
    //         await basePage.waitForElementVisible(homePage.page.getByText('Properties for sale in ' + location));
    //     })
    // })
});
