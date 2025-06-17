import { Page, Locator, expect } from "@playwright/test";
import { BasePage } from "./BasePage";

export class PropertyDetailsPage extends BasePage {
    readonly images: Locator;
    readonly propertyAddress: Locator;
    readonly propertyPrice: Locator;
    readonly propertyInfo: Locator;
    readonly propertyDescription: Locator;
    readonly contactAgentCard: Locator;
    readonly requestDetailsButton: Locator;

    constructor(page: Page) {
        super(page);
        this.images = page.getByTestId('photo-collage');
        this.propertyAddress = page.locator('[itemprop="streetAddress"]');
        this.propertyPrice = page.locator('span', { hasText: /^£[\d,]+$/ }).nth(0);
        this.propertyInfo = page.locator('#info-reel');
        this.propertyDescription = page.getByTestId('primary-layout');
        this.contactAgentCard = page.locator('#contact-agent-aside');
        this.requestDetailsButton = page.getByText('Request details');
    }

    async getCurrentPropertyDetails(): Promise<{address: string, price: string}>  {
        const address = await this.getText(this.propertyAddress);
        const price = await this.getText(this.propertyPrice);
        return {address: address.trim(), price: price.trim()}
    }

    async verifyPropertyDetails(): Promise<void> {
        await this.waitForElementVisible(this.images);
        await this.waitForElementVisible(this.propertyAddress);
        await this.waitForElementVisible(this.propertyPrice);
        await this.waitForElementVisible(this.propertyInfo);
        await this.waitForElementVisible(this.propertyDescription);
        await this.waitForElementVisible(this.contactAgentCard);
    }
}