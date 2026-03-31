import React, { useState, useEffect, } from "react";
import { useLocation , useNavigate} from "react-router-dom";
import axios from "axios";
import Home from "./home";

function Update() {
    const navigate = useNavigate();

    const location = useLocation();
    // const [user, setUser] = useState(location.state || {});
    const [editUser, setEditUser] = useState(location.state || {});

    console.log(editUser._id)
    

    // handle input change
    const handleChange = (e) => {
        setEditUser({
            ...editUser,
            [e.target.name]: e.target.value
        });
    };

    // update API call
    const updateUser = async () => {
        try {
            await axios.post(
                `http://localhost:3000/update/${editUser._id}`,
                editUser
            );
            // setEditUser(null);
            navigate("/")
        } catch (error) {
            console.error("Error updating user:", error);
        }
    };

    return (
        <div className="bg-gray-200 p-5 m-5 rounded">
                    <h2 className="text-xl">Edit User</h2>

                    <input
                        type="text"
                        name="name"
                        value={editUser.name}
                        onChange={handleChange}
                        className="block m-2 p-2"
                    />

                    <input
                        type="number"
                        name="age"
                        value={editUser.age}
                        onChange={handleChange}
                        className="block m-2 p-2"
                    />

                    <input
                        type="email"
                        name="email"
                        value={editUser.email}
                        onChange={handleChange}
                        className="block m-2 p-2"
                    />

                    <button
                        onClick={updateUser}
                        className="bg-green-500 text-white p-2 m-2"
                    >
                        Save
                    </button>

                    <button
                        onClick={() => setEditUser(null)}
                        className="bg-red-500 text-white p-2 m-2"
                    >
                        Cancel
                    </button>
                </div>
    );
}

export default Update;