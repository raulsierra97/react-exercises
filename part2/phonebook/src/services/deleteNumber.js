import axios from "axios"

export const deleteNumber = (id) => {
    return () =>{
    const result = window.confirm("Confirm delete")
    if (result === true) {
    return (axios
    .delete("http://localhost:3001/persons/"+id)
    .then(({data})=> data) )
    }}
}