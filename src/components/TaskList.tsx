import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface Task {
  id: number
  text: string
  completed: boolean
}

interface TaskListProps {
  tasks: Task[]
  onToggleTask: (id: number) => void
}

const TaskList: React.FC<TaskListProps> = ({ tasks, onToggleTask }) => {
  return (
    <ul className="task-list">
      <AnimatePresence>
        {tasks.map((task) => (
          <motion.li
            key={task.id}
            className={task.completed ? 'completed' : ''}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            layout
          >
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => onToggleTask(task.id)}
            />
            <motion.span
              initial={{ opacity: 1 }}
              animate={{ opacity: task.completed ? 0.5 : 1 }}
            >
              {task.text}
            </motion.span>
          </motion.li>
        ))}
      </AnimatePresence>
    </ul>
  )
}

export default TaskList