import TodoList from "./TodoList";
import FormAddTodo from "./FormAddTodo.jsx";
import useTodos from "../hooks/useTodos.js";
import NetworkNotification from "./NetworkNotification.jsx";

export default function Main() {
  const { networkError, todos, isLoading, toggleTodo, deleteTodo, updateTodo, addTodo } = useTodos();

  return (
        <main className="main">
            <FormAddTodo addTodo={addTodo} />
            <TodoList todos={todos} isLoading={isLoading} toggleTodo={toggleTodo} deleteTodo={deleteTodo} updateTodo={updateTodo} networkError={networkError} />
            <NetworkNotification networkError={networkError} />
        </main>
    )
}
