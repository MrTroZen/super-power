// EESA BYTE: POWER BATTLE - VISUAL TURN-BASED ARENA FIGHTER
// Phase 1: Unique Character Assignment, Character Reveals, and Initiative Turn Order

// DOM Elements
const playerForm = document.getElementById("player-form");
const playerList = document.getElementById("player-list");
const addPlayerButton = document.getElementById("add-player-button");
const formError = document.getElementById("form-error");

const setupScreen = document.getElementById("setup-screen");
const assigningScreen = document.getElementById("assigning-screen");
const revealScreen = document.getElementById("reveal-screen");
const arenaScreen = document.getElementById("arena-screen");

// Character Reveal Card Elements
const fighterCount = document.getElementById("fighter-count");
const characterCard = document.getElementById("character-card");
const fighterName = document.getElementById("fighter-name");
const characterName = document.getElementById("character-name");
const characterTitle = document.getElementById("character-title");
const characterBadge = document.getElementById("character-badge");
const characterDescription = document.getElementById("character-description");
const statHealth = document.getElementById("stat-health");
const statStrength = document.getElementById("stat-strength");
const statStrengthRating = document.getElementById("stat-strength-rating");
const statDefense = document.getElementById("stat-defense");
const statDefenseRating = document.getElementById("stat-defense-rating");
const statSpeed = document.getElementById("stat-speed");
const statSpeedRating = document.getElementById("stat-speed-rating");
const characterAbilitiesList = document.getElementById("character-abilities-list");
const nextFighterButton = document.getElementById("next-fighter-button");
const revealAnnouncement = document.getElementById("reveal-announcement");

// Arena Screen Elements
// Arena Screen Elements
const arenaRoundBadge = document.getElementById("arena-round-badge");
const arenaTurnCount = document.getElementById("arena-turn-count");
const activeTurnHeading = document.getElementById("active-turn-heading");
const arenaRematchButton = document.getElementById("arena-rematch-button");
const arenaNewPlayersButton = document.getElementById("arena-new-players-button");
const initiativeList = document.getElementById("initiative-list");
const battleground = document.getElementById("battleground");
const fightersStage = document.getElementById("fighters-stage");
const battlefieldFxLayer = document.getElementById("battlefield-fx-layer");
const actionStatusMessage = document.getElementById("action-status-message");
const actionConfirmGroup = document.getElementById("action-confirm-group");
const actionSummaryText = document.getElementById("action-summary-text");
const confirmActionButton = document.getElementById("confirm-action-button");
const cancelActionButton = document.getElementById("cancel-action-button");
const abilitiesGrid = document.getElementById("abilities-grid");

// Winner Modal Elements
const arenaWinnerOverlay = document.getElementById("arena-winner-overlay");
const winnerHeroAvatar = document.getElementById("winner-hero-avatar");
const winnerHeroTitle = document.getElementById("winner-hero-title");
const winnerPlayerSubtitle = document.getElementById("winner-player-subtitle");
const winnerRematchButton = document.getElementById("winner-rematch-button");
const winnerNewPlayersButton = document.getElementById("winner-new-players-button");

// Game Settings & State
const minimumPlayers = 2;
const maximumPlayers = 6;
let players = [];
let currentFighterIndex = 0;
let turnOrder = [];
let roundNumber = 1;
let activeTurnIndex = 0;
let selectedAbility = null;
let selectedTarget = null;
let isActionLocked = false;

// ==================================================
// SUPERHERO CHARACTERS DATA (6 UNIQUE PROTOTYPE HEROES)
// ==================================================
const characters = [
  {
    id: "hulk",
    name: "HULK",
    title: "THE INCREDIBLE TITAN",
    health: 1080,
    maxHealth: 1080,
    strength: 100,
    defense: 86,
    speed: 44,
    speedRating: "MODERATE SPEED",
    strengthRating: "MAX STRENGTH",
    defenseRating: "HEAVY ARMOR",
    description: "Immense powerhouse fueled by raw gamma rage and unmatched physical resilience.",
    symbol: "H",
    abilities: [
      {
        name: "SMASH",
        description: "Heavy single-target punch delivering colossal damage.",
        targetType: "single",
        type: "attack",
        power: 240,
        cooldown: 0
      },
      {
        name: "GROUND SLAM",
        description: "Area attack that shakes the arena, damaging every other living fighter.",
        targetType: "all",
        type: "aoe",
        power: 75,
        cooldown: 0
      },
      {
        name: "RAGE",
        description: "Hulk gets angrier! Boosts attack power temporarily.",
        targetType: "self",
        type: "buff",
        buffAmount: 0.25,
        cooldown: 0
      },
      {
        name: "DEFEND",
        description: "Brace for impact, greatly reducing incoming damage until Hulk's next turn.",
        targetType: "self",
        type: "defend",
        defenseAmount: 0.45,
        cooldown: 0
      }
    ]
  },
  {
    id: "iron-man",
    name: "IRON MAN",
    title: "ARMORED AVENGER",
    health: 900,
    maxHealth: 900,
    strength: 82,
    defense: 78,
    speed: 74,
    speedRating: "HIGH SPEED",
    strengthRating: "SOLID STRENGTH",
    defenseRating: "TACTICAL ARMOR",
    description: "High-tech armored suit equipped with repulsor cannons, micro-missiles, and tactical thrusters.",
    symbol: "IM",
    abilities: [
      {
        name: "REPULSOR BLAST",
        description: "Reliable single-target ranged plasma blast.",
        targetType: "single",
        type: "attack",
        power: 210,
        cooldown: 0
      },
      {
        name: "MISSILE BARRAGE",
        description: "Area attack with micro-homing missiles dealing damage to all enemies.",
        targetType: "all",
        type: "aoe",
        power: 75,
        cooldown: 0
      },
      {
        name: "ENERGY SHIELD",
        description: "Deploys a hard-light energy barrier for temporary damage reduction.",
        targetType: "self",
        type: "defend",
        defenseAmount: 0.45,
        cooldown: 0
      },
      {
        name: "UNIBEAM",
        description: "Discharges full arc-reactor power in a devastating single-target beam.",
        targetType: "single",
        type: "attack",
        power: 300,
        cooldown: 2
      }
    ]
  },
  {
    id: "superman",
    name: "SUPERMAN",
    title: "MAN OF STEEL",
    health: 960,
    maxHealth: 960,
    strength: 92,
    defense: 84,
    speed: 88,
    speedRating: "VERY FAST",
    strengthRating: "VERY STRONG",
    defenseRating: "HIGH DEFENSE",
    description: "Solar-charged powerhouse blessed with immense flight, invulnerability, and heat vision.",
    symbol: "S",
    abilities: [
      {
        name: "SUPER PUNCH",
        description: "Overpowering physical strike with supersonic force.",
        targetType: "single",
        type: "attack",
        power: 225,
        cooldown: 0
      },
      {
        name: "HEAT VISION",
        description: "Twin solar energy beams burning a chosen target from range.",
        targetType: "single",
        type: "attack",
        power: 210,
        cooldown: 0
      },
      {
        name: "FLYING STRIKE",
        description: "Fast aerial dive bombing the target with immense kinetic impact.",
        targetType: "single",
        type: "attack",
        power: 245,
        cooldown: 0
      },
      {
        name: "SUPER SPEED",
        description: "Enters bullet-time speed for tactical initiative and next attack boost.",
        targetType: "self",
        type: "buff",
        buffAmount: 0.25,
        dodgeAmount: 0.25,
        cooldown: 0
      }
    ]
  },
  {
    id: "thor",
    name: "THOR",
    title: "GOD OF THUNDER",
    health: 950,
    maxHealth: 950,
    strength: 94,
    defense: 82,
    speed: 66,
    speedRating: "GOOD SPEED",
    strengthRating: "STRONG ATTACKS",
    defenseRating: "SOLID DEFENSE",
    description: "Asgardian thunderer commanding cosmic storm lightning and his enchanted war hammer.",
    symbol: "T",
    abilities: [
      {
        name: "HAMMER STRIKE",
        description: "Devastating bludgeoning single-target blow from the war hammer.",
        targetType: "single",
        type: "attack",
        power: 235,
        cooldown: 0
      },
      {
        name: "LIGHTNING STRIKE",
        description: "Calls down high-voltage lightning directly onto a selected target.",
        targetType: "single",
        type: "attack",
        power: 270,
        cooldown: 0
      },
      {
        name: "THUNDER STORM",
        description: "Summons a roaring tempest that electrifies every living enemy in the arena.",
        targetType: "all",
        type: "aoe",
        power: 75,
        cooldown: 0
      },
      {
        name: "DIVINE GUARD",
        description: "Channels divine Asgardian resilience to absorb incoming enemy attacks.",
        targetType: "self",
        type: "defend",
        defenseAmount: 0.45,
        cooldown: 0
      }
    ]
  },
  {
    id: "flash",
    name: "FLASH",
    title: "THE SCARLET SPEEDSTER",
    health: 860,
    maxHealth: 860,
    strength: 75,
    defense: 66,
    speed: 100,
    speedRating: "MAX SPEED",
    strengthRating: "RAPID STRIKES",
    defenseRating: "AGILE EVASION",
    description: "Conduit of the Speed Force, moving so fast that opponents can barely track his strikes.",
    symbol: "F",
    abilities: [
      {
        name: "SPEED PUNCH",
        description: "Lightning-quick single-target jab with near-instant recovery.",
        targetType: "single",
        type: "attack",
        power: 200,
        cooldown: 0
      },
      {
        name: "RAPID COMBO",
        description: "Dozens of rapid-fire strikes landing in a fraction of a second.",
        targetType: "single",
        type: "attack",
        power: 245,
        cooldown: 0
      },
      {
        name: "DODGE MODE",
        description: "Phases through vibrations, increasing dodge chance until next turn.",
        targetType: "self",
        type: "buff",
        dodgeAmount: 0.38,
        cooldown: 0
      },
      {
        name: "LIGHTNING RUN",
        description: "High-risk, high-velocity attack hurling Speed Force energy at a target.",
        targetType: "single",
        type: "attack",
        power: 315,
        cooldown: 2
      }
    ]
  },
  {
    id: "thanos",
    name: "THANOS",
    title: "THE TITAN WARLORD",
    health: 1000,
    maxHealth: 1000,
    strength: 92,
    defense: 86,
    speed: 50,
    speedRating: "TACTICAL SPEED",
    strengthRating: "VERY STRONG",
    defenseRating: "HEAVY TITAN ARMOR",
    description: "Armored titan warlord possessing unstoppable physical fortitude and martial discipline.",
    symbol: "TH",
    abilities: [
      {
        name: "TITAN PUNCH",
        description: "Crushing haymaker with colossal mass behind the blow.",
        targetType: "single",
        type: "attack",
        power: 225,
        cooldown: 0
      },
      {
        name: "POWER BLAST",
        description: "Fires an explosive cosmic energy wave at a designated target.",
        targetType: "single",
        type: "attack",
        power: 210,
        cooldown: 0
      },
      {
        name: "TITAN SLAM",
        description: "Heavy earth-shattering stomp sending shockwaves through all enemies.",
        targetType: "all",
        type: "aoe",
        power: 75,
        cooldown: 0
      },
      {
        name: "FORTIFY",
        description: "Hardens titan armor, reducing incoming damage significantly.",
        targetType: "self",
        type: "defend",
        defenseAmount: 0.46,
        cooldown: 0
      }
    ]
  }
];

