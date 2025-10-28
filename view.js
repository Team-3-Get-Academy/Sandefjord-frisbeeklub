const NotFoundPage = () => "<div>Page not Found</div>"

/* copied from Stack Overflow */
function htmlEscape(text) {
  return String(text)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

const messageFormLevels = {
  lane: () => /*HTML*/`<div class="messageFormContainer">
        <h3>Velg Bane for Melding</h3>
        ${Object.entries(model.lanes).map(([id, lane]) => `<button onclick="selectMessageFormLane('${id}')">${lane.name}</button>`).join("")}
      </div>`,
  topic: () => /*HTML*/`<div class="messageFormContainer">
        <button onclick="setLevel('lane')">Gå tilbake</button>
        <h3>Velg Emne for Melding</h3>
        ${[...model.catagories, 'other'].map(c => `<button onclick="selectMessageFormTopic('${c}')">${c === 'other' ? 'Annet' : c}</button>`).join("")}
        <button onclick="selectMessageFormTopic(null)">Hopp over</button>
      </div>`,
  hole: () => /*HTML*/`<div class="messageFormContainer">
        <button onclick="setLevel('topic')">Gå tilbake</button>
        <h3>Velg Hull for Melding</h3>
        ${Array.from({length: model.viewState.sendMessage.lane.hull}).map((_, i) => `<button ${model.viewState.sendMessage.hole === (i + 1) ? 'class="selectedBtn"' : ''} onclick="selectMessageFormHole(${i + 1})">${i + 1}</button>`).join("")}
        <button onclick="selectMessageFormHoleOther()">Annet</button><button onclick="confirmMessageFormHole()">Bekreft</button>
      </div>`,
  message: () => /*HTML*/`<div class="messageFormContainer">
        <button onclick="setLevel('hole')">Gå tilbake</button>
        <h3>Skriv Melding</h3>
        <textarea oninput="updateMessage()" id="message">${htmlEscape(model.viewState.sendMessage.message)}</textarea>
        <button onclick="selectMessageAttachments()">Legg til vedlegg</button>
        <button onclick="sendMessage()">Send Melding</button>
      </div>`,
  sent: () => /*HTML*/`<p>Meldingen har blitt sendt.</p><button onclick="setupHome(); renderView()">OK</button>`
}

function HomePage() {
  return /*HTML*/`
    <div class="homepageContainer">
      ${model.viewState.sendMessage.level !== 'sent' ? '<h2 style="text-align: center">Send Melding til Sandefjord Frisbeeklub</h2>' : ''}
      ${messageFormLevels[model.viewState.sendMessage.level]?.() || ""}
    </div>
  `
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

function adminPanel(){
    return /*HTML*/ `<h2 style="text-align: center">Admin Panel</h2>
    <div class="navlinks">
      <a href="#adminMessage">Se Meldinger</a>
      <a href="#adminLanes">Administrer Baner</a>
      <a href="#adminUsers">Administrer Brukere</a>
    </div>
    `

}

function admMsg(){
  return /*HTML*/ `
  <h2>ADMIN1</h2>
  `
}

function admLanes(){
  return /*HTML*/ `
  <h2>ADMIN2</h2>
  `
}

function admUsers(){
  return /*HTML*/ `
  <h2>ADMIN3</h2>
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
        <a href="#admin" onclick="closeNavigation()">
          <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor"><path d="M680-280q25 0 42.5-17.5T740-340q0-25-17.5-42.5T680-400q-25 0-42.5 17.5T620-340q0 25 17.5 42.5T680-280Zm0 120q31 0 57-14.5t42-38.5q-22-13-47-20t-52-7q-27 0-52 7t-47 20q16 24 42 38.5t57 14.5ZM480-80q-139-35-229.5-159.5T160-516v-244l320-120 320 120v227q-19-8-39-14.5t-41-9.5v-147l-240-90-240 90v188q0 47 12.5 94t35 89.5Q310-290 342-254t71 60q11 32 29 61t41 52q-1 0-1.5.5t-1.5.5Zm200 0q-83 0-141.5-58.5T480-280q0-83 58.5-141.5T680-480q83 0 141.5 58.5T880-280q0 83-58.5 141.5T680-80ZM480-494Z"/></svg>
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