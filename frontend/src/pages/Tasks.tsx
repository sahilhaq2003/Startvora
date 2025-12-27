import { useState, useEffect } from 'react';
// Tailwind CSS used instead of Tasks.css

interface Task {
  id: string;
  title: string;
  description?: string;
  priority: 'low' | 'medium' | 'high';
  status: 'pending' | 'in_progress' | 'completed';
  dueDate?: string;
  category?: string;
  tags: string[];
}

function Tasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [filter, setFilter] = useState<'all' | 'pending' | 'completed'>('all');
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    priority: 'medium',
    dueDate: '',
    category: '',
  });

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${import.meta.env.VITE_API_URL || ''}/tasks`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      const data = await response.json();
      setTasks(data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    try {
      if (editingTask) {
        await fetch(`${import.meta.env.VITE_API_URL || ''}/tasks/${editingTask.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          body: JSON.stringify(formData),
        });
      } else {
        await fetch(`${import.meta.env.VITE_API_URL || ''}/tasks`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          body: JSON.stringify(formData),
        });
      }
      
      fetchTasks();
      setShowModal(false);
      setEditingTask(null);
      setFormData({ title: '', description: '', priority: 'medium', dueDate: '', category: '' });
    } catch (error) {
      console.error('Error saving task:', error);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this task?')) return;
    
    const token = localStorage.getItem('token');
    try {
      await fetch(`${import.meta.env.VITE_API_URL || ''}/tasks/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      fetchTasks();
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  const handleStatusChange = async (id: string, status: string) => {
    const token = localStorage.getItem('token');
    try {
      await fetch(`${import.meta.env.VITE_API_URL || ''}/tasks/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ status }),
      });
      fetchTasks();
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  const openEditModal = (task: Task) => {
    setEditingTask(task);
    setFormData({
      title: task.title,
      description: task.description || '',
      priority: task.priority,
      dueDate: task.dueDate ? new Date(task.dueDate).toISOString().split('T')[0] : '',
      category: task.category || '',
    });
    setShowModal(true);
  };

  const filteredTasks = tasks.filter(task => {
    if (filter === 'all') return true;
    if (filter === 'completed') return task.status === 'completed';
    return task.status !== 'completed';
  });

  return (
    <div className="p-6 md:p-10 max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-blue-900">Tasks</h1>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded" onClick={() => setShowModal(true)}>
          + New Task
        </button>
      </div>

      <div className="flex gap-3 mb-6">
        <button 
          className={`px-3 py-2 rounded border ${filter === 'all' ? 'bg-blue-600 text-white border-blue-600' : 'bg-white'}`} 
          onClick={() => setFilter('all')}
        >
          All ({tasks.length})
        </button>
        <button 
          className={`px-3 py-2 rounded border ${filter === 'pending' ? 'bg-blue-600 text-white border-blue-600' : 'bg-white'}`} 
          onClick={() => setFilter('pending')}
        >
          Pending ({tasks.filter(t => t.status !== 'completed').length})
        </button>
        <button 
          className={`px-3 py-2 rounded border ${filter === 'completed' ? 'bg-blue-600 text-white border-blue-600' : 'bg-white'}`} 
          onClick={() => setFilter('completed')}
        >
          Completed ({tasks.filter(t => t.status === 'completed').length})
        </button>
      </div>

      <div className="space-y-4">
        {filteredTasks.length === 0 ? (
          <div className="text-gray-500">No tasks found. Create your first task!</div>
        ) : (
          filteredTasks.map((task) => (
            <div key={task.id} className={`p-4 bg-white rounded-xl shadow border-l-4 ${task.priority === 'high' ? 'border-red-500 bg-red-50' : task.priority === 'medium' ? 'border-yellow-400 bg-yellow-50' : 'border-green-400 bg-green-50'}`}>
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={task.status === 'completed'}
                  onChange={(e) => handleStatusChange(task.id, e.target.checked ? 'completed' : 'pending')}
                  className="rounded"
                />
                <h3 className={`font-semibold ${task.status === 'completed' ? 'line-through text-gray-500' : 'text-blue-900'}`}>{task.title}</h3>
                <span className={`ml-auto text-xs px-2 py-1 rounded ${task.priority === 'high' ? 'bg-red-500 text-white' : task.priority === 'medium' ? 'bg-yellow-400 text-white' : 'bg-green-500 text-white'}`}>{task.priority}</span>
              </div>
              {task.description && (
                <p className="text-sm text-gray-600 mt-2">{task.description}</p>
              )}
              <div className="flex items-center justify-between mt-3">
                <div className="flex items-center gap-4 text-xs text-gray-500">
                  {task.dueDate && (
                    <span>📅 {new Date(task.dueDate).toLocaleDateString()}</span>
                  )}
                  {task.category && (
                    <span>📁 {task.category}</span>
                  )}
                </div>
                <div className="flex gap-2">
                  <button className="px-3 py-1 rounded border" onClick={() => openEditModal(task)}>Edit</button>
                  <button className="px-3 py-1 rounded bg-red-600 text-white" onClick={() => handleDelete(task.id)}>Delete</button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4" onClick={() => setShowModal(false)}>
          <div className="bg-white rounded-xl shadow p-6 w-full max-w-lg" onClick={(e) => e.stopPropagation()}>
            <h2 className="text-xl font-semibold mb-4">{editingTask ? 'Edit Task' : 'New Task'}</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm text-gray-700 mb-1">Title *</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                  className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-700 mb-1">Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={3}
                  className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-700 mb-1">Priority</label>
                  <select
                    value={formData.priority}
                    onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                    className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm text-gray-700 mb-1">Due Date</label>
                  <input
                    type="date"
                    value={formData.dueDate}
                    onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                    className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm text-gray-700 mb-1">Category</label>
                <input
                  type="text"
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  placeholder="e.g., Work, Personal"
                  className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>

              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setShowModal(false);
                    setEditingTask(null);
                    setFormData({ title: '', description: '', priority: 'medium', dueDate: '', category: '' });
                  }}
                  className="px-4 py-2 rounded border"
                >
                  Cancel
                </button>
                <button type="submit" className="px-4 py-2 rounded bg-blue-600 text-white">
                  {editingTask ? 'Update' : 'Create'} Task
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Tasks;
