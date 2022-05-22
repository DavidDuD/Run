var timers = [];

var maxes = [];

var names = [];

function Timer(max, name) {
	timers.push(0);
	maxes.push(max);
	names.push(name);
}


function timerTick() {
	for (let timer in timers) {
		if (names[timer] != null && maxes[timer] != null) {
			timers[timer]++;
			if (timers[timer] > maxes[timer]) {
				timers[timer] = 0;
			}
		}
	}
}

function removeTimer(name) {
	for (let timer in timers) {
		if (names[timer] == name) {
			names[timer] = null;
			return true;
		}
	}
	return false;
}

function getTimer(name) {
	for (let timer in timers) {
		if (names[timer] == name) {
			return timers[timer];
		}
	}
	return false;
}