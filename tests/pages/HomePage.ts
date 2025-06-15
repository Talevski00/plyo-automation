import { Page, Locator, expect } from "@playwright/test";
import { BasePage } from "./BasePage";

export class HomePage extends BasePage {
    readonly searchField: Locator;
    readonly searchButton: Locator;
    readonly forSaleButton: Locator;
    readonly toRentButton: Locator;
    readonly housePricesButton: Locator;

    constructor(page: Page) {
        super(page);
        this.searchField = this.page.getByLabel('Enter a location');
        this.searchButton = this.page.getByTestId('search-button')
    }

    async selectTab(tab: string): Promise<void> {
        const tabToSelect = this.page.getByText(tab, { exact: true }).locator('aria-selected=false');
        await this.elementShouldBeVisible(tabToSelect);
        await this.clickElement(tabToSelect);
    }

    async searchLocation(location: string): Promise<void> {
        await this.fillInput(this.searchField, location);
        await this.clickElement(this.searchButton);
    }

}