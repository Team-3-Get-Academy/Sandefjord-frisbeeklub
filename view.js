const NotFoundPage = () => "<div>Page not Found</div>"

function HomePage() {
  return /*HTML*/``
}

function TestPage(params) {
  return `Test: ${JSON.stringify(params)}\nX: ${Date.now()}`
}

function StaticTestPage() {
  return "Static Test Page"
}

function navbar() {
  return /*HTML*/`<div class="navbar">
    <img src="./assets/logo.png">
    <h1>Sandefjord Frisbeeklub</h1>
  </div>`
}

function renderView() {
  const app = document.getElementById("app")
  app.innerHTML = /*HTML*/`
    ${navbar()}
    <div class="pageContainer">${model.appState.currentPage.view(model.appState.routeParams)}</div>
  `
}