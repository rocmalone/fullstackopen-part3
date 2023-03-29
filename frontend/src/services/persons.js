import axios from 'axios'

const baseUrl = 'http://localhost:3001/persons'

const getAll = () => {
    // Send a get request to retrieve the 'persons' object
    const request = axios.get(baseUrl)

    // axios.get returns an object with property 'data' containing the object we requested
    return request.then(response => response.data)
}

// INPUT:  NEW PERSON OBJECT
// FUNC:  ADD NEW PERSON OBJECT TO THE JSON FILE VIA POST REQUEST
// RETURN:  DATA AFTER NEW OBJECT IS ADDED
const create = newObject => {
    const request = axios.post(baseUrl, newObject)
    return request.then(response => response.data)
}

// INPUT:  ID OF OBJECT TO REPLACE, NEW PERSON OBJECT
// FUNC:  REPLACE OBJECT IN JSON FILE VIA PUT REQUEST
// RETURN:  DATA AFTER PUT REQUEST IS PROCESSED
const update = (id, newObject) => {
    const request = axios.put(`${baseUrl}/${id}`, newObject)
    return request.then(response => response.data)
}

// INPUT:  ID OF OBJECT TO DELETE
const deletePerson = (id) => {
    const request = axios.delete(`${baseUrl}/${id}`)
    return request
}

export default { getAll, create, update, deletePerson }
