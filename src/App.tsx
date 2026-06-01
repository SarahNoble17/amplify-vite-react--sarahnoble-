import { useEffect, useState } from "react";
import type { Schema } from "../amplify/data/resource";
import { generateClient } from "aws-amplify/data";

const client = generateClient<Schema>();

function App() {
  const [todos, setTodos] = useState<Array<Schema["Todo"]["type"]>>([]);

  useEffect(() => {
    // Real-time listener for database updates
    const sub = client.models.Todo.observeQuery().subscribe({
      next: (data) => setTodos([...data.items]),
    });
    return () => sub.unsubscribe();
  }, []);

  function createTodo() {
    const content = window.prompt("Todo content");
    if (content) {
      client.models.Todo.create({ content });
    }
  }

  // NEW FUNCTION: Handles item removal from backend
  function deleteTodo(id: string) {
    client.models.Todo.delete({ id });
  }

  return (
    <main style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <h1>My To-Do List</h1>
      <button onClick={createTodo} style={{ marginBottom: "1rem", padding: "0.5rem 1rem" }}>
        + New Todo
      </button>
      
      <ul style={{ lineHeight: "2" }}>
        {todos.map((todo) => (
          <li 
            key={todo.id} 
            onClick={() => deleteTodo(todo.id)}
            style={{ cursor: "pointer", color: "#d9534f" }}
            title="Click to delete"
          >
            {todo.content} ❌
          </li>
        ))}
      </ul>
      
      <div style={{ marginTop: "2rem", borderTop: "1px solid #ccc", paddingTop: "1rem" }}>
        🥳 App successfully hosted! Click an item above to delete it.
      </div>
    </main>
  );
}
export default App;