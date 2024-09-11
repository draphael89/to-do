import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import ReactConfetti from 'react-confetti'
import './App.css'
import FloatingButton from './components/FloatingButton'
import TaskInput from './components/TaskInput'
import TaskList from './components/TaskList'
import Snake from './components/Snake'

interface Task {
  id: number
  text: string
  completed: boolean
}

function App() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [showInput, setShowInput] = useState(false)
  const [showConfetti, setShowConfetti] = useState(false)
  const [showSnake, setShowSnake] = useState(false)

  const addTask = (text: string) => {
    const newTask: Task = {
      id: Date.now(),
      text,
      completed: false,
    }
    setTasks([...tasks, newTask])
    setShowSnake(true)
    setTimeout(() => setShowSnake(false), 10000) // Hide snake after 10 seconds
  }

  const toggleTask = (id: number) => {
    setTasks(tasks.map(task => {
      if (task.id === id) {
        const newCompleted = !task.completed
        if (newCompleted) {
          setShowConfetti(true)
        }
        return { ...task, completed: newCompleted }
      }
      return task
    }))
  }

  useEffect(() => {
    if (showConfetti) {
      const timer = setTimeout(() => setShowConfetti(false), 3000)
      return () => clearTimeout(timer)
    }
  }, [showConfetti])

  useEffect(() => {
    if (showSnake) {
      const timer = setTimeout(() => setShowSnake(false), 5000)
      return () => clearTimeout(timer)
    }
  }, [showSnake])

  const activeTasks = tasks.filter(task => !task.completed)
  const completedTasks = tasks.filter(task => task.completed)

  return (
    <motion.div 
      className="App"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.h1
        initial={{ y: -50 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 200, damping: 10 }}
      >
        Todo App
      </motion.h1>
      <AnimatePresence>
        {activeTasks.length > 0 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <h2>Active Tasks</h2>
            <TaskList tasks={activeTasks} onToggleTask={toggleTask} />
          </motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {completedTasks.length > 0 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <h2>Completed Tasks</h2>
            <TaskList tasks={completedTasks} onToggleTask={toggleTask} />
          </motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {showInput && (
          <TaskInput
            onAddTask={addTask}
            onClose={() => setShowInput(false)}
          />
        )}
      </AnimatePresence>
      <FloatingButton onClick={() => setShowInput(true)} />
      {showConfetti && <ReactConfetti />}
      <Snake show={showSnake} />
    </motion.div>
  )
}

export default App
