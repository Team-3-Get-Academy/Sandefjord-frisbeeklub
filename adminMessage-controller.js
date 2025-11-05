function filterMessageTopic(topic) {

}

function updateMessageCommentInput() {
  const input = document.getElementById("messageCommentInput");

  model.viewState.viewMessages.writeComment.comment = input.value;
}

function sendMessageComment(messageID) {
  if (!model.viewState.viewMessages.writeComment.comment) return alert("Du må skrive en kommentar.");
  if (!model.appState.auth) return alert("Du må være logget inn")

  const message = model.messages.find(m => m.messageid === messageID)

  console.log({message,messageID})

  if (!message) return alert("Ukjent Melding")

  const comment = {
    userid: model.appState.auth.id,
    message: model.viewState.viewMessages.writeComment.comment, 
    date: Date.now()
  }

  message.timeline.push(comment)
  model.viewState.viewMessages.writeComment.comment = ""

  console.log({message, comment})

  saveModel()
  renderView()
}

function setupViewMessage() {
  model.viewState.viewMessages.writeComment.comment = ""
}