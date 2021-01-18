const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const port = 5000

app.use(bodyParser.json());


app.get('/', function(req, res) {
	res.sendFile(__dirname + '/app.html')
})

app.listen(port, function() {
	console.log('server is running')
})

app.post('/result', function(req, res, next) {
//	console.log(req.query)
//	var result = Number(req.query.fname) + Number(req.query.lname)
	console.log(req.body)
	let fnum = Number(req.body.fnum)
	let snum = Number(req.body.snum)
	console.log(fnum, snum)
	let result = fnum+snum
	console.log(result)
	res.json(result)
	//res.send('Answer : '+result)
})

