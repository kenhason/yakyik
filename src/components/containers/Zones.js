import React, { Component } from 'react'
import Zone from '../presentation/Zone'

import { APIManager } from '../../../utils'

class Zones extends Component {
	constructor() {
		super()
		this.state = {
			zone: {
				name: '',
				zipCodes: []
			},
			list: []
		}
	}
	/**
	 * called after render() finishes
	 */
	componentDidMount() {
		APIManager.get('/api/zone', null, (err, results) => {
			if (err) {
				alert('ERROR: ' + err)
				return
			}
			this.setState({
				list: results.results
			})
		})
	}

	updateName(event) {
		console.log("updateName: " + event.target.value)
		let updatedZone = Object.assign({}, this.state.zone)
		updatedZone['name'] = event.target.value
		this.setState({
			zone: updatedZone
		})
	}

	updateZipCode(event) {
		console.log("updateZipCode: " + event.target.value)
		let updatedZone = Object.assign({}, this.state.zone)
		updatedZone['zipCodes'] = []

		let zips = event.target.value.split(',')
		zips.map((zip) => {
			if (zip.trim() !== '') updatedZone['zipCodes'].push(zip.trim())
		})

		console.log(updatedZone['zipCodes'])
		
		this.setState({
			zone: updatedZone
		})
	}

	submitZone(event) {
		console.log("submitZone: " + JSON.stringify(this.state.zone))

		let updatedList = Object.assign([], this.state.list)
		updatedList.push(this.state.zone)
		this.setState({
			list: updatedList
		})

		superagent
			.post('/api/zone')
			.send({
				name: this.state.zone.name,
				zipCodes: this.state.zone.zipCodes.join(',')
			})
			.set('Content-Type', 'application/json')
			.end(function(err, res){
				if (err || !res.ok) {
					alert('Oh no! error');
				} else {
					console.log('yay got ' + res.body);
				}
			});
	}

	render() {
		const listItems = this.state.list.map((zone, i) => {
			return (
				<li key={i}><Zone zone={zone}/></li>
			)
		})
		return (
			<div>
				<h2>Zone</h2>
				<ol>
					{listItems}
				</ol>

				<input onChange={this.updateName.bind(this)} className="form-control" type="text" placeholder="Name"/><br/>
				<input onChange={this.updateZipCode.bind(this)} className="form-control" type="text" placeholder="Zip Code"/><br/>
				<button onClick={this.submitZone.bind(this)} className="btn btn-danger">Submit Zone</button>
			</div>
		)
	}
}

export default Zones