// ==================================================
// PLAYER INPUT MANAGEMENT & VALIDATION
// ==================================================

function createPlayerSlot(playerNumber) {
  const slot = document.createElement("div");
  const label = document.createElement("label");
  const inputRow = document.createElement("div");
  const input = document.createElement("input");
  const removeButton = document.createElement("button");
  const errorMessage = document.createElement("p");
  const inputId = "player-" + playerNumber;
  const errorId = inputId + "-error";

  slot.className = "player-slot";
  label.setAttribute("for", inputId);
  label.textContent = "PLAYER " + playerNumber;

  inputRow.className = "input-row";
  input.type = "text";
  input.id = inputId;
  input.className = "player-name";
  input.placeholder = "Enter name";
  input.maxLength = 15;
  input.autocomplete = "off";
  input.setAttribute("aria-describedby", errorId);

  removeButton.type = "button";
  removeButton.className = "button remove-button";
  removeButton.textContent = "REMOVE";
  removeButton.setAttribute("aria-label", "Remove Player " + playerNumber);
  removeButton.addEventListener("click", function () {
    removePlayer(removeButton);
  });

  errorMessage.id = errorId;
  errorMessage.className = "player-error";

  inputRow.append(input, removeButton);
  slot.append(label, inputRow, errorMessage);
  addInputListener(input);

  return slot;
}

function updatePlayerNumbers() {
  const playerSlots = document.querySelectorAll(".player-slot");

  playerSlots.forEach(function (slot, index) {
    const playerNumber = index + 1;
    const label = slot.querySelector("label");
    const input = slot.querySelector(".player-name");
    const removeButton = slot.querySelector(".remove-button");
    const errorMessage = slot.querySelector(".player-error");
    const inputId = "player-" + playerNumber;
    const errorId = inputId + "-error";

    label.setAttribute("for", inputId);
    label.textContent = "PLAYER " + playerNumber;

    input.id = inputId;
    input.setAttribute("aria-describedby", errorId);

    errorMessage.id = errorId;

    if (removeButton) {
      removeButton.setAttribute("aria-label", "Remove Player " + playerNumber);
    }
  });

  addPlayerButton.disabled = playerSlots.length >= maximumPlayers;
}

function addPlayer() {
  const currentSlots = document.querySelectorAll(".player-slot");

  if (currentSlots.length >= maximumPlayers) {
    return;
  }

  const newSlot = createPlayerSlot(currentSlots.length + 1);
  playerList.append(newSlot);
  updatePlayerNumbers();

  const newInput = newSlot.querySelector(".player-name");
  newInput.focus();
}

function removePlayer(button) {
  const currentSlots = document.querySelectorAll(".player-slot");

  if (currentSlots.length <= minimumPlayers) {
    return;
  }

  const slot = button.closest(".player-slot");
  const previousInput = slot.previousElementSibling
    ? slot.previousElementSibling.querySelector(".player-name")
    : null;

  slot.remove();
  updatePlayerNumbers();
  validatePlayerInputs();

  if (previousInput) {
    previousInput.focus();
  } else {
    document.querySelector(".player-name").focus();
  }
}

function addInputListener(input) {
  input.addEventListener("input", function () {
    const slot = input.closest(".player-slot");
    const errorMessage = slot.querySelector(".player-error");

    input.removeAttribute("aria-invalid");
    errorMessage.textContent = "";
    formError.textContent = "";
  });
}

function validatePlayerInputs() {
  const inputs = Array.from(document.querySelectorAll(".player-name"));
  const seenNames = new Map();
  let hasError = false;

  formError.textContent = "";

  inputs.forEach(function (input) {
    const slot = input.closest(".player-slot");
    const errorMessage = slot.querySelector(".player-error");
    const trimmedName = input.value.trim();

    input.removeAttribute("aria-invalid");
    errorMessage.textContent = "";

    if (trimmedName === "") {
      input.setAttribute("aria-invalid", "true");
      errorMessage.textContent = "Name cannot be empty.";
      hasError = true;
      return;
    }

    const lowerCaseName = trimmedName.toLowerCase();
    if (seenNames.has(lowerCaseName)) {
      input.setAttribute("aria-invalid", "true");
      errorMessage.textContent = "Names must be unique.";

      const firstInput = seenNames.get(lowerCaseName);
      const firstSlot = firstInput.closest(".player-slot");
      const firstError = firstSlot.querySelector(".player-error");
      firstInput.setAttribute("aria-invalid", "true");
      firstError.textContent = "Names must be unique.";
      hasError = true;
      return;
    }

    seenNames.set(lowerCaseName, input);
  });

  if (hasError) {
    const firstInvalidInput = document.querySelector('.player-name[aria-invalid="true"]');
    if (firstInvalidInput) {
      firstInvalidInput.focus();
    }
    return false;
  }

  return true;
}

function getValidPlayerNames() {
  if (!validatePlayerInputs()) {
    return [];
  }

  return Array.from(document.querySelectorAll(".player-name")).map(function (input) {
    return input.value.trim();
  });
}

