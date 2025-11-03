function userCanAccessLane(user, lane) {
  if (!user) return false;

  if (user.power === 1) return true;

  const laneObj = model.lanes[lane];
  if (!laneObj) return false;

  if (laneObj.admin === user.id || laneObj.ansvarlig.includes(user.id)) return true;

  return false;
}