// Find the HTML elements
const playerForm = document.getElementById("player-form");
const playerList = document.getElementById("player-list");
const addPlayerButton = document.getElementById("add-player-button");
const formError = document.getElementById("form-error");

const setupScreen = document.getElementById("setup-screen");
const assigningScreen = document.getElementById("assigning-screen");
const revealScreen = document.getElementById("reveal-screen");
const arenaScreen = document.getElementById("arena-screen");

const fighterCount = document.getElementById("fighter-count");
const powerCard = document.getElementById("power-card");
const fighterName = document.getElementById("fighter-name");
const powerName = document.getElementById("power-name");
const powerDescription = document.getElementById("power-description");
const specialMove = document.getElementById("special-move");
const powerRarity = document.getElementById("power-rarity");
const powerWeakness = document.getElementById("power-weakness");
const revealAnnouncement = document.getElementById("reveal-announcement");

const attackValue = document.getElementById("attack-value");
const defenseValue = document.getElementById("defense-value");
const luckValue = document.getElementById("luck-value");
const attackBar = document.getElementById("attack-bar");
const defenseBar = document.getElementById("defense-bar");
const luckBar = document.getElementById("luck-bar");
const attackFill = document.getElementById("attack-fill");
const defenseFill = document.getElementById("defense-fill");
const luckFill = document.getElementById("luck-fill");

const nextFighterButton = document.getElementById("next-fighter-button");
const arenaPlayers = document.getElementById("arena-players");
const arenaView = document.getElementById("arena-view");
const arenaStatusLabel = document.getElementById("arena-status-label");
const arenaTitle = document.getElementById("arena-title");
const fightersRemaining = document.getElementById("fighters-remaining");
const winnerMessage = document.getElementById("winner-message");
const nextBattleButton = document.getElementById("next-battle-button");
const finalIntroView = document.getElementById("final-intro-view");
const finalLeftCard = document.getElementById("final-left-card");
const finalLeftName = document.getElementById("final-left-name");
const finalLeftPower = document.getElementById("final-left-power");
const finalLeftHealth = document.getElementById("final-left-health");
const finalRightCard = document.getElementById("final-right-card");
const finalRightName = document.getElementById("final-right-name");
const finalRightPower = document.getElementById("final-right-power");
const finalRightHealth = document.getElementById("final-right-health");
const enterFinalButton = document.getElementById("enter-final-button");
const eventView = document.getElementById("event-view");
const eventCard = document.getElementById("event-card");
const eventSymbol = document.getElementById("event-symbol");
const eventTitle = document.getElementById("event-title");
const eventDescription = document.getElementById("event-description");
const eventContinueButton = document.getElementById("event-continue-button");
const matchupView = document.getElementById("matchup-view");
const attackerCard = document.getElementById("attacker-card");
const defenderCard = document.getElementById("defender-card");
const attackerName = document.getElementById("attacker-name");
const defenderName = document.getElementById("defender-name");
const attackerPower = document.getElementById("attacker-power");
const defenderPower = document.getElementById("defender-power");
const attackerHealth = document.getElementById("attacker-health");
const defenderHealth = document.getElementById("defender-health");
const attackerHealthBar = document.getElementById("attacker-health-bar");
const defenderHealthBar = document.getElementById("defender-health-bar");
const attackerHealthFill = document.getElementById("attacker-health-fill");
const defenderHealthFill = document.getElementById("defender-health-fill");
const fightButton = document.getElementById("fight-button");
const battleResult = document.getElementById("battle-result");
const abilityResults = document.getElementById("ability-results");
const battleEvent = document.getElementById("battle-event");
const battleAction = document.getElementById("battle-action");
const battleMessage = document.getElementById("battle-message");
const battleHealth = document.getElementById("battle-health");
const eliminationMessage = document.getElementById("elimination-message");
const continueButton = document.getElementById("continue-button");
const winnerScreen = document.getElementById("winner-screen");
const winnerName = document.getElementById("winner-name");
const winnerPower = document.getElementById("winner-power");
const winnerRarity = document.getElementById("winner-rarity");
const winnerHealth = document.getElementById("winner-health");
const winnerEliminations = document.getElementById("winner-eliminations");
const winnerDamage = document.getElementById("winner-damage");
const winnerBiggestHit = document.getElementById("winner-biggest-hit");
const mvpSummary = document.getElementById("mvp-summary");
const finalRanking = document.getElementById("final-ranking");
const rematchButton = document.getElementById("rematch-button");
const newPlayersButton = document.getElementById("new-players-button");
const battleImpactBanner = document.getElementById("battle-impact-banner");
const matchupBattleHistory = document.getElementById("matchup-battle-history");
const arenaBattleHistory = document.getElementById("arena-battle-history");

const minimumPlayers = 2;
const maximumPlayers = 6;
const maxBattleHistoryEntries = 5;
let battleHistory = [];
let players = [];
let currentFighterIndex = 0;
let currentAttacker = null;
let currentDefender = null;
let chaosModeActive = false;
let finalBattleIntroShown = false;
let eliminationOrder = [];

// Change this one number when testing arena events.
let arenaEventChance = 0.20;

const arenaEvents = [
  { id: "healthPack", name: "HEALTH PACK FOUND!", symbol: "+" },
  { id: "powerSurge", name: "POWER SURGE!", symbol: "\u26A1" },
  { id: "shieldBoost", name: "SHIELD BOOST!", symbol: "\u25C6" },
  { id: "lightningStorm", name: "LIGHTNING STORM!", symbol: "\u2608" },
  { id: "mysteryHeal", name: "MYSTERY HEAL!", symbol: "?" },
  { id: "badLuck", name: "BAD LUCK!", symbol: "!" },
  { id: "arenaBoost", name: "ARENA BOOST!", symbol: "\u2605" },
  { id: "chaosMode", name: "CHAOS MODE!", symbol: "\u2726" },
  { id: "secondWind", name: "SECOND WIND!", symbol: "\u2764" },
  { id: "nothing", name: "MYSTERY EVENT!", symbol: "..." }
];

