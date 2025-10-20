const routes = [
  {
    path: /^$/, // empty
    view: HomePage
  }
]

const defaultRoute = {
  view: NotFoundPage
}

window.addEventListener("hashchange", refreshHash)

function resolveRoute(path) {
  for (const route of routes) {
    if (route.path.test(path)) return route;
  }

  return defaultRoute;
}

// Check if Route or Params changed.
function shouldRefreshView(isNewRoute, oldParams) {
  return true;
}

function refreshHash() {
  const path = window.location.hash.slice(1);
  const route = resolveRoute(path);
  const params = {};

  const isNewRoute = model.appState.currentPage !== route;
  const oldParams = model.appState.routeParams;

  model.appState.currentPage = route;
  model.appState.routeParams = params;


  if (shouldRefreshView(isNewRoute, oldParams)) {
    renderView()
  }
}

refreshHash()