// ==================================================
// UNIQUE CHARACTER ASSIGNMENT
// ==================================================

// Randomly assigns one UNIQUE character to every player (no duplicate characters in one match)
function assignUniqueCharacters(playerNames) {
  // Create deep clones of the character templates
  const availableCharacters = characters.map(function (c) {
    return JSON.parse(JSON.stringify(c));
  });

  // Fisher-Yates shuffle to randomize unique character assignment
  for (let i = availableCharacters.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = availableCharacters[i];
    availableCharacters[i] = availableCharacters[j];
    availableCharacters[j] = temp;
  }

  players = playerNames.map(function (name, index) {
    const assignedCharacter = availableCharacters[index];
    assignedCharacter.abilities.forEach(function (ab) {
      ab.currentCooldown = 0;
    });

    return {
      id: "player-" + (index + 1),
      playerNumber: index + 1,
      name: name,
      character: assignedCharacter,
      currentHealth: assignedCharacter.health,
      maxHealth: assignedCharacter.maxHealth,
      defenseBuff: 0,
      damageBuff: 0,
      dodgeBuff: 0,
      statusText: "",
      statusDuration: 0,
      eliminated: false
    };
  });
}

// Start character assignment flow
function startCharacterAssignment(playerNames) {
  assignUniqueCharacters(playerNames);
  currentFighterIndex = 0;
  turnOrder = [];

  setupScreen.hidden = true;
  revealScreen.hidden = true;
  arenaScreen.hidden = true;
  assigningScreen.hidden = false;
  assigningScreen.focus();

  const prefersLessMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const assigningTime = prefersLessMotion ? 0 : 850;

  setTimeout(showCharacterReveal, assigningTime);
}

// ==================================================
// ONE-BY-ONE CHARACTER REVEAL SCREEN
// ==================================================

function showCharacterReveal() {
  const player = players[currentFighterIndex];
  const hero = player.character;

  assigningScreen.hidden = true;
  revealScreen.hidden = false;

  characterCard.dataset.character = hero.id;
  fighterCount.textContent = "FIGHTER " + (currentFighterIndex + 1) + " OF " + players.length;
  fighterName.textContent = player.name.toUpperCase();
  characterName.textContent = hero.name;
  characterTitle.textContent = hero.title;
  characterBadge.textContent = hero.symbol;
  characterDescription.textContent = hero.description;

  // Numerical & rating stats display
  statHealth.textContent = hero.health + " HP";
  statStrength.textContent = hero.strength;
  statStrengthRating.textContent = hero.strengthRating;
  statDefense.textContent = hero.defense;
  statDefenseRating.textContent = hero.defenseRating;
  statSpeed.textContent = hero.speed;
  statSpeedRating.textContent = hero.speedRating;

  // Render character's 4 distinct abilities
  characterAbilitiesList.textContent = "";
  hero.abilities.forEach(function (ability) {
    const item = document.createElement("div");
    item.className = "ability-card " + ability.type;

    const titleRow = document.createElement("div");
    titleRow.className = "ability-title-row";

    const name = document.createElement("strong");
    name.textContent = ability.name;

    const targetBadge = document.createElement("span");
    targetBadge.className = "target-badge " + ability.targetType;
    targetBadge.textContent = ability.targetType.toUpperCase();

    titleRow.append(name, targetBadge);

    const desc = document.createElement("p");
    desc.textContent = ability.description;

    item.append(titleRow, desc);
    characterAbilitiesList.append(item);
  });

  if (currentFighterIndex === players.length - 1) {
    nextFighterButton.textContent = "ENTER BATTLEGROUND";
  } else {
    nextFighterButton.textContent = "NEXT FIGHTER";
  }

  characterCard.classList.remove("reveal-pop");
  void characterCard.offsetWidth;
  characterCard.classList.add("reveal-pop");

  revealAnnouncement.textContent = player.name + " received " + hero.name;
  revealScreen.focus();
  nextFighterButton.focus();
}

// ==================================================
// UTILITIES
// ==================================================

function escapeHtml(str) {
  const div = document.createElement("div");
  div.textContent = str;
  return div.innerHTML;
}

// ==================================================
// TURN ORDER INITIATIVE SYSTEM
// ==================================================

// Turn order is sorted primarily by character SPEED descending
function calculateTurnOrder(playerList) {
  const living = playerList.filter(function (p) {
    return !p.eliminated;
  });

  return living.slice().sort(function (a, b) {
    if (b.character.speed !== a.character.speed) {
      return b.character.speed - a.character.speed;
    }
    return a.playerNumber - b.playerNumber;
  });
}

// ==================================================
// 2D GAME BATTLEGROUND IMPLEMENTATION
// ==================================================

// Build stylized CSS fighter figures without copyrighted imagery
function createFighterFigure(hero) {
  const wrapper = document.createElement("div");
  wrapper.className = "fighter-figure-wrapper";

  const shadow = document.createElement("div");
  shadow.className = "fighter-ground-shadow";

  const figure = document.createElement("div");
  figure.className = "fighter-figure fighter-" + hero.id;

  // Flowing Cape for Superman & Thor
  if (hero.id === "superman" || hero.id === "thor") {
    const cape = document.createElement("div");
    cape.className = "figure-cape";
    figure.append(cape);
  }

  // Head with helmet/hair/mask & eye visors
  const head = document.createElement("div");
  head.className = "figure-head";

  const headAccent = document.createElement("div");
  headAccent.className = "figure-head-accent";

  const eyes = document.createElement("div");
  eyes.className = "figure-eyes";

  head.append(headAccent, eyes);

  // Torso with armor plate, muscle mass or emblem
  const torso = document.createElement("div");
  torso.className = "figure-torso";

  const emblem = document.createElement("div");
  emblem.className = "figure-emblem";
  emblem.textContent = hero.symbol;

  torso.append(emblem);

  // Thor Mjolnir War Hammer
  if (hero.id === "thor") {
    const hammer = document.createElement("div");
    hammer.className = "figure-weapon-hammer";
    hammer.innerHTML = '<span class="hammer-head"></span><span class="hammer-shaft"></span>';
    torso.append(hammer);
  }

  // Arms & gauntlets
  const arms = document.createElement("div");
  arms.className = "figure-arms";

  const armLeft = document.createElement("div");
  armLeft.className = "figure-arm arm-left";

  const armRight = document.createElement("div");
  armRight.className = "figure-arm arm-right";

  arms.append(armLeft, armRight);

  // Legs & boots
  const legs = document.createElement("div");
  legs.className = "figure-legs";

  const legLeft = document.createElement("div");
  legLeft.className = "figure-leg leg-left";

  const legRight = document.createElement("div");
  legRight.className = "figure-leg leg-right";

  legs.append(legLeft, legRight);

  figure.append(head, torso, arms, legs);
  wrapper.append(shadow, figure);

  return wrapper;
}