// Superpower data
const powers = [
  {
    name: "SUPER SPEED",
    type: "speed",
    description: "Move faster than the eye can follow.",
    specialMove: "SONIC DASH",
    ability: { name: "DOUBLE STRIKE", chance: 0.20, effect: "doubleStrike" },
    weakness: "Sharp turns are surprisingly difficult.",
    attack: 78,
    defense: 52,
    luck: 68,
    rarity: "RARE"
  },
  {
    name: "SUPER STRENGTH",
    type: "strength",
    description: "Lift enormous objects and deliver mighty punches.",
    specialMove: "GROUND SMASH",
    ability: { name: "SMASH", chance: 0.20, effect: "strengthBonus" },
    weakness: "Opening a packet of crisps becomes dangerous.",
    attack: 88,
    defense: 74,
    luck: 45,
    rarity: "RARE"
  },
  {
    name: "INVISIBILITY",
    type: "shadow",
    description: "Disappear from sight and move without being noticed.",
    specialMove: "VANISH",
    ability: { name: "VANISH", chance: 0.20, effect: "dodge" },
    weakness: "Your clothes do not always cooperate.",
    attack: 62,
    defense: 58,
    luck: 82,
    rarity: "EPIC"
  },
  {
    name: "TELEPORTATION",
    type: "space",
    description: "Instantly jump from one place to another.",
    specialMove: "BLINK STRIKE",
    ability: { name: "BLINK", chance: 0.25, effect: "dodge" },
    weakness: "Sometimes you arrive facing the wrong direction.",
    attack: 76,
    defense: 64,
    luck: 78,
    rarity: "EPIC"
  },
  {
    name: "TIME FREEZE",
    type: "time",
    description: "Stop everything around you for a few precious moments.",
    specialMove: "STOP TIME",
    ability: { name: "STOP TIME", chance: 0.20, effect: "timeFreeze" },
    weakness: "Your Wi-Fi freezes too.",
    attack: 84,
    defense: 72,
    luck: 58,
    rarity: "LEGENDARY"
  },
  {
    name: "LIGHTNING",
    type: "electric",
    description: "Control electricity and unleash powerful electrical attacks.",
    specialMove: "THUNDER STRIKE",
    ability: { name: "THUNDER STRIKE", chance: 0.20, effect: "lightningBonus" },
    weakness: "Water makes things complicated.",
    attack: 86,
    defense: 55,
    luck: 68,
    rarity: "EPIC"
  },
  {
    name: "FIRE CONTROL",
    type: "fire",
    description: "Create and command roaring flames.",
    specialMove: "INFERNO BURST",
    ability: { name: "INFERNO", chance: 0.20, effect: "fireBonus" },
    weakness: "Rainy days ruin the dramatic entrance.",
    attack: 82,
    defense: 58,
    luck: 60,
    rarity: "RARE"
  },
  {
    name: "ICE CONTROL",
    type: "ice",
    description: "Freeze the ground and build walls of ice.",
    specialMove: "FROST WAVE",
    ability: { name: "DEEP FREEZE", chance: 0.20, effect: "iceBonus" },
    weakness: "Hot chocolate is extremely distracting.",
    attack: 72,
    defense: 82,
    luck: 55,
    rarity: "RARE"
  },
  {
    name: "FLYING",
    type: "air",
    description: "Soar through the sky and attack from above.",
    specialMove: "SKY DIVE",
    ability: { name: "AERIAL DODGE", chance: 0.20, effect: "dodge" },
    weakness: "Birds think you are one of them.",
    attack: 70,
    defense: 65,
    luck: 72,
    rarity: "RARE"
  },
  {
    name: "MIND READING",
    type: "psychic",
    description: "Hear thoughts and predict an opponent's next move.",
    specialMove: "BRAIN SCAN",
    ability: { name: "READ MOVE", chance: 0.20, effect: "dodge" },
    weakness: "You also hear extremely boring thoughts.",
    attack: 65,
    defense: 60,
    luck: 88,
    rarity: "EPIC"
  },
  {
    name: "FORCE FIELD",
    type: "energy",
    description: "Create powerful shields made from pure energy.",
    specialMove: "OMEGA BARRIER",
    ability: { name: "ENERGY SHIELD", chance: 0.20, effect: "block" },
    weakness: "The shield flickers when you sneeze.",
    attack: 58,
    defense: 94,
    luck: 52,
    rarity: "EPIC"
  },
  {
    name: "REGENERATION",
    type: "nature",
    description: "Recover from damage with amazing speed.",
    specialMove: "SECOND WIND",
    ability: { name: "RAPID HEALING", chance: 0.25, effect: "regenerate" },
    weakness: "Healing makes you incredibly hungry.",
    attack: 64,
    defense: 90,
    luck: 55,
    rarity: "EPIC"
  },
  {
    name: "SHADOW CLONE",
    type: "shadow",
    description: "Create copies that confuse and surround opponents.",
    specialMove: "CLONE SWARM",
    ability: { name: "CLONE DECOY", chance: 0.25, effect: "dodge" },
    weakness: "The clones are terrible at following instructions.",
    attack: 78,
    defense: 70,
    luck: 65,
    rarity: "RARE"
  },
  {
    name: "GRAVITY CONTROL",
    type: "space",
    description: "Make objects heavier, lighter or completely weightless.",
    specialMove: "GRAVITY CRUSH",
    ability: { name: "GRAVITY CRUSH", chance: 0.20, effect: "gravityBonus" },
    weakness: "Loose change keeps floating away.",
    attack: 83,
    defense: 80,
    luck: 55,
    rarity: "LEGENDARY"
  },
  {
    name: "LASER VISION",
    type: "energy",
    description: "Fire focused beams of energy from your eyes.",
    specialMove: "MEGA BEAM",
    ability: { name: "FULL POWER BEAM", chance: 0.20, effect: "laserBonus" },
    weakness: "Sunglasses never last very long.",
    attack: 87,
    defense: 50,
    luck: 60,
    rarity: "RARE"
  },
  {
    name: "WALL CRAWLING",
    type: "agility",
    description: "Climb walls and ceilings with ease.",
    specialMove: "CEILING DROP",
    ability: { name: "WALL LEAP", chance: 0.20, effect: "dodge" },
    weakness: "Freshly cleaned windows.",
    attack: 66,
    defense: 68,
    luck: 72,
    rarity: "COMMON"
  },
  {
    name: "MEGA BRAIN",
    type: "psychic",
    description: "Solve difficult problems at incredible speed.",
    specialMove: "PERFECT PLAN",
    ability: { name: "PREDICT ATTACK", chance: 0.25, effect: "reduceDamage" },
    weakness: "Stops working when hungry.",
    attack: 68,
    defense: 62,
    luck: 92,
    rarity: "EPIC"
  },
  {
    name: "TECHNOMANCER",
    type: "tech",
    description: "Control machines and gadgets with your mind.",
    specialMove: "SYSTEM OVERRIDE",
    ability: { name: "SYSTEM OVERRIDE", chance: 0.20, effect: "techBonus" },
    weakness: "Still cannot fix bad Wi-Fi.",
    attack: 80,
    defense: 72,
    luck: 75,
    rarity: "EPIC"
  },
  {
    name: "SHAPE SHIFTING",
    type: "nature",
    description: "Transform into animals, objects or other people.",
    specialMove: "BEAST MODE",
    ability: { name: "PERFECT COUNTER", chance: 0.20, effect: "counter" },
    weakness: "Sometimes you forget your original hairstyle.",
    attack: 76,
    defense: 74,
    luck: 72,
    rarity: "RARE"
  },
  {
    name: "PORTAL MASTER",
    type: "space",
    description: "Open glowing doorways between distant places.",
    specialMove: "PORTAL STORM",
    ability: { name: "PORTAL ESCAPE", chance: 0.20, effect: "dodge" },
    weakness: "You occasionally misplace the exit.",
    attack: 82,
    defense: 68,
    luck: 80,
    rarity: "LEGENDARY"
  },
  {
    name: "CHICKEN ARMY",
    type: "weird",
    description: "Summon a fearless squad of battle chickens.",
    specialMove: "CHICKEN STAMPEDE",
    ability: { name: "CHICKEN STAMPEDE", chance: 0.25, effect: "chickenBonus" },
    weakness: "They stop fighting when someone brings corn.",
    attack: 70,
    defense: 62,
    luck: 88,
    rarity: "COMMON"
  },
  {
    name: "UNO REVERSE",
    type: "weird",
    description: "Send an opponent's attack straight back at them.",
    specialMove: "NO, YOU!",
    ability: { name: "NO, YOU!", chance: 0.18, effect: "reflect" },
    weakness: "It only works if you remembered the card.",
    attack: 74,
    defense: 78,
    luck: 85,
    rarity: "RARE"
  },
  {
    name: "WI-FI DESTROYER",
    type: "tech",
    description: "Disable every wireless signal nearby.",
    specialMove: "CONNECTION LOST",
    ability: { name: "CONNECTION LOST", chance: 0.20, effect: "block" },
    weakness: "Your own games disconnect too.",
    attack: 79,
    defense: 55,
    luck: 90,
    rarity: "COMMON"
  },
  {
    name: "ULTRA LUCK",
    type: "weird",
    description: "Make impossible coincidences happen at the perfect moment.",
    specialMove: "LUCKY BREAK",
    ability: { name: "IMPOSSIBLE LUCK", chance: 0.25, effect: "ultraLuck" },
    weakness: "Nobody lets you choose the lottery numbers.",
    attack: 55,
    defense: 58,
    luck: 100,
    rarity: "LEGENDARY"
  }
];

// Clear an error when a player starts typing again
function addInputListener(input) {
  input.addEventListener("input", function () {
    const playerSlot = input.closest(".player-slot");
    const errorMessage = playerSlot.querySelector(".player-error");

    input.removeAttribute("aria-invalid");
    errorMessage.textContent = "";
    formError.textContent = "";
  });
}

// Keep player numbers correct after adding or removing a fighter
function updatePlayerNumbers() {
  const playerSlots = document.querySelectorAll(".player-slot");

  playerSlots.forEach(function (playerSlot, index) {
    const playerNumber = index + 1;
    const label = playerSlot.querySelector("label");
    const input = playerSlot.querySelector("input");
    const errorMessage = playerSlot.querySelector(".player-error");
    const removeButton = playerSlot.querySelector(".remove-button");

    label.textContent = "PLAYER " + playerNumber;
    label.htmlFor = "player-" + playerNumber;
    input.id = "player-" + playerNumber;
    input.setAttribute("aria-describedby", "player-" + playerNumber + "-error");
    errorMessage.id = "player-" + playerNumber + "-error";

    if (removeButton) {
      removeButton.setAttribute("aria-label", "Remove Player " + playerNumber);
    }
  });

  addPlayerButton.disabled = playerSlots.length >= maximumPlayers;
}

