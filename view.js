const NotFoundPage = () => "<div>Page not Found</div>"

function HomePage() {
  return /*HTML*/`test<a href="#login">test</a>`
}

function TestPage(params) {
  return `Test: ${JSON.stringify(params)}\nX: ${Date.now()}`
}

function StaticTestPage() {
  return "Static Test Page"
}

function toAttribute(val) {
  if (typeof val === 'string') return JSON.stringify(val);

  return JSON.stringify(val.toString())
}

function LoginPage() {
  return /*HTML*/`
  <label for="email">E-postadresse</label>
  <input oninput="updateLoginEmail()" id="email" value=${toAttribute(model.viewState.login.email)} name="email" required>
  <label for="password">Passord</label>
  <input
    oninput="updateLoginPassword()"
    id="password"
    value=${toAttribute(model.viewState.login.password)}
    name="password"
    type="password"
    required
  >
  <button onclick="loginButton()">Log inn</button>
  `
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