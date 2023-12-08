const con = require("./db_connect");

async function createTable() {
  let sql = `

    CREATE TABLE IF NOT EXISTS "MovieBooking"."User"
    (
        "userId" SERIAL,
        "userName" character varying(50) COLLATE pg_catalog."default" NOT NULL,
        "userEmailId" character varying(50) COLLATE pg_catalog."default" NOT NULL,
        "userPassword" character varying(50) COLLATE pg_catalog."default" NOT NULL,
        CONSTRAINT "user_pkey" PRIMARY KEY ("userId")
    )

    TABLESPACE pg_default;

    ALTER TABLE IF EXISTS "MovieBooking"."user"
        OWNER to postgres;`

      await con.query(sql)
}

createTable()



// contain all User entity database stuff
// table creation
//const users = [
//  {
//    username: "rahul",
//    password: "rahul"
//  },
//  {
//    username: "kabothula",
//    password: "kabothula"
//  },
//  {
//    username: "admin",
//    password: "admin"
//  }
//]

// login(newUser);
async function login(user) {
  let userResult = await getUser(user.username)
  if(!userResult[0]) throw Error("Username not found!!")
  if(userResult[0].Password != user.password) throw Error("Password Incorrect!!")

  return userResult[0]
}

// Register (Create) New User
async function register(user) {
  let userResult = await getUser(user.username)
  if(userResult.length > 0) throw Error("Username already in use!!")

  let sql = `
    INSERT INTO users(UserName, Password, Email)
    VALUES("${user.username}", "${user.password}", "${user.email}")
  `

  await con.query(sql)
  const newUser = await getUser(user.username)
  return newUser[0]
}

// Update - CRUD
async function editUser(user) {
  let updatedUser = await getUser(user.username)
  if(updatedUser.length > 0) throw Error("Username not available!")

  let sql = `UPDATE users
    SET UserName = "${user.username}"
    WHERE UserId = ${user.UserId}
  `
  await con.query(sql)
  updatedUser = await getUser(user.username)
  return updatedUser[0]
}

// Delete User
async function deleteUser(user) {
  let sql = `DELETE FROM users
    WHERE UserId = ${user.UserId}
  `
  await con.query(sql)
}

// Useful functions
async function getUser(username) {
  let sql = `
    SELECT * FROM users
    WHERE UserName = "${username}"
  `
  return await con.query(sql)
}

// export functions so can utilize them in another
// file in application
module.exports = {login, register, editUser, deleteUser}