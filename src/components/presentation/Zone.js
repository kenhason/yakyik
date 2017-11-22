import React, { Component } from 'react'
import stylesheet from './styles'

class Zone extends Component {

	selectZone(event) {
		event.preventDefault()
		this.props.onSelect(this.props.index)
	}

	render() {
		const styles = stylesheet.zone
		const title = (this.props.isSelected) ? <a style={styles.title} href="#">{this.props.zone.name}</a> : <a href="#">{this.props.zone.name}</a>

		return (
			<div style={styles.container}>
				<h2 onClick={this.selectZone.bind(this)} style={styles.header}>
					{ title }
				</h2>
				<span className="detail">{this.props.zone.zipCodes.join(',')}</span><br />
				<span className="detail">{this.props.zone.numComments} comments</span>
			</div>
		)
	}
}

export default Zone