// Render all fighters into the arena with predefined positions
function renderBattlefieldFighters() {
  battleground.dataset.playerCount = players.length;
  fightersStage.textContent = "";

  players.forEach(function (player, index) {
    const hero = player.character;
    const slot = document.createElement("div");
    slot.className = "arena-fighter pos-" + (index + 1);
    slot.id = "fighter-slot-" + player.id;
    slot.dataset.playerId = player.id;
    slot.dataset.character = hero.id;
    slot.tabIndex = 0;
    slot.setAttribute("role", "button");
    slot.setAttribute(
      "aria-label",
      player.name + " playing " + hero.name + ", " + player.currentHealth + " of " + player.maxHealth + " HP"
    );

    // Active turn marker (arrow above active hero)
    const activeMarker = document.createElement("div");
    activeMarker.className = "fighter-active-marker";
    activeMarker.setAttribute("aria-hidden", "true");
    activeMarker.innerHTML = '<span class="marker-arrow">▼</span><span class="marker-label">ACTIVE</span>';

    // Target reticle indicator
    const targetReticle = document.createElement("div");
    targetReticle.className = "fighter-target-reticle";
    targetReticle.setAttribute("aria-hidden", "true");
    targetReticle.innerHTML = '<span class="reticle-crosshair"></span><span class="reticle-label">TARGET</span>';

    // Overhead UI (Player name, hero name, styled HP bar with numbers, status badge)
    const overheadUI = document.createElement("div");
    overheadUI.className = "fighter-overhead-ui";

    const nameplate = document.createElement("div");
    nameplate.className = "fighter-nameplate";

    const playerNameSpan = document.createElement("span");
    playerNameSpan.className = "fighter-player-name";
    playerNameSpan.textContent = player.name.toUpperCase();

    const heroNameSpan = document.createElement("span");
    heroNameSpan.className = "fighter-hero-name";
    heroNameSpan.textContent = hero.name;

    nameplate.append(playerNameSpan, heroNameSpan);

    const hpContainer = document.createElement("div");
    hpContainer.className = "fighter-hp-container";

    const hpBar = document.createElement("div");
    hpBar.className = "fighter-hp-bar";

    const hpFill = document.createElement("div");
    hpFill.className = "fighter-hp-fill";
    const hpPercent = Math.max(0, Math.min(100, (player.currentHealth / player.maxHealth) * 100));
    hpFill.style.width = hpPercent + "%";
    hpBar.append(hpFill);

    const hpText = document.createElement("span");
    hpText.className = "fighter-hp-text";
    hpText.textContent = player.currentHealth + " / " + player.maxHealth;

    hpContainer.append(hpBar, hpText);

    const statusContainer = document.createElement("div");
    statusContainer.className = "fighter-status-container";
    statusContainer.id = "status-container-" + player.id;

    overheadUI.append(nameplate, hpContainer, statusContainer);

    // Stylized CSS fighter figure
    const figureWrapper = createFighterFigure(hero);

    slot.append(activeMarker, targetReticle, overheadUI, figureWrapper);

    // Click & Keyboard handlers for target selection
    slot.addEventListener("click", function () {
      if (isActionLocked || player.eliminated) return;
      handleTargetSelection(player);
    });

    slot.addEventListener("keydown", function (e) {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        if (isActionLocked || player.eliminated) return;
        handleTargetSelection(player);
      }
    });

    fightersStage.append(slot);
    updateFighterUI(player);
  });
}

// Update living HP, status badges, and KO visuals on a fighter
function updateFighterUI(player) {
  const slot = document.getElementById("fighter-slot-" + player.id);
  if (!slot) return;

  const hpFill = slot.querySelector(".fighter-hp-fill");
  const hpText = slot.querySelector(".fighter-hp-text");
  const statusContainer = slot.querySelector(".fighter-status-container");

  const pct = Math.max(0, Math.min(100, (player.currentHealth / player.maxHealth) * 100));
  if (hpFill) {
    hpFill.style.width = pct + "%";
    if (pct <= 20) {
      hpFill.style.background = "linear-gradient(90deg, #ef4444 0%, #f87171 100%)";
    } else if (pct <= 50) {
      hpFill.style.background = "linear-gradient(90deg, #f59e0b 0%, #fbbf24 100%)";
    } else {
      hpFill.style.background = "linear-gradient(90deg, #10b981 0%, #34d399 100%)";
    }
  }

  if (hpText) {
    if (player.eliminated) {
      hpText.textContent = "0 / " + player.maxHealth + " (KO)";
    } else {
      hpText.textContent = player.currentHealth + " / " + player.maxHealth;
    }
  }

  if (statusContainer) {
    statusContainer.textContent = "";
    if (player.statusText && !player.eliminated) {
      const badge = document.createElement("span");
      badge.className = "fighter-status-badge";
      badge.textContent = player.statusText;
      statusContainer.append(badge);
    }
  }

  if (player.eliminated) {
    slot.classList.add("is-ko");
    slot.classList.remove("is-targetable", "is-targeted", "is-active-turn");
    slot.setAttribute("aria-disabled", "true");
    const nameSpan = slot.querySelector(".fighter-player-name");
    if (nameSpan && !nameSpan.querySelector(".ko-tag")) {
      const koTag = document.createElement("span");
      koTag.className = "ko-tag";
      koTag.textContent = " [KO]";
      nameSpan.append(koTag);
    }
  }
}

// Render the turn initiative order strip in the arena header
function renderInitiativeStrip() {
  initiativeList.textContent = "";

  turnOrder.forEach(function (player, index) {
    const pill = document.createElement("div");
    pill.className = "initiative-pill" + (index === activeTurnIndex ? " is-active" : "");
    if (player.eliminated) {
      pill.classList.add("is-ko");
    }
    pill.dataset.character = player.character.id;

    const rank = document.createElement("span");
    rank.className = "initiative-rank";
    rank.textContent = "#" + (index + 1);

    const name = document.createElement("strong");
    name.className = "initiative-hero";
    name.textContent = player.character.name;

    const spd = document.createElement("span");
    spd.className = "initiative-spd";
    spd.textContent = player.eliminated ? "KO" : player.character.speed + " SPD";

    pill.append(rank, name, spd);
    initiativeList.append(pill);
  });
}

// Render active turn header, active highlight, and 4 ability buttons
function renderActiveTurn() {
  // Check if victory condition is already met
  const livingFighters = players.filter(function (p) {
    return !p.eliminated;
  });
  if (livingFighters.length <= 1) {
    showWinnerScreen(livingFighters[0]);
    return;
  }

  const activePlayer = turnOrder[activeTurnIndex];
  if (!activePlayer || activePlayer.eliminated) {
    advanceToNextLivingPlayer();
    return;
  }

  const hero = activePlayer.character;

  arenaRoundBadge.textContent = "ROUND " + roundNumber;
  arenaTurnCount.textContent = "TURN " + (activeTurnIndex + 1) + " OF " + turnOrder.length;

  activeTurnHeading.innerHTML =
    escapeHtml(activePlayer.name.toUpperCase()) +
    "'S TURN &mdash; <span class='active-hero-highlight'>" +
    escapeHtml(hero.name) +
    "</span>";

  renderInitiativeStrip();

  // Highlight active fighter in the arena
  const allFighters = document.querySelectorAll(".arena-fighter");
  allFighters.forEach(function (fighterEl) {
    fighterEl.classList.remove("is-active-turn", "is-targetable", "is-targeted");
    if (fighterEl.dataset.playerId === activePlayer.id) {
      fighterEl.classList.add("is-active-turn");
    }
  });

  // Reset action dock states
  selectedAbility = null;
  selectedTarget = null;
  isActionLocked = false;
  actionConfirmGroup.hidden = true;
  confirmActionButton.disabled = false;
  cancelActionButton.disabled = false;
  actionStatusMessage.innerHTML = "Choose an ability for <strong>" + escapeHtml(hero.name) + "</strong>:";

  // Render 4 large game-style buttons with live cooldown checks
  abilitiesGrid.textContent = "";
  hero.abilities.forEach(function (ability, index) {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "ability-button type-" + ability.type;
    btn.dataset.abilityIndex = index;

    const header = document.createElement("div");
    header.className = "ability-button-header";

    const name = document.createElement("span");
    name.className = "ability-button-name";
    name.textContent = ability.name;

    const badge = document.createElement("span");
    badge.className = "ability-button-badge badge-" + ability.targetType;

    const isOnCooldown = (ability.currentCooldown || 0) > 0;
    if (isOnCooldown) {
      btn.disabled = true;
      btn.classList.add("is-cooldown");
      badge.textContent = "COOLDOWN: " + ability.currentCooldown;
    } else {
      if (ability.targetType === "single") {
        badge.textContent = "SINGLE TARGET";
      } else if (ability.targetType === "all") {
        badge.textContent = "ALL ENEMIES";
      } else if (ability.type === "defend") {
        badge.textContent = "SELF DEFENSE";
      } else {
        badge.textContent = "SELF BUFF";
      }
    }

    header.append(name, badge);

    const desc = document.createElement("p");
    desc.className = "ability-button-desc";
    desc.textContent = ability.description;

    btn.append(header, desc);

    btn.addEventListener("click", function () {
      if (isActionLocked || isOnCooldown) return;
      handleAbilitySelect(ability, btn, activePlayer);
    });

    abilitiesGrid.append(btn);
  });
}

