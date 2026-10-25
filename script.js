// 1. Find the HTML elements
const nameForm = document.getElementById("name-form");
const nameInput = document.getElementById("name");
const discoverButton = document.getElementById("discover-button");
const formMessage = document.getElementById("form-message");

const result = document.getElementById("result");
const scanning = document.getElementById("scanning");
const scanningPower = document.getElementById("scanning-power");
const powerCard = document.getElementById("power-card");

const heroName = document.getElementById("hero-name");
const powerName = document.getElementById("power-name");
const powerDescription = document.getElementById("power-description");
const powerLevelText = document.getElementById("power-level-text");
const powerBar = document.getElementById("power-bar");
const powerBarFill = document.getElementById("power-bar-fill");
const powerRarity = document.getElementById("power-rarity");
const powerWeakness = document.getElementById("power-weakness");

const tryAgainButton = document.getElementById("try-again-button");
const changeNameButton = document.getElementById("change-name-button");

// 2. Superpower data
const powers = [
  {
    name: "SUPER SPEED",
    description: "Run faster than anyone alive.",
    weakness: "You always forget where you were going.",
    rarity: "RARE",
    powerLevel: 84
  },
  {
    name: "INVISIBILITY",
    description: "Disappear whenever you want.",
    weakness: "Your clothes don't always cooperate.",
    rarity: "EPIC",
    powerLevel: 88
  },
  {
    name: "TIME FREEZE",
    description: "Freeze time for exactly 7 minutes.",
    weakness: "Your Wi-Fi freezes too.",
    rarity: "LEGENDARY",
    powerLevel: 82
  },
  {
    name: "TELEPORTATION",
    description: "Instantly appear somewhere else.",
    weakness: "Sometimes you arrive facing the wrong direction.",
    rarity: "EPIC",
    powerLevel: 90
  },
  {
    name: "SUPER STRENGTH",
    description: "Lift ridiculously heavy things.",
    weakness: "Opening a packet of crisps becomes dangerous.",
    rarity: "RARE",
    powerLevel: 86
  },
  {
    name: "FLYING",
    description: "Fly through the sky.",
    weakness: "Birds think you're one of them.",
    rarity: "EPIC",
    powerLevel: 91
  },
  {
    name: "MIND READING",
    description: "Hear what people are thinking.",
    weakness: "You also hear extremely boring thoughts.",
    rarity: "LEGENDARY",
    powerLevel: 89
  },
  {
    name: "WALL CRAWLING",
    description: "Climb walls and ceilings.",
    weakness: "Freshly cleaned windows.",
    rarity: "RARE",
    powerLevel: 76
  },
  {
    name: "MEGA BRAIN",
    description: "Solve difficult problems incredibly quickly.",
    weakness: "Stops working when hungry.",
    rarity: "EPIC",
    powerLevel: 93
  },
  {
    name: "TECHNOMANCER",
    description: "Control technology with your mind.",
    weakness: "Still can't fix bad Wi-Fi.",
    rarity: "LEGENDARY",
    powerLevel: 95
  },
  {
    name: "SNACK SUMMONER",
    description: "Make your favourite snack appear instantly.",
    weakness: "The last crisp is always slightly broken.",
    rarity: "COMMON",
    powerLevel: 67
  },
  {
    name: "ANIMAL TRANSLATOR",
    description: "Understand every animal on Earth.",
    weakness: "Pigeons have a lot of complaints.",
    rarity: "RARE",
    powerLevel: 73
  },
  {
    name: "WEATHER WHISPERER",
    description: "Ask the weather to change its mind.",
    weakness: "Clouds are terrible listeners on Mondays.",
    rarity: "EPIC",
    powerLevel: 87
  },
  {
    name: "CLONE CREW",
    description: "Create three helpful copies of yourself.",
    weakness: "All four of you argue over the last biscuit.",
    rarity: "RARE",
    powerLevel: 79
  },
  {
    name: "GRAVITY FLIP",
    description: "Turn any room upside down for ten seconds.",
    weakness: "You must tidy everything afterwards.",
    rarity: "EPIC",
    powerLevel: 85
  }
];

const eesaPower = {
  name: "BYTE MASTER",
  description: "You understand technology faster than normal humans.",
  weakness: "You keep wanting to build one more thing.",
  rarity: "LEGENDARY",
  powerLevel: 99
};

let currentName = "";
let scanningTimer;
let revealTimer;

// 3. Random power selection
function getRandomPower(name) {
  const isEesa = name.toLowerCase() === "eesa";
  const getsSpecialPower = Math.random() < 0.25;

  if (isEesa && getsSpecialPower) {
    return eesaPower;
  }

  const randomIndex = Math.floor(Math.random() * powers.length);
  return powers[randomIndex];
}

// 4. Display the result
function displayPower(name, power) {
  nameForm.hidden = true;
  scanning.hidden = true;
  powerCard.hidden = false;
  powerCard.classList.add("show");

  heroName.textContent = name.toUpperCase();
  powerName.textContent = power.name;
  powerDescription.textContent = '"' + power.description + '"';
  powerLevelText.textContent = power.powerLevel + "%";
  powerBarFill.style.width = power.powerLevel + "%";
  powerBar.setAttribute("aria-valuenow", power.powerLevel);
  powerRarity.textContent = power.rarity;
  powerWeakness.textContent = '"' + power.weakness + '"';

  discoverButton.disabled = false;
  discoverButton.textContent = "DISCOVER MY POWER";
  tryAgainButton.focus();
}

function startReveal(name) {
  const finalPower = getRandomPower(name);
  const prefersLessMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  clearInterval(scanningTimer);
  clearTimeout(revealTimer);

  formMessage.textContent = "";
  discoverButton.disabled = true;
  discoverButton.textContent = "SCANNING...";
  result.hidden = false;
  scanning.hidden = false;
  powerCard.hidden = true;
  powerCard.classList.remove("show");
  powerBarFill.style.width = "0";

  if (prefersLessMotion) {
    displayPower(name, finalPower);
    return;
  }

  scanningPower.textContent = "SEARCHING FOR POWERS";

  scanningTimer = setInterval(function () {
    const randomIndex = Math.floor(Math.random() * powers.length);
    scanningPower.textContent = powers[randomIndex].name;
  }, 160);

  revealTimer = setTimeout(function () {
    clearInterval(scanningTimer);
    displayPower(name, finalPower);
  }, 1400);
}

// 5. Button events
nameForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const name = nameInput.value.trim();

  if (name === "") {
    formMessage.textContent = "ENTER YOUR NAME FIRST!";
    nameInput.focus();
  } else if (name.length > 30) {
    formMessage.textContent = "PLEASE USE 30 CHARACTERS OR FEWER.";
    nameInput.focus();
  } else {
    currentName = name;
    startReveal(currentName);
  }
});

tryAgainButton.addEventListener("click", function () {
  startReveal(currentName);
});

changeNameButton.addEventListener("click", function () {
  clearInterval(scanningTimer);
  clearTimeout(revealTimer);

  result.hidden = true;
  nameForm.hidden = false;
  nameInput.value = "";
  formMessage.textContent = "";
  nameInput.focus();
});

nameInput.addEventListener("input", function () {
  formMessage.textContent = "";
});
