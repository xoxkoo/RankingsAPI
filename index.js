const fs = require('fs')
const { request, response } = require('express');
const express = require('express')
require('dotenv').config()

const app  = express()
const port = process.env.PORT || 3000
const filePath = './public/assets/data/rankings.js'

// creating port
app.listen(port, () => {
  console.log(`hello there http://localhost:${port}`)
})

// serving static files
app.use(express.static('public'))

// returns middleware that only parses JSON and only looks at requests where the Content-Type header matches the type option. This parser accepts any Unicode encoding of the body and supports automatic inflation of gzip and deflate encodings.
app.use(express.json())

app.get('/load', (request, response) => {
	const options = {
		method: 'GET',
		url: 'https://tennisapi1.p.rapidapi.com/api/tennis/rankings/atp',
		headers: {
			'X-RapidAPI-Key': process.env.API_KEY,
			'X-RapidAPI-Host': 'tennisapi1.p.rapidapi.com'
		}
	}


	const axios = require('axios')
	axios.request(options).then(function (data) {
		fs.writeFile(filePath, JSON.stringify(data.data), err => {
			if (err) {
				console.error(err)
				response.send('Zase si to pokaslal Erik! 😥' +
					'\n Toto posli Tonkovi: \n' + err
				)
			}
			else
				response.send('Vyborne Erik zvladol si to! 🎉')

		})
	}).catch(function (err) {

		console.error(err);
		response.send('Zase si to pokaslal Erik! 😥' +
		'\n Toto posli Tonkovi: \n' + err
		)
	})

})

// send api to client
app.get('/api', (request, response) => {
	fs.readFile(filePath, 'utf8', function(err, data){

		let json = JSON.parse(data)
			// Display the file content
		response.json(json)

	})
})




