const express = require('express')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')
const port = 5000

const domains = ['http://52.78.181.224:8080']

const corsOptions = {
  origin: function(origin, callback){
  	const isTrue = domains.indexOf(origin) !== -1;
    callback(null, isTrue);
  }
  ,
  credentials: true
}
app.use(cors(corsOptions));

//app.use(cors({ origin: "http://52.78.181.224:3000" }))
app.use(bodyParser.json())


app.get('/api', function(req, res) {
	res.sendFile(__dirname + '/app.html')
})

app.listen(port, function() {
	console.log('server is running')
})

app.post('/api/result', function(req, res, next) {
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

