# csr

Client side rendering template with ton of features.

## Locking Environment Versions

It's considered good practice to lock the versions of your environment tools, such as Node.js and pnpm. To do this,
you can specify the required versions in the `engines` field in `package.json` and configure enforcement using the
`.npmrc` file in your project's root.

If needed, you can disable strict version checks by setting `engine-strict=false` in `.npmrc`.

## For dev

1. clone project `git clone https://github.com/jquery-dlya-slabih/csr.git`
2. install pnpm 10.x version `npm install -g pnpm@latest-10`
3. install deps `pnpm install`
4. run dev `pnpm run dev`

## For prod

1. install deps `pnpm install`
2. pnpm build

## Commands

| description                   | command                    |
| ----------------------------- | -------------------------- |
| run dev build with dev server | `pnpm dev`                 |
| run prod build                | `pnpm build`               |
| run linting                   | `pnpm lint`                |
| run prettier check            | `pnpm prettier:check`      |
| run prettier write            | `pnpm prettier:write`      |
| run type checking             | `pnpm types`               |
| run bundle analyzer           | `pnpm analyze`             |
| run unit tests                | `pnpm test`                |
| show unit tests information   | `pnpm test:ui`             |
| run e2e tests                 | `pnpm e2e`                 |
| run e2e tests in ui           | `pnpm e2e:ui`              |
| show e2e tests information    | `pnpm e2e:report`          |
| run e2e codegen               | `pnpm e2e:codegen`         |
| generate assets for pwa       | `pnpm generate-pwa-assets` |

## Hooks

There is a `pre-push` hook in the `.githooks` folder. If you want to add another hook, for example `pre-commit`, then you need:

1. create a file with name `pre-commit` in `.githooks` folder
2. in project root use command `chmod +x .githooks/pre-commit`
3. fill new hook with any commands, like `pre-push` hook

If you want to delete all hooks:

1. remove `.githooks` folder
2. remove `prepare` command in `package.json`
3. in project root use command `git config --unset core.hooksPath`

## HTTPS

1. use command `sudo nano /etc/hosts`
2. add `127.0.0.1 csr-local.com`
3. save file
4. use command `pnpm dev`

A DNS reset may be necessary. On macOS, the simplest solution is to restart the system.

## Aliasing

For aliasing just add alias in file `tsconfig.app.json`.

## Test users

| login  | password   |
| ------ | ---------- |
| avat   | avatpass   |
| emilys | emilyspass |

## Tests

- Test runner https://vitest.dev/
- Render react components https://testing-library.com/docs/react-testing-library/intro/
- Custom matchers to test the state of the DOM https://github.com/testing-library/jest-dom
- E2E tests https://playwright.dev/

## Generating pwa assets

For generating pwa assets:

1. add to `public` folder your icon, name of icon must be `favicon.svg`
2. use command `pnpm generate-pwa-assets`

If you have any problems with canvas on macOS, use command `brew install pkg-config cairo pango libpng jpeg giflib librsvg`.

## Lightning CSS

Tailwind CSS v4.0 is designed for and tested on modern browsers, and the core functionality of the framework
specifically depends on these browser versions:

- Chrome 111 (released March 2023)
- Safari 16.4 (released March 2023)
- Firefox 128 (released July 2024)

For this reason, we need to transpile the code to older browsers. List of supported browsers
[here](https://browserslist.dev/?q=ZGVmYXVsdHMgYW5kIGZ1bGx5IHN1cHBvcnRzIGVzNi1tb2R1bGU%3D).

Alternatively, if you only need to support browsers compatible with Tailwind, you can safely remove Lightning CSS.

## SSG

Since **TanStack Router** doesn’t work on the server without **TanStack Start**, static generation isn’t possible.
In a separate repository, I demonstrated a concept of how this could be implemented using **React Router** as an example.

The **[master](https://github.com/jquery-dlya-slabih/ssg-example)** branch has an example without code splitting, while
the **[lazy](https://github.com/jquery-dlya-slabih/ssg-example/tree/lazy)** branch demonstrates its usage with code splitting.

## Contributing

Feel free to open an issue or submit PRs.
