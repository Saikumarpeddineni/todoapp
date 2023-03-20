let timerEl = document.getElementById("timer");
let quoteDisplayEl = document.getElementById("quoteDisplay");
let resultEl = document.getElementById("result");
let quoteInputEl = document.getElementById("quoteInput");
let submitBtn = document.getElementById("submitBtn");
let resetBtn = document.getElementById("resetBtn");
let spinnerEl = document.getElementById("spinner");

let intervalId;
let time;

function startTimer() {
    time = 1;
    intervalId = setInterval(function() {
        timerEl.textContent = time + " seconds";
        time = time + 1;
    }, 1000)
}
startTimer();

let options = {
    method: "GET"
}

function randomQuote() {
    fetch("https://apis.ccbp.in/random-quote", options)
        .then(function(response) {
            return response.json();
        })
        .then(function(randomText) {
            spinnerEl.classList.add("d-none");
            quoteDisplayEl.textContent = randomText["content"];
        })
}
randomQuote();
submitBtn.addEventListener("click", function() {
    if (quoteInputEl.value === quoteDisplayEl.textContent) {
        clearInterval(intervalId);
        resultEl.textContent = "You typed in " + (time - 1) + " seconds";
    } else {
        resultEl.textContent = "You typed incorrect sentence";
    }
});
resetBtn.addEventListener("click", function() {
    quoteInputEl.value = "";
    clearInterval(intervalId);
    startTimer();
    randomQuote();
    spinnerEl.classList.remove("d-none");
    resultEl.textContent = "";
})