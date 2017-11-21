import React, { Component } from 'react'
import Comment from '../presentation/Comment'
import styles from './styles'
import superagent from 'superagent'

class Comments extends Component {
    constructor() {
        super()
        this.state = {
            comment: {
                username: '',
                body: '', 
                timestamp: ''
            },
            list: []
        }
    }

    componentDidMount() {
        superagent
            .get('/api/comment')
            .set('Accept', 'application/json')
            .end((err, response) => {
                if (err) {
                    alert('ERROR: ' + err)
                    return
                }
                let results = response.body.results
                this.setState({
                    list: results
                })
            })    
    }

    submitComment() {
        console.log("submitButton: " + JSON.stringify(this.state.comment))
        let updatedList = Object.assign([], this.state.list);
        updatedList.push(this.state.comment)
        this.setState({
            list: updatedList
        })
    }

    updateUsername(event) {
        let updatedComment = Object.assign({}, this.state.comment)
        updatedComment['username'] = event.target.value
        this.setState({
            comment: updatedComment
        })
    }

    updateBody(event) {
        let updatedComment = Object.assign({}, this.state.comment)
        updatedComment['body'] = event.target.value
        this.setState({
            comment: updatedComment
        })
    }

    updateTimestamp(event) {
        let updatedComment = Object.assign({}, this.state.comment)
        updatedComment['timestamp'] = event.target.value
        this.setState({
            comment: updatedComment
        })
    }

    render() {
        const commentList = this.state.list.map((comment, i) => {
			return (
				<li key={i}><Comment comment={comment}/></li>
			)
		})

        return (
            <div>
                <h2>Comment</h2>
                <div style={styles.comment.commentsBox}>
                    <ul style={styles.comment.commentsList}>
                        {commentList}
                    </ul>

                    <input onChange={this.updateUsername.bind(this)} className="form-control" type="text" placeholder="Username" /><br/>
                    <input onChange={this.updateBody.bind(this)} className="form-control" type="text" placeholder="Comment" /><br/>
                    <input onChange={this.updateTimestamp.bind(this)} className="form-control" type="text" placeholder="Timestamp" /><br/>
                    <button onClick={this.submitComment.bind(this)} className="btn btn-info">Submit Comment</button>
                </div>
            </div>
        )
    }
}

export default Comments