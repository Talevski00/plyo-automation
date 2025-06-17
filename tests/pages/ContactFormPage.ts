import { Page, Locator, expect } from "@playwright/test";
import { BasePage } from "./BasePage.ts";

type ContactFormData = {
  firstName?: string;
  lastName?: string;
  phone?: string;
  email?: string;
  country?: string;
  postcode?: string;
  message?: string;
  propertyToSell?: string;
  propertyToLet?: string;
  propertyValued?: boolean;
};


export class ContactFormPage extends BasePage {
    readonly contactFormTitle: Locator;
    readonly firstNameInput: Locator;
    readonly lastNameInput: Locator;
    readonly phoneInput: Locator;
    readonly emailInput: Locator;
    readonly countryDropdown: Locator;
    readonly postcodeInput: Locator;
    readonly messageInput: Locator;
    readonly propertyToSellDropdown: Locator;
    readonly propertyToLet: Locator;
    readonly propertyValuedCheckbox: Locator;
    readonly sendEmailButton: Locator;

    constructor(page: Page) {
        super(page);
        this.contactFormTitle = this.page.locator('//h1[contains(text(), "Contact ")]');
        this.firstNameInput = this.page.locator('#firstName');
        this.lastNameInput = this.page.locator('#lastName');
        this.phoneInput = this.page.locator('//input[@id="phone.number"]');
        this.emailInput = this.page.locator('#email');
        this.countryDropdown = this.page.getByTestId('country-dropdown');
        this.postcodeInput = this.page.locator('#manualAddress');
        this.messageInput = this.page.locator('#comments');
        this.propertyToSellDropdown = this.page.locator('//select[@id="sellingSituationType"]');
        this.propertyToLet = this.page.locator('//select[@id="rentingSituationType"]');
        this.propertyValuedCheckbox = this.page.locator('#valuationRequested');
        this.sendEmailButton = this.page.getByText('Send email');
    }

    async fillContactForm(data: ContactFormData): Promise<void> {
        if (data.firstName) {
            await this.fillInput(this.firstNameInput, data.firstName);
        }

        if (data.lastName) {
            await this.fillInput(this.lastNameInput, data.lastName);
        }

        if (data.phone) {
            await this.fillInput(this.phoneInput, data.phone);
        }

        if (data.email) {
            await this.fillInput(this.emailInput, data.email);
        }

        if (data.country) {
            await this.selectDropDownOption(this.countryDropdown, data.country);
        }

        if (data.postcode) {
            await this.postcodeInput.fill(data.postcode);
        }

        if (data.message) {
            await this.messageInput.fill(data.message);
        }

        if (data.propertyToSell) {
            await this.selectDropDownOption(this.propertyToSellDropdown, data.propertyToSell);
        }

        if (data.propertyToLet) {
            await this.selectDropDownOption(this.propertyToLet, data.propertyToLet);
        }

        if (data.propertyValued) {
            await this.selectCheckbox(this.propertyValuedCheckbox, data.propertyValued);
        }
}

    
}