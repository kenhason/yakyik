import React, { Component } from 'react'

class Comment extends Component {
    render() {
        return (
            <div style={{marginBottom: 16}}>
                <p style={{fontSize: 18, fontWeight: 600}}>
                    {this.props.comment.body} 
                </p>
                
                <span style={{fontWeight: 200}}>{this.props.comment.username}</span>
                <span style={{fontWeight: 200, marginLeft:12, marginRight: 10}}>|</span>
                <span style={{fontWeight: 200}}>{this.props.comment.timestamp}</span>
                <hr/>
            </div>
        )
    }
}

export default Comment