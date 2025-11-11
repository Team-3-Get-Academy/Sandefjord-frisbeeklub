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
        <div class="buttonList">
          ${Object.entries(model.lanes).map(([id, lane]) => `<button onclick="selectMessageFormLane('${id}')">${lane.name}</button>`).join("")}
        </div>
      </div>`,
  topic: () => /*HTML*/`<div class="messageFormContainer">
        <button onclick="setLevel('lane')" class="formButton flex-hoz-center gap-5 mb-12 text-12" style="padding: 5px 8px"><svg xmlns="http://www.w3.org/2000/svg" height="18px" viewBox="0 -960 960 960" width="18px" fill="#e8eaed"><path d="m313-440 224 224-57 56-320-320 320-320 57 56-224 224h487v80H313Z"/></svg>Gå tilbake</button>
        <h3>Velg Emne for Melding</h3>
        <div class="buttonList">
        ${[...model.catagories, 'other'].map(c => `<button onclick="selectMessageFormTopic('${c}')">${c === 'other' ? 'Annet' : c}</button>`).join("")}
        </div>
        <button class="formButton" style="margin-top: 6px" onclick="selectMessageFormTopic(null)">Hopp over</button>
      </div>`,
  hole: () => /*HTML*/`<div class="messageFormContainer">
        <button onclick="setLevel('topic')" class="formButton flex-hoz-center gap-5 mb-12 text-12" style="padding: 5px 8px"><svg xmlns="http://www.w3.org/2000/svg" height="18px" viewBox="0 -960 960 960" width="18px" fill="#e8eaed"><path d="m313-440 224 224-57 56-320-320 320-320 57 56-224 224h487v80H313Z"/></svg>Gå tilbake</button>
        <h3>Velg Hull for Melding</h3>
        <div class="holeList" style="margin-bottom: 6px">
        ${Array.from({ length: model.lanes[model.viewState.sendMessage.lane].hull }).map((_, i) => `<button ${model.viewState.sendMessage.hole === (i + 1) ? 'class="selectedBtn"' : ''} onclick="selectMessageFormHole(${i + 1})">${i + 1}</button>`).join("")}
        </div>
        <button class="formButton" onclick="selectMessageFormHoleOther()">Annet</button><button style="margin-left: 6px" class="formButton" onclick="confirmMessageFormHole()">Bekreft</button>
      </div>`,
  message: () => /*HTML*/`<div class="messageFormContainer message">
        <button onclick="setLevel('hole')" class="formButton flex-hoz-center gap-5 mb-12 text-12" style="padding: 5px 8px; align-self: start"><svg xmlns="http://www.w3.org/2000/svg" height="18px" viewBox="0 -960 960 960" width="18px" fill="#e8eaed"><path d="m313-440 224 224-57 56-320-320 320-320 57 56-224 224h487v80H313Z"/></svg>Gå tilbake</button>
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

  return parts.map(x => x[0].toUpperCase()).join("")
}

const avatarColors = ["avatarBlue", "avatarRed", "avatarYellow", "avatarGreen"]

