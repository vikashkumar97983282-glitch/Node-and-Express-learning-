import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import io from "socket.io-client";

const socket = io("http://localhost:3000");

export default function Group() {
  const { id } = useParams();

  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const chatEndRef = useRef(null);

  const API = "http://localhost:3000";

  // ✅ AUTO SCROLL
  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // ✅ LOAD OLD MESSAGES
  const loadMessages = async () => {
    try {
      const res = await axios.get(`${API}/messages/${id}`);
      setChat(res.data);
      scrollToBottom();
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    loadMessages();

    // ✅ JOIN ROOM
    socket.emit("joinGroup", id);

    // ✅ RECEIVE MESSAGE
    socket.on("receiveMessage", (msg) => {
      setChat((prev) => [...prev, msg]);
      scrollToBottom();
    });

    // ✅ CLEANUP
    return () => {
      socket.off("receiveMessage");
    };
  }, [id]);

  // ✅ SEND MESSAGE
  const sendMessage = () => {
    if (!message.trim()) return;

    const newMsg = {
      groupId: id,
      message
    };

    socket.emit("sendMessage", newMsg);

    // instant UI update (optimistic)
    setChat((prev) => [...prev, newMsg]);

    setMessage("");
    scrollToBottom();
  };

  // ✅ FILE UPLOAD
  const uploadFile = async () => {
    if (!file) return alert("Select file first");

    const formData = new FormData();
    formData.append("file", file);

    try {
      setLoading(true);

      const res = await axios.post(`${API}/upload/${id}`, formData);

      // optionally show file in chat
      setChat((prev) => [
        ...prev,
        { message: `📎 File uploaded: ${res.data.filename}` }
      ]);

      setFile(null);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  // ✅ ENTER KEY SEND
  const handleKeyPress = (e) => {
    if (e.key === "Enter") sendMessage();
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen flex flex-col">

      {/* HEADER */}
      <h2 className="text-2xl font-bold mb-4">
        Group Chat (ID: {id})
      </h2>

      {/* CHAT BOX */}
      <div className="flex-1 overflow-y-auto border p-4 mb-4 bg-white rounded shadow">

        {chat.length === 0 && (
          <p className="text-gray-400 text-center">No messages yet</p>
        )}

        {chat.map((c, i) => (
          <div
            key={i}
            className="bg-blue-100 p-2 my-2 rounded w-fit max-w-xs"
          >
            {c.message}
          </div>
        ))}

        {/* AUTO SCROLL TARGET */}
        <div ref={chatEndRef}></div>
      </div>

      {/* MESSAGE INPUT */}
      <div className="flex gap-2">
        <input
          className="border p-3 flex-1 rounded"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyPress}
          placeholder="Type message..."
        />

        <button
          onClick={sendMessage}
          className="bg-blue-500 text-white px-6 rounded hover:bg-blue-600"
        >
          Send
        </button>
      </div>

      {/* FILE UPLOAD */}
      <div className="mt-4 flex items-center gap-2">
        <input
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
        />

        <button
          onClick={uploadFile}
          disabled={loading}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 disabled:opacity-50"
        >
          {loading ? "Uploading..." : "Upload File"}
        </button>
      </div>

    </div>
  );
}