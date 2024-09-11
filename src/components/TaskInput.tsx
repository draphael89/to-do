import React, { useState } from 'react'
import { motion } from 'framer-motion'

interface TaskInputProps {
  onAddTask: (task: string) => void
  onClose: () => void
}

const TaskInput: React.FC<TaskInputProps> = ({ onAddTask, onClose }) => {
  const [task, setTask] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (task.trim()) {
      onAddTask(task.trim())
      setTask('')
      onClose()
    }
  }

  return (
    <motion.div
      className="task-input-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.form
        onSubmit={handleSubmit}
        initial={{ scale: 0.8, y: 50 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.8, y: 50 }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
      >
        <input
          type="text"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          placeholder="Enter a new task"
          autoFocus
        />
        <motion.button
          type="submit"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Add Task
        </motion.button>
        <motion.button
          type="button"
          onClick={onClose}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Cancel
        </motion.button>
      </motion.form>
    </motion.div>
  )
}

export default TaskInput