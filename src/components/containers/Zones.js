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
		// console.log("updateName: " + event.target.value)
		let updatedZone = Object.assign({}, this.state.zone)
		updatedZone['name'] = event.target.value
		this.setState({
			zone: updatedZone
		})
	}

	updateZipCode(event) {
		// console.log("updateZipCode: " + event.target.value)
		let updatedZone = Object.assign({}, this.state.zone)

		let zips = event.target.value.split(',')
		let zipCodes = []
		zips.map((zip) => {
			let trimmedZip = zip.trim()
			if (trimmedZip !== '') zipCodes.push(trimmedZip)
		})
		updatedZone['zipCodes'] = zipCodes

		// console.log(updatedZone['zipCodes'])
		
		this.setState({
			zone: updatedZone
		})
	}

	submitZone(event) {
		APIManager.post('/api/zone', this.state.zone, (err, response) => {
			if (err) {
				alert("ERROR: " + err);
				return
			}
			console.log(response.confirmation);
			let updatedList = Object.assign([], this.state.list)
			updatedList.push(response.result)
			this.setState({
				list: updatedList
			})
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