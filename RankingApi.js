import json from "./json.js";

export default class RankingApi {

	constructor() {
		this.options = {
			method: 'GET',
			url: 'https://tennisapi1.p.rapidapi.com/api/tennis/rankings/atp',
			headers: {
				'X-RapidAPI-Key': '9b7552900emshff7c6f33a8f1847p11f2e8jsn90fd18e3b266',
				'X-RapidAPI-Host': 'tennisapi1.p.rapidapi.com'
			}
		}

		this.index = 0
		this.tableBody = document.getElementById('rankings_table_body')

	}

	getData() {
		console.log(json);
		this.handleData(json)
		// axios.request(this.options).then(function (response) {
		// 	handleData(response.data)
		// }).catch(function (error) {
		// 	console.error(error);
		// })
	}

	handleData(response, end = 100) {

		while (this.index != end) {
			const player = response.rankings[this.index];
			if (player) {
				const items = [this.index+1, player.rowName, player.team.country.name, player.points]
				this.tableBody.appendChild(this.createRow(items))
			}
			this.index++

		}
	}
	createRow(items) {
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

}