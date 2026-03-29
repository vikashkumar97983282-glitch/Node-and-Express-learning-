import React from "react";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";

function Home(){

    const [user,setUser] = useState([]);

    const data = async ()=>{
        try {
            let res = await axios.get('http://localhost:3000/users');
        setUser(res.data);
        } catch (error) {
            console.error("Error fetching user data:", error);
        }
    }

    useEffect(()=>{
        data();
    },[])


    
    

    return (
        <div>
            <div className="flex justify-center items-center h-screen">
            <h1>{user.map((user,idx)=>{
                return <p key={idx}>{user.name} {user.email} {user.age}</p>
            })}</h1>
        </div>
        <a href="/upload">g</a>
        </div>
    )
}

export default Home;