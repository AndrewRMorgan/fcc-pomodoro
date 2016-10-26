let m = 25;
let origM = 25;
let s = 0;
const origS = 0;
let breakM = 5;
let origBreakM = 5;
let breakS = 0;
const origBreakS = 0;
let future;
let futureBreak;
let status = "work";
let flag = 0;
let sec;
let setSec;
let setBreakSec;

document.getElementById("timer").innerHTML = m + ":0" + s;
document.getElementById("breakTimer").innerHTML = breakM + ":0" + breakS;

document.getElementById("start").addEventListener("click", function() {
  if (status === "work" && flag === 0){
    startTimer();
  } else if (status === "break" && flag === 0){
    startBreak();
  }
});

function startTimer(){
  future = new Date();
  future.setMinutes(m);
  future.setSeconds(s);
  setSec = setInterval(updateSec, 1000);
  flag = 1;
}

function startBreak(){
  futureBreak = new Date();
  futureBreak.setMinutes(breakM);
  futureBreak.setSeconds(breakS);
  setBreakSec = setInterval(updateBreakSec, 1000);
  flag = 1;
}

document.getElementById("stop").addEventListener("click", function() {
  if (status === "work"){
    clearInterval(setSec);
    flag = 0;
  } else if (status === "break"){
    clearInterval(setBreakSec);
    flag = 0;
  }
})

document.getElementById("increase").addEventListener("click", function() {
  if (flag === 0 && m < 60){
    m++;
    origM++;
    s = 0;
    document.getElementById("timer").innerHTML = m + ":0" + s;
  }
});

document.getElementById("decrease").addEventListener("click", function() {
  if (flag === 0 && m > 1){
    m--;
    origM--;
    s = 0;
    document.getElementById("timer").innerHTML = m + ":0" + s;
  }
});

document.getElementById("increaseBreak").addEventListener("click", function() {
  if (flag === 0 && breakM < 60){
    breakM++;
    origBreakM++;
    breakS = 0;
    document.getElementById("breakTimer").innerHTML = breakM + ":0" + breakS;
  }
});

document.getElementById("decreaseBreak").addEventListener("click", function() {
    if (flag === 0 && breakM > 1){
    breakM--;
    origBreakM--;
    breakS = 0;
    document.getElementById("breakTimer").innerHTML = breakM + ":0" + breakS;
  }
});

function updateSec() {
  sec = future.getSeconds();
  future.setSeconds(sec -= 1);
  s = future.getSeconds();
  m = future.getMinutes();
  updateHTML();
}

function updateBreakSec() {
  sec = futureBreak.getSeconds();
  futureBreak.setSeconds(sec -= 1);
  breakS = futureBreak.getSeconds();
  breakM = futureBreak.getMinutes();
  updateBreakHTML();
}

function updateHTML() {
  if (m === 0 && s === 0) {
    clearInterval(setSec);
    document.getElementById('timerSound').play();
    m = origM;
    s = origS;
    document.getElementById("timer").innerHTML = m + ":0" + s;
    status = "break";
    startBreak();
  } else if (s < 10) {
    document.getElementById("timer").innerHTML = m + ":0" + s;
  } else {
    document.getElementById("timer").innerHTML = m + ":" + s;
  }
}

function updateBreakHTML() {
  if (breakM === 0 && breakS === 0) {
    clearInterval(setBreakSec);
    document.getElementById('timerSound').play();
    breakM = origBreakM;
    breakS = origBreakS;
    document.getElementById("breakTimer").innerHTML = breakM + ":0" + breakS;
    status = "work";
    startTimer();
  } else if (breakS < 10) {
    document.getElementById("breakTimer").innerHTML = breakM + ":0" + breakS;
  } else {
    document.getElementById("breakTimer").innerHTML = breakM + ":" + breakS;
  }
}
