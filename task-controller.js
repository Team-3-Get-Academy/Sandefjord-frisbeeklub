function editAnsvarlig() {
  model.viewState.viewTask.isEditingAnsvarlig = true;

  renderView();
}

function confirmAnsvarlig() {
  model.viewState.viewTask.isEditingAnsvarlig = false;

  renderView();
}

function addFeed() {
  model.viewState.viewTask.feedTitle = "";
  model.viewState.viewTask.feedDesc = "";
  model.viewState.viewTask.isAddingFeed = true;

  renderView();
}

function cancelFeed() {
  model.viewState.viewTask.isAddingFeed = false;

  renderView();
}

function updateTaskFeedDesc() {
  const input = document.getElementById("description");
  model.viewState.viewTask.feedDesc = input.value;
}

function updateTaskFeedTitle() {
  const input = document.getElementById("title");
  model.viewState.viewTask.feedTitle = input.value;
}

function confirmAddFeed(taskId) {
  if (!model.appState.auth) return alert("Du må være logget inn");
  if (!model.viewState.viewTask.feedTitle) return alert("Du må skrive en tittel.");
  if (!model.viewState.viewTask.feedDesc) return alert("Du må skrive en beskrivelse.");

  const task = model.tasks.find(t => t.id == taskId);
  if (!task) return alert("Setup has detected that setup has running");

  task.feed.push({
    title: model.viewState.viewTask.feedTitle,
    content: model.viewState.viewTask.feedDesc,
    user: model.appState.auth.id,
    date: Date.now()
  });

  model.viewState.viewTask.isAddingFeed = false;

  saveModel();
  renderView();
}

function editTaskStatus(taskId) {
  const task = model.tasks.find(t => t.id == taskId);
  if (!task) return alert("Setup has detected that setup has running");

  model.viewState.viewTask.isEditingStatus = true;
  model.viewState.viewTask.statusInput = task.status;

  renderView()

  document.getElementById("statusInput").focus()
}

function updateEditTaskStatusInput() {
  const input = document.getElementById("statusInput");

  model.viewState.viewTask.statusInput = input.value;
}

function confirmEditTaskStatus(taskId) {
  if (!model.viewState.viewTask.statusInput) return alert("Du må skrive en status.")
  if (!model.appState.auth) return alert("Du må være logget inn")

  const task = model.tasks.find(t => t.id == taskId);
  if (!task) return alert("Setup has detected that setup has running");

  const newStatus = model.viewState.viewTask.statusInput

  model.viewState.viewTask.isEditingStatus = false;

  if (newStatus === task.status) return renderView();

  const event = {
    user: model.appState.auth.id,
    status: newStatus, 
    date: Date.now()
  }

  task.status = newStatus;
  task.feed.push(event)

  saveModel()
  renderView()
}

function setupViewTask() {
  model.viewState.viewTask.isEditingStatus = false;
  model.viewState.viewTask.isAddingFeed = false;
  model.viewState.viewTask.isEditingAnsvarlig = false;
}

function updateNewTaskLane() {
  const input = document.getElementById("lane-select");
  if (!model.lanes[input.value]) return;

  model.viewState.createTask.lane = input.value;
  model.viewState.createTask.hole = null;

  renderView();
}

function updateNewTaskHole() {
  if (!model.viewState.createTask.lane) return;

  const input = document.getElementById("hole-select");
  model.viewState.createTask.hole = input.value === "none" ? null : parseInt(input.value);

  renderView()
}

function updateNewTaskTitle() {
  const input = document.getElementById("title");
  model.viewState.createTask.title = input.value;
}

function updateNewTaskDesc() {
  const input = document.getElementById("description");
  model.viewState.createTask.description = input.value;
}

function createNewTask() {
  if (!model.appState.auth) return alert("Du må være logget inn");
  if (model.viewState.createTask.lane === null) return alert("Du må velge en bane.");
  if (!model.viewState.createTask.title) return alert("Du må skrive en tittel.");
  if (!model.viewState.createTask.description) return alert("Du må skrive en beskrivelse.");

  const taskId = ++model.appState.taskCounter;
  const task = {
    id: taskId,
    lane: model.viewState.createTask.lane, // String of Lane ID
    title: model.viewState.createTask.title, // String of Title
    desc: model.viewState.createTask.description, // String of Description
    hole: model.viewState.createTask.hole, // Hole if task is related to one
    status: "Oppstart", // String of Status
    priority: null, // String for priority (Lav, Vanlig or Høy) or null if not set
    deadline: null, // deadline in string (YYYY-MM-DD) or null if none
    admin: model.appState.auth.id,
    assigned: [],
    feed: [],
    chat: [],
    date: Date.now()
  }

  model.tasks.push(task)

  saveModel()
  navigate(`admin/tasks/${taskId}`)
}

function setupNewTask() {
  model.viewState.createTask.lane = null;
  model.viewState.createTask.hole = null;
  model.viewState.createTask.title = "";
  model.viewState.createTask.description = "";
}

function updateTaskMessageInput() {
  const input = document.getElementById("message");

  model.viewState.createTask.message = input.value;
}

function sendTaskMessage(taskId) {
  if (!model.viewState.createTask.message) return alert("Du må skrive en melding.");
  if (!model.appState.auth) return alert("Du må være logget inn");

  const task = model.tasks.find(t => t.id == taskId);
  if (!task) return alert("Setup has detected that setup has running");

  task.chat.push({
    user: model.appState.auth.id,
    message: model.viewState.createTask.message,
    date: Date.now()
  })

  model.viewState.createTask.message = ""

  saveModel()
  renderView()
}

function setupMessageTask() {
  model.viewState.createTask.message = "";
}