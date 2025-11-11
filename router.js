const routes = [
  {
    path: /^$/, // empty
    view: HomePage,
    setup: setupHome
  },
  {
    path: /^login$/,
    view: LoginPage,
    setup: setupUser
  },
  {
    path: /^register$/,
    view: registerPage,
    setup: setupRegister
  },
  {
    path: /^admin$/,
    view: adminPanel
  },
  {
    path: /^admin\/tasks$/,
    view: adminTasks
  },
  {
    path: /^admin\/tasks\/@new$/,
    view: newTask,
    setup: setupNewTask
  },
  {
    path: /^admin\/tasks\/([^\/]+)$/,
    view: adminTask,
    setup: setupViewTask,
    paramKeys: ["task"]
  },
  {
    path: /^admin\/tasks\/([^\/]+)\/messages$/,
    view: taskMsgs,
    setup: setupMessageTask,
    paramKeys: ["task"],
    afterRender: () => {
      const taskMsgsContainer = document.getElementById("taskMsgsContainer");
      if (!taskMsgsContainer) return;

      taskMsgsContainer.scrollTo(0, taskMsgsContainer.scrollHeight)
    }
  },
  {
    path: /^admin\/lanes$/,
    view: admLanes
  },
  {
    path: /^admin\/messages$/,
    view: adminMessages
  },
  {
    path: /^admin\/messages\/([^\/]+)$/,
    view: adminMessage,
    setup: setupViewMessage,
    paramKeys: [
      "message"
    ]
  },
  {
    path: /^admin\/users$/,
    view: admUsers
  },
    {
    path: /^admin\/users\/manageuser$/,
    view: admManage
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
  const path = window.location.hash.substring(1);
  const route = resolveRoute(path);
  const params = {};

  if (route.paramKeys) {
    const paramValues = path.match(route.path)

    if (paramValues && paramValues.length === (route.paramKeys.length + 1)) {
      for (var i = 0; i < route.paramKeys.length; i++) {
        if (!paramValues[i + 1]) continue;
        params[route.paramKeys[i]] = decodeURIComponent(paramValues[i + 1])
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
    if (route.setup) {
      route.setup(params)
    }

    renderView()
  }
}

refreshHash()

function navigate(path) {
  window.location.hash = "#" + path
}