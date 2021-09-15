var result;

function parse(str) {
  return Function(`'use strict'; return (${str})`)()
}

// selve regningen
var mathString = "";
var equals = false;
const keys = document.querySelector(".calculator-keys");

const display = document.querySelector(".calculator-screen");
display.value = "0";

var sintancos;

keys.addEventListener("click", (event) => {
	const {target} = event;
	const {value} = target;
	if (!target.matches("button")) {
		return;
  }

	switch (value) {
		case "=":
			// "Undefined" text prevention
			if (mathString == "") return (display.value = "0");

      if (mathString.includes("√")) {
				display.value = Math.sqrt(mathString.replace("√", ""));
				return Clear();
			}

			else if (mathString.includes("^")) {
				display.value = Math.pow(
					mathString.split("^")[0],
					mathString.split("^")[1].replace("^", "")
				);
				return Clear();
			}

      else if (mathString.includes("cos")) {
        result = Math.cos(mathString.replace("cos(", "").replace(")", "").replace("cos", "")).toFixed(4)
        display.value = Math.cos(mathString.replace("cos(", "").replace(")", "").replace("cos", ""));
        historyUpdate()
        return Clear();
      }

      else if (mathString.includes("tan")) {
        result = Math.tan(mathString.replace("tan(", "").replace(")", "").replace("tan", "")).toFixed(4)
        display.value = Math.tan(mathString.replace("tan(", "").replace(")", "").replace("tan", ""));
        historyUpdate()
        return Clear();
      }

      else if (mathString.includes("sin")) {
        result = Math.sin(mathString.replace("sin(", "").replace(")", "").replace("sin", "")).toFixed(4)
        display.value = Math.sin(mathString.replace("sin(", "").replace(")", "").replace("sin", ""));
        historyUpdate()
        return Clear();
      }

			// else continue
			equals = true
      console.log(equals)
			updateDisplayNumber();
			historyUpdate();
			Clear();
			break;

		case "sqrt":
			mathString += "√";
			break;

		//clear button
		case "all-clear":
			Clear();
			mathString = "";
			display.value = "0"
			break

    case "pi":
      mathString += "3.14"
      display.value = mathString;
      break
    case "cos":
      mathString += "cos("
      break
    case "sin":
      mathString += "sin("
      break
    case "tan":
      mathString += "tan("
      break
		//else do this
		default:
      equals = false;
			mathString += value;
      if (mathString.includes("cos(") || mathString.includes("sin(") || mathString.includes("tan(") && sintancos) mathString  += ")"
			display.value = mathString;
			break;
	}
});

document.addEventListener("keydown", function (event) {
	var isText = event.key >= "0" && event.key <= "9" || event.key == "+" || event.key == "-" || event.key == "*" || event.key == "/" || event.key == "(" || event.key == ")"
	switch (event.key) {
		case "Enter":
				if (mathString == "") return (display.value = "0");
				if (mathString.includes("√")) {
					display.value = Math.sqrt(mathString.replace("√", ""));
					return Clear();
				}
				if (mathString.includes("^")) {
					display.value = Math.pow(
						mathString.split("^")[0],
						mathString.split("^")[1].replace("^", "")
					);
					return Clear();
				}
				// else continue
				equals = true
				updateDisplayNumber();
				historyUpdate();
				Clear();
			break
		case "Backspace":
			mathString = mathString.substring(0, mathString.length - 1)
			if(mathString == "") mathString = 0
			display.value = mathString
			break

		case ".":
				mathString += "."
				display.value = mathString
			break
		default:
			if(isText) {
				if(mathString == "0") mathString = ""
				mathString += event.key
				display.value = mathString
			}
			break
	}
});

// Display opdatering
function updateDisplayNumber() {
	result = parse(mathString);
  if(mathString.includes(".") && equals) return display.value = result.toFixed(2);
  display.value = result
}

// Clear funktion

function Clear() {
	mathString = "";
}

// CONSOLE MODE!

// function to set a given theme/color-scheme
function setTheme(themeName) {
    localStorage.setItem('theme', themeName);
    document.documentElement.className = themeName;
}

// function to toggle between light and dark theme
function toggleTheme() {
   if (localStorage.getItem('theme') === 'theme-orange'){
       setTheme('theme-red');
   } else {
       setTheme('theme-orange');
   }
}

// Theme on load
(function () {
   if (localStorage.getItem('theme') === 'theme-orange') {
       setTheme('theme-orange');
   } else {
       setTheme('theme-red');
   }
})();

// Delay

function delay(delayInms) {
	return new Promise((resolve) => {
		setTimeout(() => {
			resolve(2);
		}, delayInms);
	});
}

// Hide some elements
document.getElementById("consoleAnswer").style.display = "none";
document.getElementById("historyList").style.display = "none";

let currentWRTL = -1;
// wrtl = We are this long

var input = document.getElementById("myInput");
input.addEventListener("keyup", function (event) {
	if (event.keyCode === 13) {
		if(input.value == "help") {
			document.getElementById("consoleAnswer").style.display = "block";
			document.getElementById("consoleAnswer").innerHTML = "type &ldquo;<strong>mode</strong>&ldquo; To Change Theme";
		}

		if(input.value == "mode") {
			document.getElementById("consoleAnswer").style.display = "block";
			document.getElementById("consoleAnswer").innerHTML = "Color changed";
			toggleTheme()
		}

		return Reset();
	}
});

// Resets command line

async function Reset() {
	let delayres = await delay(3000);
	document.getElementById("consoleAnswer").style.display = "none";
}

// Show History List

var active = false;

function historyShow() {
	if (!active) {
		document.getElementById("historyList").style.display = "block";
		active = true;
	} else if (active) {
		document.getElementById("historyList").style.display = "none";
		active = false;
	}
}

function historyUpdate() {
	var historyIdList = document.getElementsByName("historyIds");

  // Infinite loop
	if (currentWRTL >= 9) currentWRTL = -1;
	currentWRTL++;
  // læser alle elementer i gennem
	historyIdList.forEach(function (elem) {
		if (!historyIdList[currentWRTL] == "No Result") {
			return;
		}
		return (historyIdList[currentWRTL].innerHTML = result);
	});
}
