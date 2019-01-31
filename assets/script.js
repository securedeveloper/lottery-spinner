function generateRandomInteger(min, max) {
    return Math.floor(min + Math.random() * (max + 1 - min));
}

function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

var tip1Arr;
var tip2Arr;
var limit1 = 6, limit2 = 0, min1 = 1, max1 = 45, min2 = 1, max2 = 0;

function spin() {
    if (getParameterByName('limit1')) {
        limit1 = parseInt(getParameterByName('limit1'), 10);
    }

    if (getParameterByName('limit2')) {
        limit2 = parseInt(getParameterByName('limit2'), 10);
    }

    if (getParameterByName('min1')) {
        min1 = parseInt(getParameterByName('min1'), 10);
    }

    if (getParameterByName('max1')) {
        max1 = parseInt(getParameterByName('max1'), 10);
    }

    if (getParameterByName('min2')) {
        min2 = parseInt(getParameterByName('min2'), 10);
    }

    if (getParameterByName('max2')) {
        max2 = parseInt(getParameterByName('max2'), 10);
    }

    tip1Arr = [];
    tip2Arr = [];

    for (let i = 0; i < limit1; i++) {
        tip1Arr.push(getUniqueNum1(min1, max1));
    }

    for (let i = 0; i < limit2; i++) {
        tip2Arr.push(getUniqueNum2(min2, max2));
    }

    tip1Arr.sort(sortNumber);
    tip2Arr.sort(sortNumber);

    let html = '';
    tip1Arr.forEach(item => {
        if(item < 10){
            html += '<span class="tip1">0' + item + '</span>';
        }else {
            html += '<span class="tip1">' + item + '</span>';
        }
    });

    tip2Arr.forEach(item => {
        if(item < 10){
            html += '<span class="tip2">0' + item + '</span>';
        }else {
            html += '<span class="tip2">' + item + '</span>';
        }
    });

    document.getElementById('placeholder').innerHTML = html;
}

function sortNumber(a, b) {
    return a - b;
}

function getUniqueNum1(min, max) {
    let num = generateRandomInteger(min, max);

    if (tip1Arr && tip1Arr.filter(item => item == num).length > 0) {
        return getUniqueNum1(min, max);
    }

    return num;
}

function getUniqueNum2(min, max) {
    let num = generateRandomInteger(min, max);

    if (tip2Arr && tip2Arr.filter(item => item == num).length > 0) {
        return getUniqueNum1(min, max);
    }

    return num;
}

var timer;
window.onload = function() {
    startTimer();

    loadEntries();
}

function startTimer() {
    var timeOut = 2000;

    if (getParameterByName('timeout')) {
        timeOut = parseInt(getParameterByName('timeout'));
    }

    timer = setInterval(function() {
        spin();
    }, timeOut);
}

function stopTimer() {
    clearInterval(timer);

    timer = null;
}

function toggleSpinner() {
    if(timer) {
        stopTimer();
    } else {
        startTimer();
    }
}

function logEntry() {
    var timeStamp = new Date().toJSON().slice(0, 10);

    var joker = '';

    if (getParameterByName('joker')) {
        joker = getParameterByName('joker');
    }

    // stamp as 
    //date-limit1-limit2-min1-max1-min2-max2
    var logItemKey = `${timeStamp}-${limit1}-${limit2}-${min1}-${max1}-${min2}-${max2}`;

    if(tip1Arr.length > 0) {
        localStorage.setItem(`${logItemKey}-tip1`, JSON.stringify(tip1Arr));
    }

    if(tip2Arr.length > 0) {
        localStorage.setItem(`${logItemKey}-tip2`, JSON.stringify(tip2Arr));
    }

    if(joker) {
        localStorage.setItem(`${logItemKey}-joker`, JSON.stringify(joker.split(",").map(item => parseInt(item))));
    }

    loadEntries();
}

function loadEntries() {
    var tBody = document.getElementById('tbody');
    tBody.innerHTML = '';

    const items = {...localStorage};

    for (var key in items) {
        if (items.hasOwnProperty(key)) {
            tBody.innerHTML += `<tr><td>${key}</td><td>${items[key]}</td></tr>`;
        }
    }
}

var tableVisible = false;
function toggleTable() {
    tableVisible = !tableVisible;

    if(tableVisible) {
        document.getElementById('table').style.opacity = 1;
    } else {
        document.getElementById('table').style.opacity = 0;
    }
}
