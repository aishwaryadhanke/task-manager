function TaskItem({ task, toggleTask, deleteTask }) {
  return (
    <li>
      <span onClick={toggleTask}>
        {task.title}
      </span>
      <button onClick={deleteTask}>Delete</button>
    </li>
  );
}

export default TaskItem;