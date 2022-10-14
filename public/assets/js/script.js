import RankingApi from  "./RankingApi.js"

const rankings = new RankingApi();
rankings.getData()

window.addEventListener('scroll', function() {
	const tableHeight = document.getElementById('rankings_table').offsetHeight

	if (window.scrollY + window.innerHeight >= (tableHeight * 0.75)) {
		// console.log(this.index);
		rankings.getData()
	}
})