// Create one removable player slot
function addPlayer() {
  const playerSlots = document.querySelectorAll(".player-slot");

  if (playerSlots.length >= maximumPlayers) {
    formError.textContent = "THE ARENA CAN ONLY HOLD 6 PLAYERS.";
    return;
  }

  const playerNumber = playerSlots.length + 1;
  const playerSlot = document.createElement("div");
  const label = document.createElement("label");
  const inputRow = document.createElement("div");
  const input = document.createElement("input");
  const removeButton = document.createElement("button");
  const errorMessage = document.createElement("p");

  playerSlot.className = "player-slot";

  label.textContent = "PLAYER " + playerNumber;
  label.htmlFor = "player-" + playerNumber;

  inputRow.className = "input-row";

  input.type = "text";
  input.id = "player-" + playerNumber;
  input.className = "player-name";
  input.placeholder = "Enter name";
  input.maxLength = 15;
  input.autocomplete = "off";
  input.setAttribute("aria-describedby", "player-" + playerNumber + "-error");

  removeButton.type = "button";
  removeButton.className = "button remove-button";
  removeButton.textContent = "REMOVE";
  removeButton.setAttribute("aria-label", "Remove Player " + playerNumber);

  errorMessage.id = "player-" + playerNumber + "-error";
  errorMessage.className = "player-error";

  removeButton.addEventListener("click", function () {
    playerSlot.remove();
    formError.textContent = "";
    updatePlayerNumbers();
  });

  addInputListener(input);
  inputRow.append(input, removeButton);
  playerSlot.append(label, inputRow, errorMessage);
  playerList.append(playerSlot);

  updatePlayerNumbers();
  input.focus();
}

// Check every name and return the valid player names
function getValidPlayerNames() {
  const nameInputs = document.querySelectorAll(".player-name");
  const names = [];
  const lowerCaseNames = [];
  let firstInvalidInput = null;

  nameInputs.forEach(function (input, index) {
    const name = input.value.trim();
    const lowerCaseName = name.toLowerCase();
    const playerSlot = input.closest(".player-slot");
    const errorMessage = playerSlot.querySelector(".player-error");

    input.removeAttribute("aria-invalid");
    errorMessage.textContent = "";

    if (name === "") {
      errorMessage.textContent = "Enter a name for Player " + (index + 1) + ".";
      input.setAttribute("aria-invalid", "true");
      firstInvalidInput = firstInvalidInput || input;
    } else if (name.length > 15) {
      errorMessage.textContent = "Use 15 characters or fewer.";
      input.setAttribute("aria-invalid", "true");
      firstInvalidInput = firstInvalidInput || input;
    } else if (lowerCaseNames.includes(lowerCaseName)) {
      errorMessage.textContent = "That name is already taken.";
      input.setAttribute("aria-invalid", "true");
      firstInvalidInput = firstInvalidInput || input;
    } else {
      names.push(name);
      lowerCaseNames.push(lowerCaseName);
    }
  });

  if (nameInputs.length < minimumPlayers) {
    formError.textContent = "ADD AT LEAST 2 PLAYERS.";
    return [];
  }

  if (firstInvalidInput) {
    formError.textContent = "CHECK THE FIGHTER NAMES ABOVE.";
    firstInvalidInput.focus();
    return [];
  }

  return names;
}

// Shuffle a copy of the powers so every player gets a unique one
function shufflePowers() {
  const shuffledPowers = powers.slice();

  for (let index = shuffledPowers.length - 1; index > 0; index--) {
    const randomIndex = Math.floor(Math.random() * (index + 1));
    const savedPower = shuffledPowers[index];

    shuffledPowers[index] = shuffledPowers[randomIndex];
    shuffledPowers[randomIndex] = savedPower;
  }

  return shuffledPowers;
}

// Give every player a power and their starting battle values
function assignPowers(playerNames, previousPowerNames) {
  let shuffledPowers = shufflePowers();
  players = [];
  finalBattleIntroShown = false;
  chaosModeActive = false;
  eliminationOrder = [];

  if (previousPowerNames) {
    while (shuffledPowers.some(function (power, index) {
      return power.name === previousPowerNames[index];
    })) {
      shuffledPowers = shufflePowers();
    }
  }

  playerNames.forEach(function (name, index) {
    const player = {
      name: name,
      power: shuffledPowers[index],
      health: 100,
      maxHealth: 100,
      eliminated: false,
      eliminations: 0,
      damageDealt: 0,
      damageTaken: 0,
      criticalHits: 0,
      attacksMade: 0,
      attacksDodged: 0,
      healingReceived: 0,
      biggestHit: 0,
      nextAttackBonus: 0,
      nextDefenseBoost: 0,
      nextMissPenalty: 0,
      nextCriticalBoost: 0
    };

    players.push(player);
  });
}

// Fill the reveal card with one fighter's power
function showPowerReveal() {
  const player = players[currentFighterIndex];
  const power = player.power;

  assigningScreen.hidden = true;
  revealScreen.hidden = false;
  powerCard.dataset.type = power.type;

  fighterCount.textContent = "FIGHTER " + (currentFighterIndex + 1) + " OF " + players.length;
  fighterName.textContent = player.name.toUpperCase();
  powerName.textContent = power.name;
  powerDescription.textContent = power.description;
  specialMove.textContent = power.specialMove;
  powerRarity.textContent = power.rarity;
  powerWeakness.textContent = power.weakness;

  attackValue.textContent = power.attack;
  defenseValue.textContent = power.defense;
  luckValue.textContent = power.luck;

  attackFill.style.width = power.attack + "%";
  defenseFill.style.width = power.defense + "%";
  luckFill.style.width = power.luck + "%";
  attackBar.setAttribute("aria-valuenow", power.attack);
  defenseBar.setAttribute("aria-valuenow", power.defense);
  luckBar.setAttribute("aria-valuenow", power.luck);

  if (currentFighterIndex === players.length - 1) {
    nextFighterButton.textContent = "ENTER THE ARENA";
  } else {
    nextFighterButton.textContent = "NEXT FIGHTER";
  }

  powerCard.classList.remove("reveal-pop");
  setTimeout(function () {
    powerCard.classList.add("reveal-pop");
  }, 10);

  revealAnnouncement.textContent = player.name + " received " + power.name;
  revealScreen.focus();
  nextFighterButton.focus();
}

// Create one small stat for an arena fighter card
function createArenaStat(label, value) {
  const stat = document.createElement("p");
  const statLabel = document.createElement("span");
  const statValue = document.createElement("strong");

  statLabel.textContent = label;
  statValue.textContent = value;
  stat.append(statLabel, statValue);

  return stat;
}

// Return only fighters who can still take part in battles and events
function getLivingPlayers() {
  return players.filter(function (player) {
    return player.eliminated === false;
  });
}

function chooseRandomPlayer(playerChoices) {
  const randomIndex = Math.floor(Math.random() * playerChoices.length);
  return playerChoices[randomIndex];
}

// Apply one arena event and show its short presentation
function triggerArenaEvent(event) {
  const livingPlayers = getLivingPlayers();
  let chosenPlayer;
  let amount;
  let description = "";

  if (event.id === "healthPack") {
    chosenPlayer = chooseRandomPlayer(livingPlayers);
    amount = healPlayer(chosenPlayer, 20);
    description = amount > 0
      ? chosenPlayer.name.toUpperCase() + " +" + amount + " HP"
      : chosenPlayer.name.toUpperCase() + " IS ALREADY AT FULL HEALTH!";
    addBattleHistory(chosenPlayer.name + " found a HEALTH PACK", "heal");
  } else if (event.id === "powerSurge") {
    chosenPlayer = chooseRandomPlayer(livingPlayers);
    chosenPlayer.nextAttackBonus = 15;
    description = chosenPlayer.name.toUpperCase() + "'S NEXT ATTACK IS BOOSTED!";
    addBattleHistory(chosenPlayer.name + " activated a POWER SURGE", "ability");
  } else if (event.id === "shieldBoost") {
    chosenPlayer = chooseRandomPlayer(livingPlayers);
    chosenPlayer.nextDefenseBoost = 0.40;
    description = chosenPlayer.name.toUpperCase() + " GAINS A SHIELD FOR THE NEXT ATTACK!";
    addBattleHistory(chosenPlayer.name + " activated SHIELD BOOST", "block");
  } else if (event.id === "lightningStorm") {
    amount = 5 + Math.floor(Math.random() * 6);

    livingPlayers.forEach(function (player) {
      const stormDamage = Math.min(amount, player.health - 1);
      player.health -= stormDamage;
      player.damageTaken += stormDamage;
    });

    description = "EVERY FIGHTER -" + amount + " HP\nNO ONE CAN BE ELIMINATED.";
    addBattleHistory("LIGHTNING STORM struck all fighters (-" + amount + " HP)", "hit");
  } else if (event.id === "mysteryHeal") {
    chosenPlayer = chooseRandomPlayer(livingPlayers);
    amount = 10 + Math.floor(Math.random() * 21);
    amount = healPlayer(chosenPlayer, amount);
    description = amount > 0
      ? chosenPlayer.name.toUpperCase() + " +" + amount + " HP"
      : chosenPlayer.name.toUpperCase() + " IS ALREADY AT FULL HEALTH!";
    addBattleHistory(chosenPlayer.name + " received a MYSTERY HEAL", "heal");
  } else if (event.id === "badLuck") {
    chosenPlayer = chooseRandomPlayer(livingPlayers);
    chosenPlayer.nextMissPenalty = 0.25;
    description = chosenPlayer.name.toUpperCase() + " MAY MISS THEIR NEXT ATTACK!";
    addBattleHistory(chosenPlayer.name + " suffered BAD LUCK", "ability");
  } else if (event.id === "arenaBoost") {
    chosenPlayer = chooseRandomPlayer(livingPlayers);
    chosenPlayer.nextCriticalBoost = 0.30;
    description = chosenPlayer.name.toUpperCase() + " HAS A BETTER CRITICAL CHANCE!";
    addBattleHistory(chosenPlayer.name + " gained an ARENA BOOST", "ability");
  } else if (event.id === "chaosMode") {
    chaosModeActive = true;
    description = "THE NEXT ATTACK GETS WILD DAMAGE VARIATION!";
    addBattleHistory("CHAOS MODE activated across the arena", "ability");
  } else if (event.id === "secondWind") {
    const tiredPlayers = livingPlayers.filter(function (player) {
      return player.health <= 30;
    });

    if (tiredPlayers.length === 0) {
      return false;
    }

    chosenPlayer = chooseRandomPlayer(tiredPlayers);
    amount = healPlayer(chosenPlayer, 25);
    description = chosenPlayer.name.toUpperCase() + " GETS A SECOND WIND! +" + amount + " HP";
    addBattleHistory(chosenPlayer.name + " caught a SECOND WIND", "heal");
  } else {
    description = "...\n...\nABSOLUTELY NOTHING HAPPENED.";
  }

  eventCard.dataset.event = event.id;
  eventSymbol.textContent = event.symbol;
  eventTitle.textContent = event.name;
  eventDescription.textContent = description;
  arenaView.hidden = true;
  finalIntroView.hidden = true;
  matchupView.hidden = true;
  eventView.hidden = false;
  eventView.focus();
  eventContinueButton.focus();

  return true;
}

