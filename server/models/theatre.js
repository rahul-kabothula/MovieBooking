const con = require("./db_connect");

async function createTable() {
  let sql = `
    CREATE TABLE IF NOT EXISTS "MovieBooking"."TheatreMovie"
    (
        "theatreMovieId" character varying(50) COLLATE pg_catalog."default" NOT NULL,
        "theatreId" character varying(50) COLLATE pg_catalog."default" NOT NULL,
        "movieId" character varying(50) COLLATE pg_catalog."default" NOT NULL,
        "screen" character varying COLLATE pg_catalog."default" NOT NULL,
        CONSTRAINT "TheatreMovie_pkey" PRIMARY KEY ("theatreMovieId"),
        CONSTRAINT "movieId_fkey" FOREIGN KEY ("movieId")
            REFERENCES "MovieBooking"."Movie" ("movieId") MATCH SIMPLE
            ON UPDATE CASCADE
            ON DELETE CASCADE,
        CONSTRAINT "theatreId_fkey" FOREIGN KEY ("theatreId")
            REFERENCES "MovieBooking"."Theatre" ("theatreId") MATCH SIMPLE
            ON UPDATE CASCADE
            ON DELETE CASCADE
    )

    TABLESPACE pg_default;

    ALTER TABLE IF EXISTS "MovieBooking"."TheatreMovie"
        OWNER to postgres;`

      await con.query(sql)
}

createTable()


async function getAllTheatres(){
    let sql=`
        SELECT "theatreMovieId", "movieName", "theatreName", "movie_ts", "screen"
        FROM "MovieBooking"."TheatreMovie" AS TM
        INNER JOIN "MovieBooking"."Theatre" AS T
        ON T."theatreId"=TM."theatreId"
        INNER JOIN "MovieBooking"."Movie" AS M
        ON M."movieId"=TM."movieId";
    `
    console.log(sql)
    return await con.query(sql)
}

async function bookTicket(ticket){
    // Get the current date and time
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const day = String(currentDate.getDate()).padStart(2, '0');
    const hours = String(currentDate.getHours()).padStart(2, '0');
    const minutes = String(currentDate.getMinutes()).padStart(2, '0');
    const seconds = String(currentDate.getSeconds()).padStart(2, '0');

    const formattedTimestamp = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    //const formattedDateTime = `${currentDate.toLocaleDateString('en-US', dateOptions)} ${currentDate.toLocaleTimeString('en-US', timeOptions)}`;
    console.log(formattedTimestamp)
    const parsedDate = new Date(formattedTimestamp);
    const milliseconds = parsedDate.getTime();

    let bookingId = ticket['userId']+'@'+ticket.theatreMovieId+'@'+milliseconds

    let sql = `
        INSERT INTO "MovieBooking"."Ticket"("bookingId", "userId", "theatreMovieId", "noOfTkts", "bookingTimeStamp")
        VALUES('${bookingId}', '${ticket['userId']}', '${ticket.theatreMovieId}', 1, '${formattedTimestamp}')
      `

    console.log(sql)
    await con.query(sql)
    console.log('ticket successfully booked')
    const newUser = await getTicketDetails(bookingId)
    return newUser[0]
}

async function getTicketDetails(bookingId){
    let sql = `
        SELECT "bookingId", "userId", "movieName", "theatreName", "movie_ts", "screen", "noOfTkts", "bookingTimeStamp"
        FROM "MovieBooking"."Ticket" AS TT
        INNER JOIN "MovieBooking"."TheatreMovie" AS TM
        ON TT."theatreMovieId"=TM."theatreMovieId"
        INNER JOIN "MovieBooking"."Theatre" AS T
        ON T."theatreId"=TM."theatreId"
        INNER JOIN "MovieBooking"."Movie" AS M
        ON M."movieId"=TM."movieId"

        WHERE "bookingId"='${bookingId}';
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

async function getAllBookings(userDetails){
    let sql = `
            SELECT "bookingId", "movieName", "theatreName", "movie_ts", "screen", "noOfTkts", "bookingTimeStamp"
            FROM "MovieBooking"."Ticket" AS TT
            INNER JOIN "MovieBooking"."TheatreMovie" AS TM
            ON TT."theatreMovieId"=TM."theatreMovieId"
            INNER JOIN "MovieBooking"."Theatre" AS T
            ON T."theatreId"=TM."theatreId"
            INNER JOIN "MovieBooking"."Movie" AS M
            ON M."movieId"=TM."movieId"

            WHERE "userId"='${userDetails["userId"]}';
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
module.exports = {createTheatre, editTheatre, deleteTheatre, getAllTheatres, bookTicket, getAllBookings}














