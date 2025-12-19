import { useState } from 'react';

export default function ChatPage() {
  const [messages, setMessages] = useState<{ role: string; content: string }[]>([]);
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (input.trim()) {
      setMessages((prev) => [...prev, { role: 'user', content: input }, { role: 'bot', content: 'This is a bot response.' }]);
      setInput('');
    }
  };

  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-bold">Chat</h1>
      <div className="p-4 bg-gray-200 rounded-lg dark:bg-gray-800">
        {messages.map((msg, idx) => (
          <p key={idx} className={msg.role === 'user' ? 'text-right' : 'text-left'}>
            {msg.content}
          </p>
        ))}
      </div>
      <div className="flex space-x-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-grow p-2 border rounded-lg dark:bg-gray-700"
        />
        <button onClick={handleSend} className="btn btn-primary">
          Send
        </button>
      </div>
    </div>
  );
}