function AvatarComponent(properties) {
  if (!properties.user) return /*HTML*/`
  <div class="avatarText${properties.class ? ` ${properties.class}` : ''}" ${properties.extra || ''}>
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" fill="#e8eaed"><path d="M480-480q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47ZM160-160v-112q0-34 17.5-62.5T224-378q62-31 126-46.5T480-440q66 0 130 15.5T736-378q29 15 46.5 43.5T800-272v112H160Zm80-80h480v-32q0-11-5.5-20T700-306q-54-27-109-40.5T480-360q-56 0-111 13.5T260-306q-9 5-14.5 14t-5.5 20v32Zm240-320q33 0 56.5-23.5T560-640q0-33-23.5-56.5T480-720q-33 0-56.5 23.5T400-640q0 33 23.5 56.5T480-560Zm0-80Zm0 400Z"/></svg>
  </div>
  `

  if (false && properties.user.picture) {

  } else {
    const avatarColor = avatarColors[properties.user.id % avatarColors.length]
    return /*HTML*/`
    <div class="avatarText ${avatarColor}${properties.class ? ` ${properties.class}` : ''}" ${properties.extra || ''}>
      ${htmlEscape(getInitals(properties.user.username))}
      ${properties.extraInner || ''}
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

function registerPage() {
  return /*HTML*/`
  <h1>REGISTRER BRUKER</h1>
  <form onsubmit="registerSubmit(event)">
  <label for="username">Ønsket Brukernavn:</label><br>
    <input
      oninput="updateRegisterUser()"
      id="username"
      value=${toAttribute(model.viewState.register.username)}
      name="username"
      type="text"
      required
    >  
  <br><br>
  <label for="email">E-postadresse:</label><br>
    <input
      oninput="updateRegisterEmail()"
      id="email"
      value=${toAttribute(model.viewState.register.email)}
      name="email"
      type="email"
      required
    >
    <br><br>
    <label for="password">Passord:</label><br>
    <input
      oninput="updateRegisterPassword()"
      id="password"
      value=${toAttribute(model.viewState.register.password)}
      name="password"
      type="password"
      required
    >
    <br><br>
    <label for="gender">Kjønn:</label><br>
    <input type="radio" id="male" name="gender" value="GENDERS.MALE" onclick="updateRegisterGender(this.value)" required>Mann<br>
    <input type="radio" id="female" name="gender" value="GENDERS.FEMALE" onclick="updateRegisterGender(this.value)" required>Kvinne<br>
    <input type="radio" id="other" name="gender" value="GENDERS.OTHER" onclick="updateRegisterGender(this.value)" required>Annet<br>
    
    <br>
    <label for="age">Fødselsdato:</label><br>
    <input
      oninput="updateRegisterAge()"
      id="age"
      value=${toAttribute(model.viewState.register.dob)}
      name="age"
      type="date"
      required
    >
    <br><br><br>
    <button>Registrer Bruker</button>
  </form>
  `
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

function adminBreadcrumbs(breadcrumbs) {
  return /*HTML*/`<div class="breadcrumbs">
    ${breadcrumbs.map((b, i) => {
    if (i === breadcrumbs.length - 1) {
      return `<span>${htmlEscape(b.text)}</span>`
    } else {
      return `<a href="#${breadcrumbs.slice(0, i + 1).map(b => b.href).join("/")}">${b.text}</a>`
    }
  }).join(`<span class="seperator">/</span>`)}
  </div>`
}

function adminPanel() {
  return /*HTML*/ `
    ${adminBreadcrumbs([{
    text: "Admin Panel",
    href: "admin"
  }])}
    <h2 style="text-align: center">Admin Panel</h2>
    <div class="navlinks">
      <a href="#admin/messages">Se Meldinger</a>
      <a href="#admin/tasks">Se Oppgaver</a>
      <a href="#admin/lanes">Administrer Baner</a>
      <a href="#admin/users">Administrer Brukere</a>
    </div>
    `

}

function transformDataURL(data) {
  console.log(data)
  return ""
}

function newTask() {
  return /*HTML*/`
  ${adminBreadcrumbs([
    {
      text: "Admin Panel",
      href: "admin"
    },
    {
      text: "Oppgaver",
      href: "tasks"
    },
    {
      text: "Ny Oppgave",
      href: "@new"
    }
  ])}
  <h2 style="text-align: center">Ny Oppgave</h2>
  <div style="display: flex; flex-direction: column; padding: 16px;">
    <label for="lane-select">Velg bane:</label>
    <select id="lane-select" oninput="updateNewTaskLane()">
      <option value="" disabled ${model.viewState.createTask.lane ? '' : 'selected'} hidden>Ikke Valgt</option>
      ${listUserLanes(model.appState.auth).map((l => /*HTML*/`
        <option ${model.viewState.createTask.lane === l ? 'selected' : ''} value=${toAttribute(l)}>${htmlEscape(model.lanes[l].name)}</option>
      `))}
    </select>
    <label for="lane-select">Velg hull:</label>
    <select id="hole-select" oninput="updateNewTaskHole()">
      ${
        model.viewState.createTask.lane !== null ?
        /*HTML*/`
        <option ${model.viewState.createTask.hole === null ? 'selected' : ''} value="none">Generell</option>
        ${Array.from({ length: model.lanes[model.viewState.createTask.lane].hull }).map((_, i) => {
          return /*HTML*/`<option ${model.viewState.createTask.hole === i ? 'selected' : ''} value=${toAttribute(i)}>Hull #${i +1}</option>`
        })}
        ` :
        /*HTML*/`<option value="" disabled selected hidden>Du må velge en bane først.</option>`
    }
    </select>
    <label for="title">Tittel:</label>
    <input id="title" value=${toAttribute(model.viewState.createTask.title)} oninput="updateNewTaskTitle()">
    <label for="description">Beskrivelse:</label>
    <textarea oninput="updateNewTaskDesc()" style="resize: none; height: 100px" id="description">${htmlEscape(model.viewState.createTask.description)}</textarea>
    <button class="formButton" onclick="createNewTask()">Opprett Oppgave</button>
  </div>
  `
}

