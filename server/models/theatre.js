// contain all User entity database stuff
// table creation
const theatres = [
  {
    theatreName: "Sandhya",
    theatreAddress: "Hyderabad, India"
  },
  {
    theatreName: "Natraj",
    theatreAddress: "Bhimavaram, India"
  },
  {
    theatreName: "Ambica",
    theatreAddress: "Eluru, India"
  }
]

// CRUD functions
let getAllTheatres = () => theatres;

function getAllTheatres2() {
  return theatres;
}

// export functions so can utilize them in another
// file in application
module.exports = {getAllTheatres, getAllTheatres2}