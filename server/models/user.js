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
  let userResult = await getUser(user.userEmailId)
  if(!userResult[0]) throw Error("Username not found!!")
  if(userResult[0].userPassword != user.password) throw Error("Password Incorrect!!")

  return userResult[0]
}

// Register (Create) New User
async function register(user) {
  let userResult = await getUser(user.userEmailId)
  if(userResult.length > 0) throw Error("Username already in use!!")

  let sql = `
    INSERT INTO "MovieBooking"."User"("userName", "userPassword", "userEmailId")
    VALUES('${user.userName}', '${user.userPassword}', '${user.userEmailId}')
  `

  await con.query(sql)
  const newUser = await getUser(user.userEmailId)
  return newUser[0]
}

// Update - CRUD
async function editUser(user) {
  let updatedUser = await getUser(user['userEmailId'])
  if(updatedUser.length > 0) throw Error("User not available!")

  let sql = `UPDATE "MovieBooking"."User"
    SET "userEmailId" = '${user['userEmailId']}'
    WHERE "userId" = '${user['userId']}'
  `
  await con.query(sql)
  updatedUser = await getUser(user['userEmailId'])
  return updatedUser[0]
}

// Delete User
async function deleteUser(userId) {
  let sql = `DELETE FROM "MovieBooking"."User"
    WHERE "userId" = '${userId}'
  `
  await con.query(sql)
}

// Useful functions
async function getUser(userEmailId) {
  let sql = `
    SELECT * FROM "MovieBooking"."User"
    WHERE "userEmailId" = '${userEmailId}'
  `
  return await con.query(sql)
}

// export functions so can utilize them in another
// file in application
module.exports = {login, register, editUser, deleteUser}