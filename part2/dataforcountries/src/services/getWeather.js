import axios from "axios"

export const getWeather = (capital) => {
    return axios
        .get(`http://api.openweathermap.org/data/2.5/weather?q=${capital}&appid=${process.env.REACT_APP_API_KEY}`)
        .then(({data}) => {
            return data
        })
}