import { Page, Locator, expect } from "@playwright/test";
import { BasePage } from "./BasePage";

type SearchFilters = {
    searchRadius?: string;
    propertyType?: string;
    addedToSite?: string;
    minPrice?: string;
    maxPrice?: string;
    minBedrooms?: string;
    maxBedrooms?: string;
};

export class PropertyListPage extends BasePage {
    readonly location: Locator;
    readonly radius: Locator;
    readonly minPrice: Locator;
    readonly maxPrice: Locator;
    readonly minBedrooms: Locator;
    readonly maxBedrooms: Locator
    readonly filtersButton: Locator;
    readonly searchResultTitle: Locator;
    readonly resultsCount: Locator;
    readonly propertyCard: Locator;
    readonly propertyAddress: Locator;
    readonly propertyPrice: Locator;
    readonly propertyDescription: Locator;
    readonly propertyImage: Locator;
    readonly propertyContactButton: Locator
    readonly propertyFavouriteButton: Locator;
    readonly propertyCardIcon: Locator;
    readonly switchChannelButton: Locator;

    constructor(page: Page) {
        super(page);
        this.location = this.page.locator('#ta_searchInput');
        this.radius = this.page.getByTestId('filters-radius-select');
        this.minPrice = this.page.locator('#minPrice');
        this.maxPrice = this.page.locator('#maxPrice');
        this.minBedrooms = this.page.locator('#minBeds');
        this.maxBedrooms = this.page.locator('#maxBeds');
        this.searchResultTitle = this.page.getByTestId('search-description'); 
        this.resultsCount = this.page.locator('[class*="ResultsCount_resultsCount_"] > p');
        this.propertyCard = this.page.locator('.propertyCard-link');
        this.propertyAddress = this.page.locator('[class*="PropertyAddress"]');
        this.propertyPrice = this.page.locator('[class*="PropertyPrice_price__"]');
        this.propertyDescription = this.page.locator('[class*="PropertyCardSummary_summary__"]');
        this.propertyImage = this.page.getByTestId('image-swiper-container');
        this.propertyContactButton = this.page.getByTestId('contact-agent-text');
        this.propertyFavouriteButton = this.page.getByTestId('save-property-button');
        this.propertyCardIcon = this.page.locator('[class*="PropertyCardActions_estateAgent"]');
        this.switchChannelButton = this.page.locator('[class*="SwitchChannelCard_SwitchChannelCard"]');
    }

    async verifySearchedLocation(location: string): Promise<void> {
        await this.waitForElementVisible(this.location);
        expect(this.location).toHaveAttribute('placeholder', location);
        expect(this.searchResultTitle).toContainText(location);
    }

    async verifyAppliedSearchFilters(filters: SearchFilters): Promise<void> {
        if(filters.searchRadius) {
            await this.waitForElementVisible(this.radius);
            await expect(this.radius).toHaveValue(filters.searchRadius);
        }
        if(filters.minPrice){
            await this.waitForElementVisible(this.minPrice);
            await expect(this.minPrice).toHaveValue(filters.minPrice);
        }
        if(filters.maxPrice) {
            await this.waitForElementVisible(this.maxPrice);
            await expect(this.maxPrice).toHaveValue(filters.maxPrice);
        }
        if(filters.minBedrooms) {
            await this.waitForElementVisible(this.minBedrooms);
            await expect(this.minBedrooms).toHaveValue(filters.minBedrooms);
        }
        if(filters.maxBedrooms) {
            await this.waitForElementVisible(this.maxBedrooms);
            await expect(this.maxBedrooms).toHaveValue(filters.maxBedrooms);
        }
    }

    async selectProperty(): Promise<void> {
        try{
            await this.waitForElementVisible(this.propertyCard.first());
            await this.clickElement(this.propertyCard.first());
        } catch (error) {
            console.error(`Error while selecting a property: ${error}`);
            throw error;
        }
    }

    async getPropertyDetails(): Promise<{address: string, price: string}> {
        const address = await this.getText(this.propertyAddress.first());
        const price = await this.getText(this.propertyPrice.first());
        const description = await this.getText(this.propertyDescription.first());

        return {address: address.trim(), price: price.trim()}
    }
}