// Roll once before a battle. Most rolls continue normally.
function tryArenaEvent() {
  if (Math.random() >= arenaEventChance) {
    return false;
  }

  const availableEvents = arenaEvents.filter(function (event) {
    if (event.id !== "secondWind") {
      return true;
    }

    return getLivingPlayers().some(function (player) {
      return player.health <= 30;
    });
  });
  const randomEvent = availableEvents[Math.floor(Math.random() * availableEvents.length)];

  triggerArenaEvent(randomEvent);
  return true;
}

function startNextRound() {
  const eventStarted = tryArenaEvent();

  if (!eventStarted) {
    showRandomMatchup();
  }
}

function addArenaEffect(container, label) {
  const effect = document.createElement("span");
  effect.textContent = label;
  container.append(effect);
}

// Show the two remaining fighters before the final arena opens
function showFinalBattleIntro(livingPlayers) {
  const leftFighter = livingPlayers[0];
  const rightFighter = livingPlayers[1];

  finalLeftCard.dataset.type = leftFighter.power.type;
  finalLeftName.textContent = leftFighter.name;
  finalLeftPower.textContent = leftFighter.power.name;
  finalLeftHealth.textContent = leftFighter.health + " HP";

  finalRightCard.dataset.type = rightFighter.power.type;
  finalRightName.textContent = rightFighter.name;
  finalRightPower.textContent = rightFighter.power.name;
  finalRightHealth.textContent = rightFighter.health + " HP";

  arenaScreen.classList.remove("final-mode", "battle-over");
  arenaView.hidden = true;
  eventView.hidden = true;
  matchupView.hidden = true;
  finalIntroView.hidden = false;
  revealScreen.hidden = true;
  arenaScreen.hidden = false;
  finalIntroView.focus();
  enterFinalButton.focus();
}

// Build the main arena from the current players
function showArena() {
  const livingPlayers = getLivingPlayers();

  if (livingPlayers.length === 2 && !finalBattleIntroShown) {
    finalBattleIntroShown = true;
    showFinalBattleIntro(livingPlayers);
    return;
  }

  if (livingPlayers.length === 1) {
    showWinnerScreen(livingPlayers[0]);
    return;
  }

  const isFinalBattle = livingPlayers.length === 2;
  const displayedPlayers = isFinalBattle ? livingPlayers : players;

  arenaPlayers.textContent = "";
  arenaScreen.classList.toggle("final-mode", isFinalBattle);
  arenaScreen.classList.remove("battle-over");

  if (isFinalBattle) {
    arenaStatusLabel.textContent = "FINAL BATTLE";
    arenaTitle.textContent = "FINAL ARENA";
    fightersRemaining.textContent = "2 FIGHTERS REMAIN";
  } else {
    arenaStatusLabel.textContent = "WELCOME TO THE ARENA";
    arenaTitle.textContent = "POWER BATTLE";
    fightersRemaining.textContent = livingPlayers.length + " FIGHTERS REMAIN";
  }

  winnerMessage.textContent = "";
  nextBattleButton.hidden = false;

  displayedPlayers.forEach(function (player, index) {
    if (isFinalBattle && index === 1) {
      const versus = document.createElement("p");
      versus.className = "final-arena-versus";
      versus.setAttribute("aria-label", "versus");
      versus.textContent = "VS";
      arenaPlayers.append(versus);
    }

    const fighterCard = document.createElement("article");
    const fighterNumber = document.createElement("p");
    const name = document.createElement("h3");
    const power = document.createElement("p");
    const rarity = document.createElement("p");
    const healthText = document.createElement("p");
    const healthBar = document.createElement("div");
    const healthFill = document.createElement("span");
    const stats = document.createElement("div");
    const activeEffects = document.createElement("div");
    const eliminatedLabel = document.createElement("p");

    fighterCard.className = "arena-fighter";
    fighterCard.dataset.type = player.power.type;
    fighterCard.dataset.eliminated = player.eliminated;
    fighterNumber.className = "arena-number";
    power.className = "arena-power";
    rarity.className = "arena-rarity";
    healthText.className = "health-text";
    healthBar.className = "health-bar";
    healthBar.setAttribute("role", "progressbar");
    healthBar.setAttribute("aria-label", player.name + " health");
    healthBar.setAttribute("aria-valuemin", "0");
    healthBar.setAttribute("aria-valuemax", player.maxHealth);
    healthBar.setAttribute("aria-valuenow", player.health);
    stats.className = "arena-stats";
    activeEffects.className = "arena-effects";
    eliminatedLabel.className = "eliminated-label";

    fighterNumber.textContent = "FIGHTER " + (index + 1);
    name.textContent = player.name;
    power.textContent = player.power.name;
    rarity.textContent = player.power.rarity;
    renderHealthDisplay(healthText, healthBar, player.health, player.maxHealth);
    eliminatedLabel.textContent = "ELIMINATED";

    stats.append(
      createArenaStat("ATK", player.power.attack),
      createArenaStat("DEF", player.power.defense),
      createArenaStat("LUCK", player.power.luck)
    );

    fighterCard.append(fighterNumber, name, power, rarity, healthText, healthBar, stats);

    if (!player.eliminated) {
      if (player.nextAttackBonus > 0) {
        addArenaEffect(activeEffects, "POWER SURGE");
      }
      if (player.nextDefenseBoost > 0) {
        addArenaEffect(activeEffects, "SHIELD READY");
      }
      if (player.nextMissPenalty > 0) {
        addArenaEffect(activeEffects, "BAD LUCK");
      }
      if (player.nextCriticalBoost > 0) {
        addArenaEffect(activeEffects, "CRIT BOOST");
      }
    }

    if (activeEffects.textContent !== "") {
      fighterCard.append(activeEffects);
    }

    if (player.eliminated) {
      fighterCard.append(eliminatedLabel);
    }

    arenaPlayers.append(fighterCard);
  });

  renderBattleHistory();
  revealScreen.hidden = true;
  arenaScreen.hidden = false;
  arenaView.hidden = false;
  finalIntroView.hidden = true;
  eventView.hidden = true;
  matchupView.hidden = true;
  battleResult.hidden = true;
  arenaScreen.focus();
}

// Choose one short celebration line from the winner's final stats
function getMvpSummary(winner) {
  if (winner.health <= 10) {
    return winner.name + " survived with only " + winner.health + " HP!";
  }

  if (winner.eliminations >= 2) {
    return winner.name + " dominated the arena with " + winner.eliminations + " eliminations.";
  }

  if (winner.damageDealt >= 150) {
    return winner.name + " dealt " + winner.damageDealt + " total damage.";
  }

  if (winner.criticalHits >= 2) {
    return winner.name + " landed " + winner.criticalHits + " crushing critical hits.";
  }

  return winner.name + " claimed the arena with " + winner.power.name + "!";
}

