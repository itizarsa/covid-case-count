const globalTime = document.getElementById("global-updated");
const localTime = document.getElementById("local-updated");
const globalCnf = document.getElementById("global-cnf");
const globalAct = document.getElementById("global-act");
const globalDth = document.getElementById("global-dth");
const globalRcv = document.getElementById("global-rcv");
const localCnf = document.getElementById("local-cnf");
const localAct = document.getElementById("local-act");
const localDth = document.getElementById("local-dth");
const localRcv = document.getElementById("local-rcv");

const formatNumber = (num) => num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");

const formatDate = (dateString) => {
	const dt = new Date(dateString);
	return `${(dt.getMonth() + 1).toString().padStart(2, "0")}/${dt
		.getDate()
		.toString()
		.padStart(2, "0")}/${dt
		.getFullYear()
		.toString()
		.padStart(4, "0")} ${dt
		.getHours()
		.toString()
		.padStart(2, "0")}:${dt
		.getMinutes()
		.toString()
		.padStart(2, "0")}:${dt.getSeconds().toString().padStart(2, "0")}`;
};

function getGlobal() {
	fetch("https://covid19.mathdro.id/api")
		.then((res) => res.json())
		.then((data) => {
			globalTime.innerHTML = formatDate(data.lastUpdate);
			globalCnf.innerHTML = formatNumber(data.confirmed.value);
			globalDth.innerHTML = formatNumber(data.deaths.value);
			globalRcv.innerHTML = formatNumber(data.recovered.value);
			let active = data.confirmed.value - (data.deaths.value + data.recovered.value);
			globalAct.innerHTML = formatNumber(active);
		})
		.catch((err) => console.error(err));
}

function getLocal() {
	fetch(`https://covid19.mathdro.id/api/countries/india`)
		.then((res) => res.json())
		.then((data) => {
			localTime.innerHTML = formatDate(data.lastUpdate);
			localCnf.innerHTML = formatNumber(data.confirmed.value);
			localDth.innerHTML = formatNumber(data.deaths.value);
			localRcv.innerHTML = formatNumber(data.recovered.value);
			let active = data.confirmed.value - (data.deaths.value + data.recovered.value);
			localAct.innerHTML = formatNumber(active);
		})
		.catch((err) => console.error(err));
}

function updateVisitCount() {
	fetch(`https://api.countapi.xyz/hit/arsadvc/covid-19`)
		.then((res) => res.json())
		.then((res) => console.log(`Visited ${res.value} times`));
}

getLocal();
getGlobal();
updateVisitCount();
