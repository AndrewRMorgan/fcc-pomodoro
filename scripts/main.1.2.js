let status = "work"
let flag = 0
let workSessionInterval
let breakSessionInterval

let workSession = {
  seconds : 60,
  minutes : 25,
  displaySeconds : "",
  originalSeconds : 60,
  originalMinutes : 25
}

let breakSession = {
  seconds : 60,
  minutes : 5,
  displaySeconds : "",
  originalSeconds : 60,
  originalMinutes : 5
}

document.getElementById("workTimer").innerHTML = workSession.minutes + ":00"
document.getElementById("breakTimer").innerHTML = breakSession.minutes + ":00"

document.getElementById("start").addEventListener("click", function() {
  if (status === "work" && flag === 0){
    startWorkSession()
  } else if (status === "break" && flag === 0){
    startBreakSession()
  }
})

function startWorkSession(){
  if (status === "work") {
    workSessionInterval = setInterval(checkSeconds, 1000, workSession)
    flag = 1
  } else {
    return
  }
}

function startBreakSession(){
  if (status === "break") {
    breakSessionInterval = setInterval(checkSeconds, 1000, breakSession)
    flag = 1
  } else {
    return
  }
}

document.getElementById("stop").addEventListener("click", function() {
  if (status === "work"){
    clearInterval(workSessionInterval)
    flag = 0
  } else if (status === "break"){
    clearInterval(breakSessionInterval)
    flag = 0
  }
})

document.getElementById("increase").addEventListener("click", function() {
  if (flag === 0 && workSession.minutes < 60){
    workSession.minutes++
    workSession.originalMinutes++
    workSession.seconds = 60
    document.getElementById("workTimer").innerHTML = workSession.minutes + ":00"
  }
})

document.getElementById("decrease").addEventListener("click", function() {
  if (flag === 0 && workSession.minutes > 1){
    workSession.minutes--
    workSession.originalMinutes--
    workSession.seconds = 60
    document.getElementById("workTimer").innerHTML = workSession.minutes + ":00"
  }
})

document.getElementById("increaseBreak").addEventListener("click", function() {
  if (flag === 0 && breakSession.minutes < 60){
    breakSession.minutes++
    breakSession.originalMinutes++
    breakSession.seconds = 60
    document.getElementById("breakTimer").innerHTML = breakSession.minutes + ":00"
  }
})

document.getElementById("decreaseBreak").addEventListener("click", function() {
    if (flag === 0 && breakSession.minutes > 1){
    breakSession.minutes--
    breakSession.originalMinutes--
    breakSession.seconds = 60
    document.getElementById("breakTimer").innerHTML = breakSession.minutes + ":00"
  }
})

function decreaseSeconds(session) {
  session.seconds--
}

function resetSeconds(session) {
  session.seconds = 59
}

function decreaseMinutes(session) {
  session.minutes--
}

function checkSeconds(session) {
  switch (true) {
    case (session.seconds !== 0 && session.seconds !== 60):
      decreaseSeconds(session)
      break
    default:
      decreaseMinutes(session)
      resetSeconds(session)
  }
  updateDisplaySeconds(session)
}

function updateDisplaySeconds(session) {
  switch (true) {
    case (session.seconds > 9 && session.seconds < 60):
      session.displaySeconds = ":" + session.seconds
      break
    case (session.seconds < 10):
      session.displaySeconds = ":0" + session.seconds
      break
    default:
      session.displaySeconds = ":00"
  }
  checkForEnd(session)
}

function checkForEnd(session) {
  switch (true) {
    case (session.minutes !== 0 || session.seconds !== 0):
      updateHTML(session)
      break
    default:
      endSession(session)
  }
}

function updateHTML(session) {
  switch (true) {
  case (session === workSession):
    document.getElementById("workTimer").innerHTML = session.minutes + session.displaySeconds
    break
  case (session === breakSession):
    document.getElementById("breakTimer").innerHTML = session.minutes + session.displaySeconds
    break
  }
}

function endSession(session) {
  playSound()
  switch (true) {
    case (session === workSession):
      clearInterval(workSessionInterval)
      break
    case (session === breakSession):
      clearInterval(breakSessionInterval)
      break
  }
  session.minutes = session.originalMinutes
  session.seconds = session.originalSeconds
  resetHTML(session)
}

function playSound() {
  document.getElementById('timerSound').play()
}

function resetHTML(session) {
  switch (true) {
    case (session === workSession):
      document.getElementById("workTimer").innerHTML = session.minutes + ":00"
      break
    case (session === breakSession):
      document.getElementById("breakTimer").innerHTML = session.minutes + ":00"
      break
  }
  startNextSession(session)
}

function startNextSession(session) {
  switch (true) {
    case (session === workSession):
      status = "break"
      startBreakSession()
      break
    case (session === breakSession):
      status = "work"
      startWorkSession()
      break
  }
}
