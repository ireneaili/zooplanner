import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import '../../css/Main.css';
import Date from './date.js'
import Main from './main.js'
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
// import {fillGlossary} from '../actions/tripActions'

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {overlay:'date', };
		this.closeOverlay = this.closeOverlay.bind(this);
	}

	closeOverlay() {
		this.setState({overlay:''})
	}

	renderOverlay() { //later change this so it passes in a parameter ie: date, searchbyanimal, preplan... then use it for the switch statement
		switch(this.state.overlay) {
			case 'date': return <Date onClick={this.closeOverlay} />
			case '': return <Main />
			case null: return <div></div>
		}
	}

	// componentWillMount() {
	// 	fillGlossary()
	// }

	render () {

		return (
			<div className='App'>
			    <div id='overlay'>
					{this.renderOverlay()}
			    </div>
			</div>
		);
	}
}

// function matchDispatchToProps(dispatch) {
// 	return bindActionCreators({
// 		fillGlossary: fillGlossary
// 	}, dispatch);
// }

// export default connect(null, matchDispatchToProps)(App);
export default App;