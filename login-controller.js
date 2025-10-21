function updateLoginEmail() {
  const input = document.getElementById("email")
  
  model.viewState.login.email = input.value;
}

function updateLoginPassword() {
  const input = document.getElementById("password")
  
  model.viewState.login.password = input.value;
}

function loginButton() {
  const email = model.viewState.login.email;
  const password = model.viewState.login.password;

  const user = model.users.find(u => u.email === email);

  if (!user) return alert("Ingen bruker med denne e-postaddresse.")
  if (user.password !== password) return alert("Feil passord.")

  model.appState.auth = user
  navigate("")
}

function setupUser() {
  model.viewState.login.email = ""
  model.viewState.login.password = ""
}