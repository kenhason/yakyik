import React, { Component } from 'react'
import { Comment, CreateComment } from '../presentation'
import styles from './styles'
import { APIManager } from '../../../utils'

class Comments extends Component {
    constructor() {
        super()
        this.state = {
            list: []
        }
    }

    componentDidMount() {
        APIManager.get('/api/comment', null, (err, results) => {
			if (err) {
				alert('ERROR: ' + err)
				return
			}
			this.setState({
				list: results.results
			})
		})
    }

    submitComment(comment) {
        console.log("submitButton: " + JSON.stringify(comment))
        updatedComment = Object.assign({}, comment)
        APIManager.post('/api/comment', updatedComment, (err, response) => {
			if (err) {
				alert("ERROR: " + err);
				return
			}
            
			let updatedList = Object.assign([], this.state.list);
            updatedList.push(response.result)
            this.setState({
                list: updatedList
            })
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
                    <CreateComment onCreate={this.submitComment.bind(this)}/>
                </div>
            </div>
        )
    }
}

export default Comments