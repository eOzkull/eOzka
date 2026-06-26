# Contributing to eOzka

Thank you for your interest in contributing to eOzka! We welcome contributions to our open-source products, software infrastructure, and documentation.

## Code of Conduct

We expect all contributors to maintain a professional, respectful, and collaborative environment.

## Conventional Commits

We enforce the [Conventional Commits](https://www.conventionalcommits.org/) specification for all commit messages and Pull Request titles. Please use the following prefixes:

* `feat:` — A new feature or capability.
* `fix:` — A bug fix.
* `docs:` — Documentation changes.
* `style:` — Code style changes (formatting, missing semi-colons, etc.; no production code changes).
* `refactor:` — A code change that neither fixes a bug nor adds a feature.
* `perf:` — A code change that improves performance.
* `test:` — Adding missing tests or correcting existing tests.
* `chore:` — Changes to the build process, auxiliary tools, or libraries.

Example: `feat: add Google Analytics page view tracking`

## Development Workflow

1. **Fork & Clone:** Fork this repository and clone it locally.
2. **Install Dependencies:** Run `npm install`.
3. **Create a Branch:** Create a branch named after your feature or fix (e.g., `feat/analytics-router`).
4. **Make Changes:** Implement your changes. Maintain consistent coding standards and formatting.
5. **Format & Lint:**
   * Run `npm run format` to format the code using Prettier.
   * Run `npm run lint` to check for ESLint errors.
6. **Test Your Changes:** Run `npm run build` locally to verify that the project compiles cleanly.
7. **Submit a PR:** Push your branch to GitHub and open a Pull Request against the `main` branch.

## Linting & Formatting Standards

* We use **Prettier** for code formatting.
* We use **ESLint** for code quality checks.
* Avoid using `any` types in TypeScript.
* Ensure all files end with a newline.
* Keep component files clean, modular, and focused.
