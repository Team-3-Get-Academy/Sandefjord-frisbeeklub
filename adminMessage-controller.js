function filterMessageTopic(topic) {

}

function updateMessageCommentInput() {
  const input = document.getElementById("messageCommentInput");

  model.viewState.viewMessages.commentInput = input.value;
}

function sendMessageComment(messageID) {
  if (!model.viewState.viewMessages.commentInput) return alert("Du må skrive en kommentar.");
  if (!model.appState.auth) return alert("Du må være logget inn")

  const message = model.messages.find(m => m.messageid === messageID)

  if (!message) return alert("Ukjent Melding")

  const comment = {
    userid: model.appState.auth.id,
    message: model.viewState.viewMessages.commentInput, 
    date: Date.now()
  }

  message.timeline.push(comment)
  model.viewState.viewMessages.commentInput = ""

  console.log({message, comment})

  saveModel()
  renderView()
}

function setupViewMessage() {
  model.viewState.viewMessages.commentInput = ""
}

function editStatus(messageID) {
  const message = model.messages.find(m => m.messageid === messageID)

  if (!message) return alert("Ukjent Melding")

  model.viewState.viewMessages.isEditingStatus = true;
  model.viewState.viewMessages.statusInput = message.status;

  renderView()

  document.getElementById("statusInput").focus()
}

function updateEditStatusInput() {
  const input = document.getElementById("statusInput");

  model.viewState.viewMessages.statusInput = input.value;
}

function confirmEditStatus(messageID) {
  if (!model.viewState.viewMessages.statusInput) return alert("Du må skrive en status.")
  if (!model.appState.auth) return alert("Du må være logget inn")

  const message = model.messages.find(m => m.messageid === messageID)

  if (!message) return alert("Ukjent Melding")

  const newStatus = model.viewState.viewMessages.statusInput

  model.viewState.viewMessages.isEditingStatus = false;

  if (newStatus === message.status) return renderView();

  const event = {
    userid: model.appState.auth.id,
    status: newStatus, 
    date: Date.now()
  }

  message.status = newStatus;
  message.timeline.push(event)

  renderView()
}