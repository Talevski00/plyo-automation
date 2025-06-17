import { Page, Locator, expect } from "@playwright/test";
import { BasePage } from "./BasePage.ts";

export class HomePage extends BasePage {
    readonly searchField: Locator;
    readonly forSaleButton: Locator;
    readonly toRentButton: Locator;
    defaultWaitTimeout: number;

    constructor(page: Page) {
        super(page);
        this.searchField = this.page.getByTestId('typeahead-searchbox');
        this.forSaleButton = this.page.locator('//button[@data-testid="forSaleCta"]');
        this.toRentButton = this.page.getByTestId('toRentCta');
        this.defaultWaitTimeout = 2000;
    }

    async searchLocation(location: string, type: string): Promise<void> {
        await this.waitForElementVisible(this.searchField);
        await this.fillInput(this.searchField, location);
        if (type === 'forSale') {
            await this.page.waitForTimeout(this.defaultWaitTimeout);
            await expect(this.forSaleButton).toBeVisible();
            await this.clickElement(this.forSaleButton);
        } else if (type === 'toRent') {
            await this.page.waitForTimeout(this.defaultWaitTimeout);
            await expect(this.toRentButton).toBeVisible();
            await this.clickElement(this.toRentButton);
        } else {
            throw new Error('Invalid search type. Use "forSale" or "toRent".');
        }
    }
}