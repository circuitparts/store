# Contributing to Circuit Parts

There are many ways to contribute to the Circuit Parts project: logging bugs, submitting pull requests, reporting issues, and creating suggestions.

After cloning and building the repo, check out the issues list. Issues labeled help wanted are good issues to submit a PR for. Issues labeled good first issue are great candidates to pick up if you are in the code for the first time. If you are contributing significant changes, or if the issue is already assigned to a specific assignee, please discuss with the assignee of the issue first before starting to work on the issue.

We would love for you to contribute to Circuit Parts and help make it even better than it is today! As a contributor, here are the guidelines we would like you to follow:

-   [Code of Conduct](#code-of-conduct)
-   [Question or Problem](#got-a-question-or-problem)
-   [Issues and Bugs](#found-a-bug-or-issue)
-   [Security](#security)
-   [Feature Requests](#feature-requests)
-   [Developer Guide](developer-guide.md)
-   [Submitting Guidelines](#submitting-guidelines)
-   [Coding Rules](#coding-rules)
-   [Commit Message Guidelines](#commit-message-guidelines)

## Code of Conduct

Help us keep Circuit Parts open and inclusive. Please read and follow our [Code of Conduct](coc.md).

## Got a Question or Problem?

Do not open issues for general support questions as we want to keep GitHub issues for bug reports and feature requests. You've got much better chances of getting your question answered on [Github Discussions](https://github.com/circuitparts/store/discussions) channel.

[Github Discussions](https://github.com/circuitparts/store/discussions) is a much better place to ask questions and engage in discussions since:

-   Your question will be more easily discoverable by those who can help in the community.
-   Questions and answers stay available for public viewing so your question / answer might help someone else.

To save your and our time, we will systematically close all issues that are requests for general support and redirect people to our [Github Discussions](https://github.com/circuitparts/store/discussions) channel.

## Found a Bug or Issue?

If you find a bug in the source code, you can help us by submitting an [issue](https://github.com/circuitparts/store/issues) to our [GitHub Repository](https://github.com/circuitparts/store). Even better, you can [submit a Pull Request](https://github.com/circuitparts/store/pulls) with a fix.

## Security

If you believe you have found a security vulnerability in the platform, we encourage you to **responsibly disclose this and NOT open a public issue**. We will investigate all legitimate reports. Email [help@circuitparts.in](mailto:help@circuitparts.in) to disclose any security vulnerabilities.

## Feature Requests

You can request a new feature by submitting an [issue](https://github.com/circuitparts/store/issues) to our [GitHub Repository](https://github.com/circuitparts/store). If you would like to implement a new feature, please submit an issue with a proposal for your work first, to be sure that we can use it. Please consider what kind of change it is:

-   For a **Major Feature**, first open an issue and outline your proposal so that it can be discussed. This will also allow us to better coordinate our efforts, prevent duplication of work, and help you to craft the change so that it is successfully accepted into the project.
-   **Small Features** can be crafted and directly [submitted as a Pull Request](<(https://github.com/circuitparts/store/pulls)>).

## Submitting Guidelines

### Submitting an Issue

Before you submit an issue, please search the issue tracker, maybe an issue for your problem already exists and the discussion might inform you of workarounds readily available.

We want to fix all the issues as soon as possible, but before fixing a bug we need to reproduce and confirm it. In order to reproduce bugs, we will systematically ask you to provide a minimal reproduction scenario. Having a live, reproducible scenario gives us a wealth of important information without going back & forth to you with additional questions like:

-   version of nextjs was used
-   3rd-party libraries and their versions
-   and most importantly - a use-case that fails

A minimal reproduce scenario allows us to quickly confirm a bug (or point out coding problem) as well as confirm that we are fixing the right problem. We will be insisting on a minimal reproduce scenario in order to save maintainers time and ultimately be able to fix more bugs. Interestingly, from our experience users often find coding problems themselves while preparing a minimal reproducable scenario. We understand that sometimes it might be hard to extract essentials bits of code from a larger code-base but we really need to isolate the problem before we can fix it.

Unfortunately, we are not able to investigate / fix bugs without a minimal reproduction, so if we don't hear back from you we are going to close an issue that doesn't have enough info to be reproduced.

You can file new issues by filling out our [new issue form](https://github.com/circuitparts/store/issues/new).

### Submitting a Pull Request(PR)

Before you submit your Pull Request (PR) consider the following guidelines:

1. Search [GitHub](https://github.com/circuitparts/store/pulls) for an open or closed PR that relates to your submission. You don't want to duplicate effort.
2. For the [circuitparts/store](https://github.com/circuitparts/store/fork) repo.
3. Follow the guidelines in our [Installation](../installation.mdx) document to set up your local environment for development.
4. Make your changes in a new git branch:

    ```sh
    git checkout -b my-fix-branch main
    ```

5. Create your patch, **including appropriate test cases**.
6. Follow our [Coding Guidelines](coding-guide.md).
7. Run the full test suite, as described in our our [Installation](../installation.mdx) document and ensure that all tests pass.
8. Do not commit your `package-lock.json` unless you've made changes to the `package.json`. If you've already committed `package-lock.json` unintentionally, please follow the steps outlined in the [Guidelines for committing npm lockfile](uncommit-guide.md) section to undo the commit.
9. Commit your changes using a descriptive commit message that follows our [commit message guidelines](commit-guide.md). Adherence to these conventions is necessary because release notes are automatically generated from these messages.

```sh
# example commit message
git add .
git reset -- package.lock
git commit -m "fix(content): correct minor typos in about page"
```

Note: the optional commit -a command line option will automatically "add" and "rm" edited files.

9. Push your branch to GitHub:

```sh
git push origin my-fix-branch
```

10. In GitHub, send a pull request to `circuitparts/store:main`.
11. If we suggest changes, then:

    -   Make the required updates.
    -   Re-run the test suite to ensure tests are still passing.
    -   Rebase your branch and force push to your GitHub repository (this will update your Pull Request):

    ```sh
    git rebase main -i
    git push origin my-fix-branch -f
    ```

    That's it! Thank you for your contribution!

### After your pull request is merged

After your pull request is merged, you can safely delete your branch and pull the changes from the main (upstream) repository:

-   Delete the remote branch on GitHub either through the GitHub web UI or your local shell as follows:

    ```sh
    git push origin --delete my-fix-branch
    ```

-   Check out the main branch:

    ```sh
    git checkout main
    ```

-   Delete the local branch:

    ```sh
    git branch -D my-fix-branch
    ```

-   Update your main with the latest upstream version:

    ```sh
    git pull --ff upstream main

    ```
