## Guidelines for uncommit npm lockfile

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
