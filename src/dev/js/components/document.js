import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {setPage} from "../actions/AppActions"
import MyMapComponent from "./map.js"


class MyDocument extends Component {
    convertToArray(object) {
		var result = Object.keys(object).map(function(key) {
			return [Number(key), object[key]];
		});
		return result;
    }

    calculateDistance(distances) {
        var total = 0;
        var feet = 0;
        var mi = 0;
        for (var i = 0; i < distances.length; i++) {
            if (distances[i].includes("mi")) {
                mi += parseFloat(distances[i]);
            } else if (distances[i].includes("ft")) {
                feet += parseFloat(distances[i]);
            }
        }
        feet += mi * 5280;
        if (feet < 1000) {
            total = feet + " feet"
        } else {
            total = (feet * 0.000189394).toFixed(3);
            total += " mi";
        }
        return total;
    }

    calculateDuration(durations) {
        var total = 0;
        for (var i = 0; i < durations.length; i++) {
            total += parseInt(durations[i]);
        }
        return total;
    }

    retrieveAlphabet(index) {
        switch (index) {
            case 1: {return "A"}
            case 2: {return "B"}
            case 3: {return "C"}
            case 4: {return "D"}
            case 5: {return "E"}
            case 6: {return "F"}
            case 7: {return "G"}
            case 8: {return "H"}
            case 9: {return "I"}
            case 10: {return "J"}
            case 11: {return "K"}
            case 12: {return "L"}
            case 13: {return "M"}
            case 14: {return "N"}
            case 15: {return "O"}
            case 16: {return "P"}
            case 17: {return "Q"}
            case 18: {return "R"}
            case 19: {return "S"}
            case 20: {return "T"}
            case 21: {return "U"}
            case 22: {return "V"}
            case 23: {return "W"}
            case 24: {return "X"}
            case 25: {return "Y"}
            case 26: {return "Z"}
        }
    }

    render() {
        var counter = -1;
        var totalDistance = this.calculateDistance(this.props.distances);
        var totalDuration = this.calculateDuration(this.props.durations);
        var tripToAlphabet = {}
        var alphabetCounter = 1;

        let passedList = this.convertToArray(this.props.trip);

        passedList.forEach((item) => {
            var coordinates;
            item = item[1];
            if (item.type == "Animal") {
                coordinates = item.location[0];
            } else {
                coordinates = item.coordinates.replace(/\s+/g, '');
            }
            const letter = this.retrieveAlphabet(alphabetCounter);
            tripToAlphabet[coordinates] = letter;
            alphabetCounter += 1;
            console.log("trip to Alphabet:", tripToAlphabet);
        })

        var listItem = passedList.map((item) => {
            counter += 1;
            item = item[1];
            var itemLocation;
            if (item.exhibit_name == null) {
                itemLocation = <p id="itemLocation"></p>
            } else {
                itemLocation = <p id="itemLocation">{item.exhibit_name.replace(/&#039;/g, "'")}</p>
            }
            
            var coordinates;
            if (item.type == "Animal") {
                coordinates = item.location[0];
            } else {
                coordinates = item.coordinates.replace(/\s+/g, '');
            }

            var image;
            switch (item.type) { //to change image variable
                case "Exhibit": {
                    image = item.image_small;
                    break;
                } case "Attraction": {
                    image = item.image_small;
                    break;
                } case "Animal": {
                    image = item.image_small;
                    break;
                } case "Restroom": {
                    image = item.image;
                    break;
                } case undefined: {
                    image = "https://farm1.staticflickr.com/956/27940952588_0296bce9a3_m.jpg"
                    break;
                } default: break;
            }
            var distance = <div></div>
            if (counter < this.props.distances.length) {
                distance = <div className="tripDistance">
                                <i class="material-icons md-18">directions_walk</i> &nbsp;
                                {this.props.distances[counter]}
                                &nbsp;&nbsp;&nbsp;
                                <i class="material-icons md-18">access_time</i> &nbsp;
                                {this.props.durations[counter]}
                            </div>
            }
            return (
                <div>
                    <div className='simpleItem' key={item.title}>
                        <div className="row">
                            <div className="col-3" id="itemImage">
                                <a href={window.location.hash} alt={item.title}><img alt={item.title} src={image}/></a>
                            </div>
                            <div className='col-8' id="itemInfo">
                                <a id='itemName' alt={item.title} href={window.location.hash} title={item.title}>{item.title.replace(/&#039;/g, "'")}</a>
                                <br/>
                                {itemLocation}
                                <div className="itemPin">{tripToAlphabet[coordinates]}</div>
                            </div>
                        </div>
                    </div>
                    {distance}
                </div>
            )
        });

        var tripStats = <div className="row" id="tripStats">
                            <p id="dateHoursText">TOTAL DISTANCE: {totalDistance} <br/> TOTAL DURATION: {totalDuration} mins</p>
                        </div>        

        return (
            <div> 
                <div className="row" id="printTopBar">
                    <div className="col-5" id="backButtonContainer">
                        <button className='btn btn-link' id='printBackButton' onClick={() => this.props.setPage("main")}>&larr; BACK</button>
                    </div>
                    <div className="col-7" id="printButtonContainer">
                        <button type='submit' className='btn btn-default' id='printButton' onClick={() => window.print()}>PRINT</button>
                    </div>
                </div>
                <div id="divname">
                    <p id='zooplanner'> YOUR TRIP </p>
                    <div id="printMapContainer">
                        <MyMapComponent/>
                    </div>
                    <div id="printListItem">
                        {tripStats}
                        {listItem}
                    </div>
					
                </div>
            </div>
            
        )
    }
  
}

function mapStateToProps(state) {
	return {
        animalsImport: state.trip.animalsImport,
        exhibitsImport: state.trip.exhibitImport,
        attractionsImport: state.trip.attractionsImport,
        dailyProgramsImport: state.trip.dailyProgramsImport,
        trip: state.trip.trip,
        source: state.trip.searchBarSource,
        distances: state.trip.waypointDistances,
        durations: state.trip.waypointDurations,
	};
}
function matchDispatchToProps(dispatch) {
	return bindActionCreators({
		setPage: setPage,
	}, dispatch);
}
export default connect(mapStateToProps, matchDispatchToProps)(MyDocument);
