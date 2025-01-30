import { useState, useEffect, useRef } from "react";
import axios from "axios";

const ChatApp = () => {
  const [messages, setMessages] = useState([
    { text: "What is your budget?", sender: "ai" },
  ]);
  const [input, setInput] = useState("");
  const [isUserTyping, setIsUserTyping] = useState(false);
  const inputRef = useRef(null); // Reference to the input field
  const chatEndRef = useRef(null); // Reference to the bottom of the chat
  const chatStartRef = useRef(null); // Reference to the top of the chat
  const [showScrollTop, setShowScrollTop] = useState(false); // For the scroll up arrow
  const [loading,setLoading] = useState(false)

  // Auto-scroll to the bottom of the chat whenever messages change
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Handle new message send
  const handleSend = async () => {
    if (!input.trim()) return;

    const newMessage = { text: input, sender: "user" };
    setMessages((prev) => [...prev, newMessage]);
    setInput("");
    setIsUserTyping(true);

    try {
      setLoading(true)
      const response = await axios.post("http://localhost:5000/chatwithbot", {
        user_input: input,
      });

      const aiReply = { text: response.data.response, sender: "ai" };
      setMessages((prev) => [...prev, aiReply]);
      setIsUserTyping(false);
      setLoading(false)
    } catch (error) {
      const aiError = {
        text: "Sorry, something went wrong. Please try again.",
        sender: "ai",
      };
      setMessages((prev) => [...prev, aiError]);
      setIsUserTyping(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && input.trim()) {
      handleSend();
      e.preventDefault(); // Prevent adding a new line in the text box
    }
  };

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const handleScroll = () => {
    if (chatStartRef.current.scrollTop > 100) {
      setShowScrollTop(true);
    } else {
      setShowScrollTop(false);
    }
  };

  const scrollToTop = () => {
    chatStartRef.current.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    inputRef.current?.focus(); // Focus on the input field after each render
  }, []);

  return (
    <div className="w-[100%] p-4 bg-blue-100 h-screen flex flex-col items-center">
      <div
        className="w-[100%] h-full flex flex-col p-4 overflow-y-auto space-y-2 "
        ref={chatStartRef}
        onScroll={handleScroll}
      >
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`p-2 rounded-lg max-w-[400px] break-words ${
              msg.sender === "ai"
                ? "bg-gray-200 self-start"
                : "bg-blue-500 text-white self-end"
            }`}
          >
            {msg.text}
          </div>
        ))}
        {/* Auto-scroll to the bottom */}
        <div ref={chatEndRef} />
      </div>
      {/* Scroll to top button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="absolute bottom-24 right-4 bg-blue-500 text-white p-2 rounded-full"
        >
          ↑
        </button>
      )}
      <div className="w-full flex items-center space-x-2 p-2 border-t">
        <textarea
          ref={inputRef}
          className="flex-1 p-2 border rounded-lg resize-none overflow-hidden"
          style={{
            maxHeight: "120px", // Limit height to 120px
            height: "auto", // Adjust height based on content
          }}
          value={input}
          onChange={handleInputChange}
          onKeyDown={handleKeyPress}
          placeholder="Type a message..."
          rows={1}
          disabled={isUserTyping} // Disable input while waiting for AI response
        />
        <button
          className={`bg-blue-500 text-white px-4 py-2 rounded-lg ${
            !input.trim() || isUserTyping ? "opacity-50 cursor-not-allowed" : ""
          }`}
          onClick={handleSend}
          disabled={!input.trim() || isUserTyping}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatApp;
