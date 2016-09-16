var m = 25,
    origM = 25,
    s = 0,
    origS = 0,
    breakM = 5,
    origBreakM = 5,
    breakS = 0,
    origBreakS = 0,
    future,
    futureBreak,
    status = "work",
    flag = 0,
    sec;

document.getElementById("timer").innerHTML = m + ":0" + s;
document.getElementById("breakTimer").innerHTML = breakM + ":0" + breakS;

document.getElementById("start").addEventListener("click", function() {
  if (status === "work" && flag === 0){
    startTimer();
  } else if (status === "break" && flag === 0){
    startBreakTimer();
  }
  origM = m;
  origS = s;
  origBreakM = breakM;
  origBreakS = breakS;
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
  if (status === "work" && flag === 0 && m < 60){
    m++;
    origM++;
    s = 00;
    document.getElementById("timer").innerHTML = m + ":0" + s;
  } else if (status === "break" && m < 60){
    m++;
    origM++;
    document.getElementById("timer").innerHTML = m + ":0" + s;
  } else {
    return;
  }

});

document.getElementById("decrease").addEventListener("click", function() {
  if (status === "work" && flag === 0 && m > 1){
    m--;
    origM--;
    s = 00;
    document.getElementById("timer").innerHTML = m + ":0" + s;
  } else if (status === "break" && m > 1){
    m--;
    origM--;
    document.getElementById("timer").innerHTML = m + ":0" + s;
  } else {
    return;
  }

});

document.getElementById("increaseBreak").addEventListener("click", function() {
  if (status === "break" && flag === 0 && breakM < 60){
    breakM++;
    origBreakM++;
    breakS = 0;
    document.getElementById("breakTimer").innerHTML = breakM + ":0" + breakS;
  } else if (status === "work" && breakM < 60){
    breakM++;
    origBreakM++;
    document.getElementById("breakTimer").innerHTML = breakM + ":0" + breakS;
  } else {
    return;
  }
});

document.getElementById("decreaseBreak").addEventListener("click", function() {
    if (status === "break" && flag === 0 && breakM > 1){
    breakM--;
    origBreakM--;
    breakS = 0;
    document.getElementById("breakTimer").innerHTML = breakM + ":0" + breakS;
  } else if (status === "work" && breakM > 1){
    breakM--;
    origBreakM--;
    document.getElementById("breakTimer").innerHTML = breakM + ":0" + breakS;
  } else {
    return;
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
  if (m === 0 && s === 00) {
    document.getElementById('timerSound').play();
    clearInterval(setSec);
    document.getElementById("timer").innerHTML = origM + ":0" + origS;
    startBreak();
    status = "break";
    m = origM;
    s = origS;
  } else if (s < 10) {
    document.getElementById("timer").innerHTML = m + ":0" + s;
  } else {
    document.getElementById("timer").innerHTML = m + ":" + s;
  }
}

function updateBreakHTML() {
  if (breakM === 0 && breakS === 00) {
    document.getElementById('timerSound').play();
    clearInterval(setBreakSec);
    document.getElementById("breakTimer").innerHTML = origBreakM + ":0" + origBreakS;
    startTimer();
    status = "work";
    breakM = origBreakM;
    breakS = origBreakS;
  } else if (breakS < 10) {
    document.getElementById("breakTimer").innerHTML = breakM + ":0" + breakS;
  } else {
    document.getElementById("breakTimer").innerHTML = breakM + ":" + breakS;
  }
}

var change = 260 / origS;
document.getElementById('whiteDiv').css.height += change;
document.getElementById('colorDiv').css.height -= change;
