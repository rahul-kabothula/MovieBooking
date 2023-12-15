import { fetchData, setCurrentUser, logout } from "./main.js"


// Registration Form
const registrationForm = document.getElementById("registrationForm");
if (registrationForm) {
    registrationForm.addEventListener("submit", function(event) {
        event.preventDefault();

        let newUser = {
            userName : `${document.getElementById("RegFirstName").value} ${document.getElementById("RegLastName").value}`,
            userPassword : document.getElementById("RegPassword").value,
            userEmailId : document.getElementById("RegEmail").value
        }

        console.log(newUser)

        fetchData("/users/register", newUser, "POST")
        .then(data => {
            if(!data.message){
//                alert("You are successfully registered");
                setCurrentUser(data)
                window.location.href = "available_movies.html"
            }
        })
        .catch(err => {
            let errorSection = document.querySelector("#login-form .error")
            errorSection.innerText = err.message
            document.getElementById("username").value = ""
            document.getElementById("pswd").value = ""
        })

//            // Clear the form
//            registrationForm.reset();
    });
}

// Login Form
const loginForm = document.getElementById("loginForm");
if(loginForm){
    loginForm.addEventListener("submit", function(event) {
      event.preventDefault();

      let user = {
        userEmailId: document.getElementById("loginEmail").value,
        password: document.getElementById("loginPassword").value
      }

      fetchData("/users/login", user, "POST")
      .then(data => {
        if(!data.message) {
          // add new user to local storage
          console.log(data)
          setCurrentUser(data)
          window.location.href = "available_movies.html"
        }
      })
      .catch(err => {
        let errorSection = document.querySelector("#login-form .error")
        //errorSection.innerText = err.message
        alert("Incorrect username or password")
        window.location.href = "login.html"
      })
    });
}


//
// This js is for profile.html page
//
const profile_details = document.getElementById('profile_details');
if(profile_details){
    const user_details = JSON.parse(localStorage.getItem('user'))
    document.getElementById('profile_user_id').innerText = user_details['userId']
    document.getElementById('profile_user_name').innerText = user_details['userName']
    document.getElementById('profile_user_email').innerText = user_details['userEmailId']

    document.getElementById("delete_account_btn").addEventListener("click", delete_account);
    document.getElementById("profile_edit_btn").addEventListener("click", ()=>{
        window.location.href = "edit_profile.html"
    });
}

function delete_account(){
    let user_details = JSON.parse(localStorage.getItem('user'))
    console.log(user_details)
    fetchData(`/users/delete_account/${user_details['userId']}`, {}, "DELETE")
    .then(data=>{
        window.location.href = "login.html"
    })
    .catch(err=>{
        alert(`user id: ${user_details['userId']} not able to delete at this movement. Sorry!!!`)
    })
}

function edit_profile(){
    const new_email_id = document.getElementById("new_email_id").value
    let user = JSON.parse(localStorage.getItem('user'))
    user['userEmailId'] = new_email_id
    console.log(user)

    fetchData(`/users/edit_profile`, user, "PUT")
    .then(data=>{
        localStorage.removeItem('user')
        setCurrentUser(user)
        alert("Successfully changed your Email ID!!!")
        window.location.href = "profile.html"
    })
}

//
//This is the js for edit_profile.html
//
const edit_profile_label_id = document.getElementById("new_email_id_label")
if(edit_profile_label_id){
    document.getElementById("edit_submit_btn").addEventListener("click", edit_profile)
}

//
//This is the js for logout.html
//
const logout_id = document.getElementById("logout_id")
if(logout_id){
    document.getElementById("logout_btn").addEventListener("click", logout)
}