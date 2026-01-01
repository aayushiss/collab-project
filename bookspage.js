// Bestsellers Carousel functionality
document.addEventListener('DOMContentLoaded', function() {
  const track = document.getElementById('carouselTrack');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  const container = document.getElementById('carouselContainer');
  
  if (!track || !prevBtn || !nextBtn || !container) return;

  let currentPosition = 0;
  const cardWidth = 220; // min-width of book card
  const gap = 24; // gap between cards (1.5rem = 24px)
  const scrollAmount = cardWidth + gap;
  
  // Calculate the number of visible cards
  function getVisibleCards() {
    const containerWidth = container.offsetWidth;
    return Math.floor(containerWidth / scrollAmount);
  }
  
  // Calculate maximum scroll position
  function getMaxScroll() {
    const totalCards = track.children.length;
    const visibleCards = getVisibleCards();
    const scrollableCards = totalCards - visibleCards;
    return scrollableCards * scrollAmount;
  }
  
  // Update button states
  function updateButtons() {
    prevBtn.disabled = currentPosition <= 0;
    nextBtn.disabled = currentPosition >= getMaxScroll();
  }
  
  // Scroll to position
  function scrollToPosition(position) {
    currentPosition = Math.max(0, Math.min(position, getMaxScroll()));
    track.style.transform = `translateX(-${currentPosition}px)`;
    updateButtons();
  }
  
  // Next button click
  nextBtn.addEventListener('click', function() {
    const visibleCards = getVisibleCards();
    const scrollBy = scrollAmount * Math.floor(visibleCards / 2); // Scroll by half of visible cards
    scrollToPosition(currentPosition + scrollBy);
  });
  
  // Previous button click
  prevBtn.addEventListener('click', function() {
    const visibleCards = getVisibleCards();
    const scrollBy = scrollAmount * Math.floor(visibleCards / 2);
    scrollToPosition(currentPosition - scrollBy);
  });
  
  // Handle window resize
  let resizeTimer;
  window.addEventListener('resize', function() {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function() {
      // Reset position if needed
      if (currentPosition > getMaxScroll()) {
        scrollToPosition(getMaxScroll());
      }
      updateButtons();
    }, 250);
  });
  
  // Optional: Touch/Swipe support for mobile
  let touchStartX = 0;
  let touchEndX = 0;
  
  container.addEventListener('touchstart', function(e) {
    touchStartX = e.changedTouches[0].screenX;
  });
  
  container.addEventListener('touchend', function(e) {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
  });
  
  function handleSwipe() {
    const swipeThreshold = 50;
    const diff = touchStartX - touchEndX;
    
    if (Math.abs(diff) > swipeThreshold) {
      if (diff > 0) {
        // Swiped left - go next
        nextBtn.click();
      } else {
        // Swiped right - go previous
        prevBtn.click();
      }
    }
  }
  
  // Initialize
  updateButtons();
});