import RankingApi from  "./RankingApi.js"

const o = new RankingApi();
o.getData()

// window.addEventListener('scroll', function (event) {
// 	const tableHeight = document.getElementById('rankings_table').offsetHeight
// 	if (window.scrollY + window.innerHeight >= tableHeight - (tableHeight * 0.25)) {
// 		handleData(json, document.getElementById('rankings_table_body').childNodes.length, document.getElementById('rankings_table_body').childNodes.length + 100)
// 	}

// })
