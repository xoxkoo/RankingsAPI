import json from "../data/json.js";

export default class RankingApi {

	constructor() {
		this.index = 0
		this.tableBody = document.getElementById('rankings_table_body')
		this.loaded = false
		this.api = '/api'

	}

	async getData() {
		if(! this.loaded) {
			const response = await (await fetch(this.api)).json()

			this.handleData(response, this.index + 100)
		}


	}

	getArrow(player) {
		if (player.ranking == player.previousRanking) {
			return `
				<svg width="15" height="15" viewBox="0 0 108 10" fill="none" xmlns="http://www.w3.org/2000/svg">
					<line x1="5" y1="5" x2="103" y2="5" stroke="#C9C9C9" stroke-width="10" stroke-linecap="round"/>
				</svg>
			`
		}
		else if (player.ranking > player.previousRanking) {
			return `
				<svg width="15" height="15" viewBox="0 0 107 59" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path fill-rule="evenodd" clip-rule="evenodd" d="M104.755 57.0018C106.828 54.8308 106.828 51.3196 104.755 49.154L60.8291 3.25199C59.8609 2.2245 58.6974 1.4063 57.4059 0.847229C56.1143 0.288162 54.7212 -6.14366e-08 53.3157 0C51.9101 6.14368e-08 50.5196 0.288162 49.228 0.847229C47.9365 1.4063 46.773 2.2245 45.8048 3.252L1.55473 49.4863C0.565819 50.5356 0.0100054 51.9252 0.000133478 53.3728C-0.00973846 54.8204 0.528317 56.2176 1.50282 57.2805C1.98406 57.8071 2.56649 58.2284 3.21573 58.5183C3.86496 58.8083 4.56637 58.9608 5.27641 58.9663C5.98644 58.9719 6.68868 58.8303 7.34228 58.5505C7.99587 58.2706 8.5867 57.8585 9.07594 57.3395L49.5628 15.0237C50.047 14.5096 50.6297 14.1002 51.2757 13.8204C51.9218 13.5406 52.6152 13.3962 53.3182 13.3962C54.0213 13.3962 54.7173 13.5406 55.3634 13.8204C56.0094 14.1002 56.5921 14.5096 57.0763 15.0237L97.2439 57.0018C97.7276 57.5158 98.3112 57.9251 98.9568 58.2048C99.6024 58.4845 100.297 58.6288 100.999 58.6288C101.702 58.6288 102.396 58.4845 103.042 58.2048C103.687 57.9251 104.271 57.5158 104.755 57.0018Z" fill="#8FDC97"/>
				</svg>
			`
		}
		else {
			return `
				<svg width="15" height="15" viewBox="0 0 107 59" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path fill-rule="evenodd" clip-rule="evenodd" d="M1.5548 1.9647C-0.51812 4.1357 -0.51812 7.64685 1.5548 9.8125L45.4805 55.7145C46.4487 56.742 47.6121 57.5602 48.9037 58.1192C50.1953 58.6783 51.5884 58.9665 52.9939 58.9665C54.3994 58.9665 55.79 58.6783 57.0815 58.1192C58.3731 57.5602 59.5365 56.742 60.5048 55.7145L104.755 9.48017C105.744 8.43087 106.3 7.04131 106.309 5.59369C106.319 4.14607 105.781 2.74886 104.807 1.68595C104.326 1.15939 103.743 0.738126 103.094 0.448146C102.445 0.158166 101.743 0.00568339 101.033 0.000155656C100.323 -0.00537207 99.6209 0.136163 98.9673 0.416C98.3137 0.695837 97.7229 1.10797 97.2336 1.62697L56.7467 43.9427C56.2626 44.4569 55.6799 44.8663 55.0338 45.1461C54.3878 45.4259 53.6944 45.5703 52.9913 45.5703C52.2882 45.5703 51.5922 45.4259 50.9462 45.1461C50.3002 44.8663 49.7175 44.4569 49.2333 43.9427L9.06564 1.9647C8.58195 1.45068 7.99833 1.04138 7.35274 0.761661C6.70715 0.481937 6.01287 0.337637 5.31023 0.337637C4.60757 0.337637 3.91331 0.481937 3.26772 0.761661C2.62212 1.04138 2.03849 1.45068 1.5548 1.9647Z" fill="#EE4266"/>
				</svg>
			`
		}
	}

	getPosition(player) {
		// return this.getArrow(player) + player.ranking
		// return document.createElement('div').appendChild( this.getArrow(player) )
		const span = document.createElement('span')
		span.append(this.htmlToElement( this.getArrow(player) ))
		span.append(document.createElement('span').innerHTML = player.ranking)
		return span
	}

	handleData(response, end = 100) {
		while (this.index != end) {
			const player = response.rankings[this.index];

			if (player) {
				const items = [
					this.getPosition(player),
					document.createTextNode(player.rowName),
					document.createTextNode(player.team.country.name),
					document.createTextNode(player.points)
				]

				this.tableBody.appendChild(this.createRow(items))
				this.index++
			}
			else {
				this.loaded = true
				break
			}

		}
	}
	createRow(items) {
		const row = document.createElement('tr')
		let cell = ''
		let textNode = ''

		for (let i = 0; i < items.length; i++) {
			const element = items[i]

			cell = document.createElement("td")

			cell.appendChild(element);

			row.appendChild(cell);
		}

		return row
	}

	htmlToElement(html) {
		const template = document.createElement('template');
		html = html.trim(); // Never return a text node of whitespace as the result
		template.innerHTML = html;
		return template.content.firstChild;
	}

}