// Fill and open the dedicated winner screen
function showWinnerScreen(winner) {
  const ranking = [winner].concat(eliminationOrder.slice().reverse());

  winnerName.textContent = winner.name;
  winnerPower.textContent = winner.power.name;
  winnerRarity.textContent = winner.power.rarity;
  winnerHealth.textContent = winner.health + " HP";
  winnerEliminations.textContent = winner.eliminations;
  winnerDamage.textContent = winner.damageDealt;
  winnerBiggestHit.textContent = winner.biggestHit + " DAMAGE";
  mvpSummary.textContent = getMvpSummary(winner);
  finalRanking.textContent = "";

  ranking.forEach(function (player, index) {
    const result = document.createElement("li");
    const name = document.createElement("strong");
    const status = document.createElement("span");

    name.textContent = player.name;
    status.textContent = index === 0 ? "WINNER" : "ELIMINATED";
    result.append(name, status);
    finalRanking.append(result);
  });

  winnerScreen.dataset.type = winner.power.type;
  setupScreen.hidden = true;
  assigningScreen.hidden = true;
  revealScreen.hidden = true;
  arenaScreen.hidden = true;
  winnerScreen.hidden = false;
  winnerScreen.focus();
  rematchButton.focus();
}

// Health state and status determination (Healthy, Warning, Danger)
function getHealthStatus(health, maxHealth) {
  const percent = (health / maxHealth) * 100;
  if (percent <= 25) {
    return { level: "danger", label: "DANGER", icon: "\u26A0\uFE0F" };
  }
  if (percent <= 50) {
    return { level: "warning", label: "WARNING", icon: "\u26A1" };
  }
  return { level: "healthy", label: "HEALTHY", icon: "\u2764" };
}

function renderHealthDisplay(textElement, barElement, health, maxHealth) {
  const status = getHealthStatus(health, maxHealth);

  textElement.textContent = "";

  const heart = document.createElement("span");
  heart.className = "hp-heart";
  heart.textContent = "\u2764 ";

  const numeric = document.createElement("span");
  numeric.className = "hp-numeric";
  numeric.textContent = health + " / " + maxHealth + " HP";

  const badge = document.createElement("span");
  badge.className = "health-status-badge " + status.level;
  badge.textContent = status.icon + " " + status.label;

  textElement.append(heart, numeric, badge);

  if (barElement) {
    barElement.classList.remove("health-healthy", "health-warning", "health-danger");
    barElement.classList.add("health-" + status.level);
    barElement.setAttribute("aria-valuenow", health);
    barElement.setAttribute("aria-valuemax", maxHealth);

    const fill = barElement.querySelector("span");
    if (fill) {
      fill.style.width = Math.max(0, Math.min(100, (health / maxHealth) * 100)) + "%";
    }
  }
}

function animateHealthNumber(textElement, startVal, endVal, maxHealth, duration) {
  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (prefersReduced || duration <= 0 || startVal === endVal) {
    renderHealthDisplay(textElement, null, endVal, maxHealth);
    return;
  }

  const startTime = performance.now();
  function tick(now) {
    const elapsed = now - startTime;
    const progress = Math.min(1, elapsed / duration);
    const currentVal = Math.round(startVal + (endVal - startVal) * progress);
    renderHealthDisplay(textElement, null, currentVal, maxHealth);

    if (progress < 1) {
      requestAnimationFrame(tick);
    } else {
      renderHealthDisplay(textElement, null, endVal, maxHealth);
    }
  }
  requestAnimationFrame(tick);
}

function updateMatchupHealthAnimated(attackerOldHp, defenderOldHp, isHealingTarget) {
  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const duration = prefersReduced ? 0 : 420;

  const attackerStatus = getHealthStatus(currentAttacker.health, currentAttacker.maxHealth);
  const defenderStatus = getHealthStatus(currentDefender.health, currentDefender.maxHealth);

  attackerHealthBar.classList.remove("health-healthy", "health-warning", "health-danger");
  attackerHealthBar.classList.add("health-" + attackerStatus.level);
  defenderHealthBar.classList.remove("health-healthy", "health-warning", "health-danger");
  defenderHealthBar.classList.add("health-" + defenderStatus.level);

  attackerHealthBar.setAttribute("aria-valuenow", currentAttacker.health);
  defenderHealthBar.setAttribute("aria-valuenow", currentDefender.health);

  requestAnimationFrame(function () {
    attackerHealthFill.style.width = (currentAttacker.health / currentAttacker.maxHealth) * 100 + "%";
    defenderHealthFill.style.width = (currentDefender.health / currentDefender.maxHealth) * 100 + "%";
  });

  animateHealthNumber(attackerHealth, attackerOldHp, currentAttacker.health, currentAttacker.maxHealth, duration);
  animateHealthNumber(defenderHealth, defenderOldHp, currentDefender.health, currentDefender.maxHealth, duration);

  if (!prefersReduced) {
    if (isHealingTarget === "attacker") {
      attackerHealthBar.classList.add("health-heal-pulse");
      setTimeout(function () {
        attackerHealthBar.classList.remove("health-heal-pulse");
      }, 550);
    } else if (isHealingTarget === "defender") {
      defenderHealthBar.classList.add("health-heal-pulse");
      setTimeout(function () {
        defenderHealthBar.classList.remove("health-heal-pulse");
      }, 550);
    }
  }
}

function clearCombatVisuals() {
  if (attackerCard) {
    attackerCard.classList.remove(
      "card-punch-forward", "card-damaged", "card-crit-impact",
      "card-dodge", "card-shield-block", "fighter-eliminated",
      "card-reverse-recoil", "wifi-error-glitch"
    );
  }
  if (defenderCard) {
    defenderCard.classList.remove(
      "card-punch-forward", "card-damaged", "card-crit-impact",
      "card-dodge", "card-shield-block", "fighter-eliminated",
      "card-reverse-recoil", "wifi-error-glitch"
    );
  }
  if (battleImpactBanner) {
    battleImpactBanner.classList.remove("show", "critical", "special", "reverse");
    battleImpactBanner.hidden = true;
    battleImpactBanner.textContent = "";
  }
  document.querySelectorAll(".floating-combat-text, .chicken-stampede-container").forEach(function (el) {
    el.remove();
  });
}

function showImpactBanner(text, type, duration) {
  if (!battleImpactBanner) return;
  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  battleImpactBanner.textContent = text;
  battleImpactBanner.className = "battle-impact-banner show " + type;
  battleImpactBanner.hidden = false;

  const showDuration = prefersReduced ? Math.min(200, duration || 600) : (duration || 600);
  setTimeout(function () {
    battleImpactBanner.classList.remove("show");
    battleImpactBanner.hidden = true;
  }, showDuration);
}

function showFloatingCombatText(targetCard, text, type) {
  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (prefersReduced || !targetCard) return;

  const popup = document.createElement("div");
  popup.className = "floating-combat-text " + type;
  popup.textContent = text;
  targetCard.append(popup);

  setTimeout(function () {
    popup.remove();
  }, 620);
}

function triggerChickenArmyEffect(sourceCard) {
  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (prefersReduced || !sourceCard) return;

  const container = document.createElement("div");
  container.className = "chicken-stampede-container";
  container.setAttribute("aria-hidden", "true");

  const squad = document.createElement("div");
  squad.className = "chicken-squad";
  squad.textContent = "\uD83D\uDC14 \uD83D\uDC13 \uD83D\uDC24 BOK BOK BOK! \uD83D\uDC14 \uD83D\uDC13";
  container.append(squad);
  sourceCard.append(container);

  setTimeout(function () {
    container.remove();
  }, 660);
}

function wait(ms) {
  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (prefersReduced) {
    return Promise.resolve();
  }
  return new Promise(function (resolve) {
    setTimeout(resolve, ms);
  });
}

function addBattleHistory(text, type) {
  battleHistory.push({
    text: text,
    type: type || "hit",
    timestamp: Date.now()
  });

  if (battleHistory.length > maxBattleHistoryEntries) {
    battleHistory.shift();
  }

  renderBattleHistory();
}

