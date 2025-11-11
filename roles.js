function userCanAccessLane(user, lane) {
  if (!user) return false;

  if (user.power === 1) return true;

  const laneObj = model.lanes[lane];
  if (!laneObj) return false;

  if (laneObj.admin === user.id || laneObj.ansvarlig.includes(user.id)) return true;

  return false;
}

function getMessageRoles(user, message) {
  const lane = model.lanes[message.lane];

  let adminRole = null
  const isOriginalPoster = (user && user.id === message.userid) || !user && message.userid === null

  if (user) {
    if (user.power === 1) {
      adminRole = "ADMIN"
    } else if (lane.admin === user.id) {
      adminRole = "BANE ADMIN"
    } else if (lane.ansvarlig.includes(user.id)) {
      adminRole = "BANEANSVARLIG"
    }
  }

  let roles = [];

  if (isOriginalPoster) {
    roles.push("OP")
  }

  if (adminRole) {
    roles.push(adminRole)
  }

  return roles
}

function canAdminTask(user, task) {
  if (!user) return false;

  if (user.power === 1) return true;

  const lane = model.lanes[task.lane];

  if (lane && lane.admin === user.id) return true;

  if (task.admin === user.id) return true;

  return false;
}

function canAccessTask(user, task) {
  if (!user) return false;

  if (canAdminTask(user, task)) return true;
  if (task.assigned.includes(user.id)) return true;

  return false;
}

function listUserLanes(user) {
  if (!user) return [];

  const allLanes = Object.keys(model.lanes);

  if (user.power === 1) return allLanes;

  const userLanes = [];

  for (const lane of allLanes) {
    if (userCanAccessLane(user, lane)) {
      userLanes.push(lane);
    }
  }

  return userLanes;
}