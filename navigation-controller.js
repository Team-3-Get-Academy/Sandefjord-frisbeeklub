function openNavigation() {
  model.appState.navOpen = true
  renderView()
}

function closeNavigation(e, self) {
  if (e && e.target !== self) return;

  model.appState.navOpen = false
  renderView()
}

function navigateMenu(path) {
  closeNavigation()
  navigate(path)
}