function userList() {
    let html = ""
    for (let i = 0; i < model.users.length; i++) {
        html += /*HTML*/ `
        <div class="userContainer" onclick="manageUser(${i})">
            <div class="username">${model.users[i].username}</div>
            <div class="email">${model.users[i].email}</div>
        </div>
        <br>
        `
        console.log(model.users[i])
    }
    return html
}

function manageUser(user) {
    console.log(model.users[user])
    let username = model.users[user].username
    model.viewState.administrateUsers.user = model.users[user]
    saveModel()
    navigate('admin/users/' + username)
}

function powerCheck() {
    let power = model.viewState.administrateUsers.user.power
    if (power == 0) {
        return /*HTML*/ `
        <div style="color: green;  font-weight: 600">BRUKER</div>
        `
    }
    if (power == 1) {
        return /*HTML*/ `
        <div style="color: blue; font-weight: 600">ADMIN</div>
        `
    }
    if (power == 2) {
        return /*HTML*/ `
        <div style="color: orange; font-weight: 600">BANEANSVARLIG</div>
        `
    }
    else {
        return /*HTML*/ `
        <div style="color: gray; font-weight: 600">UKJENT</div>
        `
    }
}

function priorityCheck() {
    if (model.viewState.administrateUsers.user.priority == true) {
        return /*HTML*/ `
    <button onclick="favorite()" style="background: orange;">Favoritt</button>
    `
    }
    else
    return /*HTML*/ `
    <button onclick="favorite()">Legg til som Favoritt</button>
    `
    
}
function favorite() {
    if (model.viewState.administrateUsers.user.priority == true) {
        model.viewState.administrateUsers.user.priority = false
        renderView()
    }
    else {
        model.viewState.administrateUsers.user.priority = true
        renderView()
    }
}

/* function removeLastUser(){
    model.users.pop()
    model.appState.userCounter -=1
    saveModel()
    return model.users
} */

/* function removeUser() {
    model.users.splice(1, 0)
} */

/* function isHorizontallyOverflowing(element) {
  return element.scrollWidth > element.offsetWidth;
} */