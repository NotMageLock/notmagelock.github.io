// Add your client-side JavaScript logic for LockNet here

// Function to toggle dark mode
function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
}

// Function to send a message
function sendMessage() {
    const messageInput = document.querySelector('.message-input');
    const message = messageInput.value.trim();
    if (message !== '') {
        // Send the message to the server
        socket.emit('message', message);
        // Clear the message input field
        messageInput.value = '';
    }
}

// Socket.io connection
const socket = io();

// Event listener for sending messages
document.querySelector('.message-input').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        sendMessage();
    }
});

// Save account settings
document.querySelector('.save-settings').addEventListener('click', () => {
    const displayNameInput = document.querySelector('.display-name');
    const bioInput = document.querySelector('.bio');
    const displayName = displayNameInput.value.trim();
    const bio = bioInput.value.trim();

    // Send the updated settings to the server (not implemented yet)
    console.log('Updated display name:', displayName);
    console.log('Updated bio:', bio);
});
