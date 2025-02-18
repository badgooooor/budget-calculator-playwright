# budget-calculator-playwright

End-to-end testing project on [Earnin budget calculator website](https://www.earnin.com/financial-tools/budget-calculator) using Playwright.

## Features

- End-to-end test cases covered through
    - User flow, both from financial calculator page to see result in budget calculator page
    - Budget calculator form, focused on form validation for edge cases
    - Analytics event verification on navigated page (intercept `segment.io` requests)
- Visual testing in main user flow
    - This is included in user flow tests which will run in Github Action
    - Snapshot update workflow in case features or tests updated, user can comment `/approve-snapshots` to update snapshot.
      On success, Github Action will commit updated snapshots to branch
- Github Action for running test on commit pushed in main branch or pull request to main branch

## Documents

- [Requirement specification](./docs/requirement.md)
