import request from '../helpers/request'
import {useformatTime} from '../hooks/useformatTime'

const URL = {
    GET: '/notebooks',
    ADD: '/notebooks',
    UPDATE: '/notebooks/:id',
    DELETE: '/notebooks/:id'
}

export default {
    getAll() {
        return new Promise((resolve, reject) => {
            request(URL.GET).then(res => {
                res.data.forEach(notebook => {
                    notebook.formatTime = useformatTime(notebook.createdAt)
                })
                resolve(res)
            }).catch(err => {
                reject(err)
            })
        })
    },
    updateNotebook(notebookId, {title = ''} = {title: ''}) {
        return request(URL.UPDATE.replace(':id', notebookId), 'PATCH', {title})
    },
    deleteNotebook(notebookId) {
        return request(URL.DELETE.replace(':id', notebookId), 'DELETE')
    },
    addNotebook({title = ''} = {title: ''}) {
        return request(URL.ADD, 'POST', {title})
    }
}