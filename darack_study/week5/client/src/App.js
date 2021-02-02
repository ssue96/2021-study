import React, { Component } from 'react';
import axios from 'axios'; 

class App extends Component {

	state={
		fnum: '',
		snum: '',
		result: '',
		cached: ''
	}
		


	appChange = (e) => {
		this.setState({
			[e.target.name]: e.target.value
		});
	}

	appClick = () => {
		console.log(`fnum : ${this.state.fnum}\n snum : ${this.state.snum}`);
		const fnum = this.state.fnum;
		const snum = this.state.snum;
		// axios
		axios.post('/api/result',{fnum : fnum, snum : snum}).then((res) => {
			console.log(res.data);
			console.log("result : " +res.data)
			this.setState({
				result: res.data.result,
				cached: res.data.state
			})
		}).catch( error => console.log('error : ', error.res))
	}
	appKeyPress = (e) => {
		if(e.key === 'Enter'){
			this.appClick();
		}
	}

	render() {
		const{fnum, snum} = this.state;
		const{appChange, appClick, appKeyPress}=this;
		return (
		  <div className="App">
			<header className="App-header">
				<input type="text" name="fnum" placeholder="First Number" value={fnum} onChange={appChange} />
				<input type="text" name="snum" placeholder="Second Number" value={snum} onChange={appChange} onKeyPress={appKeyPress} />
				<button onClick={appClick}>Calculate</button>
				<h4>Answer : {this.state.result}</h4>
				<h4>State : {this.state.cached}</h4>
			</header>
		  </div>
		);
	}
}

export default App;
