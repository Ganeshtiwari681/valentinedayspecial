// --- Variables ---
let yesSize = 1; // Tracks the size of the Yes button
let currentStoryIndex = 0; // Tracks which story question we are on

// --- Elements ---
const yesBtn = document.getElementById('yesBtn');
const noBtn = document.getElementById('noBtn');
const bgMusic = document.getElementById('bgMusic');
const body = document.querySelector('body');

// --- Background Images for each page ---
const backgrounds = {
    page1: "url('https://img.freepik.com/premium-photo/valentine-day-watercolor-clipartart_583952-13681.jpg')", // Sunset Silhouette
    page2: "url('https://wallpaper.dog/large/7898.jpg')", // Holding Hands
    page3: "url('https://images.unsplash.com/photo-1621621667797-e06afc217fb0?q=80&w=2070&auto=format&fit=crop')", // Fantasy/Cloudy
    page4: "url('https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?q=80&w=2070&auto=format&fit=crop')", // Wedding/Ring vibe
    page5: "url('https://wallpaper.dog/large/5488127.jpg')" 
};

// --- Story Questions (Pre-Proposal) ---
const storyData = [
    {
        q: "Who stole whose heart first?",
        img: "https://img.freepik.com/free-vector/cute-couple-holding-big-heart-love-illustration_1308-133503.jpg"
    },
    {
        q: "Who is more Romantic?",
        img: "https://img.freepik.com/free-vector/couple-love-swinging-cartoon-illustration_138676-2432.jpg"
    },
    {
        q: "Who Fights more?",
        img: "https://img.freepik.com/free-vector/cute-bear-couple-hugging-with-love-cartoon-vector-icon-illustration_138676-4654.jpg"
    }
];

// --- 1. First Page Logic ---
function growYes() {
    // Play music if not started
    if (bgMusic.paused) bgMusic.play();

    // Make Yes button 1.4x bigger each time
    yesSize = yesSize * 1.4; 
    yesBtn.style.transform = `scale(${yesSize})`;
    
    // Move No button to a random spot to make it hard to click
    const x = Math.random() * (window.innerWidth - 60);
    const y = Math.random() * (window.innerHeight - 100);
    
    noBtn.style.position = "absolute";
    noBtn.style.left = x + "px";
    noBtn.style.top = y + "px";
    
    // Optional: Change No button text
    const noTexts = ["Wrong!", "Click Green!", "Are you sure?", "Really?", "Don't do this!"];
    noBtn.innerText = noTexts[Math.floor(Math.random() * noTexts.length)];
}

function goToPage2() {
    if (bgMusic.paused) bgMusic.play();
    switchPage('page1', 'page2', backgrounds.page2);
}

// --- 2. Name Logic ---
function goToPage3() {
    const herName = document.getElementById('herName').value;
    const hisName = document.getElementById('hisName').value;

    if (!herName || !hisName) {
        alert("Please enter both our names! ❤️");
        return;
    }

    switchPage('page2', 'page3', backgrounds.page3);
    createFloatingHearts(); // Start animation
}

// --- 3. Story/Quiz Logic ---
function nextStory() {
    currentStoryIndex++;
    
    if (currentStoryIndex < storyData.length) {
        // Update content
        document.getElementById('storyQuestion').innerText = storyData[currentStoryIndex].q;
        document.getElementById('storyImage').src = storyData[currentStoryIndex].img;
    } else {
        goToFinalPage();
    }
}

// --- 4. Final Proposal Page ---
function goToFinalPage() {
    const herName = document.getElementById('herName').value;
    const hisName = document.getElementById('hisName').value;
    
    document.getElementById('finalNames').innerText = `${hisName} ❤️ ${herName}`;
    switchPage('page3', 'page4', backgrounds.page4);
}

// --- Helper Functions ---
function switchPage(hideId, showId, bgImage) {
    document.getElementById(hideId).classList.add('hidden');
    document.getElementById(hideId).classList.remove('active');
    
    document.getElementById(showId).classList.remove('hidden');
    setTimeout(() => {
        document.getElementById(showId).classList.add('active');
    }, 10);

    // Change Background
    if (bgImage) {
        body.style.backgroundImage = bgImage;
    }
}

function createFloatingHearts() {
    const heart = document.createElement('div');
    heart.classList.add('heart');
    heart.style.left = Math.random() * 100 + "vw";
    heart.style.animationDuration = Math.random() * 2 + 3 + "s";
    
    document.getElementById('heartsContainer').appendChild(heart);
    
    setTimeout(() => {
        heart.remove();
    }, 5000);
}

// Start some background hearts gently
setInterval(createFloatingHearts, 1000);

// --- 5. Compatibility Quiz Data ---
const matchQuestions = [
    { q: "Who is the better kisser? 😘", a: ["Me", "You", "Both", "Obviously You"] },
    { q: "Who takes longer to get ready? 💄", a: ["Me", "You", "We don't care", "Skip"] },
    { q: "What is our favorite activity? 🛌", a: ["Eating", "Sleeping", "Cuddling", "Travel"] },
    { q: "Who loves the other more? ❤️", a: ["I do!", "You do!", "Equal", "Infinity"] }
];

let matchIndex = 0;

// Triggered when she clicks "YES" on the Proposal Page
function startMatchQuiz() {
    // REMOVED: document.body.classList.add('quiz-mode'); // No more animated gradient
    
    // Switch to Page 5 with the Romantic Background
    switchPage('page4', 'page5', backgrounds.page5);
    
    loadMatchQuestion();
}

function loadMatchQuestion() {
    const data = matchQuestions[matchIndex];
    document.getElementById('matchQuestion').innerText = data.q;
    document.getElementById('progressText').innerText = `Question ${matchIndex + 1}/${matchQuestions.length}`;
    
    const grid = document.getElementById('matchOptions');
    grid.innerHTML = ""; // Clear old buttons

    data.a.forEach(answer => {
        const btn = document.createElement('button');
        btn.classList.add('quiz-btn');
        btn.innerText = answer;
        btn.onclick = nextMatchQuestion; // Any answer is correct!
        grid.appendChild(btn);
    });
}

function nextMatchQuestion() {
    matchIndex++;
    if (matchIndex < matchQuestions.length) {
        loadMatchQuestion();
    } else {
        showCalculation();
    }
}

// --- 6. Final Calculation Animation ---
function showCalculation() {
    // Switch to Final Page with a Happy Couple Background
    switchPage('page5', 'page6', "url('https://img.freepik.com/premium-vector/boy-girl-are-holding-hands-heart-with-words-love-bottom_961875-9754.jpg')");
    
    let score = 0;
    const scoreText = document.getElementById('scoreValue');
    const ring = document.querySelector('.meter-ring');

    // Animate numbers from 0% to 100%
    const interval = setInterval(() => {
        score++;
        scoreText.innerText = score + "%";
        
        if (score === 100) {
            clearInterval(interval);
            ring.classList.add('done'); // Stop spinning, glow red
            
            // Massive Heart Explosion
            for(let i=0; i<30; i++) {
                setTimeout(createFloatingHearts, i * 100);
            }
        }
    }, 30); // Speed of counting
}