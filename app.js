let words = [
  "ability",
  "able",
  "interview",
  "into",
  "investment",
  "involve",
  "issue",
  "it",
  "item",
  "its",
  "itself",
  "jo",
  "join",
  "just",
  "keep",
  "key",
  "kid",
  "kill",
  "kind",
  "kitchen",
  "know",
  "knowledge",
  "land",
  "language",
  "large",
  "last",
  "late",
  "late",
  "laugh",
  "law",
  "lawye",
  "lay",
  "lead",
  "leade",
  "learn",
  "least",
  "leave",
  "left",
  "leg",
  "legal",
  "less",
  "let",
  "lette",
  "level",
  "lie",
  "life",
  "light",
  "like",
  "likely",
  "line",
  "list",
  "listen",
  "little",
  "live",
  "local",
  "long",
  "look",
  "lose",
  "loss",
  "play",
  "playe",
  "PM",
  "point",
  "police",
  "policy",
  "political",
  "politics",
  "poo",
  "popula",
  "population",
  "position",
  "positive",
  "possible",
  "powe",
  "practice",
  "prepare",
  "present",
  "president",
  "pressure",
  "pretty",
  "prevent",
  "price",
  "private",
  "probably",
  "problem",
  "process",
  "produce",
  "product",
  "production",
  "professional",
  "professo",
  "program",
  "project",
  "property",
  "protect",
  "prove",
  "provide",
  "public",
  "pull",
  "purpose",
  "push",
  "put",
  "quality",
  "question",
  "quickly",
  "quite",
  "race",
  "radio",
  "raise",
  "range",
  "rate",
  "rathe",
  "reach",
  "read",
  "ready",
  "real",
  "reality",
  "realize",
  "really",
  "reason",
  "receive",
  "recent",
  "recently",
  "recognize",
  "record",
  "red",
  "reduce",
  "reflect",
  "region",
  "relate",
  "relationship",
  "religious",
  "remain",
  "remembe",
  "remove",
  "report",
  "represent",
  "Republican",
  "require",
  "research",
  "resource",
  "respond",
  "response",
  "responsibility",
  "rest",
  "result",
  "return",
  "reveal",
  "rich",
  "right",
  "rise",
  "risk",
  "road",
  "you",
  "young",
  "you",
  "yourself",
];

console.log();
let yourBest = 0;

// Setting Levels
const lvls = {
  Easy: 5,
  Normal: 4,
  Hard: 3,
  Master: 2,
};

const wordsLength = {
  Easy: 4,
  Normal: 7,
  Hard: "7 or more",
  Master: "7 or more",
};

const wordsLvl = {
  Easy: words.filter((e) => e.length <= wordsLength["Easy"]),
  Normal: words.filter((e) => e.length <= wordsLength["Normal"]),
  Hard: words,
  Master: words,
};

// Default Level
let defaultLevelName = "Normal"; // Change Level From Here
let defaultLevelSeconds = lvls[defaultLevelName];

// Catch Selectors
let startButton = document.querySelector(".start");
let lvlNameSpan = document.querySelector(".message .lvl");
let secondsSpan = document.querySelector(".message .seconds");
let theWord = document.querySelector(".the-word");
let upcomingWords = document.querySelector(".upcoming-words");
let input = document.querySelector(".input");
let timeLeftSpan = document.querySelector(".time span");
let scoreGot = document.querySelector(".score .got");
let scoreTotal = document.querySelector(".score .total");
let finishMessage = document.querySelector(".finish");
let record = document.querySelector(".record span");
let selector = document.querySelector("select");
let check = true;
// Setting Level Name + Seconds + Score

lvlNameSpan.innerHTML = defaultLevelName;
secondsSpan.innerHTML = defaultLevelSeconds;
timeLeftSpan.innerHTML = defaultLevelSeconds + 3;
selector.onchange = () => {
  timeLeftSpan.innerHTML = lvls[selector.value] + 3;
  lvlNameSpan.innerHTML = selector.value;
  secondsSpan.innerHTML = lvls[selector.value];
};
record.innerHTML = JSON.parse(localStorage.getItem("record"));
// start and display

