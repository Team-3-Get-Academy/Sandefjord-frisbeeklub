function selectMessageFormLane(lane) {
  if (!model.lanes[lane]) return alert("Internal Error: Lane not found.")

  model.viewState.sendMessage.lane = lane;
  model.viewState.sendMessage.level = "topic";

  renderView()
}

function selectMessageFormTopic(subject) {
  model.viewState.sendMessage.subject = subject;
  model.viewState.sendMessage.level = "hole";

  renderView()
}

function selectMessageFormHole(hole) {
  if (model.viewState.sendMessage.hole === hole) {
    model.viewState.sendMessage.hole = null;
  } else {
    model.viewState.sendMessage.hole = hole;
  }

  renderView()
}

function confirmMessageFormHole() {
  if (typeof model.viewState.sendMessage.hole !== 'number') return alert("Du må velge et hull.")
  
  model.viewState.sendMessage.level = "message"

  renderView()
}

function selectMessageFormHoleOther() {
  model.viewState.sendMessage.hole = null
  model.viewState.sendMessage.level = "message"

  renderView()
}

function setLevel(level) {
  model.viewState.sendMessage.level = level;

  renderView()
}

function updateMessage() {
  const input = document.getElementById("message")
  
  model.viewState.sendMessage.message = input.value;
}

function selectMessageAttachments() {
  const input = document.createElement("input")
  input.type = "file"
  input.multiple = true
  
  input.addEventListener("change", () => {
    for (const file of input.files) {
      model.viewState.sendMessage.attachments.push(file)
    }

    renderView()
  })

  input.click()
}

function removeMessageAttachment(index) {
  model.viewState.sendMessage.attachments.splice(index, 1)

  renderView()
}

async function sendMessage() {
  const attachments = []

  for (const attachment of model.viewState.sendMessage.attachments) {
    attachments.push({name: attachment.name, data: await getFileDataURL(attachment)})
  }

  const msgId = ++model.appState.messageCounter;
  const msg = {
    userid: model.appState.auth ? model.appState.auth.id : null,
    messageid: msgId,
    lane: model.viewState.sendMessage.lane,
    subject: model.viewState.sendMessage.subject,
    hole: model.viewState.sendMessage.hole,
    message: model.viewState.sendMessage.message,
    attachments,
    status: "Ikke Tildelt",
    ansvarlig: null,
    date: Date.now(),
    references: [],
    timeline: []
  }

  model.messages.push(msg)

  model.viewState.sendMessage.level = "sent";

  saveModel();
  renderView();
}

function setupHome() {
  model.viewState.sendMessage.level = "lane";
  model.viewState.sendMessage.lane = null;
  model.viewState.sendMessage.subject = null;
  model.viewState.sendMessage.hole = null;
  model.viewState.sendMessage.message = "";
  model.viewState.sendMessage.attachments = [];
}