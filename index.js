function renderView() {
  const app = document.getElementById("app")

  app.innerHTML = `
    <div class="navbar">Navigation</div>
    <div class="pageContainer">${model.appState.currentPage()}</div>
    `
  }

  renderView()