// Handle clicking one of the four character abilities
function handleAbilitySelect(ability, btn, activePlayer) {
  if (isActionLocked || (ability.currentCooldown || 0) > 0) return;

  selectedAbility = ability;

  // Visual selection on button
  document.querySelectorAll(".ability-button").forEach(function (b) {
    b.classList.remove("is-selected");
  });
  btn.classList.add("is-selected");

  // Clear previous targeting states on battlefield
  document.querySelectorAll(".arena-fighter").forEach(function (f) {
    f.classList.remove("is-targetable", "is-targeted");
  });

  if (ability.targetType === "single") {
    selectedTarget = null;
    actionConfirmGroup.hidden = true;
    actionStatusMessage.innerHTML =
      '<span class="prompt-alert">SELECT TARGET:</span> Click an enemy fighter in the battleground.';

    // Make all OTHER LIVING fighters targetable
    players.forEach(function (p) {
      if (p.id !== activePlayer.id && !p.eliminated) {
        const fSlot = document.getElementById("fighter-slot-" + p.id);
        if (fSlot) {
          fSlot.classList.add("is-targetable");
        }
      }
    });
  } else if (ability.targetType === "all") {
    selectedTarget = "all";
    actionConfirmGroup.hidden = false;
    actionSummaryText.textContent = activePlayer.character.name + " WILL USE " + ability.name;
    confirmActionButton.textContent = "CONFIRM ATTACK";
    actionStatusMessage.innerHTML =
      "Area ability ready for <strong>" + escapeHtml(activePlayer.character.name) + "</strong>:";
    confirmActionButton.focus();
  } else if (ability.targetType === "self") {
    selectedTarget = "self";
    actionConfirmGroup.hidden = false;
    actionSummaryText.textContent = activePlayer.character.name + " WILL USE " + ability.name;
    confirmActionButton.textContent = "CONFIRM ATTACK";
    actionStatusMessage.innerHTML =
      "Self ability ready for <strong>" + escapeHtml(activePlayer.character.name) + "</strong>:";
    confirmActionButton.focus();
  }
}

// Handle selecting a living fighter target in the arena
function handleTargetSelection(targetPlayer) {
  if (isActionLocked) return;
  const activePlayer = turnOrder[activeTurnIndex];

  if (!selectedAbility || selectedAbility.targetType !== "single") {
    return;
  }
  if (targetPlayer.id === activePlayer.id || targetPlayer.eliminated) {
    return;
  }

  selectedTarget = targetPlayer;

  // Mark targeted element
  document.querySelectorAll(".arena-fighter").forEach(function (f) {
    f.classList.remove("is-targeted");
    if (f.dataset.playerId === targetPlayer.id) {
      f.classList.add("is-targeted");
    }
  });

  actionConfirmGroup.hidden = false;
  actionSummaryText.textContent =
    activePlayer.character.name + " WILL USE " + selectedAbility.name + " ON " + targetPlayer.character.name;
  confirmActionButton.textContent = "CONFIRM ATTACK";
  actionStatusMessage.innerHTML =
    "Target locked: <strong>" +
    escapeHtml(targetPlayer.character.name) +
    "</strong> (" +
    escapeHtml(targetPlayer.name) +
    ")";
  confirmActionButton.focus();
}

// Cancel current ability selection
function handleCancelAction() {
  if (isActionLocked) return;
  const activePlayer = turnOrder[activeTurnIndex];
  selectedAbility = null;
  selectedTarget = null;

  document.querySelectorAll(".ability-button").forEach(function (b) {
    b.classList.remove("is-selected");
  });
  document.querySelectorAll(".arena-fighter").forEach(function (f) {
    f.classList.remove("is-targetable", "is-targeted");
  });

  actionConfirmGroup.hidden = true;
  actionStatusMessage.innerHTML = "Choose an ability for <strong>" + escapeHtml(activePlayer.character.name) + "</strong>:";
}

// ==================================================
// COMBAT DAMAGE, VISUAL FX & EXECUTION SYSTEM
// ==================================================

// Floating combat values (damage, crit, miss, buff, ko)
function spawnFloatingCombatText(targetSlot, text, type) {
  if (!targetSlot) return;
  const floater = document.createElement("div");
  floater.className = "floating-combat-text " + type;
  floater.textContent = text;
  targetSlot.append(floater);
  setTimeout(function () {
    floater.remove();
  }, 1200);
}

// Calculates attack damage, mitigation, buffs, and dodge
function calculateAttackOutcome(attacker, defender, ability) {
  // Dodge check: Base speed + dodge buffs (up to 9% base at 100 speed)
  const baseDodge = (defender.character.speed / 100) * 0.09;
  const totalDodge = Math.min(0.60, baseDodge + (defender.dodgeBuff || 0));
  const isDodge = Math.random() < totalDodge;

  if (isDodge) {
    return { damage: 0, isDodge: true, isCrit: false };
  }

  const str = attacker.character.strength;
  const def = defender.character.defense;
  const power = ability.power || 150;

  // Base raw damage scaling with attacker strength
  const rawDamage = power * (0.6 + str / 160);
  // Mitigation by defender defense (280 divisor ensures high defense characters take sensible damage)
  const mitigation = Math.max(0.40, 1 - def / 280);

  // Attacker damage buff multiplier (e.g. Rage / Super Speed)
  const dmgBuffMult = 1 + (attacker.damageBuff || 0);

  // Defender defense buff multiplier (e.g. Defend / Fortify / Energy Shield / Divine Guard)
  const defBuffMult = 1 - Math.min(0.60, defender.defenseBuff || 0);

  // Random variation: ±12%
  const variation = 0.88 + Math.random() * 0.24;

  // Critical hit chance (10%)
  const isCrit = Math.random() < 0.10;
  const critMult = isCrit ? 1.35 : 1.0;

  let finalDamage = Math.round(rawDamage * mitigation * dmgBuffMult * defBuffMult * variation * critMult);
  finalDamage = Math.max(20, finalDamage);

  return { damage: finalDamage, isDodge: false, isCrit: isCrit };
}

// Helper to calculate pixel center of a fighter relative to battlefield
function getElementCenter(el) {
  if (!el) return { x: 0, y: 0 };
  const box = el.getBoundingClientRect();
  const arenaBox = battleground.getBoundingClientRect();
  return {
    x: box.left + box.width / 2 - arenaBox.left,
    y: box.top + box.height / 2 - arenaBox.top
  };
}

// 1. Melee Lunge Attack Animation
function playMeleeAnimation(attackerSlot, defenderSlot, onHit, onComplete) {
  const attCenter = getElementCenter(attackerSlot);
  const defCenter = getElementCenter(defenderSlot);
  const deltaX = defCenter.x - attCenter.x;
  const moveX = deltaX > 0 ? 55 : -55;

  const figure = attackerSlot.querySelector(".fighter-figure");
  if (!figure) {
    if (onHit) onHit();
    if (onComplete) onComplete();
    return;
  }

  figure.style.transition = "transform 180ms ease-out";
  figure.style.transform = "translateX(" + moveX + "px) scale(1.08)";

  setTimeout(function () {
    if (onHit) onHit();
    figure.style.transition = "transform 220ms ease-in";
    figure.style.transform = "";
    setTimeout(function () {
      if (onComplete) onComplete();
    }, 240);
  }, 200);
}

// 1b. Fast Speed Punch Animation (Flash)
function playSpeedPunchAnimation(attackerSlot, defenderSlot, onHit, onComplete) {
  const attCenter = getElementCenter(attackerSlot);
  const defCenter = getElementCenter(defenderSlot);
  const deltaX = defCenter.x - attCenter.x;
  const moveX = deltaX > 0 ? 70 : -70;

  const figure = attackerSlot.querySelector(".fighter-figure");
  if (!figure) {
    if (onHit) onHit();
    if (onComplete) onComplete();
    return;
  }

  figure.style.transition = "transform 100ms cubic-bezier(0.1, 0.9, 0.2, 1)";
  figure.style.transform = "translateX(" + moveX + "px) scale(1.1)";

  setTimeout(function () {
    if (onHit) onHit();
    figure.style.transition = "transform 120ms cubic-bezier(0.2, 0.8, 0.4, 1)";
    figure.style.transform = "";
    setTimeout(function () {
      if (onComplete) onComplete();
    }, 130);
  }, 110);
}

