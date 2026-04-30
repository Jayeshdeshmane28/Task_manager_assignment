import { createContext, useContext, useState, useCallback } from 'react';
import api from '../services/api';

const TaskContext = createContext(null);

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchTasks = useCallback(async (status = '') => {
    setLoading(true);
    setError(null);
    try {
      const params = status ? { status } : {};
      const { data } = await api.get('/tasks', { params });
      setTasks(data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch tasks');
    } finally {
      setLoading(false);
    }
  }, []);

  const addTask = async (title, description) => {
    const { data } = await api.post('/tasks', { title, description });
    setTasks((prev) => [data, ...prev]);
    return data;
  };

  const completeTask = async (id) => {
    const { data } = await api.patch(`/tasks/${id}`);
    setTasks((prev) => prev.map((t) => (t.id === id ? data : t)));
    return data;
  };

  const removeTask = async (id) => {
    await api.delete(`/tasks/${id}`);
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <TaskContext.Provider value={{ tasks, loading, error, fetchTasks, addTask, completeTask, removeTask }}>
      {children}
    </TaskContext.Provider>
  );
};

export const useTasks = () => useContext(TaskContext);
