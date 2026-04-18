npm init -y
npm init playwright@latest

npx playwright help

npx playwright test
npx playwright show-report

Run playwright in headed mode
npx playwright test --headed

APP_URL : https://katalon-demo-cura.herokuapp.com/
npx playwright test tests/demo/mytest.spec.ts --headed

npx playwright codegen
npx playwright codegen https://katalon-demo-cura.herokuapp.com/