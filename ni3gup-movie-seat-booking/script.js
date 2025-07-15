// dom
const container = document.querySelector(".container");
const seats = document.querySelectorAll(".row .seat:not(.occupied)");
const count = document.getElementById("count");
const total = document.getElementById("total");
const movieSelect = document.getElementById("movie");

populateUI();
// 뮤비 value
let ticketPrice = +movieSelect.value;

// 영화 가격, 영화 인덱스 로컬스토리지 저장
function setMovieData(movieIndex, moviePrice) {
    localStorage.setItem("selectedMovieIndex", movieIndex);
    localStorage.setItem("selectedMoviePrice", moviePrice);
}

// Update total and count
function updateSelectedCount() {
    const selectedSeats = document.querySelectorAll(".row .seat.selected");
    // map 돌면서 indexOf 첫 번쨰 반환
    const seatsIndex = [...selectedSeats].map((seat) => [...seats].indexOf(seat));
    // 문자열 저장
    localStorage.setItem("selectedSeats", JSON.stringify(seatsIndex));
    // 길이
    const selectedSeatsCount = selectedSeats.length;
    // 개수
    count.innerText = selectedSeatsCount;
    // 가격
    total.innerText = selectedSeatsCount * ticketPrice;

    setMovieData(movieSelect.selectedIndex, movieSelect.value);
}

// Get data from localstorage and populate UI
function populateUI() {
    const selectedSeats = JSON.parse(localStorage.getItem("selectedSeats"));

    if (selectedSeats !== null && selectedSeats.length > 0) {
        seats.forEach((seat, index) => {
            if (selectedSeats.indexOf(index) > -1) {
                seat.classList.add("selected");
            }
        });
    }

    const selectedMovieIndex = localStorage.getItem("selectedMovieIndex");

    if (selectedMovieIndex !== null) {
        movieSelect.selectedIndex = selectedMovieIndex;
    }
}

// Movie select event
movieSelect.addEventListener("change", (e) => {
    ticketPrice = +e.target.value;
    setMovieData(e.target.selectedIndex, e.target.value);
    updateSelectedCount();
});

// Seat click event
container.addEventListener("click", (e) => {
    if (e.target.classList.contains("seat") && !e.target.classList.contains("occupied")) {
        const selectedSeats = document.querySelectorAll(".row .seat.selected");
        if (!e.target.classList.contains("selected") && selectedSeats.length >= 6) {
            return alert("좌석은 최대 6개 까지만 가능해요!");
        }
        e.target.classList.toggle("selected");
        updateSelectedCount();
    }
});

// Initial count and total set
updateSelectedCount();
