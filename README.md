# 🍇 Donna Vino E-Commerce - Frontend

Welcome to the official repository for **Donna Vino E-Commerce**. This project is dedicated to developing the frontend of our online wine store, providing users with a seamless shopping experience.

Deployed Version:

TBD

---

## ✨ Project Overview

At **Donna Vino**, we aim to redefine how people explore and enjoy wine. Through this platform, users will be able to:

- Purchase hand-picked premium wines through a seamless **eCommerce experience**.
- Browse and filter wines based on different categories and preferences.
- Enjoy a modern, responsive, and user-friendly shopping interface.

This repository contains the frontend codebase, including:

- UI/UX implementation
- API integration with the backend
- Deployment setup

---

## 🛠️ Tech Stack

- **Next.js**
- **React**
- **JavaScript**
- **Tailwind CSS**
- **Jest**
- **Cypress**

---

## 🚀 Setup Instructions

To get started locally:

1. **Clone this repository**:

   ```bash
   git clone https://github.com/Donna-Vino-Aps/donna-vino-ecommerce.git
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Run the development server**:

   ```bash
   npm run dev
   ```

   This command starts the development server, allowing you to view your project locally.

4. **Run code-style checks: ESLint and Prettier**:

   ```bash
   npm run code-style-check
   ```

   Use this command to analyze your code for potential issues and enforce coding standards.

5. **Run autofix to fix any issues with code-style**:

   ```bash
   npm run autofix
   ```

   Use this command to fix any issues with code-style checks. Proper code-style is mandatory so that the commit passes the checks.

6. **Run all Jest unit tests**:

   ```bash
   npm test
   ```

   This command runs all tests in watch mode.

7. **Run a specific test**:

   To run a specific test, use:

   ```bash
   npm test -- <test-name>
   ```

   Replace `<test-name>` with the name of the test file or test suite you want to execute.

8. **Run Cypress tests**:

   ```bash
   npx cypress open
   ```

   This opens the Cypress test runner, allowing you to execute and debug end-to-end tests.

---

## Workflow

1. **Update main**: Always make sure your `main` branch is up to date with the latest changes.
2. **Create a new branch**: For each feature, create a new branch from `main`.
3. **Work on your feature**: Commit your changes to the new branch.
4. **Create a pull request to main**: Once the feature is ready, open a PR to `main` for review and testing.
5. **Review-App Deployment**:
   - Each pull request will first run code-style checks, and only if they pass will it trigger the creation of a corresponding review app deployment, accessible from the pull request page.
   - Both the developer and the reviewer are responsible for **ensuring the review app deployment is working correctly before merging into `main`.**
6. **Update production from main**: The `production` branch will be updated only with tested code from `main` for an extra layer of security.

---

## 🛡️ Git Hooks with Husky

We use **Husky** to ensure code quality and consistency:

- Before every commit, **Prettier** and **ESLint** are run automatically to format and lint the code.
- Before every push, all tests are executed to verify that the code is ready for a pull request.

These automated checks help maintain a high-quality codebase and reduce potential errors in production.
