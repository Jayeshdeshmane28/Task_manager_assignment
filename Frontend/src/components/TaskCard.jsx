import { useState } from 'react';
import { useTasks } from '../context/TaskContext';

const TaskCard = ({ task }) => {
  const { completeTask, removeTask } = useTasks();
  const [completing, setCompleting] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const done = task.status === 'completed';

  const handleComplete = async () => {
    if (done) return;
    setCompleting(true);
    try { await completeTask(task.id); }
    finally { setCompleting(false); }
  };

  const handleDelete = async () => {
    setDeleting(true);
    try { await removeTask(task.id); }
    finally { setDeleting(false); }
  };

  const formatDate = (d) =>
    new Date(d).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

  return (
    <div className={`
      group bg-white rounded-xl border transition-all duration-150 hover:shadow-md animate-slide-up
      ${done ? 'border-gray-100' : 'border-gray-200 hover:-translate-y-px'}
    `}>
      <div className="flex items-stretch">
        {/* Status stripe */}
        <div className={`w-1 rounded-l-xl shrink-0 ${done ? 'bg-emerald-400' : 'bg-violet-500'}`} />

        <div className="flex-1 min-w-0 p-4 sm:p-5">
          {/* Top row: title + badge */}
          <div className="flex items-start justify-between gap-3">
            <h3 className={`text-sm font-semibold leading-snug ${done ? 'line-through text-gray-400' : 'text-gray-800'}`}>
              {task.title}
            </h3>
            <span className={`shrink-0 text-xs font-medium px-2 py-0.5 rounded-full ${
              done ? 'bg-emerald-50 text-emerald-700' : 'bg-violet-50 text-violet-700'
            }`}>
              {done ? 'Completed' : 'Pending'}
            </span>
          </div>

          {/* Description */}
          {task.description && (
            <p className={`mt-1.5 text-sm leading-relaxed line-clamp-2 ${done ? 'text-gray-400' : 'text-gray-500'}`}>
              {task.description}
            </p>
          )}

          {/* Bottom row: date + actions */}
          <div className="mt-3 flex flex-wrap items-center justify-between gap-2">
            <span className="text-xs text-gray-400">{formatDate(task.created_at)}</span>

            <div className="flex items-center gap-2">
              {!done && (
                <button
                  onClick={handleComplete}
                  disabled={completing}
                  className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md text-emerald-700 bg-emerald-50 hover:bg-emerald-100 disabled:opacity-50 transition-colors cursor-pointer"
                >
                  {completing
                    ? <div className="w-3 h-3 border-2 border-emerald-600 border-t-transparent rounded-full animate-spin" />
                    : <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                      </svg>
                  }
                  Complete
                </button>
              )}

              <button
                onClick={handleDelete}
                disabled={deleting}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md text-red-600 bg-red-50 hover:bg-red-100 disabled:opacity-50 transition-colors cursor-pointer"
              >
                {deleting
                  ? <div className="w-3 h-3 border-2 border-red-500 border-t-transparent rounded-full animate-spin" />
                  : <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                }
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
