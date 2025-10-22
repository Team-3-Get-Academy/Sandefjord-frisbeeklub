const NotFoundPage = () => "<div>Page not Found</div>"

function HomePage() {
  return /*HTML*/`Velkommen til Sandefjord Frisbeeklub`
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
  <form onsubmit="loginSubmit(event)">
    <label for="email">E-postadresse</label>
    <input
      oninput="updateLoginEmail()"
      id="email"
      value=${toAttribute(model.viewState.login.email)}
      name="email"
      type="email"
      required
    >
    <label for="password">Passord</label>
    <input
      oninput="updateLoginPassword()"
      id="password"
      value=${toAttribute(model.viewState.login.password)}
      name="password"
      type="password"
      required
    >
    <button>Log inn</button>
  </form>
  `
}

function navigationBar() {
  return /*HTML*/`<div class="navbar">
    <a href="#" src="./assets/logo.png" class="imgBtn">
      <img src="./assets/logo.png" style="pointer-events: none; vertical-align: bottom;"></a>
    </a>
    <h1>Sandefjord Frisbeeklub</h1>
    <button class="hamburger" style="margin-left: auto;" onclick="openNavigation()">
      <span></span>
      <span></span>
      <span></span>
    </button>
  </div>`
}

function navigationMenu() {
  return /*HTML*/`<div class="modalBackground" onclick="closeNavigation(event, this)">
    <div class="navmenu">
      <div class="info">
        <div style="font-size: 20px; margin-left: 10px">Navigasjon</div>
        <button class="hamburger" style="margin-left: auto;" onclick="closeNavigation()">
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
      <div class="navlinks">
        <a href="#login" onclick="closeNavigation()">Logg inn</a>
        <a>Registrer</a>
        <a>
          <span class="material-symbols-outlined">
            admin_panel_settings
          </span>
          Admin Panel
        </a>
      </div>
    </div>
  </div>`
}

function renderView() {
  const app = document.getElementById("app")
  app.innerHTML = /*HTML*/`
    ${navigationBar()}
    ${model.appState.navOpen ? navigationMenu() : ''}
    <div class="pageContainer">${model.appState.currentPage.view(model.appState.routeParams)}</div>
  `
}