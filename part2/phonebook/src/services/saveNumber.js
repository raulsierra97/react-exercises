import axios from "axios"

export const saveNumber = ({name,number,id}) => {
    return (axios
    .post("http://localhost:3001/persons",{name,number,id})
    .then(({data})=> {
        return data}
        ) )
}