// 1c. Rapid Combo Animation (Flash - multiple quick hits)
function playRapidComboAnimation(attackerSlot, defenderSlot, onHit, onComplete) {
  const attCenter = getElementCenter(attackerSlot);
  const defCenter = getElementCenter(defenderSlot);
  const deltaX = defCenter.x - attCenter.x;
  const moveX = deltaX > 0 ? 65 : -65;

  const figure = attackerSlot.querySelector(".fighter-figure");
  if (!figure) {
    if (onHit) onHit();
    if (onComplete) onComplete();
    return;
  }

  figure.style.transition = "transform 110ms ease-out";
  figure.style.transform = "translateX(" + moveX + "px) scale(1.1)";

  // Spawn 3 rapid hit sparks and shakes
  [0, 80, 160].forEach(function (delay, idx) {
    setTimeout(function () {
      const spark = document.createElement("div");
      spark.className = "fx-combo-spark";
      spark.style.left = (defCenter.x + (idx === 1 ? -12 : 12)) + "px";
      spark.style.top = (defCenter.y - 10 + (idx === 0 ? -10 : 10)) + "px";
      battlefieldFxLayer.append(spark);
      defenderSlot.classList.add("anim-hit-shake");
      setTimeout(function () {
        defenderSlot.classList.remove("anim-hit-shake");
        spark.remove();
      }, 150);
    }, 100 + delay);
  });

  setTimeout(function () {
    if (onHit) onHit();
  }, 200);

  setTimeout(function () {
    figure.style.transition = "transform 140ms ease-in";
    figure.style.transform = "";
    setTimeout(function () {
      if (onComplete) onComplete();
    }, 160);
  }, 360);
}

// 1d. Flying Strike Animation (Superman - fast moves toward/through target and returns)
function playFlyingStrikeAnimation(attackerSlot, defenderSlot, onHit, onComplete) {
  const attCenter = getElementCenter(attackerSlot);
  const defCenter = getElementCenter(defenderSlot);
  const deltaX = defCenter.x - attCenter.x;
  const moveX = deltaX > 0 ? (deltaX + 35) : (deltaX - 35);

  const figure = attackerSlot.querySelector(".fighter-figure");
  if (!figure) {
    if (onHit) onHit();
    if (onComplete) onComplete();
    return;
  }

  figure.style.transition = "transform 260ms cubic-bezier(0.2, 0.8, 0.4, 1)";
  figure.style.transform = "translate(" + moveX + "px, -24px) scale(1.15)";

  setTimeout(function () {
    if (onHit) onHit();
  }, 200);

  setTimeout(function () {
    figure.style.transition = "transform 240ms ease-in-out";
    figure.style.transform = "";
    setTimeout(function () {
      if (onComplete) onComplete();
    }, 260);
  }, 340);
}

// 1e. Lightning Run Animation (Flash - very fast high damage attack with speed trail)
function playLightningRunAnimation(attackerSlot, defenderSlot, onHit, onComplete) {
  const attCenter = getElementCenter(attackerSlot);
  const defCenter = getElementCenter(defenderSlot);
  const dx = defCenter.x - attCenter.x;
  const dy = defCenter.y - attCenter.y;
  const length = Math.sqrt(dx * dx + dy * dy);
  const angle = Math.atan2(dy, dx) * (180 / Math.PI);

  const trail = document.createElement("div");
  trail.className = "fx-speed-trail";
  trail.style.left = attCenter.x + "px";
  trail.style.top = (attCenter.y - 10) + "px";
  trail.style.width = length + "px";
  trail.style.transform = "rotate(" + angle + "deg)";
  battlefieldFxLayer.append(trail);

  const figure = attackerSlot.querySelector(".fighter-figure");
  const moveX = dx > 0 ? (dx - 20) : (dx + 20);

  if (figure) {
    figure.style.transition = "transform 140ms ease-out";
    figure.style.transform = "translateX(" + moveX + "px) scale(1.15)";
  }

  setTimeout(function () {
    if (onHit) onHit();
  }, 130);

  setTimeout(function () {
    if (figure) {
      figure.style.transition = "transform 160ms ease-in";
      figure.style.transform = "";
    }
    trail.remove();
    setTimeout(function () {
      if (onComplete) onComplete();
    }, 180);
  }, 260);
}

// 2. Projectile Animation (Repulsor Blast, Power Blast)
function playProjectileAnimation(attackerSlot, defenderSlot, colorClass, onHit, onComplete) {
  const att = getElementCenter(attackerSlot);
  const def = getElementCenter(defenderSlot);

  const proj = document.createElement("div");
  proj.className = "fx-projectile " + colorClass;
  proj.style.left = att.x + "px";
  proj.style.top = (att.y - 15) + "px";
  battlefieldFxLayer.append(proj);

  if (proj.animate) {
    proj.animate(
      [
        { left: att.x + "px", top: (att.y - 15) + "px", transform: "scale(0.8)" },
        { left: def.x + "px", top: (def.y - 15) + "px", transform: "scale(1.3)" }
      ],
      { duration: 320, easing: "ease-in" }
    ).onfinish = function () {
      proj.remove();
      if (onHit) onHit();
      setTimeout(function () {
        if (onComplete) onComplete();
      }, 200);
    };
  } else {
    proj.remove();
    if (onHit) onHit();
    if (onComplete) onComplete();
  }
}

// 3. Beam Animation (Unibeam, Heat Vision)
function playBeamAnimation(attackerSlot, defenderSlot, beamType, onHit, onComplete) {
  const att = getElementCenter(attackerSlot);
  const def = getElementCenter(defenderSlot);
  const dx = def.x - att.x;
  const dy = def.y - att.y;
  const length = Math.sqrt(dx * dx + dy * dy);
  const angle = Math.atan2(dy, dx) * (180 / Math.PI);

  const beam = document.createElement("div");
  beam.className = "fx-beam " + beamType;
  beam.style.left = att.x + "px";
  beam.style.top = (att.y - 10) + "px";
  beam.style.width = length + "px";
  beam.style.transform = "rotate(" + angle + "deg)";
  battlefieldFxLayer.append(beam);

  setTimeout(function () {
    if (onHit) onHit();
  }, 140);

  setTimeout(function () {
    beam.classList.add("fx-fade");
    setTimeout(function () {
      beam.remove();
      if (onComplete) onComplete();
    }, 180);
  }, 380);
}

// 4. Lightning Strike Animation (Thor Lightning Strike)
function playLightningAnimation(defenderSlot, onHit, onComplete) {
  const def = getElementCenter(defenderSlot);

  const bolt = document.createElement("div");
  bolt.className = "fx-lightning";
  bolt.style.left = (def.x - 14) + "px";
  bolt.style.top = "0px";
  bolt.style.height = (def.y + 20) + "px";
  battlefieldFxLayer.append(bolt);

  battleground.classList.add("arena-flash-thunder");

  setTimeout(function () {
    if (onHit) onHit();
  }, 140);

  setTimeout(function () {
    battleground.classList.remove("arena-flash-thunder");
    bolt.remove();
    if (onComplete) onComplete();
  }, 440);
}

// 5. Thunder Storm Animation (Thor AoE)
function playThunderstormAnimation(targets, onHit, onComplete) {
  battleground.classList.add("arena-flash-thunder");

  targets.forEach(function (tgt, i) {
    const slot = document.getElementById("fighter-slot-" + tgt.id);
    if (!slot) return;
    const def = getElementCenter(slot);
    setTimeout(function () {
      const bolt = document.createElement("div");
      bolt.className = "fx-lightning";
      bolt.style.left = (def.x - 14) + "px";
      bolt.style.top = "0px";
      bolt.style.height = (def.y + 20) + "px";
      battlefieldFxLayer.append(bolt);
      setTimeout(function () {
        bolt.remove();
      }, 300);
    }, i * 70);
  });

  setTimeout(function () {
    if (onHit) onHit();
  }, 220);

  setTimeout(function () {
    battleground.classList.remove("arena-flash-thunder");
    if (onComplete) onComplete();
  }, 620);
}

