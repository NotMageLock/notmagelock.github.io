// Mock posts data
let posts = [
    { username: "user1", content: "This is the first post" },
    { username: "user2", content: "Second post here" },
    // Add more posts as needed
];

// Function to display posts
function displayPosts() {
    const postsSection = document.getElementById('posts');
    postsSection.innerHTML = '';
    posts.forEach(post => {
        const postElement = document.createElement('div');
        postElement.classList.add('post');
        postElement.innerHTML = `
            <p><strong>${post.username}:</strong> ${post.content}</p>
        `;
        postsSection.appendChild(postElement);
    });
}

// Function to handle post submission
function submitPost(event) {
    event.preventDefault();
    const postContent = document.getElementById('postContent').value;
    const loggedInUser = localStorage.getItem('loggedInUser'); // Get logged in user from localStorage
    if (postContent && loggedInUser) {
        posts.push({ username: loggedInUser, content: postContent });
        displayPosts();
        document.getElementById('postForm').reset();
    } else {
        alert('Please login to post');
    }
}

// Function to handle login
function login(event) {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    // Here you would make a request to the server to authenticate the user
    // For now, let's just mock a successful login
    if (username && password) {
        localStorage.setItem('loggedInUser', username); // Store logged in user in localStorage
        alert(`Welcome, ${username}!`);
    } else {
        alert('Invalid username or password');
    }
}

// Event listeners
document.getElementById('postForm').addEventListener('submit', submitPost);
document.getElementById('loginForm').addEventListener('submit', login);

// Initial display of posts
displayPosts();
