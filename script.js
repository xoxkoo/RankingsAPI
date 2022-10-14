import json from "./json.js";

const options = {
  method: 'GET',
  url: 'https://tennisapi1.p.rapidapi.com/api/tennis/rankings/atp',
  headers: {
    'X-RapidAPI-Key': '9b7552900emshff7c6f33a8f1847p11f2e8jsn90fd18e3b266',
    'X-RapidAPI-Host': 'tennisapi1.p.rapidapi.com'
  }
};

// axios.request(options).then(function (response) {
// 	handleData(response.data)
// }).catch(function (error) {
// 	console.error(error);
// });

handleData(json)

window.addEventListener('scroll', function (event) {
	const tableHeight = document.getElementById('rankings_table').offsetHeight
	if (window.scrollY + window.innerHeight >= tableHeight - (tableHeight * 0.25)) {
		handleData(json, document.getElementById('rankings_table_body').childNodes.length, document.getElementById('rankings_table_body').childNodes.length + 100)
	}

})
console.log();

function handleData(response, start = 0, end = 100) {
	const tableBody = document.getElementById('rankings_table_body')

	for (let index = start; index < end; index++) {
		const player = response.rankings[index];
		if (player) {
			const items = [index+1, player.rowName, player.team.country.name, player.points]
			tableBody.appendChild(createRow(items))
		}

	}
}

function createRow(items) {
	const row = document.createElement('tr')
	let cell = ''
	let textNode = ''

	for (let i = 0; i < items.length; i++) {
		const element = items[i]

		cell = document.createElement("td")
		textNode = document.createTextNode(element)

		cell.appendChild(textNode);
		row.appendChild(cell);
	}

	return row
}