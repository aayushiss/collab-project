// Get all the carousel elements
const prevBtns = document.querySelectorAll('.carousel-btn.prev');
const nextBtns = document.querySelectorAll('.carousel-btn.next');
const carouselTracks = document.querySelectorAll('.carousel-track');

// Function to move the carousel left
const moveCarouselLeft = (track) => {
  const currentTransformValue = parseInt(getComputedStyle(track).transform.split(',')[4] || '0');
  const slideWidth = track.querySelector('img').clientWidth;
  
  if (currentTransformValue < 0) {
    track.style.transform = `translateX(${currentTransformValue + slideWidth}px)`;
  }
};

// Function to move the carousel right
const moveCarouselRight = (track) => {
  const currentTransformValue = parseInt(getComputedStyle(track).transform.split(',')[4] || '0');
  const slideWidth = track.querySelector('img').clientWidth;

  const maxOffset = -((track.scrollWidth - track.clientWidth)); // Maximum shift (no more images to show)
  
  if (currentTransformValue > maxOffset) {
    track.style.transform = `translateX(${currentTransformValue - slideWidth}px)`;
  }
};

// Add event listeners to all the "previous" and "next" buttons
prevBtns.forEach((btn, index) => {
  btn.addEventListener('click', () => moveCarouselLeft(carouselTracks[index]));
});

nextBtns.forEach((btn, index) => {
  btn.addEventListener('click', () => moveCarouselRight(carouselTracks[index]));
});
