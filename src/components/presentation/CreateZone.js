import React, { Component } from 'react'

class CreateZone extends Component {

    constructor() {
        super()
        this.state = {
            zone: {
                name: '',
                zipCodes: ''
            }
        }
    }

    updateZone(event) {
        console.log('updateZone: '+ event.target.id+ " =>" + event.target.value)
        let updatedZone = Object.assign({}, this.state.zone)
        updatedZone[event.target.id] = event.target.value
        this.setState({
            zone: updatedZone
        })
    }

    submitZone() {
        this.props.onCreate(this.state.zone)
    }

    render() {
        return (
            <div>
                <h3>Create Zone</h3>
                <input id="name" onChange={this.updateZone.bind(this)} className="form-control" type="text" placeholder="Name"/><br/>
				<input id="zipCodes" onChange={this.updateZone.bind(this)} className="form-control" type="text" placeholder="Zip Code"/><br/>
				<button onClick={this.submitZone.bind(this)} className="btn btn-danger">Submit Zone</button>
            </div>
        )
    }
}

export default CreateZone