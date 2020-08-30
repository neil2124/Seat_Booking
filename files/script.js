const container = document.querySelector(".container");
const seats = document.querySelectorAll(".row .seat:not(.occupied)");
const count = document.getElementById("count");
const total = document.getElementById("total");
const movieSelect = document.getElementById("movie");

populateUI();

// Just Add A + To Convert String Into Number
var ticketPrice = parseInt(movieSelect.value);

// Save Selected Movie Data
function setMovieData(movieIndex) {
  console.log(movieIndex);
  localStorage.setItem("selectedMovieIndex", movieIndex);
}

// Update Total And Count
function updateSelectedCount() {
  const selectedSeats = document.querySelectorAll(".row .seat.selected");
  const selectedSeatsCount = selectedSeats.length;

  //For Storing In Local Storage
  //Copy Selected Seats Into Arr
  //Map Through A Array
  //Return A New Array Indexes
  // ... Is The Spread Operator:Copies Elements Into The Array. It Passes The Elemnts And Not The Array

  const seatsIndex = [...selectedSeats].map((seat) => [...seats].indexOf(seat));

  localStorage.setItem("selectedSeats", JSON.stringify(seatsIndex));

  count.innerText = selectedSeatsCount;
  total.innerText = selectedSeatsCount * ticketPrice;
}

//Get Data From Local Storage And Populate UI
function populateUI() {
  const selectedSeats = JSON.parse(localStorage.getItem("selectedSeats"));
  if (selectedSeats !== null && selectedSeats.length > 0) {
    seats.forEach((seat, index) => {
      if (selectedSeats.indexOf(index) > -1) {
        seat.classList.add("selected");
      }
    });
  }

  const movieIndex = localStorage.getItem("selectedMovieIndex");
  if (movieIndex !== null) {
    movieSelect.selectedIndex = movieIndex;
  }
}

// Event Listeners
container.addEventListener("click", (e) => {
  if (
    e.target.classList.contains("seat") &&
    !e.target.classList.contains("occupied")
  ) {
    // Toggle Helps In Selecting And Removing
    e.target.classList.toggle("selected");

    updateSelectedCount();
  }
});

// Movie  Select  Event
movieSelect.addEventListener("change", (e) => {
  ticketPrice = +e.target.value;

  setMovieData(e.target.selectedIndex);

  updateSelectedCount();
});

// Load The Initial Set
updateSelectedCount();
