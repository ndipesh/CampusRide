<<<<<<< HEAD
# sv

Everything you need to build a Svelte project, powered by [`sv`](https://github.com/sveltejs/cli).

## Creating a project

If you're seeing this, you've probably already done this step. Congrats!

```sh
# create a new project
npx sv create my-app
```

To recreate this project with the same configuration:

```sh
# recreate this project
npx sv@0.15.1 create --template minimal --no-types --install npm frontend
```

## Developing

Once you've created a project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```sh
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Building

To create a production version of your app:

```sh
npm run build
```

You can preview the production build with `npm run preview`.

> To deploy your app, you may need to install an [adapter](https://svelte.dev/docs/kit/adapters) for your target environment.
=======
# Backend Starter

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Create your database

```bash
createdb <your-database-name>
```

### 3. Create your `.env` file

Create a file called `.env` in the project root (same level as `package.json`) with the following variables:

```
PORT=<port-number>
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=<your-postgres-username>
DB_PASSWORD=<your-postgres-password>
DB_NAME=<your-database-name>
COOKIE_SECRET=<a-long-random-string>
NODE_ENV=development
```

Replace the `<placeholder>` values with your own:

| Variable        | Description                                                     |
| --------------- | --------------------------------------------------------------- |
| `PORT`          | The port your server runs on (e.g., `3000`)                     |
| `DB_HOST`       | Where PostgreSQL is running (`localhost` for local development) |
| `DB_PORT`       | PostgreSQL's default port (`5432`)                              |
| `DB_USERNAME`   | Your PostgreSQL username                                        |
| `DB_PASSWORD`   | Your PostgreSQL password (leave blank if none)                  |
| `DB_NAME`       | Must match the database you created in step 2                   |
| `COOKIE_SECRET` | Any long random string — used to sign session cookies           |
| `NODE_ENV`      | `development` for local work & `production` for when we deploy  |

> **Do not commit your `.env` file.** It is already in `.gitignore`.

### 4. Compile and run

```bash
npm run compile
npm run start-dev
```

If the server starts without errors, you're good to go.

## Syncing Template Updates

When your instructor announces a template update, run:

```bash
npm run sync
```

This pulls the latest template files and installs any new dependencies. It will **not** touch your own code (controllers, models, entities, validators, etc.).

## Troubleshooting

**`DB_NAME is missing` or similar env error:**

- Make sure `.env` is in the project root, not inside `src/`
- Make sure there are no spaces around the `=` signs
- Make sure there are no quotes around the values

**`connection refused` or `database does not exist`:**

- Make sure PostgreSQL is running
- Make sure `DB_NAME` matches the database you created with `createdb`
- Make sure `DB_USERNAME` and `DB_PASSWORD` are correct

**`role "postgres" does not exist` (macOS):**

- Homebrew installs PostgreSQL with your macOS username as the default role, not `postgres`
- Use your macOS username for `DB_USERNAME` instead

## Available Scripts

| Script              | Description                                       |
| ------------------- | ------------------------------------------------- |
| `npm run compile`   | Compiles TypeScript to JavaScript                 |
| `npm run start-dev` | Starts the server (reloads on file changes)       |
| `npm run sync`      | Pulls latest template files from the starter repo |
>>>>>>> ef812f109130ee330e5929b36cd89b62ff2bbc8a
