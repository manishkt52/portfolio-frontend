"use client";

import { useState } from "react";
import Image from "next/image";
import communication from "@/public/communication.png";

type ChatMessage = {
  sender: "user" | "bot";
  text: string;
};

const API_URL = "https://portfolio-backend-ths1.onrender.com";

export default function ChatIcon() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [loading, setLoading] = useState(false);

  const sendMessage = async (userMessage: string) => {
    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: userMessage }),
      });

      const data = await res.json();

      setMessages((prev) => [
        ...prev,
        { sender: "user", text: userMessage },
        { sender: "bot", text: data.answer },
      ]);
    } catch (err) {
      console.error("Chat error:", err);
    }
  };

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    setLoading(true);
    const userMessage = message;
    setMessage("");

    await sendMessage(userMessage);
    setLoading(false);
  };

  const toggleChat = () => setIsOpen(!isOpen);
  const clearChat = () => setMessages([]);

  return (
    <>
      {isOpen && (
        <div className="chat-window">
          <div className="chat-header">
            <span>Live Support</span>
            <div className="header-buttons">
              <button className="clear-btn" onClick={clearChat}>
                Clear
              </button>
              <button className="close-btn" onClick={toggleChat}>
                ✕
              </button>
            </div>
          </div>

          <div className="chat-messages">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`bubble ${msg.sender}`}
                dangerouslySetInnerHTML={{ __html: msg.text }}
              />
            ))}
            {loading && <div className="bubble bot">Typing...</div>}
          </div>

          <form onSubmit={handleSend} className="chat-input-area">
            <input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type message..."
            />
            <button disabled={loading}>Send</button>
          </form>
        </div>
      )}

      <div className="chat-icon" onClick={toggleChat}>
        <Image src={communication} alt="Chat" width={40} height={40} />
      </div>

      <style jsx>{`
        .chat-window {
          position: fixed;
          bottom: 85px;
          right: 20px;
          width: 320px;
          height: 450px;
          backdrop-filter: blur(12px);
          background: rgba(255, 255, 255, 0.1);
          border-radius: 20px;
          display: flex;
          flex-direction: column;
          z-index: 9999;
        }

        .chat-header {
          padding: 15px;
          display: flex;
          justify-content: space-between;
          color: white;
        }

        .header-buttons {
          display: flex;
          gap: 8px;
        }

        /* 🌟 3D CLEAR BUTTON */
        .clear-btn {
          background: linear-gradient(145deg, #2e2e47, #2c2c4d);
          color: white;
          border: none;
          padding: 6px 14px;
          border-radius: 10px;
          font-size: 12px;
          cursor: pointer;

          box-shadow:
            0 4px 0 #11111f,
            0 8px 14px rgba(0, 0, 0, 0.5);

          transition:
            transform 0.15s ease,
            box-shadow 0.15s ease,
            filter 0.15s ease;
        }

        .clear-btn:hover {
          transform: translateY(-2px);
          filter: brightness(1.1);

          box-shadow:
            0 6px 0 #1a1a30,
            0 12px 20px rgba(0, 0, 0, 0.6);
        }

        .clear-btn:active {
          transform: translateY(3px);

          box-shadow:
            0 2px 0 #1a1a30,
            0 4px 8px rgba(0, 0, 0, 0.5);
        }

        .chat-messages {
          flex: 1;
          padding: 15px;
          overflow-y: auto;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .bubble {
          padding: 10px;
          border-radius: 12px;
          color: white;
          max-width: 80%;
        }

        .user {
          align-self: flex-end;
          background: #2c2c4d;
        }

        .bot {
          align-self: flex-start;
          background: rgba(255, 255, 255, 0.2);
        }

        .chat-input-area {
          display: flex;
          padding: 10px;
          gap: 8px;
        }

        input {
          flex: 1;
          border-radius: 8px;
          padding: 8px;
          border: none;
        }

        button {
          background: #2c2c4d;
          color: white;
          border-radius: 8px;
          padding: 8px 12px;
          border: none;
          cursor: pointer;
        }

        .chat-icon {
          position: fixed;
          bottom: 20px;
          right: 20px;
          cursor: pointer;
          z-index: 9999;
        }
      `}</style>
    </>
  );
}
