const NotFoundPage = () => "<div>Page not Found</div>"

function HomePage() {
  return /*HTML*/``
}

function navbar() {
  return /*HTML*/`<div class="navbar">
    <img src="./assets/logo.png">
    <h1>Sandefjord Frisbeeklub</h1>
  </div>`
}

function renderView() {
  const app = document.getElementById("app")
  app.innerHTML = /*HTML*/`
    ${navbar()}
    <div class="pageContainer">${model.appState.currentPage.view()}</div>
  `
}