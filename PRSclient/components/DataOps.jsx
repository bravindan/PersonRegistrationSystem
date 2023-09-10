import React, { useState } from 'react'
import axios from 'axios'

export const [people, setPeople] = useState([]);

export default DataOps=()=> {
   
      useEffect(()=>{
        getData()
      }, [])
  return null;
}
export const getData = async ()=>{
    const res = await axios.get("https://localhost:7057/api/PersonManager/people");
    setPeople(res.data)
    console.log(people);
   } 

export const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(); 
  }
