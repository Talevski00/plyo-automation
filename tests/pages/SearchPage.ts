import { Page, Locator, expect } from "@playwright/test";
import { BasePage } from './BasePage.ts';

type SearchFilters = {
    searchRadius?: string;
    propertyType?: string;
    addedToSite?: string;
    minPrice?: string;
    maxPrice?: string;
    minBedrooms?: string;
    maxBedrooms?: string;
};

export class SearchPage extends BasePage {
    readonly title: Locator;
    readonly searchRadiusDropdown: Locator;
    readonly propertyTypeDropdown: Locator;
    readonly addedToSiteDropdown: Locator;
    readonly minPricerangeDropdown: Locator;
    readonly maxPricerangeDropdown: Locator;
    readonly minBedroomsDropdown: Locator;
    readonly maxBedroomsDropdown: Locator;
    readonly searchButton: Locator;

    constructor(page: Page){
        super(page);
        this.title = this.page.locator('[class*="Search_titleContainer"]');
        this.searchRadiusDropdown = this.page.getByTitle('Search radius');
        this.propertyTypeDropdown = this.page.getByTestId('propertyTypes');
        this.addedToSiteDropdown = this.page.locator('#maxDaysSinceAdded');
        this.minPricerangeDropdown = this.page.locator('select#minPrice');
        this.maxPricerangeDropdown = this.page.locator('select#maxPrice');
        this.minBedroomsDropdown = this.page.getByTestId('minBedrooms');
        this.maxBedroomsDropdown = this.page.getByTestId('maxBedrooms');
        this.searchButton = this.page.getByText('Search properties');
    }

    async verifyTitle(expectedTitle: string): Promise<void> {
        await this.waitForElementVisible(this.title);
        await expect(this.title).toHaveText(expectedTitle);
    }

    async applySearchFilters(filters: SearchFilters): Promise<void> {
        if(filters.searchRadius) {
            await this.waitForElementVisible(this.searchRadiusDropdown);
            await this.selectDropDownOption(this.searchRadiusDropdown, filters.searchRadius);
        }
        if (filters.propertyType) {
            await this.waitForElementVisible(this.propertyTypeDropdown);
            await this.selectDropDownOption(this.propertyTypeDropdown, filters.propertyType);
        }
        if (filters.addedToSite) {
            await this.waitForElementVisible(this.addedToSiteDropdown);
            await this.selectDropDownOption(this.addedToSiteDropdown, filters.addedToSite);
        }
        if (filters.minPrice) {
            await this.waitForElementVisible(this.minPricerangeDropdown);
            await this.selectDropDownOption(this.minPricerangeDropdown, filters.minPrice);
        }
        if (filters.maxPrice) {
            await this.waitForElementVisible(this.maxPricerangeDropdown);
            await this.selectDropDownOption(this.maxPricerangeDropdown, filters.maxPrice);
        }
        if (filters.minBedrooms) {
            await this.waitForElementVisible(this.minBedroomsDropdown);
            await this.selectDropDownOption(this.minBedroomsDropdown, filters.minBedrooms);
        }
        if (filters.maxBedrooms) {
            await this.waitForElementVisible(this.maxBedroomsDropdown);
            await this.selectDropDownOption(this.maxBedroomsDropdown, filters.maxBedrooms);
        }
    }
}