# Customisable Calendar Component

Vue 3 component for flexible and reusable date and time range selection. Supports multiple modes including:

- Year, Quarter, Month, Week, Day, Hour, Minute (with numeric value)
- Date ranges: from, to, from-to
- Shortcuts: "last-7-days", "this-month"
- Emits validated JSON structure via `v-model`

> Built with Vite, TypeScript, Vue 3 Composition API and TailwindCSS.

### Clone the repository and install dependencies:

````bash
git clone https://github.com/jaman7/calendar-vue.git .

---

## Project Setup

```bash
npm install
````

### Compile and Hot-Reload for Development

```bash
npm run dev
```

### Run Unit Tests

Run all tests using Vitest:

```bash
npm run test:unit
```

Open Vitest UI (interactive test runner):

```bash
npm run test:ui
```

### Type Check and Build for Production

```bash
npm run build
```

or in steps:

```bash
npm run type-check
npm run build-only
```

### Format Code

```bash
npm run format
```

### Lint and Fix Code (ESLint + Prettier)

```bash
npm run lint
```

---

## Scripts Summary

| Script       | Description                                |
| ------------ | ------------------------------------------ |
| `dev`        | Starts Vite dev server                     |
| `build`      | Runs type check and builds for production  |
| `build-only` | Builds production output only              |
| `preview`    | Preview production build with local server |
| `type-check` | Type checking via `vue-tsc`                |
| `test:unit`  | Run unit tests with Vitest                 |
| `test:ui`    | Open Vitest UI                             |
| `lint`       | Runs ESLint and auto-fix                   |
| `format`     | Runs Prettier to format code               |
| `prepare`    | Setup Husky Git hooks                      |

---

## Git Hooks & Lint Staged

Pre-commit checks are configured via **Husky**:

```bash
npx husky install
```

Then every commit will run `lint-staged` on:

- `*.{js,ts,vue}` → `eslint --fix`
- `*.{json,scss,html,md}` → `prettier --write`

---

## Testing

Tests use [Vitest](https://vitest.dev/) with:

- JSDOM environment
- Jest-like matchers via `@testing-library/jest-dom`
- `@vue/test-utils` for component testing

Test files live in:

```
src/components/__tests__/
```

Run coverage:

```bash
npx vitest run --coverage
```

---

## Recommended VSCode Extensions

```json
[
  "Vue.volar",
  "vitest.explorer",
  "esbenp.prettier-vscode",
  "dbaeumer.vscode-eslint",
  "stylelint.vscode-stylelint"
]
```

---

## File Structure

```
src/
  components/              # Main component and parts
  components/__tests__/    # Unit tests
  assets/scss/             # Tailwind and global styles
  App.vue                  # App usage example
  main.ts                  # Entry file
```

---

## Useful Links

- [Vue 3](https://vuejs.org/)
- [Vitest](https://vitest.dev/)
- [Vue Test Utils](https://test-utils.vuejs.org/)
- [TailwindCSS](https://tailwindcss.com/)
- [Date-fns](https://date-fns.org/)
- [Vite](https://vitejs.dev/)
