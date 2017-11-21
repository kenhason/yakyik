import React, { Component } from 'react'
import stylesheet from './styles'

class Zone extends Component {
	render() {
		const styles = stylesheet.zone
		return (
			<div style={styles.container}>
				<h2 style={styles.header}>
					<a style={styles.title} href="#">{this.props.zone.name}</a>
				</h2>
				<span className="detail">{this.props.zone.zipCodes.join(',')}</span><br />
				<span className="detail">{this.props.zone.numComments} comments</span>
			</div>
		)
	}
}

export default Zone