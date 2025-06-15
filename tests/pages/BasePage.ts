import { Page, Locator, expect } from '@playwright/test';

export class BasePage {
  readonly page: Page;
  readonly acceptCookies: Locator
  readonly defaultWaitTimeout: number = 3000;

  constructor(page: Page) {
    this.page = page;
    this.acceptCookies = this.page.getByLabel('Accept all')
  }

  async navigateTo(url): Promise<void> {
    await this.page.goto(url, { waitUntil: 'domcontentloaded' });

    await this.acceptCookies.waitFor({ state: 'visible' });
    await this.acceptCookies.click();
  }


  async waitForElementVisible(element: Locator, timeout?: 3000): Promise<void> {
    await expect(element).toBeVisible({ timeout: timeout });
  }

  async getText(element: Locator): Promise<string | null> {
    await element.waitFor({ state: 'visible' });
    return await element.textContent();
  }

  async elementShouldBeVisible(element: Locator, timeout?: 3000): Promise<void> {
    await expect(element).toBeVisible({ timeout: timeout });
  }

  async elementShouldNotBeVisible(element: Locator, timeout?: 3000): Promise<void> {
    await expect(element).toBeHidden({ timeout: timeout });
  }

  async fillInput(element: Locator, value: string): Promise<void> {
    await element.waitFor({ state: 'visible' });
    await element.fill(value);
  }

  async clickElement(element: Locator): Promise<void> {
    await element.waitFor({ state: 'visible' });
    await element.click();
  }
}
