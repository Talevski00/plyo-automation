import { expect } from "@playwright/test";

export class Assert {

    constructor() {
    }

    async compareValues(value1: any, value2: any): Promise<void> {
        try {
            expect(value1).toBe(value2);
        }catch (error) {
            console.error(`Assertion failed: ${error}`);
            throw error;
        }
    }
}
