import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import '../../css/Main.css';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux'
import {setAmmenitiesFilter, setAttractionsFilter, setDailyProgramsFilter, setExhibitsFilter, setFoodFilter, setRestroomsFilter} from '../actions/filterActions'

class Filter extends Component {

	setFilter(type) {
		switch(type) {
			case "ammenity": {
				this.props.setAmmenitiesFilter(!this.props.ammenities);
				break;
			}
			case "attraction": {
				this.props.setAttractionsFilter(!this.props.attractions);
				break;
			}
			case "dailyProgram": {
				this.props.setDailyProgramsFilter(!this.props.dailyPrograms);
				break;
			}
			case "exhibit": {
				this.props.setExhibitsFilter(!this.props.exhibits);
				break;
			}
			case "food": {
				this.props.setFoodFilter(!this.props.food);
				break;
			}
			case "restroom": {
				this.props.setRestroomsFilter(!this.props.restrooms);
				break;
			}
			default: console.log("invalid input in filter box");
		}
	}

	render() {
		return (
			<div id='filter'>
				<p className='title'>FILTER</p>
				<hr/>
				<form>
					<div className="row">
						<div className="col-6" id='filterlabel'>
							<input type='checkbox' id='ammenities' name='filter' value='ammenities' onClick={() => this.setFilter("ammenity")} />
							<label htmlFor='ammenities'>AMMENITIES</label>
						</div>
						<div className="col-5" id='filterlabel'>
							<label><input type='checkbox' id='exhibits' name='filter' value='exhibits' onClick={() => this.setFilter("exhibit")} />&nbsp;&nbsp;&nbsp;&nbsp;EXHIBITS <img alt="exhibit pin" src="https://www.google.com.au/maps/vt/icon/name=assets/icons/spotlight/spotlight_pin_v2_shadow-1-small.png,assets/icons/spotlight/spotlight_pin_v2-1-small.png,assets/icons/spotlight/spotlight_pin_v2_dot-1-small.png,assets/icons/spotlight/spotlight_pin_v2_accent-1-small.png&highlight=93FF95,C34D57,960a0a,ffffff&color=93FF95?scale=0.5"/></label>
						</div>
					</div>

					<div className="row">
						<div className="col-6" id='filterlabel'>
							<label><input type='checkbox' id='attractions' name='filter' value='attractions' onClick={() => this.setFilter("attraction")} />&nbsp;&nbsp;&nbsp;&nbsp;ATTRACTIONS <img alt="attraction pin" src="https://www.google.com.au/maps/vt/icon/name=assets/icons/spotlight/spotlight_pin_v2_shadow-1-small.png,assets/icons/spotlight/spotlight_pin_v2-1-small.png,assets/icons/spotlight/spotlight_pin_v2_dot-1-small.png,assets/icons/spotlight/spotlight_pin_v2_accent-1-small.png&highlight=93FF95,F18B30,960a0a,ffffff&color=93FF95?scale=0.5"/></label>	
						</div>
						<div className="col-5" id='filterlabel'>
							<input type='checkbox' id='food' name='filter' value='food' onClick={() => this.setFilter("food")} />
							<label htmlFor='food'>FOOD</label>
						</div>
				
					</div>
					<div className="row">
						<div className="col-6" id='filterlabel'>
							<input type='checkbox' id='dailyprogs' name='filter' value='dailyprogs' onClick={() => this.setFilter("dailyProgram")} />
							<label htmlFor='dailyprogs'>DAILY&nbsp;PROGRAMS</label>
						</div>
						<div className="col-5" id='filterlabel'>
							<label><input type='checkbox' id='restrooms' name='filter' value='restrooms' onClick={() => this.setFilter("restroom")} />&nbsp;&nbsp;&nbsp;&nbsp;RESTROOMS <img alt="restroom pin" src="https://www.google.com.au/maps/vt/icon/name=assets/icons/spotlight/spotlight_pin_v2_shadow-1-small.png,assets/icons/spotlight/spotlight_pin_v2-1-small.png,assets/icons/spotlight/spotlight_pin_v2_dot-1-small.png,assets/icons/spotlight/spotlight_pin_v2_accent-1-small.png&highlight=93FF95,617D9B,3E5066,ffffff&color=93FF95?scale=0.5"/></label>
						</div>
						
					</div>
				</form>
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		attractions: state.filters.attractions,
		ammenities: state.filters.ammenities,
		dailyPrograms: state.filters.dailyPrograms,
		exhibits: state.filters.exhibits,
		food: state.filters.food,
		restrooms: state.filters.restrooms,

	};
}

function matchDispatchToProps(dispatch) {
	return bindActionCreators({
		setAmmenitiesFilter: setAmmenitiesFilter,
		setAttractionsFilter: setAttractionsFilter,
		setDailyProgramsFilter: setDailyProgramsFilter,
		setExhibitsFilter: setExhibitsFilter,
		setFoodFilter: setFoodFilter,
		setRestroomsFilter: setRestroomsFilter,
	}, dispatch);
}
export default connect(mapStateToProps, matchDispatchToProps)(Filter);