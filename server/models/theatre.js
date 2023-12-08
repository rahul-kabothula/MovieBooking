const con = require("./db_connect");

async function createTable() {
  let sql = `
    CREATE TABLE IF NOT EXISTS "MovieBooking"."Theatre"
    (
        "theatreId" SERIAL,
        "theatreName" character varying(50) COLLATE pg_catalog."default" NOT NULL,
        "movieName" character varying(50) COLLATE pg_catalog."default" NOT NULL,
        "theatreAddress" character varying(100) COLLATE pg_catalog."default",
        CONSTRAINT "Theatre_pkey" PRIMARY KEY ("theatreId")
    )

    TABLESPACE pg_default;

    ALTER TABLE IF EXISTS "MovieBooking"."Theatre"
        OWNER to postgres;`

      await con.query(sql)
}

createTable()

async function getAllTheatres(){
    let sql=`
        SELECT *
        FROM Theatre;
    `

    return await con.query(sql)
}


async function getTheatres(theatreId) {
  let sql = `
    SELECT * FROM Theatre
    WHERE theatreId = "${theatreId}";
  `
  return await con.query(sql)
}

// Update - CRUD
async function editTheatre(theatre) {
  let updatedTheatre = await getTheatre(theatre.theatreId)
  if(updatedTheatre.length > 0) throw Error("Username not available!")

  let sql = `UPDATE Theatre
    SET movieName = "${theatre.movieName}"
    WHERE theatreId = ${theatre.theatreId}
  `
  await con.query(sql)
  updatedTheatre = await getTheatre(theatre.theatreId)
  return updatedTheatre[0]
}

// Delete theatre
async function deleteTheatre(theatre) {
  let sql = `DELETE FROM Theatre
    WHERE theatreIdId = ${theatre.theatreId}
  `
  await con.query(sql)
}

// Create theatre
async function createTheatre(theatre){
    let sql = `
        INSERT INTO Theatre
        VALUES("${theatre.theatreName}", "${theatre.movieName}", "${theatre.theatreAddress}")
    `

    await con.query(sql)
}


// export functions so can utilize them in another
// file in application
module.exports = {createTheatre, editTheatre, deleteTheatre}














