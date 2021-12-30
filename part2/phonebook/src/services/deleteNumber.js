import axios from "axios"

export const deleteNumber = (id) => {
    const result = window.confirm("Confirm delete")
    if (result === true) {
    return (axios
    .delete("http://localhost:3001/persons/"+id)
    .then(({data})=> data) )
    .catch(error => {
        console.log(error)
        throw error
    })
    }
}