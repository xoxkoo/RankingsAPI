import json from "./json.js";
const file = json

const options = {
  method: 'GET',
  url: 'https://tennisapi1.p.rapidapi.com/api/tennis/rankings/atp',
  headers: {
    'X-RapidAPI-Key': '9b7552900emshff7c6f33a8f1847p11f2e8jsn90fd18e3b266',
    'X-RapidAPI-Host': 'tennisapi1.p.rapidapi.com'
  }
};

axios.request(options).then(function (response) {
	handleData(response.data)
}).catch(function (error) {
	console.error(error);
});

function handleData(response) {
	const table = document.querySelector('.responsive-table')

	for (let index = 0; index < 10; index++) {
		const player = response.rankings[index];

		const row = `
				<li class="table-row">
					<div class="col col-1" data-label="#">${index+1}</div>
					<div class="col col-2" data-label="Name">${player.rowName}</div>
					<div class="col col-3" data-label="Nationality">${player.team.country.name}</div>
					<div class="col col-4" data-label="Points">${player.points}</div>
				</li>`
		table.innerHTML += row

	}
}