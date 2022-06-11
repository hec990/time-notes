import request from "../helpers/request";

const URL = {
    GET: '/notes/trash',
    REVERT: '/notes/:noteId/revert',
    DELETE: '/notes/:noteId/confirm'
}

export default {
    getAll() {
        return request(URL.GET)
    },
    deleteNote({noteId}) {
        return request(URL.DELETE.replace(':noteId', noteId), 'DELETE')
    },
    revertNote({noteId}) {
        return request(URL.REVERT.replace(':noteId', noteId), 'PATCH')
    }
}