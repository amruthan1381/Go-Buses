let buses = [];
let selectedSeat = "";

async function loadBuses() {
  const list = document.getElementById("busList");
  if (!list) return;

  try {
    const response = await fetch("buses.json");
    buses = await response.json();
    displayBuses(buses);
  } catch (error) {
    list.innerHTML = "<p>Could not load bus data. Make sure you open the project using a local server.</p>";
  }
}

function displayBuses(data) {
  const list = document.getElementById("busList");
  list.innerHTML = "";

  if (data.length === 0) {
    list.innerHTML = "<p>No buses found for this route.</p>";
    return;
  }

  data.forEach(bus => {
    list.innerHTML += `
      <article class="bus-card">
        <div>
          <h3>${bus.busName}</h3>
          <p>${bus.from} → ${bus.to}</p>
        </div>
        <div>
          <strong>${bus.departure}</strong>
          <p>Departure</p>
        </div>
        <div>
          <strong>${bus.arrival}</strong>
          <p>Arrival</p>
        </div>
        <div>
          <strong>${bus.busType}</strong>
          <p>${bus.availableSeats} seats left</p>
        </div>
        <div>
          <div class="price">₹${bus.price}</div>
          <a class="btn" href="booking.html">Book</a>
        </div>
      </article>
    `;
  });
}

function filterBuses() {
  const from = document.getElementById("fromFilter").value.toLowerCase().trim();
  const to = document.getElementById("toFilter").value.toLowerCase().trim();

  const filtered = buses.filter(bus =>
    bus.from.toLowerCase().includes(from) &&
    bus.to.toLowerCase().includes(to)
  );

  displayBuses(filtered);
}

function showAll() {
  document.getElementById("fromFilter").value = "";
  document.getElementById("toFilter").value = "";
  displayBuses(buses);
}

function selectSeat(button) {
  if (button.classList.contains("occupied")) return;

  document.querySelectorAll(".seat.selected").forEach(seat => {
    seat.classList.remove("selected");
  });

  button.classList.add("selected");
  selectedSeat = button.textContent;

  const message = document.getElementById("selectedSeat");
  if (message) {
    message.textContent = "Selected seat: " + selectedSeat;
  }
}

function confirmBooking(event) {
  event.preventDefault();

  const name = document.getElementById("passengerName").value;
  const message = document.getElementById("bookingMessage");

  if (!selectedSeat) {
    message.textContent = "Please select a seat first.";
    message.style.color = "#b45309";
    return;
  }

  message.style.color = "#16803c";
  message.textContent = `Booking confirmed for ${name}. Seat ${selectedSeat} is selected.`;
}

function sendMessage(event) {
  event.preventDefault();
  document.getElementById("contactMessage").textContent =
    "Thanks! Your message has been received in this demo.";
}

loadBuses();