function renderBattleHistory() {
  const panels = [matchupBattleHistory, arenaBattleHistory];

  panels.forEach(function (panel) {
    if (!panel) return;
    panel.textContent = "";

    if (battleHistory.length === 0) {
      const empty = document.createElement("li");
      empty.className = "battle-history-empty";
      empty.textContent = "No combat actions recorded yet";
      panel.append(empty);
      return;
    }

    battleHistory.forEach(function (entry, index) {
      const isLatest = index === battleHistory.length - 1;
      const li = document.createElement("li");
      li.className = "battle-history-item " + entry.type + (isLatest ? " is-latest" : "");

      const label = document.createElement("span");
      label.className = "battle-history-text";
      label.textContent = entry.text;
      li.append(label);

      if (isLatest) {
        const badge = document.createElement("span");
        badge.className = "battle-history-latest-tag";
        badge.textContent = "NEW";
        li.append(badge);
      }

      panel.append(li);
    });
  });
}

// Pick two different fighters who are still in the battle
function showRandomMatchup() {
  const livingPlayers = players.filter(function (player) {
    return player.eliminated === false;
  });

  const attackerIndex = Math.floor(Math.random() * livingPlayers.length);
  let defenderIndex = Math.floor(Math.random() * livingPlayers.length);

  while (defenderIndex === attackerIndex) {
    defenderIndex = Math.floor(Math.random() * livingPlayers.length);
  }

  currentAttacker = livingPlayers[attackerIndex];
  currentDefender = livingPlayers[defenderIndex];

  attackerName.textContent = currentAttacker.name;
  attackerPower.textContent = currentAttacker.power.name;
  attackerCard.dataset.type = currentAttacker.power.type;

  defenderName.textContent = currentDefender.name;
  defenderPower.textContent = currentDefender.power.name;
  defenderCard.dataset.type = currentDefender.power.type;

  clearCombatVisuals();
  renderHealthDisplay(attackerHealth, attackerHealthBar, currentAttacker.health, currentAttacker.maxHealth);
  renderHealthDisplay(defenderHealth, defenderHealthBar, currentDefender.health, currentDefender.maxHealth);
  renderBattleHistory();

  battleResult.hidden = true;
  eliminationMessage.textContent = "";
  fightButton.disabled = false;
  fightButton.hidden = false;
  continueButton.hidden = true;
  arenaView.hidden = true;
  finalIntroView.hidden = true;
  eventView.hidden = true;
  matchupView.hidden = false;
  matchupView.focus();
  fightButton.focus();
}

// Check whether this power's ability works while attacking or defending
function abilityWorksForRole(effect, role) {
  const attackEffects = [
    "doubleStrike", "strengthBonus", "timeFreeze", "lightningBonus",
    "fireBonus", "iceBonus", "gravityBonus", "laserBonus",
    "techBonus", "chickenBonus", "ultraLuck"
  ];
  const defenseEffects = [
    "dodge", "block", "regenerate", "reduceDamage",
    "counter", "reflect", "ultraLuck"
  ];

  if (role === "attacker") {
    return attackEffects.includes(effect);
  }

  return defenseEffects.includes(effect);
}

// Roll the simple random chance stored with a power
function activateAbility(player, role) {
  const ability = player.power.ability;

  if (!abilityWorksForRole(ability.effect, role)) {
    return null;
  }

  if (Math.random() < ability.chance) {
    return ability;
  }

  return null;
}

// Add an ability announcement before the final damage result
function showAbilityMessage(title, description, kind) {
  const message = document.createElement("div");
  const heading = document.createElement("strong");
  const detail = document.createElement("span");

  message.className = "ability-message " + kind;
  heading.textContent = title;
  detail.textContent = description;
  message.append(heading, detail);
  abilityResults.append(message);
}

// Change health safely and credit the fighter who caused the damage
function applyDamage(target, damage, source) {
  const actualDamage = Math.min(Math.max(0, Math.round(damage)), target.health);

  target.health = Math.max(0, target.health - actualDamage);
  target.damageTaken += actualDamage;
  source.damageDealt += actualDamage;
  source.biggestHit = Math.max(source.biggestHit, actualDamage);

  if (target.health === 0 && !target.eliminated) {
    target.eliminated = true;
    source.eliminations++;
    eliminationOrder.push(target);
  }

  return actualDamage;
}

// Restore health without going above maxHealth
function healPlayer(player, amount) {
  const healthBefore = player.health;

  player.health = Math.min(player.maxHealth, player.health + amount);
  const healedAmount = player.health - healthBefore;
  player.healingReceived += healedAmount;
  return healedAmount;
}

// Keep the two matchup health displays in sync with the player data
function updateMatchupHealth() {
  attackerHealth.textContent = "\u2764 " + currentAttacker.health + " / " + currentAttacker.maxHealth;
  defenderHealth.textContent = "\u2764 " + currentDefender.health + " / " + currentDefender.maxHealth;
  attackerHealthBar.setAttribute("aria-valuenow", currentAttacker.health);
  defenderHealthBar.setAttribute("aria-valuenow", currentDefender.health);

  requestAnimationFrame(function () {
    attackerHealthFill.style.width = (currentAttacker.health / currentAttacker.maxHealth) * 100 + "%";
    defenderHealthFill.style.width = (currentDefender.health / currentDefender.maxHealth) * 100 + "%";
  });
}

// Give the attacker ability its small, easy-to-read effect
function useAttackerAbility(ability, settings) {
  if (!ability) {
    return;
  }

  if (ability.effect === "doubleStrike") {
    settings.doubleStrike = true;
    showAbilityMessage("DOUBLE STRIKE!", "A second speedy attack is ready.", "ability");
  } else if (ability.effect === "strengthBonus") {
    settings.bonusDamage += 14;
    showAbilityMessage("SMASH!", "Super strength adds massive force.", "damage");
  } else if (ability.effect === "timeFreeze") {
    settings.bonusDamage += 10;
    settings.guaranteedHit = true;
    showAbilityMessage("TIME FROZEN!", currentAttacker.name + " gets a free attack!", "ability");
  } else if (ability.effect === "lightningBonus") {
    settings.bonusDamage += 10;
    showAbilityMessage("THUNDER STRIKE!", "The attack is supercharged.", "damage");
  } else if (ability.effect === "fireBonus") {
    settings.bonusDamage += 15;
    showAbilityMessage("INFERNO!", "The arena heats up fast.", "damage");
  } else if (ability.effect === "iceBonus") {
    settings.bonusDamage += 8;
    showAbilityMessage("DEEP FREEZE!", "The frozen hit gains extra damage.", "damage");
  } else if (ability.effect === "gravityBonus") {
    settings.bonusDamage += 12;
    showAbilityMessage("GRAVITY CRUSH!", "Gravity makes the hit much heavier.", "damage");
  } else if (ability.effect === "laserBonus") {
    settings.bonusDamage += 12;
    showAbilityMessage("FULL POWER BEAM!", "Maximum laser power engaged.", "damage");
  } else if (ability.effect === "techBonus") {
    settings.bonusDamage += 10;
    showAbilityMessage("SYSTEM OVERRIDE!", "The defender's systems are weakened.", "damage");
  } else if (ability.effect === "chickenBonus") {
    settings.bonusDamage += 6 + Math.floor(Math.random() * 11);
    showAbilityMessage("CHICKEN STAMPEDE!", "Nobody was prepared for this.", "ability");
  } else if (ability.effect === "ultraLuck") {
    const luckyResult = Math.floor(Math.random() * 3);

    if (luckyResult === 0) {
      settings.avoidCounter = true;
      showAbilityMessage("IMPOSSIBLE LUCK!", "Any reflected or counter attack will miss.", "blocked");
    } else if (luckyResult === 1) {
      settings.forcedCritical = true;
      showAbilityMessage("IMPOSSIBLE LUCK!", "A critical hit is guaranteed.", "critical");
    } else {
      const healed = healPlayer(currentAttacker, 15);
      const healingText = healed > 0 ? "+" + healed + " HP at exactly the right moment." : "Health is already full!";
      showAbilityMessage("IMPOSSIBLE LUCK!", healingText, "healing");
    }
  }
}

