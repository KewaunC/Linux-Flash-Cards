const cards = [
    { front: "ls", back: "List files and directories.", status: null },
    { front: "cd", back: "Change directory.", status: null },
    { front: "pwd", back: "Print current working directory.", status: null },
    { front: "mkdir", back: "Create a new directory.", status: null },
    { front: "rm", back: "Remove files and directories.", status: null },
    { front: "cp", back: "Copy files and directories.", status: null },
    { front: "mv", back: "Move/rename files and directories.", status: null },
    { front: "touch", back: "Create an empty file or update file timestamps.", status: null },
    { front: "cat", back: "View the contents of a file.", status: null },
    { front: "head", back: "Display the first few lines of a file.", status: null },
    { front: "tail", back: "Display the last few lines of a file.", status: null },
    { front: "ln", back: "Create links between files.", status: null },
    { front: "find", back: "Search for files and directories.", status: null },
    { front: "chmod", back: "Change file permissions.", status: null },
    { front: "chown", back: "Change file ownership.", status: null },
    { front: "chgrp", back: "Change group ownership.", status: null },
    { front: "umask", back: "Set default file permissions.", status: null },
    { front: "tar", back: "Create or extract archive files.", status: null },
    { front: "gzip", back: "Compress files.", status: null },
    { front: "zip", back: "Create compressed zip archives.", status: null },
    { front: "ps", back: "Display running processes.", status: null },
    { front: "top", back: "Monitor system processes in real-time.", status: null },
    { front: "kill", back: "Terminate a process.", status: null },
    { front: "pkill", back: "Terminate processes based on their name.", status: null },
    { front: "pgrep", back: "List processes based on their name.", status: null },
    { front: "grep", back: "Used to search for specific patterns or regular expressions in text files or streams and display matching lines.", status: null },
    { front: "uname", back: "Print system information.", status: null },
    { front: "whoami", back: "Display current username.", status: null },
    { front: "df", back: "Show disk space usage.", status: null },
    { front: "du", back: "Estimate file and directory sizes.", status: null },
    { front: "free", back: "Display memory usage information.", status: null },
    { front: "uptime", back: "Show system uptime.", status: null },
    { front: "lscpu", back: "Display CPU information.", status: null },
    { front: "lspci", back: "List PCI devices.", status: null },
    { front: "lsusb", back: "List USB devices.", status: null },
    { front: "ifconfig", back: "Display network interface information.", status: null },
    { front: "ping", back: "Send ICMP echo requests to a host.", status: null },
    { front: "netstat", back: "Display network connections and statistics.", status: null },
    { front: "ss", back: "Display network socket information.", status: null },
    { front: "ssh", back: "Securely connect to a remote server.", status: null },
    { front: "scp", back: "Securely copy files between hosts.", status: null },
    { front: "wget", back: "Download files from the web.", status: null },
    { front: "curl", back: "Transfer data to or from a server.", status: null }
];

let currentIndex = 0; // Current index of the card being shown
let gotItCounter = 0; // Counter to track how many times the deck has been cleared

// Get elements from the DOM
const flashcard = document.getElementById('flashcard');
const front = flashcard.querySelector('.front');
const back = flashcard.querySelector('.back');
const gotItBtn = document.getElementById('got-it');
const notSureBtn = document.getElementById('not-sure');
const dontUnderstandBtn = document.getElementById('dont-understand');

// Shuffle the cards array
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

// Load the card status and order from cookies
function loadFromCookies() {
    const cookies = document.cookie.split('; ').reduce((acc, cookie) => {
        const [key, value] = cookie.split('=');
        acc[key] = value;
        return acc;
    }, {});
    if (cookies.cards) {
        const savedCards = JSON.parse(decodeURIComponent(cookies.cards));
        cards.forEach((card, index) => {
            card.status = savedCards[index].status;
        });
    }
    if (cookies.currentIndex) {
        currentIndex = parseInt(cookies.currentIndex, 10);
    }
}

// Save the card status and order to cookies
function saveToCookies() {
    const expiryDate = new Date();
    expiryDate.setMonth(expiryDate.getMonth() + 1);
    document.cookie = `cards=${encodeURIComponent(JSON.stringify(cards))}; expires=${expiryDate.toUTCString()}`;
    document.cookie = `currentIndex=${currentIndex}; expires=${expiryDate.toUTCString()}`;
}

// Function to update the content of the current card
function updateCard() {
    const card = cards[currentIndex];
    front.textContent = card.front;
    back.textContent = card.back;
    flashcard.classList.remove('flipped'); // Reset the flip state when the card changes
}

// Function to show the next card in the array
function showNextCard() {
    currentIndex = (currentIndex + 1) % cards.length;
    updateCard();
    saveToCookies(); // Save progress to cookies
}

// Event listener to flip the flashcard on click
flashcard.addEventListener('click', () => {
    flashcard.classList.toggle('flipped');
});

// Event listener for the "Got it" button
gotItBtn.addEventListener('click', () => {
    cards[currentIndex].status = 'got-it';
    showNextCard();
});

// Event listener for the "Not Sure" button
notSureBtn.addEventListener('click', () => {
    cards[currentIndex].status = 'not-sure';
    showNextCard();
});

// Event listener for the "I don't understand" button
dontUnderstandBtn.addEventListener('click', () => {
    cards[currentIndex].status = 'dont-understand';
    showNextCard();
});

// Initial setup
shuffle(cards); // Shuffle the cards initially
loadFromCookies(); // Load progress from cookies
updateCard(); // Display the first card