function filterTasks() {
  const tasks = model.tasks.filter(t => userCanAccessLane(model.appState.auth, t.lane));
  
  return tasks
}

function taskButton(msg) {
  const user = msg.admin !== null ? model.users.find(u => u.id == msg.admin) : null;

  let limit = document.body.clientWidth < 700 ? 2 : 5;

  const remainder = msg.assigned.length - limit;
  
  const assigned = remainder <= 1 ? msg.assigned : [
    ...msg.assigned.slice(0, limit),
    remainder <= 99 ? `+${remainder}` : "99+"
  ]

  return /*HTML*/`<a class="forumButton" href="#admin/tasks/${msg.id}">
  <div style="margin-bottom: 10px; display: flex; align-items: center; gap: 5px; flex-wrap: wrap;">
    <span class="tag mainTag">${htmlEscape(msg.status)}</span>
  </div>
  <div style="display: flex; width: 100%; align-items: center; margin-bottom: 5px;">
    <div style="flex-grow: 1; white-space: break-spaces; margin-right: 5px; font-weight: 600;">${htmlEscape(msg.title)}</div>
    <div class="assingees" onclick="event.preventDefault()" oncontextmenu="event.preventDefault()">
      ${assigned.map(assignee => {
        if (typeof assignee === "string") {
          return /*HTML*/`<div class="avatarText" name="${remainder} andre">
            ${assignee}
          </div>`
        }

        const user = model.users.find(u => u.id == assignee);

        return AvatarComponent({
          user,
          extra: `name=${toAttribute(user ? user.username : 'Ukjent')}`
        })
      }).join("")}
    </div>
  </div>
  <div style="display: flex; align-items: center; gap: 6px;">
  ${AvatarComponent({
    user
  })}
  <span>${user ? user.username : 'Ukjent'}</span>
  </div>
  <p style="font-size: 16px; white-space: break-spaces; margin: 0; margin-top: 12px">${new Date(msg.date).toString()}</p>
  </a>`// ${msg.attachments.map(x=>`<iframe src=${JSON.stringify(transformDataURL(x.data))}></iframe><p>${htmlEscape(x.name)}</p>`).join("")}
}

