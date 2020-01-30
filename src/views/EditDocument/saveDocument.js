import axios from 'axios'

async function saveDocument(_id, changes) {
    try {
        const response = await axios.request({
            url: `/api/documents/_id/${_id}`,
            method: 'post',
            data: changes
        })

        return {data: response.data}
    } catch(e) {
        console.log(e, e.response)
        if (e.response) return {error: e.response.data.error}
        return {error: e.message}
    }
}

export default saveDocument