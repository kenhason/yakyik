import React, { Component } from 'react'
import { Zone, CreateZone } from '../presentation'

import { APIManager } from '../../../utils'

class Zones extends Component {
	constructor() {
		super()
		this.state = {
			selected: -1,
			list: []
		}
	}

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

	submitZone(zone) {
		let zips = zone.zipCodes.split(',')
		let zipCodes = []
		zips.map((zip) => {
			let trimmedZip = zip.trim()
			if (trimmedZip !== '') zipCodes.push(trimmedZip)
		})
		zone.zipCodes = zipCodes
		
		console.log("submit Zone:" + JSON.stringify(zone))

		APIManager.post('/api/zone', zone, (err, response) => {
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

	selectZone(index) {
		console.log("Zone " + index + " selected")
		this.setState({
			selected: index
		})
	}

	render() {
		const listItems = this.state.list.map((zone, i) => {
			let selected = (i == this.state.selected)
			return (
				<li key={i}><Zone index={i} onSelect={this.selectZone.bind(this)} zone={zone} isSelected={selected}/></li>
			)
		})
		return (
			<div>
				<h2>Zone</h2>
				<ol>
					{listItems}
				</ol>
				<CreateZone onCreate={this.submitZone.bind(this)} />
			</div>
		)
	}
}

export default Zones