// Give the defender ability its block, dodge, healing or counter effect
function useDefenderAbility(ability, settings) {
  if (!ability) {
    return;
  }

  if (ability.effect === "dodge") {
    settings.dodged = true;

    if (currentDefender.power.name === "INVISIBILITY") {
      showAbilityMessage("VANISHED!", "The attack missed!", "blocked");
    } else if (currentDefender.power.name === "SHADOW CLONE") {
      showAbilityMessage("CLONE DECOY!", "The attack hit a clone instead.", "blocked");
    } else if (currentDefender.power.name === "PORTAL MASTER") {
      showAbilityMessage("PORTAL ESCAPE!", "The attack disappeared through a portal.", "blocked");
    } else {
      showAbilityMessage(ability.name + "!", currentDefender.name + " avoided the attack.", "blocked");
    }
  } else if (ability.effect === "block") {
    settings.blocked = true;

    if (currentDefender.power.name === "WI-FI DESTROYER") {
      showAbilityMessage("CONNECTION LOST!", "Opponent.exe stopped responding.", "blocked");
    } else {
      showAbilityMessage("FORCE FIELD ACTIVATED!", "0 DAMAGE!", "blocked");
    }
  } else if (ability.effect === "reduceDamage") {
    settings.damageMultiplier *= 0.45;
    showAbilityMessage("PREDICT ATTACK!", "The incoming damage is heavily reduced.", "blocked");
  } else if (ability.effect === "counter") {
    settings.damageMultiplier *= 0.55;
    settings.counterDamage = 8;
    showAbilityMessage("PERFECT COUNTER!", "Damage reduced. Counterattack ready.", "ability");
  } else if (ability.effect === "reflect") {
    settings.reflected = true;
    showAbilityMessage("NO, YOU!", "The attack goes back to the attacker!", "ability");
  } else if (ability.effect === "ultraLuck") {
    const luckyResult = Math.floor(Math.random() * 3);

    if (luckyResult === 0) {
      settings.dodged = true;
      showAbilityMessage("IMPOSSIBLE LUCK!", "An impossible dodge!", "blocked");
    } else if (luckyResult === 1) {
      settings.damageMultiplier *= 0.60;
      settings.counterDamage = 14;
      showAbilityMessage("IMPOSSIBLE LUCK!", "A lucky critical counter is ready.", "critical");
    } else {
      settings.healAfter = true;
      showAbilityMessage("IMPOSSIBLE LUCK!", "A lucky recovery is coming.", "healing");
    }
  }
}

// Work out whether an attack misses, hits normally or lands a critical hit
function calculateAttack(attacker, defender, settings) {
  const missChance = settings.guaranteedHit ? 0 : 0.18 - attacker.power.luck * 0.001 + settings.missPenalty;
  const criticalChance = Math.min(0.75, 0.06 + attacker.power.luck * 0.0012 + settings.criticalBoost);

  if (Math.random() < missChance) {
    return { type: "miss", damage: 0 };
  }

  const statDifference = attacker.power.attack - defender.power.defense;
  const variationSize = settings.chaos ? 12 : 4;
  const randomVariation = Math.floor(Math.random() * (variationSize * 2 + 1)) - variationSize;
  let damage = 26 + Math.round(statDifference * 0.18) + randomVariation;

  damage = Math.max(18, Math.min(40, damage)) + settings.bonusDamage;

  if (settings.forcedCritical || Math.random() < criticalChance) {
    return { type: "critical", damage: Math.round(damage * 1.5) };
  }

  return { type: "normal", damage: damage };
}

// Apply one attack and show its animated visual result
async function fight() {
  if (fightButton.disabled) {
    return;
  }

  fightButton.disabled = true;
  fightButton.hidden = true;
  clearCombatVisuals();

  const attackerStartHealth = currentAttacker.health;
  const defenderStartHealth = currentDefender.health;

  const attackSettings = {
    bonusDamage: 0,
    guaranteedHit: false,
    forcedCritical: false,
    doubleStrike: false,
    avoidCounter: false,
    missPenalty: 0,
    criticalBoost: 0,
    chaos: false
  };
  const defenseSettings = {
    blocked: false,
    dodged: false,
    reflected: false,
    damageMultiplier: 1,
    counterDamage: 0,
    healAfter: false
  };
  let totalDamage = 0;
  let counterDamage = 0;
  let healedDefenderAmount = 0;
  let healedAttackerAmount = 0;
  let resultKind = "normal";

  currentAttacker.attacksMade++;

  abilityResults.textContent = "";
  battleResult.className = "battle-result";
  eliminationMessage.textContent = "";
  battleAction.textContent = currentAttacker.name.toUpperCase() + " uses " + currentAttacker.power.specialMove + "!";

  if (currentAttacker.nextAttackBonus > 0) {
    attackSettings.bonusDamage += currentAttacker.nextAttackBonus;
    showAbilityMessage("POWER SURGE USED!", "+" + currentAttacker.nextAttackBonus + " attack for this hit.", "damage");
    currentAttacker.nextAttackBonus = 0;
  }

  if (currentAttacker.nextMissPenalty > 0) {
    attackSettings.missPenalty = currentAttacker.nextMissPenalty;
    showAbilityMessage("BAD LUCK STRIKES!", "This attack is much more likely to miss.", "blocked");
    currentAttacker.nextMissPenalty = 0;
  }

  if (currentAttacker.nextCriticalBoost > 0) {
    attackSettings.criticalBoost = currentAttacker.nextCriticalBoost;
    showAbilityMessage("ARENA BOOST USED!", "Critical-hit chance increased.", "critical");
    currentAttacker.nextCriticalBoost = 0;
  }

  if (chaosModeActive) {
    attackSettings.chaos = true;
    chaosModeActive = false;
    showAbilityMessage("CHAOS MODE!", "Damage variation is extra wild this round.", "ability");
  }

  const attackerAbility = activateAbility(currentAttacker, "attacker");
  if (attackerAbility && attackerAbility.effect === "ultraLuck") {
    // Ultra luck check before execution
  }
  useAttackerAbility(attackerAbility, attackSettings);

  const result = calculateAttack(currentAttacker, currentDefender, attackSettings);

  if (result.type === "miss") {
    currentDefender.attacksDodged++;
    battleEvent.textContent = "MISSED!";
    battleMessage.textContent = "0 DAMAGE!";
    battleHealth.textContent = currentDefender.name.toUpperCase() + " has " + currentDefender.health + " HP REMAINING";
    resultKind = "blocked";
  } else {
    let defenderAbility = null;

    if (currentDefender.power.ability.effect !== "regenerate") {
      defenderAbility = activateAbility(currentDefender, "defender");
    }

    if (attackSettings.guaranteedHit && defenderAbility && (defenderAbility.effect === "dodge" || defenderAbility.effect === "ultraLuck")) {
      defenderAbility = null;
    }

    useDefenderAbility(defenderAbility, defenseSettings);

    if (currentDefender.nextDefenseBoost > 0) {
      defenseSettings.damageMultiplier *= 1 - currentDefender.nextDefenseBoost;
      showAbilityMessage("SHIELD BOOST USED!", "Incoming damage is reduced for this attack.", "blocked");
      currentDefender.nextDefenseBoost = 0;
    }

    if (attackSettings.avoidCounter) {
      defenseSettings.reflected = false;
      defenseSettings.counterDamage = 0;
    }

    if (defenseSettings.dodged || defenseSettings.blocked) {
      if (defenseSettings.dodged) {
        currentDefender.attacksDodged++;
      }

      battleEvent.textContent = defenseSettings.blocked ? "BLOCKED!" : "MISSED!";
      battleMessage.textContent = "0 DAMAGE!";
      battleHealth.textContent = currentDefender.name.toUpperCase() + " has " + currentDefender.health + " HP REMAINING";
      resultKind = "blocked";
    } else if (defenseSettings.reflected) {
      totalDamage = applyDamage(currentAttacker, result.damage, currentDefender);
      battleEvent.textContent = "ATTACK REFLECTED!";
      battleMessage.textContent = "-" + totalDamage + " HP TO " + currentAttacker.name.toUpperCase();
      battleHealth.textContent = currentAttacker.name.toUpperCase() + " has " + currentAttacker.health + " HP REMAINING";
      resultKind = "damage";
    } else {
      const firstDamage = Math.max(1, Math.round(result.damage * defenseSettings.damageMultiplier));
      totalDamage += applyDamage(currentDefender, firstDamage, currentAttacker);

      if (attackSettings.doubleStrike && !currentDefender.eliminated) {
        const secondDamage = Math.max(9, Math.round(result.damage * 0.55 * defenseSettings.damageMultiplier));
        totalDamage += applyDamage(currentDefender, secondDamage, currentAttacker);
      }

      if (result.type === "critical" && totalDamage > 0) {
        currentAttacker.criticalHits++;
      }

      if (defenseSettings.counterDamage > 0 && !currentDefender.eliminated) {
        counterDamage = applyDamage(currentAttacker, defenseSettings.counterDamage, currentDefender);
      }

      if (!currentDefender.eliminated && currentDefender.power.ability.effect === "regenerate") {
        const healingAbility = activateAbility(currentDefender, "defender");

        if (healingAbility) {
          const healingAmount = 10 + Math.floor(Math.random() * 9);
          healedDefenderAmount = healPlayer(currentDefender, healingAmount);
          showAbilityMessage("RAPID HEALING!", "+" + healedDefenderAmount + " HP recovered.", "healing");
        }
      } else if (!currentDefender.eliminated && defenseSettings.healAfter) {
        healedDefenderAmount = healPlayer(currentDefender, 15);
        showAbilityMessage("LUCKY HEAL!", "+" + healedDefenderAmount + " HP recovered.", "healing");
      }

      battleEvent.textContent = result.type === "critical" ? "CRITICAL HIT!" : "NORMAL HIT";
      battleMessage.textContent = "-" + totalDamage + " HP";

      if (counterDamage > 0) {
        battleMessage.textContent += " / " + currentAttacker.name.toUpperCase() + " takes " + counterDamage + " COUNTER DAMAGE";
      }

      battleHealth.textContent = currentDefender.name.toUpperCase() + " has " + currentDefender.health + " HP REMAINING";
      resultKind = result.type === "critical" ? "critical" : "damage";
    }
  }

  // --- ANIMATED COMBAT TIMELINE ---

  // 1. SPECIAL ABILITY DRAMATIC REVEAL (if active)
  if (attackerAbility) {
    showImpactBanner(currentAttacker.power.name + ": " + attackerAbility.name + "!", "special", 650);
    if (currentAttacker.power.name === "CHICKEN ARMY") {
      triggerChickenArmyEffect(attackerCard);
    }
    addBattleHistory(currentAttacker.name + " activated " + attackerAbility.name, "ability");
    await wait(320);
  }

  // 2. ATTACKER STRIKE ANIMATION
  attackerCard.classList.add("card-punch-forward");
  await wait(240);

  // 3. DEFENDER / IMPACT REACTION
  if (defenseSettings.reflected) {
    // UNO REVERSE: Attack visually reverses direction into attacker
    attackerCard.classList.remove("card-punch-forward");
    attackerCard.classList.add("card-reverse-recoil", "card-damaged");
    showImpactBanner("\uD83D\uDD04 UNO REVERSE! ATTACK REVERSED! \uD83D\uDD04", "reverse", 850);
    showFloatingCombatText(attackerCard, "-" + totalDamage + " HP", "damage");
    addBattleHistory(currentAttacker.name + "'s attack was REFLECTED by " + currentDefender.name + " for " + totalDamage, "crit");
    await wait(360);
  } else if (result.type === "miss" || defenseSettings.dodged) {
    // MISS / DODGE: Defender quickly dodges sideways
    defenderCard.classList.add("card-dodge");
    showFloatingCombatText(defenderCard, "DODGED!", "miss");
    addBattleHistory(currentDefender.name + " DODGED " + currentAttacker.name + "'s attack", "miss");
    await wait(280);
  } else if (defenseSettings.blocked) {
    // BLOCK: Shield style CSS effect
    defenderCard.classList.add("card-shield-block");
    if (currentDefender.power.name === "WI-FI DESTROYER") {
      defenderCard.classList.add("wifi-error-glitch");
    }
    showFloatingCombatText(defenderCard, "BLOCKED!", "block");
    addBattleHistory(currentDefender.name + " BLOCKED " + currentAttacker.name + "'s attack", "block");
    await wait(280);
  } else if (result.type === "critical") {
    // CRITICAL HIT: Strong impact animation + Large banner
    showImpactBanner("\uD83D\uDCA5 CRITICAL HIT! \uD83D\uDCA5", "critical", 900);
    defenderCard.classList.add("card-crit-impact");
    showFloatingCombatText(defenderCard, "-" + totalDamage + " HP", "crit");
    addBattleHistory(currentAttacker.name + " landed a CRITICAL HIT for " + totalDamage, "crit");
    await wait(360);
  } else {
    // NORMAL HIT: Defender flashes/shakes briefly
    defenderCard.classList.add("card-damaged");
    showFloatingCombatText(defenderCard, "-" + totalDamage + " HP", "damage");
    addBattleHistory(currentAttacker.name + " hit " + currentDefender.name + " for " + totalDamage, "hit");
    await wait(260);
  }

  // 4. COUNTER DAMAGE REACTION
  if (counterDamage > 0) {
    attackerCard.classList.add("card-damaged");
    showFloatingCombatText(attackerCard, "-" + counterDamage + " HP", "damage");
    addBattleHistory(currentDefender.name + " counterattacked for " + counterDamage, "hit");
  }

  // 5. HEALING POPUPS
  if (healedDefenderAmount > 0) {
    showFloatingCombatText(defenderCard, "+" + healedDefenderAmount + " HP", "heal");
    addBattleHistory(currentDefender.name + " healed for " + healedDefenderAmount + " HP", "heal");
  }
  if (healedAttackerAmount > 0) {
    showFloatingCombatText(attackerCard, "+" + healedAttackerAmount + " HP", "heal");
    addBattleHistory(currentAttacker.name + " healed for " + healedAttackerAmount + " HP", "heal");
  }

  // 6. HEALTH BARS ANIMATION (previous health -> new health)
  const healingTarget = healedDefenderAmount > 0 ? "defender" : (healedAttackerAmount > 0 ? "attacker" : null);
  updateMatchupHealthAnimated(attackerStartHealth, defenderStartHealth, healingTarget);
  await wait(340);

  // 7. ELIMINATION & FINAL RESULT CARD
  const eliminatedPlayers = [currentAttacker, currentDefender].filter(function (player) {
    return player.eliminated;
  });

  if (eliminatedPlayers.length > 0) {
    eliminatedPlayers.forEach(function (player) {
      const card = player === currentAttacker ? attackerCard : defenderCard;
      card.classList.add("fighter-eliminated");
      showFloatingCombatText(card, "ELIMINATED", "damage");
      addBattleHistory(player.name + " was ELIMINATED", "elimination");
    });
    eliminationMessage.textContent = eliminatedPlayers[0].name.toUpperCase() + " HAS BEEN ELIMINATED!";
  }

  battleResult.hidden = false;
  void battleResult.offsetWidth;
  battleResult.classList.add("result-show", resultKind);
  continueButton.hidden = false;
  continueButton.focus();
  fightButton.disabled = false;
}