// 6. Shockwave Animation (Ground Slam, Titan Slam)
function playShockwaveAnimation(attackerSlot, onHit, onComplete) {
  const att = getElementCenter(attackerSlot);

  const wave = document.createElement("div");
  wave.className = "fx-shockwave";
  wave.style.left = att.x + "px";
  wave.style.top = (att.y + 25) + "px";
  battlefieldFxLayer.append(wave);

  battleground.classList.add("arena-screen-shake");

  setTimeout(function () {
    if (onHit) onHit();
  }, 220);

  setTimeout(function () {
    battleground.classList.remove("arena-screen-shake");
    wave.remove();
    if (onComplete) onComplete();
  }, 520);
}

// 7. Missile Barrage Animation (Iron Man AoE)
function playMissileBarrageAnimation(attackerSlot, livingTargets, onHit, onComplete) {
  const att = getElementCenter(attackerSlot);

  livingTargets.forEach(function (tgt, i) {
    const slot = document.getElementById("fighter-slot-" + tgt.id);
    if (!slot) return;
    const def = getElementCenter(slot);
    const missile = document.createElement("div");
    missile.className = "fx-missile";
    missile.style.left = att.x + "px";
    missile.style.top = (att.y - 20) + "px";
    battlefieldFxLayer.append(missile);

    setTimeout(function () {
      if (missile.animate) {
        missile.animate(
          [
            { left: att.x + "px", top: (att.y - 20) + "px" },
            { left: (att.x + (def.x - att.x) * 0.5) + "px", top: (att.y - 85) + "px" },
            { left: def.x + "px", top: def.y + "px" }
          ],
          { duration: 420, easing: "cubic-bezier(0.2, 0.8, 0.4, 1)" }
        ).onfinish = function () {
          missile.remove();
        };
      } else {
        missile.remove();
      }
    }, i * 65);
  });

  setTimeout(function () {
    if (onHit) onHit();
  }, 380);

  setTimeout(function () {
    if (onComplete) onComplete();
  }, 680);
}

// 8. Self Buff / Defense Aura Animation
function playSelfAuraAnimation(attackerSlot, auraType, onComplete) {
  const aura = document.createElement("div");
  aura.className = "fx-self-aura " + auraType;
  attackerSlot.append(aura);

  setTimeout(function () {
    aura.remove();
    if (onComplete) onComplete();
  }, 500);
}

// 9. Defender Hit Reaction
function playHitReaction(defenderSlot, isDodge) {
  if (!defenderSlot) return;
  if (isDodge) {
    defenderSlot.classList.add("anim-dodge");
    setTimeout(function () {
      defenderSlot.classList.remove("anim-dodge");
    }, 400);
  } else {
    defenderSlot.classList.add("anim-hit-shake");
    setTimeout(function () {
      defenderSlot.classList.remove("anim-hit-shake");
    }, 400);
  }
}

// Executes real combat action when player confirms attack
function handleConfirmAction() {
  if (!selectedAbility || isActionLocked) {
    return;
  }

  const activePlayer = turnOrder[activeTurnIndex];
  isActionLocked = true;
  confirmActionButton.disabled = true;
  cancelActionButton.disabled = true;

  document.querySelectorAll(".ability-button").forEach(function (b) {
    b.disabled = true;
  });

  // Apply cooldown if ability requires cooldown
  if ((selectedAbility.cooldown || 0) > 0) {
    selectedAbility.currentCooldown = selectedAbility.cooldown;
  }

  const attackerSlot = document.getElementById("fighter-slot-" + activePlayer.id);

  // CASE 1: SINGLE-TARGET ATTACK
  if (selectedAbility.targetType === "single" && selectedTarget) {
    const targetPlayer = selectedTarget;
    const targetSlot = document.getElementById("fighter-slot-" + targetPlayer.id);
    const outcome = calculateAttackOutcome(activePlayer, targetPlayer, selectedAbility);

    function onHit() {
      playHitReaction(targetSlot, outcome.isDodge);
      if (outcome.isDodge) {
        spawnFloatingCombatText(targetSlot, "MISS!", "miss");
        actionStatusMessage.innerHTML =
          "<strong>" + escapeHtml(targetPlayer.character.name) + "</strong> quickly dodged aside! (MISS)";
      } else {
        targetPlayer.currentHealth = Math.max(0, targetPlayer.currentHealth - outcome.damage);
        const hitType = outcome.isCrit ? "crit" : "damage";
        const hitText = outcome.isCrit ? "-" + outcome.damage + " CRITICAL!" : "-" + outcome.damage;
        spawnFloatingCombatText(targetSlot, hitText, hitType);

        updateFighterUI(targetPlayer);

        if (targetPlayer.currentHealth === 0) {
          targetPlayer.eliminated = true;
          spawnFloatingCombatText(targetSlot, "KO!", "ko");
          updateFighterUI(targetPlayer);
        }
      }
    }

    function onComplete() {
      // Check Victory Condition
      const living = players.filter(function (p) {
        return !p.eliminated;
      });
      if (living.length <= 1) {
        showWinnerScreen(living[0]);
        return;
      }
      advanceToNextLivingPlayer();
    }

    // Play specific character visual animation
    if (activePlayer.character.id === "iron-man" && selectedAbility.name === "UNIBEAM") {
      playBeamAnimation(attackerSlot, targetSlot, "unibeam", onHit, onComplete);
    } else if (activePlayer.character.id === "iron-man" && selectedAbility.name === "REPULSOR BLAST") {
      playProjectileAnimation(attackerSlot, targetSlot, "cyan", onHit, onComplete);
    } else if (activePlayer.character.id === "superman" && selectedAbility.name === "HEAT VISION") {
      playBeamAnimation(attackerSlot, targetSlot, "heat-vision", onHit, onComplete);
    } else if (activePlayer.character.id === "superman" && selectedAbility.name === "FLYING STRIKE") {
      playFlyingStrikeAnimation(attackerSlot, targetSlot, onHit, onComplete);
    } else if (activePlayer.character.id === "thor" && selectedAbility.name === "LIGHTNING STRIKE") {
      playLightningAnimation(targetSlot, onHit, onComplete);
    } else if (activePlayer.character.id === "thanos" && selectedAbility.name === "POWER BLAST") {
      playProjectileAnimation(attackerSlot, targetSlot, "purple", onHit, onComplete);
    } else if (activePlayer.character.id === "flash" && selectedAbility.name === "SPEED PUNCH") {
      playSpeedPunchAnimation(attackerSlot, targetSlot, onHit, onComplete);
    } else if (activePlayer.character.id === "flash" && selectedAbility.name === "RAPID COMBO") {
      playRapidComboAnimation(attackerSlot, targetSlot, onHit, onComplete);
    } else if (activePlayer.character.id === "flash" && selectedAbility.name === "LIGHTNING RUN") {
      playLightningRunAnimation(attackerSlot, targetSlot, onHit, onComplete);
    } else {
      playMeleeAnimation(attackerSlot, targetSlot, onHit, onComplete);
    }
  }

  // CASE 2: AREA ATTACK (AoE)
  else if (selectedAbility.targetType === "all") {
    const livingEnemies = players.filter(function (p) {
      return p.id !== activePlayer.id && !p.eliminated;
    });

    function onHit() {
      livingEnemies.forEach(function (tgt) {
        const tgtSlot = document.getElementById("fighter-slot-" + tgt.id);
        const outcome = calculateAttackOutcome(activePlayer, tgt, selectedAbility);
        playHitReaction(tgtSlot, outcome.isDodge);

        if (outcome.isDodge) {
          spawnFloatingCombatText(tgtSlot, "MISS!", "miss");
        } else {
          tgt.currentHealth = Math.max(0, tgt.currentHealth - outcome.damage);
          const hitType = outcome.isCrit ? "crit" : "damage";
          const hitText = outcome.isCrit ? "-" + outcome.damage + " CRITICAL!" : "-" + outcome.damage;
          spawnFloatingCombatText(tgtSlot, hitText, hitType);

          updateFighterUI(tgt);

          if (tgt.currentHealth === 0) {
            tgt.eliminated = true;
            spawnFloatingCombatText(tgtSlot, "KO!", "ko");
            updateFighterUI(tgt);
          }
        }
      });
    }

    function onComplete() {
      const living = players.filter(function (p) {
        return !p.eliminated;
      });
      if (living.length <= 1) {
        showWinnerScreen(living[0]);
        return;
      }
      advanceToNextLivingPlayer();
    }

    if (activePlayer.character.id === "iron-man") {
      playMissileBarrageAnimation(attackerSlot, livingEnemies, onHit, onComplete);
    } else if (activePlayer.character.id === "thor") {
      playThunderstormAnimation(livingEnemies, onHit, onComplete);
    } else {
      playShockwaveAnimation(attackerSlot, onHit, onComplete);
    }
  }

  // CASE 3: SELF BUFF / DEFEND
  else if (selectedAbility.targetType === "self") {
    const auraType = selectedAbility.type === "defend" ? "defend" : "buff";

    playSelfAuraAnimation(attackerSlot, auraType, function () {
      if (selectedAbility.name === "RAGE") {
        activePlayer.damageBuff = Math.min(0.50, (activePlayer.damageBuff || 0) + 0.25);
        activePlayer.statusText = "RAGING";
        activePlayer.statusDuration = 2;
        actionStatusMessage.innerHTML = "<strong>HULK IS GETTING ANGRIER!</strong> (+25% Attack Power)";
        spawnFloatingCombatText(attackerSlot, "+RAGE!", "buff");
      } else if (selectedAbility.name === "DEFEND") {
        activePlayer.defenseBuff = 0.45;
        activePlayer.statusText = "DEFENDING";
        activePlayer.statusDuration = 1;
        actionStatusMessage.innerHTML = "<strong>HULK</strong> braced for impact! (-45% Incoming Damage)";
        spawnFloatingCombatText(attackerSlot, "+DEFEND!", "buff");
      } else if (selectedAbility.name === "ENERGY SHIELD") {
        activePlayer.defenseBuff = 0.45;
        activePlayer.statusText = "SHIELDED";
        activePlayer.statusDuration = 1;
        actionStatusMessage.innerHTML = "<strong>IRON MAN</strong> activated Energy Shield! (-45% Incoming Damage)";
        spawnFloatingCombatText(attackerSlot, "+SHIELD!", "buff");
      } else if (selectedAbility.name === "SUPER SPEED") {
        activePlayer.damageBuff = 0.25;
        activePlayer.dodgeBuff = 0.25;
        activePlayer.statusText = "SUPER SPEED";
        activePlayer.statusDuration = 1;
        actionStatusMessage.innerHTML = "<strong>SUPERMAN</strong> activated Super Speed! (+25% Attack & Dodge)";
        spawnFloatingCombatText(attackerSlot, "+SPEED!", "buff");
      } else if (selectedAbility.name === "DIVINE GUARD") {
        activePlayer.defenseBuff = 0.45;
        activePlayer.statusText = "DIVINE GUARD";
        activePlayer.statusDuration = 1;
        actionStatusMessage.innerHTML = "<strong>THOR</strong> summoned Divine Guard! (-45% Incoming Damage)";
        spawnFloatingCombatText(attackerSlot, "+DIVINE GUARD!", "buff");
      } else if (selectedAbility.name === "DODGE MODE") {
        activePlayer.dodgeBuff = 0.38;
        activePlayer.statusText = "DODGE MODE";
        activePlayer.statusDuration = 1;
        actionStatusMessage.innerHTML = "<strong>FLASH</strong> entered Dodge Mode! (+38% Dodge Chance)";
        spawnFloatingCombatText(attackerSlot, "+DODGE MODE!", "buff");
      } else if (selectedAbility.name === "FORTIFY") {
        activePlayer.defenseBuff = 0.46;
        activePlayer.statusText = "FORTIFIED";
        activePlayer.statusDuration = 1;
        actionStatusMessage.innerHTML = "<strong>THANOS</strong> fortified titan armor! (-46% Incoming Damage)";
        spawnFloatingCombatText(attackerSlot, "+FORTIFIED!", "buff");
      }

      updateFighterUI(activePlayer);

      setTimeout(function () {
        advanceToNextLivingPlayer();
      }, 350);
    });
  }
}

