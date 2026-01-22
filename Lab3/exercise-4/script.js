// VARIABLES

let activityLog = [];

let clickCount = 0;

const logArea = document.getElementById("logArea");
const warning = document.getElementById("warning");

const resetBtn = document.getElementById("resetBtn");
const exportBtn = document.getElementById("exportBtn");


// LOG FUNCTION

function addLog(type, target) {

    const time = new Date().toLocaleTimeString();


    const log = {

        eventType: type,
        element: target,
        time: time
    };

    activityLog.push(log);

    displayLog();

    checkSuspicious(type);
}


// DISPLAY

function displayLog() {

    logArea.innerHTML = "";


    activityLog.forEach((item, index) => {

        const div = document.createElement("div");

        div.className = "logItem";

        div.innerText =
        `${index + 1}. ${item.eventType}
         on ${item.element}
         at ${item.time}`;

        logArea.appendChild(div);
    });


    // Auto scroll
    logArea.scrollTop = logArea.scrollHeight;
}


// SUSPICIOUS

function checkSuspicious(type) {

    if (type === "Click") {

        clickCount++;
    }


    // If more than 10 clicks
    if (clickCount > 10) {

        warning.innerText =
        "⚠ Too many clicks detected!";

    }
}


// EVENTS 


// CLICK (BUBBLING)
document.addEventListener("click", function (e) {

    addLog("Click", e.target.tagName);

}, false);   // bubbling


// CLICK (CAPTURING)
document.addEventListener("click", function (e) {

    addLog("Click(Capture)", e.target.tagName);

}, true);   // capturing


// KEY PRESS
document.addEventListener("keydown", function (e) {

    addLog("Key Press (" + e.key + ")", "Keyboard");

});


// FOCUS
document.addEventListener("focusin", function (e) {

    addLog("Focus", e.target.tagName);

});


// RESET

resetBtn.addEventListener("click", function () {

    activityLog = [];

    clickCount = 0;

    logArea.innerHTML = "";

    warning.innerText = "";
});


//  EXPORT

exportBtn.addEventListener("click", function () {

    if (activityLog.length === 0) {

        alert("No Data to Export");
        return;
    }


    let text = "USER ACTIVITY LOG\n\n";


    activityLog.forEach((item, i) => {

        text +=
        `${i + 1}. ${item.eventType}
         on ${item.element}
         at ${item.time}\n`;
    });


    const blob = new Blob([text],
        { type: "text/plain" });

    const link = document.createElement("a");

    link.href = URL.createObjectURL(blob);

    link.download = "activity_log.txt";

    link.click();
});
