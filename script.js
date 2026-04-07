// Play background music and show first page
function startExperience() {
    let music = document.getElementById("bg-music");
    // Ensure music plays after interaction
    music.play().catch(error => console.log("Audio play failed:", error));
    showPage('page1');
}

// Function to smoothly switch between pages
function showPage(pageId) {
    const pages = document.querySelectorAll('.glass-card');
    pages.forEach(page => {
        page.classList.remove('active');
        page.classList.add('hidden');
    });

    const nextPage = document.getElementById(pageId);
    nextPage.classList.remove('hidden');
    nextPage.classList.add('active');

    // If it's the final page, play crackers and shoot confetti
    if (pageId === 'yes-page') {
        let crackers = document.getElementById("cracker-sound");
        crackers.volume = 1.0;
        crackers.play().catch(error => console.log("Cracker sound failed:", error));
        
        startCrazyConfetti();
    }
}

// Logic to make ANY button with class 'runaway-btn' jump away
const runawayButtons = document.querySelectorAll('.runaway-btn');

runawayButtons.forEach(btn => {
    // Works on computer mouse hover AND mobile screen touch!
    btn.addEventListener('mouseover', moveButton);
    btn.addEventListener('touchstart', moveButton);
});

function moveButton(e) {
    e.preventDefault(); // Prevents accidental clicks on mobile
    
    const btn = e.target;
    btn.classList.add('moving');

    // Get screen size
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    
    // Calculate random position but keep it inside the screen limits
    const randomX = Math.max(10, Math.floor(Math.random() * (windowWidth - 100)));
    const randomY = Math.max(10, Math.floor(Math.random() * (windowHeight - 60)));
    
    btn.style.left = randomX + 'px';
    btn.style.top = randomY + 'px';
}

// Upgraded Crazy Confetti Effect
function startCrazyConfetti() {
    var duration = 10 * 1000; // Lasts for 10 seconds
    var animationEnd = Date.now() + duration;
    var defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 9999 };

    function randomInRange(min, max) {
        return Math.random() * (max - min) + min;
    }

    var interval = setInterval(function() {
        var timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
            return clearInterval(interval);
        }

        var particleCount = 50 * (timeLeft / duration);
        
        // Fire from left
        confetti(Object.assign({}, defaults, { 
            particleCount, 
            origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } 
        }));
        // Fire from right
        confetti(Object.assign({}, defaults, { 
            particleCount, 
            origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } 
        }));
    }, 250);
}