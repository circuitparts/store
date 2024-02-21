# Contributing to Circuit Parts

Contributions are what makes the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

## About this repository

-   [npm](https://docs.npmjs.com/) for development.
-   [playwright](https://playwright.dev/) for e2e testing
-   [husky](https://github.com/typicode/husky) git hooks for consistent commits.
-   [changesets](https://github.com/changesets/changesets) for managing releases.

## House rules

-   Before submitting a new issue or PR, check if it already exists in [issues](https://github.com/circuitparts/store/issues) or [PRs](https://github.com/circuitparts/store/pulls).

## Priorities

<table>
  <tr>
    <td>
      Type of Issue
    </td>
    <td>
      Priority
    </td>
  </tr>
  <tr>
    <td>
      Minor improvements, non-core feature requests
    </td>
    <td>
      <a href="https://github.com/circuitparts/store/issues?q=is:issue+is:open+sort:updated-desc+label:%22Low+priority%22">
        <img src="https://img.shields.io/badge/-Low%20Priority-green">
      </a>
    </td>
  </tr>
   <tr>
    <td>
      Confusing UX (... but working)
    </td>
    <td>
      <a href="https://github.com/circuitparts/store/issues?q=is:issue+is:open+sort:updated-desc+label:%22Medium+priority%22">
        <img src="https://img.shields.io/badge/-Medium%20Priority-yellow">
      </a>
    </td>
  </tr>
  <tr>
    <td>
      Core Features (Order History, Upload BOM Feature, Account Settings)
    </td>
    <td>
      <a href="https://github.com/circuitparts/store/issues?q=is:issue+is:open+sort:updated-desc+label:%22High+priority%22">
        <img src="https://img.shields.io/badge/-High%20Priority-orange">
      </a>
    </td>
  </tr>
  <tr>
    <td>
      Core Bugs (Login, Signup, Emails are not working)
    </td>
    <td>
      <a href="https://github.com/circuitparts/store/issues?q=is:issue+is:open+sort:updated-desc+label:Urgent">
        <img src="https://img.shields.io/badge/-Urgent-red">
      </a>
    </td>
  </tr>
</table>

## Developing

The development branch is `main`. This is the branch that all pull
requests should be made against. The changes on the `main`
branch are tagged into a new release.

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

8. Run the development server:

    ```bash
    npm run dev
    ```

9. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Building

You can build the project with:

```bash
npm run build
```

Please be sure that you can make a full production build before pushing code.

## Testing

More info on how to add new tests coming soon.

### Running tests

This will run and test all flows in multiple Chromium windows to verify that no critical flow breaks:

```sh
npm test-e2e
```

## Linting

To check the formatting of your code:

```sh
npm run lint
```

If you get errors, be sure to fix them before committing.

## Making a Pull Request

-   Be sure to [check the "Allow edits from maintainers" option](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/working-with-forks/allowing-changes-to-a-pull-request-branch-created-from-a-fork) while creating your PR.
-   If your PR refers to or fixes an issue, be sure to add `refs #XXX` or `fixes #XXX` to the PR description. Replacing `XXX` with the respective issue number. See more about [Linking a pull request to an issue](https://docs.github.com/en/issues/tracking-your-work-with-issues/linking-a-pull-request-to-an-issue).
-   Be sure to fill the PR Template accordingly.

## Guidelines for committing npm lockfile

Do not commit your `package-lock.json` unless you've made changes to the `package.json`. If you've already committed `package-lock.json` unintentionally, follow these steps to undo:

If your last commit has the `package-lock.json` file alongside other files and you only wish to uncommit the `package-lock.json`:

```bash
git checkout HEAD~1 package-lock.json
git commit -m "Revert package-lock.json changes"
```

If you've pushed the commit with the `package-lock.json`:

1. Correct the commit locally using the above method.
2. Carefully force push:

```bash
git push origin <your-branch-name> --force
```

If `package-lock.json` was committed a while ago and there have been several commits since, you can use the following steps to revert just the `package-lock.json` changes without impacting the subsequent changes:

1. **Checkout a Previous Version**:

    - Find the commit hash before the `package-lock.json` was unintentionally committed. You can do this by viewing the Git log:
        ```bash
        git log package-lock.json
        ```
    - Once you have identified the commit hash, use it to checkout the previous version of `package-lock.json`:
        ```bash
        git checkout <commit_hash> package-lock.json
        ```

2. **Commit the Reverted Version**:

    - After checking out the previous version of the `package-lock.json`, commit this change:
        ```bash
        git commit -m "Revert package-lock.json to its state before unintended changes"
        ```

3. **Proceed with Caution**:
    - If you need to push this change, first pull the latest changes from your remote branch to ensure you're not overwriting other recent changes:
        ```bash
        git pull origin <your-branch-name>
        ```
    - Then push the updated branch:
        ```bash
        git push origin <your-branch-name>
        ```
