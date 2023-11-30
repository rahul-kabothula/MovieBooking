// contain all User entity database stuff
// table creation
const users = [
  {
    username: "rahul",
    password: "rahul"
  },
  {
    username: "kabothula",
    password: "kabothula"
  },
  {
    username: "admin",
    password: "admin"
  }
]

// CRUD functions
let getUsers = () => users;

function getUsers2() {
  return users;
}

// export functions so can utilize them in another
// file in application
module.exports = {getUsers, getUsers2}