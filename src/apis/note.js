import request from '../helpers/request'
import {useformatTime} from "../hooks/useformatTime";

const URL = {
    GET: '/notes/from/:notebookId',
    ADD: '/notes/to/:notebookId',
    UPDATE: '/notes/:noteId',
    DELETE: '/notes/:noteId',
}

export default {
    getAll({notebookId}) {
        return new Promise((resolve, reject) => {
            request(URL.GET.replace(':notebookId', notebookId))
                .then(res => {
                    res.data.forEach(note => {
                        note.formatTime = useformatTime(note.createdAt)
                    })
                    resolve(res)
                }).catch(err => {
                reject(err)
            })
        })
    },
    addNote({notebookId}, {title = '', content = ''} = {title: '', content: ''}) {
        return request(URL.ADD.replace(':notebookId', notebookId), 'POST', {title, content})
    },
    deleteNote({noteId}) {
        return new Promise((resolve, reject) => {
            request(URL.DELETE.replace(':noteId', noteId), 'delete').then(res => {
                resolve(res);
            }).catch(err => {
                reject(err);
            })
        })
    },
    updateNote({noteId}, {title, content}) {
        return request(URL.UPDATE.replace(':noteId', noteId), 'PATCH', {title, content})
    },
}
