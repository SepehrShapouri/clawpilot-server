# Express + Better Auth + Drizzle Starter Kit

🚀 A starter kit for building modern API backends with **Express 5**, **Better Auth**, and **Drizzle**.

## 📌 Features

- ✅ **Express 5**
- ✅ **Better Auth** for authentication
- ✅ **Drizzle** for database management
- ✅ TypeScript support

## 📦 Installation

1. Clone the repository:
    ```sh
    git clone https://github.com/mohbadreldeen/express-starter-better-auth-drizzle-pg.git
    cd express-starter-better-auth-drizzle-pg
    ```
2. Install dependencies:
    ```sh
    pnpm install
    ```
3. Set up environment variables:

    ```sh
    cp .env.example .env
    ```

    Fill in the necessary values in the `.env` file.

4. Start docker for Postgres image:

    ```sh
    docker compose up -d
    ```

5. Set up the database:

    ```sh
    pnpm dlx @better-auth/cli@latest generate
    ```

6. Start the development server:
    ```sh
    pnpm dev
    ```

## 🚀 Usage

- Run `pnpm dev` to start the development server.
- Use `pnpx db:studio` to manage your database visually.
- Customize authentication using Better Auth settings.

## 📦 Build and Run

```sh
pnpm build
pnpm start
```

## 🛠️ Tech Stack

- **Express 5** - Web framework
- **Better Auth** - Authentication
- **Drizzle** - Database ORM
- **TypeScript** - Type safety
- **Postgres** - DBMS

---

Made with ❤️ by [Mohamed Badreldeen](https://github.com/mohbadreldeen)
