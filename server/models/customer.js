// contain all User entity database stuff
// table creation
const customers = [
  {
    custFName: "rahul",
    custLName: "kabothula",
    custEmailID: "kabothur1@newpaltz.edu",
    custPhNo: "8458733482",
    custAddress: "28 Colonial Dr, New Paltz, 12561"
  },
  {
    custFName: "ram",
    custLName: "godavari",
    custEmailID: "ram1@newpaltz.edu",
    custPhNo: "8458734567",
    custAddress: "30 Colonial Dr, New Paltz, 12561"
  },
  {
    custFName: "rahim",
    custLName: "krishna",
    custEmailID: "rahim@newpaltz.edu",
    custPhNo: "8458731234",
    custAddress: "32 Colonial Dr, New Paltz, 12561"
  }
]

// CRUD functions
let getAllCustomers = () => customers;

function getAllCustomers2() {
  return customers;
}

// export functions so can utilize them in another
// file in application
module.exports = {getAllCustomers, getAllCustomers2}