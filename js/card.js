const imgCard = document.querySelectorAll(".img-card");
let currentIndex = 0;
let interval;

function activateCard(index) {
  imgCard.forEach((el, i) => {
    if (i === index) {
      el.classList.add("active");
    } else {
      el.classList.remove("active");
    }
  });
}

function startLoop() {
  interval = setInterval(() => {
    currentIndex = (currentIndex + 1) % imgCard.length;
    activateCard(currentIndex);
  }, 7000); // 5000ms = 5 seconds
}

imgCard.forEach((e, index) => {
  e.addEventListener("click", () => {
    clearInterval(interval);
    activateCard(index);
    currentIndex = index;
    startLoop();
  });
});

// Start the loop initially
startLoop();
