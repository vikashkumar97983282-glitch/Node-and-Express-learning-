import React from "react";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";


function Upload(){

    const [name,setName] = useState("");
    const [age,setAge] = useState("");
    const [email,setEmail] = useState("");

    const handlesubmit = async ()=>{
        try {
            let res = await axios.post('http://localhost:3000/add',{name,age,email});
            console.log(res);
        } catch (error) {
            console.error("Error submitting form:", error);
        }
    };


    return (
        <div className="flex justify-center items-center h-screen">
            <input type="text" placeholder="Enter your name" onChange={(e)=>setName(e.target.value)} />
            <input type="text" placeholder="Enter your age" onChange={(e)=>setAge(e.target.value)} />
            <input type="text" placeholder="Enter your email" onChange={(e)=>setEmail(e.target.value)}/>
            <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={handlesubmit}>Submit</button>
            
        </div>
    )
}

export default Upload;