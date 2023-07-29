//send data to Local Storage

const sendDataLS = (key, data) => {
	let LSDATA = [];
	if (localStorage.getItem(key)) {
		LSDATA = JSON.parse(localStorage.getItem(key));
	}
	LSDATA.push(data);
	localStorage.setItem(key, JSON.stringify(LSDATA));
};

// get Data

const time = () => {
	return new Date().getTime();
};

// time ago function

function timeAgo(timestamp) {
	const now = new Date();
	const past = new Date(timestamp);
	const seconds = Math.floor((now - past) / 1000);

	// Helper function to format the time units
	function formatTimeUnit(value, unit) {
		return `${value} ${unit}${value === 1 ? '' : 's'}`;
	}

	if (seconds < 60) {
		return formatTimeUnit(seconds, 'second');
	} else if (seconds < 3600) {
		const minutes = Math.floor(seconds / 60);
		return formatTimeUnit(minutes, 'minute');
	} else if (seconds < 86400) {
		const hours = Math.floor(seconds / 3600);
		return formatTimeUnit(hours, 'hour');
	} else if (seconds < 604800) {
		const days = Math.floor(seconds / 86400);
		return formatTimeUnit(days, 'day');
	} else if (seconds < 2419200) {
		const weeks = Math.floor(seconds / 604800);
		return formatTimeUnit(weeks, 'week');
	} else if (seconds < 29030400) {
		const months = Math.floor(seconds / 2419200);
		return formatTimeUnit(months, 'month');
	} else {
		const years = Math.floor(seconds / 29030400);
		return formatTimeUnit(years, 'year');
	}
}


const update = (key,array)=>{
    localStorage.setItem(key, JSON.stringify(array));
}
