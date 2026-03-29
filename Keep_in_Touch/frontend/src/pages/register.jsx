// pages/Register.jsx
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    semester: "",
    collegeName: "",
    faculty: "",
    password: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    await axios.post("http://localhost:3000/register", form);
    alert("Registered Successfully");
    navigate("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-500 to-purple-600">
      <div className="bg-white shadow-2xl rounded-2xl p-8 w-[400px]">
        <h2 className="text-2xl font-bold text-center mb-6">
          Create Student Account
        </h2>

        <div className="space-y-3">
          <input name="name" placeholder="Full Name" onChange={handleChange} className="input" />
          <input name="email" placeholder="Email" onChange={handleChange} className="input" />
          <input name="semester" placeholder="Semester" onChange={handleChange} className="input" />
          <input name="collegeName" placeholder="College Name" onChange={handleChange} className="input" />
          <input name="faculty" placeholder="Faculty" onChange={handleChange} className="input" />
          <input type="password" name="password" placeholder="Password" onChange={handleChange} className="input" />

          <button
            onClick={handleSubmit}
            className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700"
          >
            Register
          </button>
        </div>

        <p className="text-sm text-center mt-4">
          Already have an account?{" "}
          <span
            className="text-indigo-600 cursor-pointer"
            onClick={() => navigate("/")}
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
}