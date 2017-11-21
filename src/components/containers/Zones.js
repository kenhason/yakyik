import React, { Component } from 'react'
import Zone from '../presentation/Zone'
import superagent from 'superagent'

class Zones extends Component {
	constructor() {
		super()
		this.state = {
			zone: {
				name: '',
				zipCode: ''
			},
			list: []
		}
	}
	/**
	 * called when render() finishes
	 */
	componentDidMount() {
		superagent
			.get('/api/zone')
			.set('Accept', 'application/json')
			.end((err, response) => {
				if (err) {
					alert('ERROR: ' + err)
					return
				}
				console.log(JSON.stringify(response.body))
				let results = response.body.results
				this.setState({
					list: results
				})
				
				// let zoneList = []
				// results.map((result) => {
				// 	let zone = {
				// 		name: result.name,
				// 		zipCode: result.zipCodes[result.zipCodes.length - 1]
				// 	}
				// 	zoneList.push(zone)
				// })

				// let updatedList = Object.assign([], this.state.list)
				// zoneList.map((zone) => updatedList.push(zone))
				// this.setState({
				// 	list: updatedList
				// })
				// console.log(zoneList)
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
		updatedZone['zipCode'] = event.target.value
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