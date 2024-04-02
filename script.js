function toggleMenu() {
    const menu = document.querySelector(".menu-links");
    const icon = document.querySelector(".hamburger-icon");
    menu.classList.toggle("open");
    icon.classList.toggle("open");
}
window.addEventListener('DOMContentLoaded', function() {
    toggleText(); // Call the function immediately on page load
    setInterval(toggleText, 4000); // Toggle text every 4 seconds
});

function toggleText() {
    var connectText = document.getElementById('connect-text');
    var collaborateText = document.getElementById('collaborate-text');

    // Toggle visibility of text
    if (connectText.style.opacity === '0' || connectText.style.opacity === '') {
        connectText.style.opacity = '1';
        animateText(connectText.innerText, connectText);
        collaborateText.style.opacity = '0';
    } else {
        collaborateText.style.opacity = '1';
        animateText(collaborateText.innerText, collaborateText);
        connectText.style.opacity = '0';
    }
}

function animateText(text, element) {
    element.textContent = ''; // Clear the text initially
    var index = 0;
    var interval = setInterval(function() {
        if (index < text.length) {
            element.textContent += text[index]; // Add one character at a time
            index++;
        } else {
            clearInterval(interval); // Stop the animation when all characters are displayed
        }
    }, 100); // Adjust the speed of typing animation (milliseconds per character)
}

// Call the function for Let's Connect and Let's Collaborate text
var connectText = document.getElementById('connect-text');
var collaborateText = document.getElementById('collaborate-text');

animateText("Let's Connect", connectText);
setTimeout(function() {
    animateText("Let's Collaborate", collaborateText);
}, 2000); // Delay the start of second animation by 2 seconds


