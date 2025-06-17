# PLYO-Automation (Playwright E2E Tests)

This project is a technical task for a job interview. The objective is to implement a functional and maintainable Playwright automation framework in TypeScript.

The target website under test is [Rightmove UK](https://www.rightmove.co.uk/), and the test suite covers property search filters, property detail verification, and contact form submission.

---

## 📁 Project Structure

```
tests/
├── fixtures/
│   └── testData.json         # Test data used across tests
├── pages/                    # Page Object Models
│   ├── BasePage.ts
│   ├── ContactFormPage.ts
│   ├── HomePage.ts
│   ├── PropertyDetailsPage.ts
│   ├── PropertyListPage.ts
│   └── SearchPage.ts
├── specs/                    # Test files
│   ├── propertyDetails.spec.ts
│   └── propertySearch.spec.ts
├── utils/
│   └── helpers.ts
.github/
└── workflows/
    └── playwright.yml        # GitHub Actions CI workflow
playwright.config.ts          # Playwright configuration
.env                          # Local environment variables (BASE_URL)
```

---

## ⚙️ Setup Instructions

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/plyo-automation.git
cd plyo-automation
```

### 2. Install Dependencies
```bash
npm ci
```

### 3. Install Playwright Browsers
```bash
npx playwright install --with-deps
```

### 4. Setup Environment Variable
Create a `.env` file in the root directory:

```env
BASE_URL=https://www.rightmove.co.uk/
```
> ✅ This is optional locally. The GitHub CI uses an environment variable defined in the `plyo` GitHub Actions environment.

---

## 🚀 Running Tests

### Run All Tests
```bash
npm test
```

### Run a Specific Test File
```bash
npm run test:property-search
npm run test:property-details
```

### Run in Headed or Debug Mode
```bash
npm run test:headed
npm run test:debug
```

### View HTML Report (after running tests)
```bash
npm run test:report
```

### Run Only @crossbrowser Tagged Test on All Browsers
```ts
// example inside a .spec.ts file
test('@crossbrowser should work on all browsers', async ({ page }) => {
  // test logic here
});
```
Only the Chromium project runs untagged tests. Firefox and WebKit only run `@crossbrowser`-tagged tests (configured in `playwright.config.ts`).

---

## ✅ GitHub Actions CI/CD

### Automatic Triggers:
- On push or pull request to `main` or `master`

### Manual Trigger:
You can trigger the workflow manually from the GitHub Actions tab:
- Click on "Run workflow"
- Provide optional inputs for `testFile` and `browser`

#### Example Inputs:
- `testFile`: `tests/specs/propertySearch.spec.ts`
- `browser`: `chromium`, `firefox`, or `webkit`

### Environment Variable Used:
- `BASE_URL` is configured under the GitHub environment named `plyo`

---

## ✅ Tech Stack
- Playwright
- TypeScript
- Node.js v20
- GitHub Actions (CI)

---

## 📄 License
This project is part of a job interview assignment and is not intended for public distribution.

