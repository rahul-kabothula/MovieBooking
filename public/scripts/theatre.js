import { fetchData, getCurrentUser, logout } from "./main.js"

const theatres_movies_table = document.getElementById('movie_theatres_table');

if(theatres_movies_table){
    fetchData("/theatres/getAllTheatres", {}, "GET")
    .then(movie_theatres=>{
        const tbody = document.getElementById('movie_theatres_table').getElementsByTagName('tbody')[0];

        movie_theatres.forEach(movie_theatre => {
                console.log(movie_theatre)
                const row = document.createElement('tr');
//                Object.values(movie_theatre).forEach(value => {
//                    const td = document.createElement('td');
//                    td.appendChild(document.createTextNode(value));
//                    row.appendChild(td);
//                });

                const movieNameTd = document.createElement('td');
                movieNameTd.appendChild(document.createTextNode(movie_theatre.movieName));
                row.appendChild(movieNameTd);

                const theatreNameTd = document.createElement('td');
                theatreNameTd.appendChild(document.createTextNode(movie_theatre.theatreName));
                row.appendChild(theatreNameTd);

                const movie_tsTd = document.createElement('td');
                movie_tsTd.appendChild(document.createTextNode(movie_theatre.movie_ts));
                row.appendChild(movie_tsTd);

                const screenTd = document.createElement('td');
                screenTd.appendChild(document.createTextNode(movie_theatre.screen));
                row.appendChild(screenTd);

                const bookTicketButton = document.createElement('button');
                bookTicketButton.textContent = 'Book Now';
                bookTicketButton.addEventListener('click', () => bookTicket(movie_theatre));

                const bookTicketCell = document.createElement('td');
                bookTicketCell.appendChild(bookTicketButton);
                row.appendChild(bookTicketCell);

                tbody.appendChild(row);
            });

    })
//    .catch(err => {
//        console.log("Error while fetching the theatre and movies info")
//    })

    // Function to handle booking ticket
    function bookTicket(movie_theatre) {
        // Add your logic for booking a ticket
        //alert(`Booking ticket for ${Object.values(movie_theatre)}`);
        console.log(getCurrentUser()['userId'])

        movie_theatre['userId'] = getCurrentUser()['userId']
        console.log(movie_theatre)
        fetchData("/theatres/ticketBooking",movie_theatre, "POST")
        .then(ticketConfirmationDetails => {
            localStorage.setItem('ticketConfirmationDetails', JSON.stringify(ticketConfirmationDetails))
            window.location.href = "ticket_confirmation.html"
        })
    }
};


//
// This is the js for ticket_confirmation.html page
//
const tkt_conf_details = document.getElementById('tkt_conf_details');
if(tkt_conf_details){
    const ticketConfirmationDetails = JSON.parse(localStorage.getItem('ticketConfirmationDetails'))
    document.getElementById('tkt_conf_booking_id').innerText = ticketConfirmationDetails['bookingId']
    document.getElementById('tkt_conf_user_id').innerText = ticketConfirmationDetails['userId']
    document.getElementById('tkt_conf_movie_name').innerText = ticketConfirmationDetails['movieName']
    document.getElementById('tkt_conf_theatre_name').innerText = ticketConfirmationDetails['theatreName']
    document.getElementById('tkt_conf_movie_ts').innerText = ticketConfirmationDetails['movie_ts']
    document.getElementById('tkt_conf_screen').innerText = ticketConfirmationDetails['screen']
    document.getElementById('tkt_conf_no_of_tkts').innerText = ticketConfirmationDetails['noOfTkts']
    document.getElementById('tkt_conf_booking_ts').innerText = ticketConfirmationDetails['bookingTimeStamp']
}


//
// This is the js for my_bookings.html page
//
const my_bookings_page = document.getElementById('bookings_table')
if(my_bookings_page){
    console.log({"userId":getCurrentUser()['userId']})
    fetchData("/theatres/getAllBookings", {"userId":getCurrentUser()['userId']}, "POST")
        .then(my_bookings=>{
            const tbody = document.getElementById('bookings_table').getElementsByTagName('tbody')[0];

            my_bookings.forEach(my_booking => {

                const row = document.createElement('tr');

                const bookingIdTd = document.createElement('td');
                bookingIdTd.appendChild(document.createTextNode(my_booking.bookingId));
                row.appendChild(bookingIdTd);

                const movieNameTd = document.createElement('td');
                movieNameTd.appendChild(document.createTextNode(my_booking.movieName));
                row.appendChild(movieNameTd);

                const theatreNameTd = document.createElement('td');
                theatreNameTd.appendChild(document.createTextNode(my_booking.theatreName));
                row.appendChild(theatreNameTd);

                const movie_tsTd = document.createElement('td');
                movie_tsTd.appendChild(document.createTextNode(my_booking.movie_ts));
                row.appendChild(movie_tsTd);

                const screenTd = document.createElement('td');
                screenTd.appendChild(document.createTextNode(my_booking.screen));
                row.appendChild(screenTd);

                const noOfTktsTd = document.createElement('td');
                noOfTktsTd.appendChild(document.createTextNode(my_booking.noOfTkts));
                row.appendChild(noOfTktsTd);

                const bookingTimeStampTd = document.createElement('td');
                bookingTimeStampTd.appendChild(document.createTextNode(my_booking.bookingTimeStamp));
                row.appendChild(bookingTimeStampTd);

                tbody.appendChild(row);
            });

        })
}

