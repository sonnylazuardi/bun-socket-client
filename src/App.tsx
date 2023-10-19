import { useEffect, useState } from 'react'
import { io } from "socket.io-client";
import './App.css'
const URL = `https://bun-socket.fly.dev`;
let socket: any;

interface Chat {
  user: string;
  counter: number;
}

function App() {
  const [count, setCount] = useState(0)
  const [messages, setMessages] = useState<Chat[]>([])
  useEffect(() => {
    io
    socket = io(URL);
    socket.on("message", (data: Chat) => {
      setMessages((prev) => ([...prev, data]));
    });
  }, [])

  return (
    <>
      <div className="card">
        <button onClick={() => {
          const value = count + 1;
          setCount(value);
          if (socket) {
            socket.emit('message', { counter: value });
          }
          console.log("send");
        }}>
          count is {count}
        </button>
        <div>
          {messages.map((item, i) => {
            return (
              <div key={i} className='flex flex-row items-center space-x-2'>
                <div>
                  <img src={`https://api.dicebear.com/6.x/thumbs/svg?seed=${item.user}`} className='w-10 h-10' />
                </div>
                <div>
                  {item.counter}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </>
  )
}

export default App