function start() {
  this.remove();
  input.focus();
  let dif = wordsLvl[selector.value];
  // total score
  scoreTotal.innerHTML = dif.length;
  // get random word and display it
  let word = genWord(dif);
  theWord.innerHTML = word;
  // show upcoming words
  upComingWords(dif);
  // start Game
  window.addEventListener("keypress", () => {
    if (check == true) {
      startGame(word, lvls[selector.value], dif);
      check = false;
    }
  });
  // difficulty
}

// generate word

function genWord(dif) {
  let randomWord = dif[Math.floor(Math.random() * dif.length)];
  dif.splice(dif.indexOf(randomWord), 1);
  return randomWord;
}

// upcoming words

function upComingWords(dif) {
  upcomingWords.innerHTML = "";
  for (let i = 0; i < dif.length; i++) {
    let div = document.createElement("div");
    let txt = document.createTextNode(dif[i]);
    div.appendChild(txt);
    upcomingWords.appendChild(div);
  }
}

// start Game

function startGame(word, sec = defaultLevelSeconds, dif) {
  stage(word, sec, true, dif);
}

function continueGame(word, sec, dif) {
  input.value = "";
  theWord.innerHTML = word;
  timeLeftSpan.innerHTML = sec;
  upComingWords(dif);
  stage(word, sec, false, dif);
}

// stage

function stage(word, sec, checking, dif) {
  if (checking === true) {
    sec += 3;
  }
  console.log(sec);
  // countdown
  let countDown = setInterval(() => {
    if (timeLeftSpan.innerHTML > 0) {
      timeLeftSpan.innerHTML--;
    }
  }, 1000);
  // timer
  let timer = setTimeout(() => {
    finishMessage.innerHTML = "Game Over";
    // local storage
    yourBest = scoreGot.innerHTML;
    try {
      if (localStorage.getItem("record") < yourBest) {
        localStorage.setItem("record", JSON.stringify(yourBest));
      }
    } catch {}
    // clear the check interval;
    clearInterval(check);
  }, sec * 1000);
  // check if the word is the same as input value
  let check = setInterval(() => {
    if (input.value.toLowerCase().trim() == word.toLowerCase()) {
      clearInterval(countDown);
      clearInterval(timer);
      clearInterval(check);
      scoreGot.innerHTML++;
      // end
      if (dif.length == 0) {
        finishMessage.innerHTML = "Congarts";
        // localStrage
        yourBest = scoreGot.innerHTML;
        try {
          if (localStorage.getItem("record") < yourBest) {
            localStorage.setItem("record", JSON.stringify(yourBest));
          }
        } catch {}
        return;
      }
      // continueGame
      if (checking === true) {
        sec -= 3;
      }
      continueGame(genWord(dif), sec, dif);
    }
  });
}

startButton.onclick = start;

// instruction

function instruction() {
  for (let i = 0; i < Object.values(lvls).length; i++) {
    // Catch Selectors
    let div = document.createElement("div");
    let span = document.createElement("span");
    let span1 = span.cloneNode();
    let span2 = span.cloneNode();
    let dif = document.createTextNode(Object.keys(lvls)[i]);
    let length = document.createTextNode(Object.values(wordsLength)[i]);
    let seconds = document.createTextNode(Object.values(lvls)[i]);
    let instructions = document.querySelector(".instructions .container");
    // class
    div.classList.add("instruction");

    // append
    span.appendChild(dif);
    span1.appendChild(length);
    span2.appendChild(seconds);
    div.appendChild(span);
    div.appendChild(document.createTextNode(" lvl have worsd that contain "));
    div.appendChild(span1);
    div.appendChild(document.createTextNode(" letters with "));
    div.appendChild(span2);
    div.appendChild(document.createTextNode(" seconds"));

    instructions.appendChild(div);
  }
}

instruction();