function adminTask(params) {
  const breadcrumbs = adminBreadcrumbs([
    {
      text: "Admin Panel",
      href: "admin"
    },
    {
      text: "Oppgaver",
      href: "tasks"
    },
    {
      text: `Oppgave ${params.task}`,
      href: encodeURIComponent(params.task)
    }
  ])

  const task = model.tasks.find(t => t.id == params.task);

  if (!task) return breadcrumbs + "<div>Ukjent Oppgave</div>"

  const owner = task.admin !== null ? model.users.find(u => u.id == task.admin) : null;

  if (model.viewState.viewTask.isEditingAnsvarlig) {
    return /*HTML*/`
    <div style="display: flex; flex-direction: column; height: 100%;">
      ${breadcrumbs}
      <div style="padding: 16px; display: flex; flex-direction: column; flex-grow: 1; overflow: hidden;">
        <h3 style="margin-bottom: 0">Ansvarlig for</h3>
        <h2 style="font-weight: 600; margin-top: 0">${htmlEscape(task.title)}</h2>
        <div class="assignedList">
          <div>
            <h3 style="margin: 0; margin-bottom: 12px; font-weight: 600; font-size: 16px; color: #d38a00">HOVEDANSVARLIG</h3>
            <div class="messageAuthor">
              ${AvatarComponent({
                user: owner
              })}
              <span style="font-size: 20px; margin-left: 12px; font-weight: 600;">${htmlEscape(owner ? owner.username : 'Ukjent')}</span>
            </div>
            ${
              canAdminTask(model.appState.auth, task) ?
              /*HTML*/`<button class="formButton">Endre</button>` :
              /*HTML*/`<p style="margin: 0; font-size: 16px; font-weight: 500; color: #ff3e3e">
                Du har ikke rettigheter til å administrer hovedansvarlig.
              </p>`
            }
          </div>
          ${task.assigned.map(assignee => {
            const user = model.users.find(u => u.id == assignee);

            return /*HTML*/`
            <div>
              <h3 style="margin: 0; margin-bottom: 12px; font-weight: 600; font-size: 16px; color: #2470d3">ANSVARLIG</h3>
              <div class="messageAuthor">
                ${AvatarComponent({
                  user
                })}
                <span style="font-size: 20px; margin-left: 12px; font-weight: 600;">${htmlEscape(user ? user.username : 'Ukjent')}</span>
              </div>
              ${
                canAdminTask(model.appState.auth, task) ?
                /*HTML*/`<button class="deleteButton">Slett Ansvarlig</button>` :
                /*HTML*/`<p style="margin: 0; font-size: 16px; font-weight: 500; color: #ff3e3e">
                  Du har ikke rettigheter til å administrer ansvarlige.
                </p>`
              }
            </div>
            `
          }).join("")}
          ${canAdminTask(model.appState.auth, task) ?
            /*HTML*/`<button class="flex-hoz-center">
            <svg style="margin-right: 16px" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="black"><path d="M440-440H240q-17 0-28.5-11.5T200-480q0-17 11.5-28.5T240-520h200v-200q0-17 11.5-28.5T480-760q17 0 28.5 11.5T520-720v200h200q17 0 28.5 11.5T760-480q0 17-11.5 28.5T720-440H520v200q0 17-11.5 28.5T480-200q-17 0-28.5-11.5T440-240v-200Z"/></svg>
            Legg til ansvarlig
          </button>` :
            /*HTML*/`<div style="margin: 0; font-size: 16px; font-weight: 500; color: #ff3e3e">
                Du har ikke rettigheter til å legge til ansvarlig.
              </div>`
          }
        </div>
        <button class="formButton" style="margin-top: 12px" onclick="confirmAnsvarlig()">Bekreft Endringer</button>
      </div>
    </div>
    `
  }

  let limit = Math.floor(document.body.clientWidth / 40) - 2;

  const remainder = task.assigned.length - limit;
  
  const assigned = [
    ...remainder <= 1 ? task.assigned : [
      ...task.assigned.slice(0, limit),
      remainder <= 99 ? `+${remainder}` : "99+"
    ],
    "EDIT"
  ]

  let feed = ""

  for (const item of [...task.feed].reverse()) {
    const itemUser = item.user !== null ? model.users.find(u => u.id == item.user) : null;

    feed += /*HTML*/`
    <div class="messageBox" style="margin-top: 16px">
      <div class="messageAuthor">
        ${AvatarComponent({
          user: itemUser
        })}
        <span style="font-size: 20px; margin-left: 12px; font-weight: 600">${itemUser ? itemUser.username : 'Ukjent'}</span>
      </div>
      <h2 style="font-weight: 600;">${htmlEscape(item.title)}</h2>
      <p>${htmlEscape(item.content)}</p>
      <p style="font-size: 16px; white-space: break-spaces; margin: 0; margin-top: 12px">${new Date(item.date).toString()}</p>
    </div>
    `
  }

  return /*HTML*/`
  ${breadcrumbs}
  <div class="message">
    <h2 style="margin: 0; font-weight: 600;">${model.lanes[task.lane].name}</h2>
    <h3 style="margin-top: 0;">${task.hole !== null ? `Hull #${task.hole}` : 'Generell Melding'}</h3>
    <p style="font-size: 18px; white-space: break-spaces;"><span style="font-weight: 600">Opprettet:</span> ${new Date(task.date).toString()}</p>
    <span class="tag mainTag">${htmlEscape(task.status)}</span><button class="editButton"><svg xmlns="http://www.w3.org/2000/svg" height="18px" viewBox="0 -960 960 960" width="18px" fill="currentColor"><path d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z"/></svg></button>
    <div class="ansvarligInfo">
      <span style="font-size: 20px; font-weight: 700; margin-right: 12px;">Hovedansvar:</span>
        ${AvatarComponent({
          user: owner
        })}
        <span style="font-size: 20px; margin-left: 6px; font-weight: 500">${owner ? owner.username : 'Ukjent'}</span>
    </div>
    <div class="assingees assingeesMain" onclick="event.preventDefault()" oncontextmenu="event.preventDefault()">
    ${assigned.map(assignee => {
      if (assignee === "EDIT") {
        return /*HTML*/`<div class="avatarText" onclick="editAnsvarlig()" style="background: #13c0e7;" name="Endre Ansvarlig">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" fill="currentColor"><path d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z"/></svg>
        </div>`
      }

        if (typeof assignee === "string") {
          return /*HTML*/`<div class="avatarText" name="${remainder} andre">
            ${assignee}
          </div>`
        }

        const user = model.users.find(u => u.id == assignee);

        return AvatarComponent({
          user,
          extra: `name=${toAttribute(user ? user.username : 'Ukjent')}`
        })
    }).join("")}
    </div>
    <h1 style="font-weight: 600;">${htmlEscape(task.title)}</h1>
    <p>${htmlEscape(task.desc)}</p>
    <h2 style="font-weight: 600; margin-top: 50px;">Oppdateringer</h2>
    ${feed}
  </div>
  `;
}

function adminTasks() {
  let lanes = partitionByLane(filterTasks());

  return /*HTML*/`
  ${adminBreadcrumbs([
    {
      text: "Admin Panel",
      href: "admin"
    },
    {
      text: "Oppgaver",
      href: "tasks"
    }
  ])}
  <a href="#admin/tasks/@new" class="formButton" style="margin-left: 16px; margin-top: 12px; display: inline-flex; align-items: center;"><svg style="margin-right: 6px" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z"/></svg>Lag ny oppgave</a>
  <h2 style="text-align: center">Oppgaver</h2>
  ${lanes.map((lane) => /*HTML*/`
    <h2 style="font-weight: 600">${htmlEscape(lane.title)}</h2>
    ${lane.messages.map(m => taskButton(m)).join("")}
  `).join("")}
  `
}

function forumButton(msg) {
  const user = msg.userid !== null ? model.users.find(u => u.id == msg.userid) : null;

  return /*HTML*/`<a class="forumButton" href="#admin/messages/${msg.messageid}">
  <div style="margin-bottom: 10px; display: flex; align-items: center; gap: 5px; flex-wrap: wrap;">
    <span class="tag mainTag">${htmlEscape(msg.status)}</span>
    ${msg.tags ? msg.tags.map(t => `<span class="tag">${htmlEscape(t)}</span>`).join("") : ''}
  </div>
  <div style="display: flex; width: 100%; align-items: center">
    <div style="flex-grow: 1; text-overflow: ellipsis; overflow: hidden; margin-right: 5px">${htmlEscape(msg.message)}</div>
  </div>
  <div style="display: flex; align-items: center; gap: 6px;">
  ${AvatarComponent({
    user
  })}
  <span>${user ? user.username : 'Gjest'}</span>
  </div>
  <p style="font-size: 16px; white-space: break-spaces; margin: 0; margin-top: 12px">${new Date(msg.date).toString()}</p>
  </a>`// ${msg.attachments.map(x=>`<iframe src=${JSON.stringify(transformDataURL(x.data))}></iframe><p>${htmlEscape(x.name)}</p>`).join("")}
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
  ${adminBreadcrumbs([
    {
      text: "Admin Panel",
      href: "admin"
    },
    {
      text: "Meldinger",
      href: "messages"
    }
  ])}
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

function userRolesComponent(user, message, extraStyles = "") {
  const roles = getMessageRoles(user, message)

  return roles.map(role => `<span class="userRole" style="color: ${role === "OP" ? '#2470d3' : '#d38a00'}; ${extraStyles}">&nbsp;${role}</span>`).join("")
}

function adminMessage(params) {
  const breadcrumbs = adminBreadcrumbs([
    {
      text: "Admin Panel",
      href: "admin"
    },
    {
      text: "Meldinger",
      href: "messages"
    },
    {
      text: `Melding ${params.message}`,
      href: encodeURIComponent(params.message)
    }
  ])

  const message = model.messages.find(m => m.messageid == params.message);
  if (!message) return breadcrumbs + "<div>Ukjent Melding</div>";

  const user = message.userid !== null ? model.users.find(u => u.id === message.userid) : null;
  const ansvarlig = message.ansvarlig !== null ? model.users.find(u => u.id === message.ansvarlig) : null

  let extras = ""

  for (const item of message.timeline) {
    const itemUser = model.users.find(u => u.id === item.userid)

    if (item.message) {
      extras += /*HTML*/`
      <div class="messageBox" style="margin-top: 16px">
        <div class="messageAuthor">
          ${AvatarComponent({
        user: itemUser
      })}
          <span style="font-size: 20px; margin-left: 12px; font-weight: 600">${itemUser ? itemUser.username : 'Ukjent'}</span>${userRolesComponent(itemUser, message)}
        </div>
        <div style="font-size: 18px; font-weight: 500; white-space: break-spaces; word-wrap: break-word;">${htmlEscape(item.message)}</div>
        <p style="font-size: 16px; white-space: break-spaces; margin: 0; margin-top: 12px">${new Date(item.date).toString()}</p>
      </div>
      `
    } else if (item.status) {
      extras += /*HTML*/`
      <div class="messageUpdateInfo" style="margin-top: 16px">
      ${AvatarComponent({
        user: itemUser
      })}
      <div>
        <div class="messageUpdateContainer">
          <span style="margin-right: 4px;">
            <span style="font-weight: 600">${itemUser ? itemUser.username : 'Ukjent'}</span>${userRolesComponent(itemUser, message, extraStyles = "font-size: 12px;")}
          </span>
          <span style="margin-right: 8px; font-weight: 500">endret status til</span>
          <span class="tag mainTag">${htmlEscape(item.status)}</span>
        </div>
        <p style="font-size: 12px; white-space: break-spaces; margin: 0;">${new Date(item.date).toString()}</p>
      </div>
      </div>
      `
    }
  }
  return /*HTML*/`
  ${breadcrumbs}
  <div class="message">
    ${model.viewState.viewMessages.isEditingStatus ?
      `<input style="width: 100px" value=${toAttribute(model.viewState.viewMessages.statusInput)} id="statusInput" oninput="updateEditStatusInput()" class="tag mainTag"><button class="confirmButton" onclick="confirmEditStatus(${message.messageid})"><svg xmlns="http://www.w3.org/2000/svg" height="18px" viewBox="0 -960 960 960" width="18px" fill="currentColor"><path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z"/></svg></button>` :
      `<span class="tag mainTag">${htmlEscape(message.status)}</span><button class="editButton" onclick="editStatus(${message.messageid})"><svg xmlns="http://www.w3.org/2000/svg" height="18px" viewBox="0 -960 960 960" width="18px" fill="currentColor"><path d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z"/></svg></button>`
    }
    <div style="display: flex; align-items: center; gap: 5px; flex-wrap: wrap; padding: 16px 0;">
      ${message.tags ? message.tags.map(t => `<span class="tag flex-hoz-center" style="padding: 6px 4px 6px 8px">${t}<svg class="removeBtn" xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="currentColor"><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/></svg></span>`).join("") : ''}
      <span class="tag flex-hoz-center addTag"><svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="currentColor"><path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z"/></svg>Legg til</span>
    </div>
    <div class="messageBox">
      <div class="messageAuthor">
        ${AvatarComponent({
      user
    })}
        <span style="font-size: 20px; margin-left: 12px; font-weight: 600">${user ? user.username : 'Gjest'}</span>${userRolesComponent(user, message)}
      </div>
      <div style="font-size: 18px; font-weight: 500; white-space: break-spaces; word-wrap: break-word;">${htmlEscape(message.message)}</div>
      <p style="font-size: 16px; white-space: break-spaces; margin: 0; margin-top: 12px">${new Date(message.date).toString()}</p>
    </div>
    ${extras}
    <h3 style="font-weight: 500; margin: 30px 0 10px 0;">Legg til kommentar</h3>
    <textarea id="messageCommentInput" oninput="updateMessageCommentInput()" style="resize: none; width: 100%; font-size: 18px; font-weight: 500;" class="messageBox" placeholder="Skriv kommentar her">${htmlEscape(model.viewState.viewMessages.commentInput)}</textarea>
    <button class="formButton" style="margin-top: 6px" onclick="sendMessageComment(${message.messageid})">Send kommentar</button>
  </div>
  `
}

function admLanes() {
  return /*HTML*/ `
  ${adminBreadcrumbs([
    {
      text: "Admin Panel",
      href: "admin"
    },
    {
      text: "Baner",
      href: "lanes"
    }
  ])}
  <h2>ADMIN2</h2>
  `
}

function admUsers() {
  return /*HTML*/ `
  ${adminBreadcrumbs([
    {
      text: "Admin Panel",
      href: "admin"
    },
    {
      text: "Brukere",
      href: "users"
    }
  ])}
  <h2>Administrer Brukere</h2>
  <div>
    <p>Velg Bruker:</p>
    <div class="admContainer">
    <br>
      ${userList()}
    </div>
  </div>
  `
}

function admManage(user) {
  return /*HTML*/`
  <h2>Administrer bruker: </h2>
  
  `
}

function navigationBar() {
  return /*HTML*/`<div class="navbar">
    <a href="#" src="./assets/logo.png" class="imgBtn">
      <img src="./assets/logo.png" style="pointer-events: none; vertical-align: bottom;"></a>
    </a>
    <h1>Sandefjord Frisbeeklub</h1>
    <h3 style="max-width: 50%">${navUserDisplay()}</h3>
    <button class="hamburger" style="margin-left: 5%;" onclick="openNavigation()">
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
      ${navMenuAuthCheck()}
      ${navMenuAdmin()}
      </div>
      </div>
      </div>`
}

function navMenuAuthCheck() {
  if (model.appState.auth == null) {
    return /*HTML*/ `
        <a href="#login" onclick="closeNavigation()">Logg inn</a>
        <a href="#register" onclick="closeNavigation()">Registrer</a>`
  }
  else {
    return /*HTML*/ `
    <a href="" onclick="logout()">Logg Ut</a>
    `
  }
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

function navUserDisplay() {
  let user = ""
  if (model.appState.auth != null) {
    user = model.appState.auth.username
    return "Velkommen, " + user
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