// Advances initiative to the next living player
function advanceToNextLivingPlayer() {
  const living = players.filter(function (p) {
    return !p.eliminated;
  });
  if (living.length <= 1) {
    showWinnerScreen(living[0]);
    return;
  }

  let attempts = 0;
  do {
    activeTurnIndex++;
    if (activeTurnIndex >= turnOrder.length) {
      roundNumber++;
      turnOrder = calculateTurnOrder(players);
      activeTurnIndex = 0;
    }
    attempts++;
  } while (turnOrder[activeTurnIndex] && turnOrder[activeTurnIndex].eliminated && attempts < turnOrder.length * 2);

  const activePlayer = turnOrder[activeTurnIndex];
  if (!activePlayer || activePlayer.eliminated) {
    showWinnerScreen(living[0]);
    return;
  }

  // Decrement ability cooldowns for this active player
  activePlayer.character.abilities.forEach(function (ab) {
    if ((ab.currentCooldown || 0) > 0) {
      ab.currentCooldown--;
    }
  });

  // Decrement status durations for this active player
  if ((activePlayer.statusDuration || 0) > 0) {
    activePlayer.statusDuration--;
    if (activePlayer.statusDuration === 0) {
      activePlayer.damageBuff = 0;
      activePlayer.defenseBuff = 0;
      activePlayer.dodgeBuff = 0;
      activePlayer.statusText = "";
    }
  }
  updateFighterUI(activePlayer);

  renderActiveTurn();
}

// Displays winner celebration overlay
function showWinnerScreen(winnerPlayer) {
  if (!winnerPlayer) return;
  isActionLocked = false;
  arenaWinnerOverlay.hidden = false;
  winnerHeroAvatar.textContent = winnerPlayer.character.symbol;
  winnerHeroTitle.textContent = winnerPlayer.character.name + " WINS!";
  winnerPlayerSubtitle.textContent = "PLAYER: " + winnerPlayer.name.toUpperCase();
  actionStatusMessage.innerHTML =
    "<strong>BATTLE CONCLUDED: " + escapeHtml(winnerPlayer.character.name) + " is the Victorious Champion!</strong>";
}

// Launch the Visual Battleground Arena
function startBattlegroundArena() {
  turnOrder = calculateTurnOrder(players);
  roundNumber = 1;
  activeTurnIndex = 0;
  selectedAbility = null;
  selectedTarget = null;
  isActionLocked = false;

  revealScreen.hidden = true;
  assigningScreen.hidden = true;
  setupScreen.hidden = true;
  arenaWinnerOverlay.hidden = true;
  arenaScreen.hidden = false;

  renderBattlefieldFighters();
  renderActiveTurn();
  arenaScreen.focus();
}

// ==================================================
// RESET / REMATCH / CLEAN TRANSITIONS
// ==================================================

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

  players = [];
  turnOrder = [];
  currentFighterIndex = 0;
  roundNumber = 1;
  activeTurnIndex = 0;
  selectedAbility = null;
  selectedTarget = null;
  isActionLocked = false;
  formError.textContent = "";
  updatePlayerNumbers();

  assigningScreen.hidden = true;
  revealScreen.hidden = true;
  arenaScreen.hidden = true;
  arenaWinnerOverlay.hidden = true;
  setupScreen.hidden = false;
  document.querySelector(".player-name").focus();
}

// ==================================================
// EVENT LISTENERS
// ==================================================

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

  startCharacterAssignment(validNames);
});

nextFighterButton.addEventListener("click", function () {
  if (currentFighterIndex < players.length - 1) {
    currentFighterIndex++;
    showCharacterReveal();
  } else {
    startBattlegroundArena();
  }
});

confirmActionButton.addEventListener("click", handleConfirmAction);
cancelActionButton.addEventListener("click", handleCancelAction);

arenaRematchButton.addEventListener("click", function () {
  arenaWinnerOverlay.hidden = true;
  const playerNames = players.map(function (p) {
    return p.name;
  });
  startCharacterAssignment(playerNames);
});

arenaNewPlayersButton.addEventListener("click", function () {
  arenaWinnerOverlay.hidden = true;
  showNewPlayerSetup();
});

winnerRematchButton.addEventListener("click", function () {
  arenaWinnerOverlay.hidden = true;
  const playerNames = players.map(function (p) {
    return p.name;
  });
  startCharacterAssignment(playerNames);
});

winnerNewPlayersButton.addEventListener("click", function () {
  arenaWinnerOverlay.hidden = true;
  showNewPlayerSetup();
});


