import request from '../helpers/request'

const URL = {
    GET: '/notebooks',
    ADD: '/notebooks',
    UPDATE: '/notebooks/:id',
    DELETE: '/notebooks/:id'
}

export default {
    getNoteBookList() {
        return request(URL.GET)
    },
    addNoteBook({title = ''} = {title: ''}) {
        return request(URL.ADD, 'POST', {title})
    },
    updateNoteBook(notebookId, {title = ''} = {title: ''}) {
        return request(URL.UPDATE.replace(':id', notebookId), 'PATCH', {title})
    },
    deleteNoteBook(notebookId) {
        return request(URL.DELETE.replace(':id', notebookId), 'DELETE')
    }
}