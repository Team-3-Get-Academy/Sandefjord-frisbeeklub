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
    model.viewState.administrateUsers.user = model.users[user]
    navigate('admin/users/manageuser')
}

/* function isHorizontallyOverflowing(element) {
  return element.scrollWidth > element.offsetWidth;
} */