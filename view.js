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
        ${Array.from({length: model.lanes[model.viewState.sendMessage.lane].hull}).map((_, i) => `<button ${model.viewState.sendMessage.hole === (i + 1) ? 'class="selectedBtn"' : ''} onclick="selectMessageFormHole(${i + 1})">${i + 1}</button>`).join("")}
        <button onclick="selectMessageFormHoleOther()">Annet</button><button onclick="confirmMessageFormHole()">Bekreft</button>
      </div>`,
  message: () => /*HTML*/`<div class="messageFormContainer message">
        <button onclick="setLevel('hole')" style="align-self: start">Gå tilbake</button>
        <h3>Skriv Melding</h3>
        <textarea oninput="updateMessage()" id="message">${htmlEscape(model.viewState.sendMessage.message)}</textarea>
        ${model.viewState.sendMessage.attachments.map((file, i) => `<button onclick="removeMessageAttachment(${i})">Slett ${file.name}</button>`).join("")}
        <button onclick="selectMessageAttachments()">Legg til vedlegg</button>
        <button onclick="sendMessage()">Send Melding</button>
      </div>`,
  sent: () => /*HTML*/`<p>Meldingen har blitt sendt.</p><button onclick="setupHome(); renderView()">OK</button>`
}

function getInitals(username) {
  let parts = username.split(/\s/)

  if (parts.length > 2) {
    parts = [parts[0], parts[parts.length - 1]]
  }

  return parts.map(x=>x[0].toUpperCase()).join("")
}

const avatarColors = ["avatarBlue", "avatarRed", "avatarYellow", "avatarGreen"]

function AvatarComponent(properties) {
  if (!properties.user) return /*HTML*/`
  <div class="avatarText${properties.class ? ` ${properties.class}` : ''}">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" fill="#e8eaed"><path d="M480-480q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47ZM160-160v-112q0-34 17.5-62.5T224-378q62-31 126-46.5T480-440q66 0 130 15.5T736-378q29 15 46.5 43.5T800-272v112H160Zm80-80h480v-32q0-11-5.5-20T700-306q-54-27-109-40.5T480-360q-56 0-111 13.5T260-306q-9 5-14.5 14t-5.5 20v32Zm240-320q33 0 56.5-23.5T560-640q0-33-23.5-56.5T480-720q-33 0-56.5 23.5T400-640q0 33 23.5 56.5T480-560Zm0-80Zm0 400Z"/></svg>
  </div>
  `

  if (false && properties.user.picture) {

  } else {
    const avatarColor = avatarColors[properties.user.id % avatarColors.length] 
    return /*HTML*/`
    <div class="avatarText ${avatarColor}${properties.class ? ` ${properties.class}` : ''}">
      ${htmlEscape(getInitals(properties.user.username))}
    </div>
    `
  }
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
      <a href="#admin/messages">Se Meldinger</a>
      <a href="#admin/lanes">Administrer Baner</a>
      <a href="#admin/users">Administrer Brukere</a>
    </div>
    `

}

function forumButton(msg, href) {
  const user = msg.userid !== null ? model.users[msg.userid] : null;

  return /*HTML*/`<a class="forumButton" href="${href}">
  <div>
    <div>${htmlEscape(msg.message)}</div>
  </div>
  <div style="display: flex; align-items: center; gap: 6px">
  ${AvatarComponent({
    user
  })}
  <span>${user ? user.username : 'Gjest'}</span>
  </div>
  </a>${msg.attachments.map(x=>`<img src=${JSON.stringify(x.data)}><p>${htmlEscape(x.name)}</p>`).join("")}`
}

function filterMessagesByTopic(lane, topic) {
  const messages = model.messages.filter(m => userCanAccessLane(model.appState.auth, m.lane));
  
  return messages
}

const topicNames = {
  all: "Alle Meldinger",
  other: "Andre Meldinger"
}

function partitionByCatagory(messages) {
  let catagories = []
  
  for (const message of messages) {
    if (catagories.includes(message.subject)) continue;
    catagories.push(message.subject)
  }

  return catagories.map((topic) => {
    let topicName = topic;

    if (typeof topicName !== 'string') topicName = 'Uspesifisert'
    if (topicName === 'other') topicName = topicNames.other

    return {
      title: topicName,
      messages: messages.filter(m => m.subject === topic)
    }
  })
}

function partitionByLane(messages) {
  let lanes = []
  
  for (const message of messages) {
    if (lanes.includes(message.lane)) continue;
    lanes.push(message.lane)
  }

  return lanes.map((lane) => {
    return {
      title: model.lanes[lane].name,
      messages: messages.filter(m => m.lane === lane)
    }
  })
}

function adminMessages(params) {
  let lanes = partitionByLane(filterMessagesByTopic(params.lane, params.topic));

  return /*HTML*/`
  <h2 style="text-align: center">Meldinger</h2>
  ${lanes.map((lane) => /*HTML*/`
    <h2 style="font-weight: 600">${htmlEscape(lane.title)}</h2>
    ${partitionByCatagory(lane.messages).map((topic) => /*HTML*/`
      <h3>${htmlEscape(topic.title)}</h2>
      ${topic.messages.map(m => forumButton(m)).join("")}
    `).join("")}
  `).join("")}
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
        ${navMenuAdmin()}
      </div>
    </div>
  </div>`
}

function navMenuAdmin() {
  if (model.appState.auth != null && model.appState.auth.power != 0) {
    return /*HTML*/ `
    <a href="#admin" onclick="closeNavigation()">
          <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor"><path d="M680-280q25 0 42.5-17.5T740-340q0-25-17.5-42.5T680-400q-25 0-42.5 17.5T620-340q0 25 17.5 42.5T680-280Zm0 120q31 0 57-14.5t42-38.5q-22-13-47-20t-52-7q-27 0-52 7t-47 20q16 24 42 38.5t57 14.5ZM480-80q-139-35-229.5-159.5T160-516v-244l320-120 320 120v227q-19-8-39-14.5t-41-9.5v-147l-240-90-240 90v188q0 47 12.5 94t35 89.5Q310-290 342-254t71 60q11 32 29 61t41 52q-1 0-1.5.5t-1.5.5Zm200 0q-83 0-141.5-58.5T480-280q0-83 58.5-141.5T680-480q83 0 141.5 58.5T880-280q0 83-58.5 141.5T680-80ZM480-494Z"/></svg>
          Admin Panel
        </a>
    `
  }
  else {
    return ""
  }
}

function renderView() {
  const app = document.getElementById("app")
  app.innerHTML = /*HTML*/`
    ${navigationBar()}
    ${model.appState.navOpen ? navigationMenu() : ''}
    <div class="pageContainer">${model.appState.currentPage.view(model.appState.routeParams)}</div>
  `
}