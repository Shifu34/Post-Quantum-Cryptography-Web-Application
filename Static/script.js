// Variables to store state
let publicKey = "a1b2c3d4e5f6...example public key (shortened)";
let message = "";
let encryptedMessage = "";
let decryptedMessage = "";

// DOM Elements
const publicKeyDisplay = document.getElementById('publicKeyDisplay');
const generateKeyBtn = document.getElementById('generateKeyBtn');
const generateKeySpinner = generateKeyBtn.querySelector('.spinner');

const messageInput = document.getElementById('message');
const encryptBtn = document.getElementById('encryptBtn');
const encryptProgress = document.getElementById('encryptProgress');
const encryptedResult = document.getElementById('encryptedResult');
const encryptedMessageDisplay = document.getElementById('encryptedMessageDisplay');

const decryptBtn = document.getElementById('decryptBtn');
const decryptProgress = document.getElementById('decryptProgress');
const decryptedResult = document.getElementById('decryptedResult');
const decryptedMessageDisplay = document.getElementById('decryptedMessageDisplay');

// Key Generation
generateKeyBtn.addEventListener('click', function() {
    // Show loading state
    generateKeyBtn.disabled = true;
    generateKeyBtn.querySelector('.spinner').classList.remove('d-none');
    
    // Simulate key generation delay
    setTimeout(() => {
        // Generate a random "key" (for demo purposes)
        publicKey = "f7e6d5c4b3a2" + Array(58).fill(0).map(() => 
            Math.floor(Math.random() * 16).toString(16)).join('') + "...";
        
        // Update display
        publicKeyDisplay.textContent = publicKey;
        
        // Clear encrypted and decrypted messages when new keys are generated
        encryptedMessage = "";
        decryptedMessage = "";
        encryptedResult.classList.add('d-none');
        decryptedResult.classList.add('d-none');
        
        // Reset button state
        generateKeyBtn.disabled = false;
        generateKeyBtn.querySelector('.spinner').classList.add('d-none');
    }, 800);
});

// Encryption
encryptBtn.addEventListener('click', function() {
    message = messageInput.value.trim();
    
    if (!message) {
        return; // Don't encrypt empty messages
    }
    
    // Show loading state
    encryptBtn.disabled = true;
    encryptBtn.textContent = "Encrypting...";
    encryptProgress.classList.remove('d-none');
    
    // Simulate encryption delay
    setTimeout(() => {
        // Generate a random "encrypted" message (for demo purposes)
        encryptedMessage = "0x" + Array(64).fill(0).map(() => 
            Math.floor(Math.random() * 16).toString(16)).join('') + "...";
        
        // Update display
        encryptedMessageDisplay.textContent = encryptedMessage;
        encryptedResult.classList.remove('d-none');
        
        // Hide decrypted message if it exists
        decryptedMessage = "";
        decryptedResult.classList.add('d-none');
        
        // Enable decrypt button once we have encrypted message
        decryptBtn.disabled = false;
        
        // Reset button state
        encryptBtn.disabled = false;
        encryptBtn.textContent = "Encrypt Message";
        encryptProgress.classList.add('d-none');
    }, 1000);
});

// Decryption
decryptBtn.addEventListener('click', function() {
    if (!encryptedMessage) {
        return; // Don't try to decrypt if no encrypted message
    }
    
    // Show loading state
    decryptBtn.disabled = true;
    decryptBtn.textContent = "Decrypting...";
    decryptProgress.classList.remove('d-none');
    
    // Simulate decryption delay
    setTimeout(() => {
        // Use the original message as "decrypted" (for demo purposes)
        decryptedMessage = message;
        
        // Update display
        decryptedMessageDisplay.textContent = decryptedMessage;
        decryptedResult.classList.remove('d-none');
        
        // Reset button state
        decryptBtn.disabled = false;
        decryptBtn.textContent = "Decrypt Message";
        decryptProgress.classList.add('d-none');
    }, 1000);
});

// Initialize the UI
document.addEventListener('DOMContentLoaded', function() {
    // Disable decrypt button initially if no encrypted message
    decryptBtn.disabled = !encryptedMessage;
    
    // Update button states based on input
    messageInput.addEventListener('input', function() {
        encryptBtn.disabled = !this.value.trim();
    });
    
    // Initialize encrypt button state
    encryptBtn.disabled = !messageInput.value.trim();
});