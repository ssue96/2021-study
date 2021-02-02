const express = require('express')
const redis  = require('redis')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')
const port = 5000

//redis setting
const client = redis.createClient(6379, 'redis')
client.on('error', function(err) {
  //에러 핸들링
  console.log('redis error ' + err)
})





//cors setting
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
	//let state = 'Not Cached'
	let keyword =[fnum, snum]
	console.log('keyword : '+ keyword)


	client.get('keyword:'+keyword, (err, data) => {

		if(err) throw err
		
		if(data){
			console.log(data)
			res.json(JSON.parse(data))
		}else{
			console.log('not in redis')
			let result = fnum+snum
			let sum = {
				'fnum' : fnum,
				'snum' : snum,
				'result' : result,
				'state' : 'Not cached'
			}
			let temp = [snum,fnum]
			let sum_temp = {
				'fnum' : snum,
				'snum' : fnum,
				'result' : result,
				'state' : 'Not cached'
			}
			console.log(result, sum)
			res.json(sum)
			sum.state = 'Cached'
			sum_temp.state = 'Cached'
			console.log('set redis keyword :'+keyword)
			
			client.set('keyword:'+keyword, JSON.stringify(sum),(err, msg) => {
				if(err) throw err

				console.log('caching ' + msg) //chcing OK.
			})
			console.log('set redis keyword :'+temp)
			client.set('keyword:'+temp, JSON.stringify(sum_temp),(err, msg) => {
				if(err) throw err

				console.log('caching ' + msg) //chcing OK.
			})

		}
	
	})

	
	
	//console.log(result)
	//res.json(result)
	//res.send('Answer : '+result)
})
