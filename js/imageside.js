const imageFolder = "./img/etc/";
const totalImages = 10; // Specify the number of images
const swiperWrapper = document.getElementById("swiper-wrapper");
const carouselDot = document.getElementById("carousel-dot");
const intervalTime = 10000; // Interval time in milliseconds (5 seconds)

let currentSlide = 0;
let slideInterval;

function loadImage(src) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(src);
    img.onerror = () => reject(src);
    img.src = src;
  });
}

function checkImages(totalImages) {
  let promises = [];
  for (let i = 1; i <= totalImages; i++) {
    let imgNumber = i.toString().padStart(2, "0");
    let src = `${imageFolder}${imgNumber}.jpg`;
    promises.push(loadImage(src));
  }

  return Promise.allSettled(promises);
}

function createSlide(src, index) {
  const div = document.createElement("div");
  div.className = "swiper-slide";

  const img = document.createElement("img");
  img.src = src;

  div.appendChild(img);
  swiperWrapper.appendChild(div);

  // Create dot for this slide
  const dot = document.createElement("div");
  dot.className = "dot";
  dot.dataset.index = index; // Set dataset to index of the image
  carouselDot.appendChild(dot);
}

function showSlide(index) {
  const slides = document.querySelectorAll(".swiper-slide");
  const dots = document.querySelectorAll(".dot");

  slides.forEach((slide, slideIndex) => {
    if (slideIndex === index) {
      slide.style.display = "block";
    } else {
      slide.style.display = "none";
    }
  });

  dots.forEach((dot, dotIndex) => {
    if (dotIndex === index) {
      dot.classList.add("active");
    } else {
      dot.classList.remove("active");
    }
  });

  currentSlide = index;
}

function startSlideShow() {
  slideInterval = setInterval(() => {
    currentSlide = (currentSlide + 1) % totalImages;
    showSlide(currentSlide);
  }, intervalTime);
}

function stopSlideShow() {
  clearInterval(slideInterval);
}

checkImages(totalImages).then((results) => {
  results.forEach((result, index) => {
    if (result.status === "fulfilled") {
      createSlide(result.value, index);
    }
  });

  // Add event listeners to dots after all slides are created
  const dots = document.querySelectorAll(".dot");
  dots.forEach((dot) => {
    dot.addEventListener("click", () => {
      const index = parseInt(dot.dataset.index);
      showSlide(index);
      stopSlideShow(); // Stop slideshow when dot is clicked
    });
  });

  // Show the first slide as active initially
  showSlide(0);
  startSlideShow(); // Start the slideshow
});
