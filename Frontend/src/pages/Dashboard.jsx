import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useTasks } from '../context/TaskContext';
import TaskCard from '../components/TaskCard';
import TaskForm from '../components/TaskForm';
import Navbar from '../components/Navbar';

const FILTERS = [
  { label: 'All',       value: '' },
  { label: 'Pending',   value: 'pending' },
  { label: 'Completed', value: 'completed' },
];

const Dashboard = () => {
  const { user } = useAuth();
  const { tasks, loading, error, fetchTasks } = useTasks();
  const [filter, setFilter] = useState('');
  const [showForm, setShowForm] = useState(false);

  useEffect(() => { fetchTasks(); }, [fetchTasks]);

  const filtered      = filter ? tasks.filter((t) => t.status === filter) : tasks;
  const total         = tasks.length;
  const pendingCount  = tasks.filter((t) => t.status === 'pending').length;
  const doneCount     = tasks.filter((t) => t.status === 'completed').length;
  const pct           = total > 0 ? Math.round((doneCount / total) * 100) : 0;

  const greeting = () => {
    const h = new Date().getHours();
    if (h < 12) return 'Good morning';
    if (h < 18) return 'Good afternoon';
    return 'Good evening';
  };

  const firstName = user?.name?.split(' ')[0] || 'there';

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <main className="max-w-6xl mx-auto px-6 sm:px-10 py-8">

        {/* ── Header ── */}
        <div className="mb-7">
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight">
            {greeting()}, {firstName}!
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            {pendingCount > 0
              ? `${pendingCount} task${pendingCount !== 1 ? 's' : ''} left to complete.`
              : total > 0
              ? 'All tasks done — great work!'
              : 'No tasks yet. Add one to get started.'}
          </p>

          {/* Progress bar — only shown when there are tasks */}
          {total > 0 && (
            <div className="mt-4 flex items-center gap-3">
              <div className="flex-1 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-violet-500 rounded-full transition-all duration-500"
                  style={{ width: `${pct}%` }}
                />
              </div>
              <span className="text-xs font-medium text-gray-400 tabular-nums w-10 text-right">
                {pct}%
              </span>
            </div>
          )}
        </div>

        {/* ── Stat cards ── */}
        <div className="grid grid-cols-3 gap-3 sm:gap-4 mb-7">
          {[
            { label: 'Total',     count: total,        bg: 'bg-violet-50', text: 'text-violet-600', num: 'text-violet-700' },
            { label: 'Pending',   count: pendingCount, bg: 'bg-amber-50',  text: 'text-amber-600',  num: 'text-amber-700'  },
            { label: 'Completed', count: doneCount,    bg: 'bg-emerald-50',text: 'text-emerald-600',num: 'text-emerald-700'},
          ].map(({ label, count, bg, text, num }) => (
            <div key={label} className={`${bg} rounded-xl p-3 sm:p-4 border border-white`}>
              <p className={`text-xl sm:text-2xl font-bold ${num}`}>{count}</p>
              <p className={`text-xs sm:text-sm font-medium ${text} mt-0.5`}>{label}</p>
            </div>
          ))}
        </div>

        {/* ── Filter tabs + Add button ── */}
        <div className="flex items-center justify-between mb-4 gap-3">
          <div className="flex items-center gap-1 bg-white border border-gray-200 rounded-lg p-0.5">
            {FILTERS.map((f) => {
              const count = f.value === '' ? total : f.value === 'pending' ? pendingCount : doneCount;
              return (
                <button
                  key={f.value}
                  onClick={() => setFilter(f.value)}
                  className={`px-3 sm:px-4 py-1.5 text-xs sm:text-sm font-medium rounded-md transition-all cursor-pointer ${
                    filter === f.value
                      ? 'bg-violet-600 text-white'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  {f.label}
                  {count > 0 && (
                    <span className={`ml-1 text-xs ${filter === f.value ? 'text-violet-200' : 'text-gray-400'}`}>
                      {count}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          <button
            onClick={() => setShowForm(true)}
            className="flex items-center gap-1.5 px-3 sm:px-4 py-2 text-xs sm:text-sm font-semibold text-white bg-violet-600 hover:bg-violet-700 rounded-lg transition-colors cursor-pointer shrink-0"
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
            </svg>
            <span className="hidden sm:inline">Add Task</span>
            <span className="sm:hidden">Add</span>
          </button>
        </div>

        {/* ── States ── */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-20 gap-3">
            <div className="w-8 h-8 border-3 border-violet-600 border-t-transparent rounded-full animate-spin" />
            <p className="text-sm text-gray-400">Loading tasks...</p>
          </div>
        )}

        {error && !loading && (
          <div className="flex items-center gap-2.5 p-4 bg-red-50 border border-red-100 rounded-xl text-sm text-red-600">
            <svg className="w-4 h-4 shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            {error}
          </div>
        )}

        {/* Empty — no tasks at all */}
        {!loading && !error && total === 0 && (
          <div className="flex flex-col items-center justify-center py-20 text-center animate-fade-in">
            <div className="w-16 h-16 rounded-2xl bg-violet-50 flex items-center justify-center mb-4">
              <svg className="w-8 h-8 text-violet-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
            <h3 className="text-base font-semibold text-gray-700 mb-1">No tasks yet</h3>
            <p className="text-sm text-gray-400 mb-5 max-w-xs">
              Add your first task and start tracking your work.
            </p>
            <button
              onClick={() => setShowForm(true)}
              className="px-4 py-2 text-sm font-semibold text-white bg-violet-600 hover:bg-violet-700 rounded-lg transition-colors cursor-pointer"
            >
              Add your first task
            </button>
          </div>
        )}

        {/* Empty — filter has no results */}
        {!loading && !error && filtered.length === 0 && total > 0 && (
          <div className="flex flex-col items-center justify-center py-14 text-center animate-fade-in">
            <p className="text-sm text-gray-400">No {filter} tasks found.</p>
          </div>
        )}

        {/* Task list */}
        {!loading && !error && filtered.length > 0 && (
          <div className="space-y-2.5">
            {filtered.map((task) => (
              <TaskCard key={task.id} task={task} />
            ))}
          </div>
        )}
      </main>

      {/* Mobile FAB — shown only when tasks exist */}
      {total > 0 && (
        <button
          onClick={() => setShowForm(true)}
          className="sm:hidden fixed bottom-6 right-5 w-12 h-12 bg-violet-600 hover:bg-violet-700 text-white rounded-full shadow-lg shadow-violet-300 flex items-center justify-center transition-colors cursor-pointer z-30"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
          </svg>
        </button>
      )}

      {showForm && <TaskForm onClose={() => setShowForm(false)} />}
    </div>
  );
};

export default Dashboard;
