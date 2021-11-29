import axios from "axios"

export const getAllNumbers = () => {
    return (axios
    .get("http://localhost:3001/persons")
    .then(({data})=> data) )
}