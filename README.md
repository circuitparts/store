<a href="https://www.circuitparts.in">
  <h1 align="center">Circuit Parts | Open-source shopping platform for Embedded Electronics</h1>
</a>

<p align="center">
  Buy Electronic & Semiconductor Components, Order PCB Fabrication and Assembly Services. All at one place.
</p>

<p align="center">
  <a href="https://discord.gg/B4CCqBEH"><strong>Discord</strong></a> ·
  <a href="https://www.circuitparts.in"><strong>Website</strong></a> ·
  <a href="https://github.com/circuitparts/store/issues"><strong>Issues</strong></a> ·
  <a href="#roadmap"><strong>Roadmap</strong></a>
</p>

## About Circuit Parts

### The problem

Buying electronic & semiconductor components, getting Printed Circuit Boards(PCBs) manufactured and assembled can be a big challenge for product manufacturing companies or as a matter of fact to anyone in that industry. This is because they have to deal with many different suppliers and manufacturers, which can be slow and inefficient. Miscommunication, back-and-forth emails, delays, and errors are common, and these issues can delay product launches.

### The Solution

Say hello to Circuit Parts! It offers a convenient place for individuals and businesses to browse and select from a wide range of electronic parts, submit PCB designs for fabrication and assembly services. You can find more detailed information about our business on our <a href="https://www.circuitparts.in"><strong>website</strong></a>.

## The Project

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

[![CircuitParts](./public/images/screenshots/home.png)](https://circuitparts.in/)

## Built with 🛠️

-   [Next.js](https://nextjs.org) - React framework for building performant apps with the best developer experience
-   [Clerk](https://clerk.com) - Handle user authentication with ease with providers like Google, Twitter, GitHub, etc.
-   [Tailwind CSS](https://tailwindcss.com) - A utility-first CSS framework packed with classes
-   [MongoDB Atlas](https://www.mongodb.com/atlas/database) - Fully managed MongoDB in the cloud.
-   [Tailwind Headless UI](https://headlessui.com/) - unstyled, fully accessible UI components
-   [shadcn/ui](https://ui.shadcn.com) - Pre-built Component Library
-   [Upstash](https://upstash.com/) - Serverless Redis for Caching.
-   [Amazon S3](https://aws.amazon.com/s3/) - Object storage built to store and retrieve any amount of data from anywhere
-   [Formik](https://formik.org/) - Build forms in React.
-   [Yup](https://www.npmjs.com/package/yup) & [Zod](https://zod.dev/) - Schema builder for runtime value parsing and validation
-   [Resend](https://resend.com/) - Email for developers.
-   [Stripe](https://stripe.com) - Payments infrastucture for the internet.
-   [Playwright](https://playwright.dev/) - Reliable end-to-end testing for modern web apps.
-   [Vercel](https://vercel.com/) - Easily preview & deploy changes with git

## Stay Up-to-Date ⭐️

You can star this repository to keep track of its progress. Starring makes it easy to find a repository or topic again later.

![starring_ss](https://docs.github.com/assets/cb-8608/mw-1440/images/help/stars/starring-a-repository.webp)

## Getting Started 🚀

To get a local copy up and running, please follow these simple steps:

### Prerequisites

Here is what you need to be able to run circuit parts on your machine:

-   [Node.js 18.17](https://nodejs.org/) or later.
-   macOS, Windows (including WSL), and Linux are supported.
-   npm _(recommended)_

## Development 🧑🏻‍💻

### Setup

To develop locally:

1. [Fork](https://help.github.com/articles/fork-a-repo/) this repository to your own GitHub account by clicking the fork button located at the top right of this page and then [clone](https://help.github.com/articles/cloning-a-repository/) it to your local device.

2. Clone the repo

    ```sh
    git clone https://github.com/circuitparts/store.git
    ```

3. Go to the project folder

    ```sh
    cd store
    ```

4. Install packages with yarn

    ```sh
    npm install
    ```

5. Copy the `.env.example` to `.env`

    ```sh
     cp .env.example .env.local
    ```

6. Replace all the placeholders in the `.env` file with their respective keys. You can register for an account on their website and get a key to use it in your project.

7. Setup the database by following the instructions defined in [Setting up Database](#setting-up-database)

8. Run the development server. By default the app starts on port `3000`. If the port is busy it throws an error.
    ```bash
    npm run dev
    ```

9. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

Circuit Parts is built on top of the default directory structure created by ` create-next-app`.

### Top-level folders

Top-level folders are used to organize your application's code and static assets.

| Folder       | Description                                                                                           |
| ------------ | ----------------------------------------------------------------------------------------------------- |
| `app`        | This folder contains all the application pages.                                                       |
| `components` | This folder is for React components that are used across different pages in website.                  |
| `public`     | This folder is for static assets                                                                      |
| `content`    | This folder is for static content that is used in website, such as text content, markdown files, etc. |
| `context`    | This folder is for React context providers. It's a good place to put global state for app.            |
| `data`       | This folder is for static data used in application.                                                   |
| `lib`        | This folder is for library files that contain reusable logic.                                         |
| `types`      | This folder is for TypeScript type definitions.                                                       |

### Top-level files

Top-level files are used to configure the application, manage dependencies, run middleware, integrate monitoring tools, and define environment variables.

|                    |                                         |
| ------------------ | --------------------------------------- |
| **Next.js**        |                                         |
| `next.config.js`   | Configuration file for Next.js          |
| `package.json`     | Project dependencies and scripts        |
| `middleware.ts`    | Next.js request middleware              |
| `.env.local`       | Local environment variables             |
| `.eslintrc.json`   | Configuration file for ESLint           |
| `.eslintrc.ignore` | files to ignore from linting            |
| `.gitignore`       | Git files and folders to ignore         |
| `next-env.d.ts`    | TypeScript declaration file for Next.js |
| `tsconfig.json`    | Configuration file for TypeScript       |

## Contributing

Contributions are welcome! Please read our [CONTRIBUTING](./CONTRIBUTIONS.MD) guide for more information on how to contribute to this project.

## Setting up Database

## Roadmap

-   [] **Inventory Management** - Manage your inventory with our inventory management tool that seamlessly integrates with our ordering platform.
-   [] **Project Management** - Save multiple projects or part lists and then order them at your convenience with just couple of clicks.
-   [] **ECAD symbols, footprints & 3D models** - Download symbols, footprints, & 3D models for millions of electronic components.
-   [] **Extension for ECAD tools** - Extensions that integrate with your ECAD tools and seamlessly lets you order components and PCBs from within your CAD tools.
-   [] **Electronic Design Calculators** - No more manual calculations. Use our calculators to get the right values based on the current IPC standards.
-   [] **Continuous Improvements** - Circuit Parts is constantly growing and improving. We are always working on new features and improvements.

## How do I deploy this?

The easiest way to deploy your app is to use the [Vercel Platform](https://vercel.com/). Follow guidelines in their website for more information.