// Start the same power reveal flow for a new game or a rematch
function startPowerAssignment(playerNames, previousPowerNames) {
  assignPowers(playerNames, previousPowerNames);
  console.log("Players:", players);

  battleHistory = [];
  renderBattleHistory();
  clearCombatVisuals();

  currentFighterIndex = 0;
  currentAttacker = null;
  currentDefender = null;
  setupScreen.hidden = true;
  revealScreen.hidden = true;
  arenaScreen.hidden = true;
  winnerScreen.hidden = true;
  assigningScreen.hidden = false;
  assigningScreen.focus();

  const prefersLessMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const assigningTime = prefersLessMotion ? 0 : 1000;

  setTimeout(showPowerReveal, assigningTime);
}

// Return to a clean two-player setup
function showNewPlayerSetup() {
  const playerSlots = Array.from(document.querySelectorAll(".player-slot"));

  playerSlots.forEach(function (playerSlot, index) {
    if (index >= minimumPlayers) {
      playerSlot.remove();
      return;
    }

    const input = playerSlot.querySelector(".player-name");
    const errorMessage = playerSlot.querySelector(".player-error");
    input.value = "";
    input.removeAttribute("aria-invalid");
    errorMessage.textContent = "";
  });

  battleHistory = [];
  renderBattleHistory();
  clearCombatVisuals();

  players = [];
  eliminationOrder = [];
  currentFighterIndex = 0;
  currentAttacker = null;
  currentDefender = null;
  chaosModeActive = false;
  finalBattleIntroShown = false;
  formError.textContent = "";
  updatePlayerNumbers();

  assigningScreen.hidden = true;
  revealScreen.hidden = true;
  arenaScreen.hidden = true;
  winnerScreen.hidden = true;
  setupScreen.hidden = false;
  document.querySelector(".player-name").focus();
}

// Button events
addPlayerButton.addEventListener("click", addPlayer);

document.querySelectorAll(".player-name").forEach(function (input) {
  addInputListener(input);
});

playerForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const validNames = getValidPlayerNames();

  if (validNames.length === 0) {
    return;
  }

  startPowerAssignment(validNames);
});

nextFighterButton.addEventListener("click", function () {
  if (currentFighterIndex < players.length - 1) {
    currentFighterIndex++;
    showPowerReveal();
  } else {
    showArena();
  }
});

nextBattleButton.addEventListener("click", startNextRound);
eventContinueButton.addEventListener("click", showRandomMatchup);
fightButton.addEventListener("click", fight);
continueButton.addEventListener("click", showArena);
enterFinalButton.addEventListener("click", showArena);

rematchButton.addEventListener("click", function () {
  const playerNames = players.map(function (player) {
    return player.name;
  });
  const previousPowerNames = players.map(function (player) {
    return player.power.name;
  });

  startPowerAssignment(playerNames, previousPowerNames);
});

newPlayersButton.addEventListener("click", showNewPlayerSetup);
