function editAnsvarlig() {
  model.viewState.viewTask.isEditingAnsvarlig = true;

  renderView();
}

function confirmAnsvarlig() {
  model.viewState.viewTask.isEditingAnsvarlig = false;

  renderView();
}

function setupViewTask() {
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