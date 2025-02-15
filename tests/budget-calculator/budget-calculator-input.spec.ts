import test, { expect } from "@playwright/test";
import { BudgetCalculatorPage } from "../../app/budgetCalculatorPage";

test("should show error if take home income input lower than $1,825", async ({ page }) => {
  const budgetCalculatorPage = new BudgetCalculatorPage(page);

  await budgetCalculatorPage.goto();
  await budgetCalculatorPage.cookieNoticeBanner.clickAgreeCookieButton();
  await budgetCalculatorPage.typeTakeHomeIncomeInput("1824");
  await budgetCalculatorPage.submitForm();

  await expect(budgetCalculatorPage.takeHomeIncomeInput.getErrorMessage()).toContainText("Please enter an income higher than $1825 to use this tool.");
});

test("should show error if take home income input higher than $28,850", async ({ page }) => {
  const budgetCalculatorPage = new BudgetCalculatorPage(page);

  await budgetCalculatorPage.goto();
  await budgetCalculatorPage.cookieNoticeBanner.clickAgreeCookieButton();
  await budgetCalculatorPage.typeTakeHomeIncomeInput("28851");
  await budgetCalculatorPage.submitForm();

  await expect(budgetCalculatorPage.takeHomeIncomeInput.getErrorMessage()).toContainText("Please enter an income lower than $28850.");
});

test("should show error if zip code input is invalid", async ({ page }) => {
  const budgetCalculatorPage = new BudgetCalculatorPage(page);

  await budgetCalculatorPage.goto();
  await budgetCalculatorPage.cookieNoticeBanner.clickAgreeCookieButton();
  await budgetCalculatorPage.typeZipCodeInput("111111");
  await budgetCalculatorPage.submitForm();

  await expect(budgetCalculatorPage.zipCodeInput.getErrorMessage()).toContainText("Please enter a valid ZIP Code");
});

test("should show error if zip code input is not in the system", async ({ page }) => {
  const budgetCalculatorPage = new BudgetCalculatorPage(page);

  await budgetCalculatorPage.goto();
  await budgetCalculatorPage.cookieNoticeBanner.clickAgreeCookieButton();
  await budgetCalculatorPage.typeZipCodeInput("11111");
  await budgetCalculatorPage.submitForm();

  await expect(budgetCalculatorPage.zipCodeInput.getErrorMessage()).toContainText("ZIP Code not found within our system");
});

test("should show error if form is empty", async ({ page }) => {
  const budgetCalculatorPage = new BudgetCalculatorPage(page);

  await budgetCalculatorPage.goto();
  await budgetCalculatorPage.cookieNoticeBanner.clickAgreeCookieButton();
  await budgetCalculatorPage.submitForm();

  await expect(budgetCalculatorPage.takeHomeIncomeInput.getErrorMessage()).toContainText("Please enter a valid number.");
  await expect(budgetCalculatorPage.zipCodeInput.getErrorMessage()).toContainText("Enter your ZIP Code to continue");
});
