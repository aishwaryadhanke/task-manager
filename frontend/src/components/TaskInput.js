function TaskInput({ task, setTask, addTask }) {
  return (
    <div className="input-box">
      <input
        type="text"
        placeholder="Enter task"
        value={task}
        onChange={(e) => setTask(e.target.value)}
      />
      <button onClick={addTask}>Add</button>
    </div>
  );
}

export default TaskInput;