const express = require('express')
const app = express()
const port = 3000

app.get('/', function(req, res) {
	res.sendFile(__dirname + '/app.html')
})

app.listen(port, function() {
	console.log('server is running')
})

app.get('/result', function(req, res) {
	console.log(req.query)
	var result = Number(req.query.fname) + Number(req.query.lname)
	res.send('Answer : ' + result)
})
