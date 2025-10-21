const routes = [
  {
    path: /^$/, // empty
    view: HomePage
  },
  {
    path: /^test\/static$/,
    view: StaticTestPage
  },
  {
    path: /^test\/([^\/]+)$/, // empty
    view: TestPage,
    paramKeys: [
      "testParam"
    ]
  },
  {
    path: /^optional(?:\/([^\/]*))?$/, // empty
    view: TestPage,
    paramKeys: [
      "test"
    ]
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
  if (isNewRoute) return true;

  const oldKeys = Object.keys(oldParams);

  if (Object.keys(model.appState.routeParams).length !== oldKeys.length) return true;

  for (const param in model.appState.routeParams) {
    if (!oldKeys.includes(param)) return true;
    if (model.appState.routeParams[param] !== oldParams[param]) return true;
  }

  return false;
}

function refreshHash() {
  const path = window.location.hash.slice(1);
  const route = resolveRoute(path);
  const params = {};

  if (route.paramKeys) {
    const paramValues = path.match(route.path)

    if (paramValues && paramValues.length === (route.paramKeys.length + 1)) {
      for (var i = 0; i < route.paramKeys.length; i++) {
        if (!paramValues[i + 1]) continue;
        params[route.paramKeys[i]] = paramValues[i + 1]
      }
    } else {
      console.warn("Route Params failed to parse")
    }
  }

  const isNewRoute = model.appState.currentPage !== route;
  const oldParams = model.appState.routeParams;

  model.appState.currentPage = route;
  model.appState.routeParams = params;

  if (shouldRefreshView(isNewRoute, oldParams)) {
    renderView()
  }
}

refreshHash()