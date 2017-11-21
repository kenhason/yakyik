import superagent from 'superagent'

export default {
    get: (url, params, callback) => {
        superagent
        .get(url)
        .query(params)
        .set('Accept', 'application/json')
        .end((err, response) => {
            if (err) {
                callback(err, null)
                return
            }

            if (response.body.confirmation == 'fail')
                callback({ message: response.body.message }, null)
            else
                callback(null, response.body)

        })  
    },
    post: () => {
    
    },
    put: () => {

    },
    delete: () => {

    }
}