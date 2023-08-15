import {api, requestConfig} from '../utils/config'


// Get all stories
const getStories = async(data, token) => {

    const config = requestConfig("GET", data, token)

    try{

        const res = await fetch(api + "/stories", config)
            .then((res) => res.json())
            .catch((err) => err )

        return res

    } catch(error){
        console.log(error)
    }
}
// Get user stories
const getUserStories = async(id, token) => {

    const config = requestConfig("GET",null,token)

    try{

        const res = await fetch(api + `/stories/get/${id}`, config)
            .then((res) => res.json())
            .catch((err) => err )

        return res

    } catch(error){
        console.log(error)
    }
}

const storieService = {
    getStories,
    getUserStories
}

export default storieService