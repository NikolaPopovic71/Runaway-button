const button = document.getElementById("runaway-btn");
const messageDiv = document.getElementById("message");
const startingPage = document.getElementById("starting-page");
const modal = document.getElementById("result-modal");

let startTime;
let gameTimer;
const gameDuration = 180000; // 3 minutes in milliseconds

// Function to animate the button's movement using anime.js
const animateMove = (element, prop, pixels) =>
  anime({
    targets: element,
    [prop]: `${pixels}px`,
    easing: "easeOutCirc",
    duration: 500, // Adjust the duration for smoother animation
  });

// Function to generate a random number within the given range
const getRandomNumber = (num) => {
  return Math.floor(Math.random() * num);
};

// Function to change the button color over time
const updateButtonColor = () => {
  const elapsedTime = Date.now() - startTime;
  const percentage = Math.min(elapsedTime / gameDuration, 1);
  const greenValue = Math.floor(100 - 100 * percentage); // from 100 (dark green) to 0 (white)
  const color = `rgb(${255 * percentage}, ${greenValue}, ${greenValue})`;
  button.style.backgroundColor = color;

  // Schedule next color update
  if (elapsedTime < gameDuration) {
    setTimeout(updateButtonColor, 50);
  }
};

// Function to start the game
const startGame = () => {
  messageDiv.textContent = "";
  button.disabled = false;
  modal.style.display = "none";
  startingPage.classList.remove("blurred");

  startTime = Date.now();
  gameTimer = setTimeout(() => endGame(false), gameDuration);
  updateButtonColor(); // Start updating button color over time
};

// Event listener for mouseover (desktop) and touchstart (mobile)
button.addEventListener("mouseover", moveButton);
button.addEventListener("touchstart", moveButton);
button.addEventListener("touchmove", moveButton);

function moveButton(event) {
  event.preventDefault();
  
  // Calculate new position
  const top = getRandomNumber(window.innerHeight - button.offsetHeight);
  const left = getRandomNumber(window.innerWidth - button.offsetWidth);
  
  animateMove(button, "left", left).play();
  animateMove(button, "top", top).play();
}

// Event listener for click
button.addEventListener("click", function () {
  const elapsedTime = Date.now() - startTime;

  if (elapsedTime <= 10000) {
    messageDiv.textContent =
      "Wow! You caught the button in 10 seconds! You must be a master hunter!";
  } else if (elapsedTime <= 20000) {
    messageDiv.textContent =
      "Great job! 20 seconds and you got it. You have the reflexes of a cat!";
  } else if (elapsedTime <= 50000) {
    messageDiv.textContent =
      "Finally caught it in 50 seconds? Well, persistence pays off!";
  } else {
    messageDiv.textContent =
      "It took you a while, but you got it! Better late than never!";
  }

  clearTimeout(gameTimer);
  showResultModal();
});

// Function to end the game if the user doesn't catch the button in 3 minutes
const endGame = (caught) => {
  if (!caught) {
    messageDiv.textContent =
      "Time's up! You didn't catch the button. Maybe your reflexes need a bit of work? 😅";
    showResultModal();
  }
};

// Function to display the result modal and blur the starting page
const showResultModal = () => {
  button.disabled = true;
  startingPage.classList.add("blurred");
  modal.style.display = "block";
  document.body.style.overflow = "hidden"; // Prevent scrolling when modal is open
};

// Start the game initially
startGame();

const shareButton = document.getElementById("share-button");
const hint = document.getElementById("click-hint");
const socialsWrapper = document.querySelector(".socials-wrapper");

const toggleSocials = () => {
  socialsWrapper.classList.toggle("active");

  // Hide the hint text once the image is clicked
  hint.style.display = "none";

  const shareButtonImage = shareButton.querySelector("img");
  if (
    shareButtonImage.src.includes("ponITech%20-%20shorten%20logo_without_n.svg")
  ) {
    shareButtonImage.src = "images/close.svg";
  } else {
    shareButtonImage.src = "images/ponITech%20-%20shorten%20logo_without_n.svg";
  }
};

shareButton.addEventListener("click", toggleSocials);