CI/CD got this issue:

Run pnpm lint:all
$ pnpm -r lint
Scope: 2 of 3 workspace projects
back-end lint$ eslint .
front-end lint$ prettier --check . && eslint .
front-end lint: Checking formatting...
front-end lint: [warn] src/lib/modules/about-page/about-page.svelte
back-end lint: Done
front-end lint: [warn] Code style issues found in the above file. Run Prettier with --write to fix.
front-end lint: Failed
/home/runner/work/svelte-chd/svelte-chd/front-end:
[ERR_PNPM_RECURSIVE_RUN_FIRST_FAIL] chd-travel@1 lint: `prettier --check . && eslint .`
Exit status 1
[ELIFECYCLE] Command failed with exit code 1.
Error: Process completed with exit code 1.

---

and on company info removes thiss line "Services
Day Tours, Highland Tours, Eco-Tours, Custom Travel"
