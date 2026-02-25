"use client";

import { useState } from "react";

interface Todo {
  id: number;
  text: string;
  done: boolean;
  priority: string;
}

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [input, setInput] = useState("");
  const [priority, setPriority] = useState("");

  function addTodo() {
    const text = input.trim();
    if (!text) return;
    setTodos([...todos, { id: Date.now(), text, done: false, priority }]);
    setInput("");
    setPriority("");
  }

  function toggleTodo(id: number) {
    setTodos(todos.map((t) => (t.id === id ? { ...t, done: !t.done } : t)));
  }

  function deleteTodo(id: number) {
    setTodos(todos.filter((t) => t.id !== id));
  }

  return (
    <main className="max-w-md mx-auto mt-16 px-4 font-sans">
      <h1 className="text-2xl font-bold mb-6">SADo App</h1>

      <div className="flex gap-2 mb-6">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && addTodo()}
          placeholder="What needs to be done?"
          className="flex-1 px-3 py-2 text-base border border-gray-300"
        />
        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          className="px-3 py-2 text-base border border-gray-300"
        >
          <option value="">Priority</option>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
        <button onClick={addTodo} className="px-4 py-2 text-base border border-gray-300">
          Add
        </button>
      </div>

      {todos.length === 0 && <p className="text-gray-400">No todos yet.</p>}

      <ul className="list-none p-0 m-0">
        {todos.map((todo) => (
          <li
            key={todo.id}
            className="flex items-center gap-2 py-2 border-b border-gray-100"
          >
            <input
              type="checkbox"
              checked={todo.done}
              onChange={() => toggleTodo(todo.id)}
            />
            <span className={`flex-1 ${todo.done ? "line-through text-gray-400" : ""}`}>
              {todo.text}
            </span>
            {todo.priority && (
              <span className="text-xs text-gray-500">({todo.priority})</span>
            )}
            <button onClick={() => deleteTodo(todo.id)} className="text-xs px-2 py-1 border border-gray-300">
              Delete
            </button>
          </li>
        ))}
      </ul>
    </main>
  );
}
