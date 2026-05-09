import { Locator, Page, expect } from "@playwright/test";
import { faker } from "@faker-js/faker";

export class RegisterPage {
  readonly page: Page;
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly streetInput: Locator;
  readonly cityInput: Locator;
  readonly stateInput: Locator;
  readonly zipcodeInput: Locator;
  readonly phoneNumberInput: Locator;
  readonly ssnInput: Locator;
  readonly userNameInput: Locator;
  readonly passwordInput: Locator;
  readonly repeatedPasswordInput: Locator;
  readonly registerButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.firstNameInput = page.locator("#customer.firstName");
    this.lastNameInput = page.locator("#customer.lastName");
    this.streetInput = page.locator("#customer.address.street");
    this.cityInput = page.locator("#customer.address.city");
    this.stateInput = page.locator("#customer.address.state");
    this.zipcodeInput = page.locator("#customer.address.zipCode");
    this.phoneNumberInput = page.locator("#customer.phoneNumber");
    this.ssnInput = page.locator("#customer.ssn");
    this.userNameInput = page.locator("#customer.username");
    this.passwordInput = page.locator("#customer.password");
    this.repeatedPasswordInput = page.locator("#repeatedPassword");
    this.registerButton = page.getByRole("button", { name: "Register" });
  }

  async goto() {
    await this.page.goto("https://parabank.parasoft.com/parabank/register.htm");
  }

  async fillForm() {
    await this.firstNameInput.fill(faker.person.firstName());
    await this.lastNameInput.fill(faker.person.lastName());
    await this.streetInput.fill(faker.location.streetAddress());
    await this.cityInput.fill(faker.location.city());
    await this.zipcodeInput.fill(faker.location.zipCode());
    await this.phoneNumberInput.fill(faker.phone.number());
    await this.ssnInput.fill(faker.string.numeric(9));
  }

  async fillCredentials(username: string, password: string) {
    await this.userNameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.repeatedPasswordInput.fill(password);
  }

  async submitForm() {
    await this.registerButton.click();
  }
}
