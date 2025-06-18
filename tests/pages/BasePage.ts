import { Page, Locator, expect } from '@playwright/test';

export class BasePage {
  readonly page: Page;
  readonly acceptCookies: Locator
  readonly defaultWaitTimeout: number

  constructor(page: Page){
    this.page = page;
    this.defaultWaitTimeout = 3000;
    this.acceptCookies = page.locator('#onetrust-accept-btn-handler')
  }

  async navigateTo(url): Promise<void>{
    await this.page.goto(url, { waitUntil: 'domcontentloaded' });
    await this.acceptCookies.waitFor({ state: 'visible' });
    await this.acceptCookies.click();
  }

  async waitForElementVisible(element: Locator, timeout: number = this.defaultWaitTimeout): Promise<void>{
    try{
      await expect(element).toBeVisible({ timeout: timeout });
    } catch (error) {
      console.error(`Error, element not visible: ${error}`);
      throw error;
    }
  }

  async getText(element: Locator): Promise<string> {
    try{
      await element.waitFor({ state: 'visible' });
      const text = await element.textContent();
      if (text === null) {
        throw new Error('Element textContent is null');
      }
      return text;
    } catch (error) {
      console.error(`Error getting text from element: ${error}`);
      throw error;
    }
  }

  async elementShouldNotBeVisible(element: Locator, timeout: number = this.defaultWaitTimeout): Promise<void>{
    try {
      await expect(element).toBeHidden({ timeout: timeout });
    } catch (error) {
      console.error(`Error, element is visible: ${error}`);
      throw error;
    }
  }

  async fillInput(element: Locator, value: string): Promise<void>{
    try {
      await element.waitFor({ state: 'visible' });
      await element.focus();
      await element.fill(value);
    } catch (error) {
      console.error(`Error while filling input: ${error}`);
      throw error;
    }
  }

  async clickElement(element: Locator): Promise<void> {
    try {
        await element.waitFor({ state: 'visible' });
        await element.click();
    } catch (error) {
        console.error(`Error while clicking element: ${error}`);
        throw error;
    }
}

  async selectDropDownOption(dropdownElement: Locator, value: string): Promise<void> {
    try {
        await dropdownElement.waitFor({ state: 'visible' });
        await dropdownElement.selectOption(value);
    } catch (error) {
        console.error(`Error selecting dropdown option: ${error}`);
        throw error;
    }
  }

  async selectCheckbox(element: Locator, shouldCheck: boolean = true): Promise<void> {
    try {
      await element.waitFor({ state: 'visible' });
      const isChecked = await element.isChecked();
      if (isChecked !== shouldCheck) {
        await element.click();
      }
    } catch (error) {
      console.error(`Error while selecting checkbox: ${error}`);
      throw error;
    }
  }

  async verifyTextContains(element: Locator, text: string): Promise<void> {
    try {
      await element.waitFor({ state: 'visible' });
      const elementText = await this.getText(element);
      expect(elementText).toContain(text);
    } catch (error) {
      console.error(`Error verifying text contains: ${error}`);
      throw error;
    }
  }
}
