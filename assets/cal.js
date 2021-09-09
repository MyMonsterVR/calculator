var result

// selve regningen
const keys = document.querySelector(".calculator-keys")
var mathString = ""

const display = document.querySelector(".calculator-screen")
display.value = "0"

keys.addEventListener("click", (event) => {
	const { target } = event
	const { value } = target
	if (!target.matches("button")) {
		return
	}

	switch (value) {
		case "=":
			// "Undefined" text prevention
			if (mathString == "") return (display.value = "0")
      if (mathString.includes("√")) {display.value = Math.sqrt(mathString.replace("√", "")); return Clear()}
      if (mathString.includes("^")) {display.value = Math.pow(mathString.split('^')[0], mathString.split('^')[1].replace("^", "")); return Clear()}
			// else continue
			updateDisplayNumber()
			historyUpdate()
			Clear()
			break

    case "sqrt":
      mathString += "√"
      //Math.sqrt(mathString)
      //display.value = Math.sqrt(mathString)
      break

		//clear button
		case "all-clear":
			Clear()
			updateDisplayNumber()
			display.value = "0"
			break

		//else do this
		default:
			mathString += value
			display.value = mathString
			break
	}
})

// Display opdatering
function updateDisplayNumber() {
	checkString = eval(mathString)
	result = checkString
	display.value = eval(mathString)
}

// Clear funktion

function Clear() {
	mathString = ""
}

// CONSOLE MODE!

function delay(delayInms) {
	return new Promise((resolve) => {
		setTimeout(() => {
			resolve(2)
		}, delayInms)
	})
}

// Hide some elements
document.getElementById("consoleAnswer").style.display = "none"
document.getElementById("historyList").style.display = "none"

let currentWRTL = -1
// wrtl = We are this long

var input = document.getElementById("myInput")
input.addEventListener("keyup", function (event) {
	if (event.keyCode === 13) {
		result = eval(input.value)
		document.getElementById("consoleAnswer").style.display = "block"
		document.getElementById("consoleAnswer").innerHTML = result
		historyUpdate()
		return Reset()
	}
})

// Resets command line

async function Reset() {
	let delayres = await delay(3000)
	document.getElementById("consoleAnswer").style.display = "none"
}

// Show History List

var active = false

function historyShow() {
	if (!active) {
		document.getElementById("historyList").style.display = "block"
		active = true
	} else if (active) {
		document.getElementById("historyList").style.display = "none"
		active = false
	}
}

function historyUpdate() {
	var historyIdList = document.getElementsByName("historyIds")

	if (currentWRTL >= 9) currentWRTL = -1
	currentWRTL++

	historyIdList.forEach(function (elem) {
		if (!historyIdList[currentWRTL] == "No Result") {
			return
		}
		return (historyIdList[currentWRTL].innerHTML = result)
	})
}