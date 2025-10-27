function selectMessageFormLane(lane) {
  if (!model.lanes[lane]) return alert("Internal Error: Lane not found.")

  model.viewState.sendMessage.lane = model.lanes[lane];
  model.viewState.sendMessage.level = "topic";

  renderView()
}

function selectMessageFormTopic(subject) {
  model.viewState.sendMessage.subject = subject;
  model.viewState.sendMessage.level = "hole";

  renderView()
}

function selectMessageFormHole(hole) {
  model.viewState.sendMessage.hole = hole;

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
    console.log(input.files)
  })

  input.click()
}

function sendMessage() {
  model.viewState.sendMessage.level = "sent";

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