import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage.ts';
import { SearchPage } from '../pages/SearchPage.ts';
import { BasePage } from '../pages/BasePage.ts';
import { PropertyListPage } from '../pages/PropertyListPage.ts';
import { PropertyDetailsPage } from '../pages/PropertyDetailsPage.ts'
import { ContactFormPage } from '../pages/ContactFormPage.ts';
import { Assert } from '../utils/helpers.ts';

import testData from '../fixtures/testData.json';

test.describe('Property Details', () => {
    let homePage: HomePage;
    let searchPage: SearchPage;
    let basePage: BasePage;
    let propertyListPage: PropertyListPage;
    let propertyDetailsPage: PropertyDetailsPage;
    let contactFormPage: ContactFormPage;
    let assert: Assert;

    test.beforeEach(async ({ page }) =>{
        homePage = new HomePage(page);
        searchPage = new SearchPage(page);
        basePage = new BasePage(page);
        propertyListPage = new PropertyListPage(page);
        propertyDetailsPage = new PropertyDetailsPage(page);
        contactFormPage = new ContactFormPage(page);
        assert = new Assert();
        await homePage.navigateTo(process.env.BASE_URL);
    });

    test('Property details page displays comprehensive information', async ({ page }) => {
        await homePage.searchLocation(testData.locations[0], 'forSale');
        await page.waitForLoadState('domcontentloaded');
        await basePage.clickElement(searchPage.searchButton);
        await page.waitForLoadState('domcontentloaded');
    
        const propertyListDetails = await propertyListPage.getPropertyDetails();
        await propertyListPage.selectProperty();

        await page.waitForLoadState('domcontentloaded');

        const selectedPropertyDetails = await propertyDetailsPage.getCurrentPropertyDetails();
        await assert.compareValues(JSON.stringify(propertyListDetails), JSON.stringify(selectedPropertyDetails));
        await propertyDetailsPage.verifyPropertyDetails();
    });

    test('Contact form submission works correctly', async ({ page }) => {
        await homePage.searchLocation(testData.locations[0], 'forSale');
        await page.waitForLoadState('domcontentloaded');
        await basePage.clickElement(searchPage.searchButton);
        await page.waitForLoadState('domcontentloaded');
        await propertyListPage.selectProperty();
        await basePage.clickElement(propertyDetailsPage.requestDetailsButton);
        await page.waitForLoadState('domcontentloaded');
        await contactFormPage.fillContactForm(testData.contactFormData);
        await basePage.waitForElementVisible(contactFormPage.sendEmailButton);
    })
});