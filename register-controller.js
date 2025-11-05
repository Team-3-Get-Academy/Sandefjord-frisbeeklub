//Ta inn email og passord
//Lagre i nytt objekt i model.users[]

//register:
/*   username: "",
  email: "",
  password: "",
  gender: "",
  age: " */
function updateRegisterEmail() {
    const input = document.getElementById("email")

    model.viewState.register.email = input.value;
}
function updateRegisterGender(input) {
    /* const input = document.getElementById("gender") */

    model.viewState.register.gender = input
}
function updateRegisterPassword() {
    const input = document.getElementById("password")

    model.viewState.register.password = input.value;
}
function updateRegisterUser() {
    const input = document.getElementById("username")

    model.viewState.register.username = input.value;
}
function updateRegisterAge() {
    const input = document.getElementById("age")

    model.viewState.register.dob = input.value;
}
function registerSubmit(e) {
  e.preventDefault()  
  const userId = ++model.appState.userCounter
    
    const newUser = 
    {
      id: userId,
      username: model.viewState.register.username,
      power: 0,
      roles: [
        /* {
          lane: "",
          role: "user"
        } */
      ],
      rating: 0,
      email: model.viewState.register.email, 
      password: model.viewState.register.password,
      picture: null,
      priority: false,
      dob: model.viewState.register.dob,
      gender: model.viewState.register.gender
    }
    /* return newUser */
    model.users.push(newUser)
    model.appState.auth = newUser

    /* model.users[userId].id = userId */
    saveModel()
    navigate("")
}
function removeLastUser(){
    model.users.pop()
    model.appState.userCounter -=1
    saveModel()
    return model.users
}

function setupRegister() {
    model.viewState.register.username = ""
    model.viewState.register.email = ""
    model.viewState.register.password = ""
    model.viewState.register.gender = ""
    model.viewState.register.dob = ""
}