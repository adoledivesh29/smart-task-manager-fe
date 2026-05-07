import { useEffect, useState } from 'react'
import CustomModal from '../../Common/Components/CustomModal/CustomModal'
import { PROJECT_NAME } from '../../Common/Constant'
import { useCreateTask, useDeleteTask, useGetTasks, useGetTasksMetadata, useToggleTask } from './hooks/taskHooks'
import {
    formatTaskCreatedDate,
    getTaskCategoryIcon,
    getTaskCategoryTheme,
    getDifficultyMeta,
    getDifficultyPercent
} from './taskUi'

const getMetadataValue = (metadata, keys, fallback = 0) => {
    for (const key of keys) {
        const value = metadata?.[key]
        if (value !== undefined && value !== null) return value
    }

    return fallback
}

const TaskForm = () => {
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const { mutate: createTask, isLoading } = useCreateTask()

    const handleSubmit = (e) => {
        e.preventDefault()

        if (!title.trim() || !description.trim()) return

        createTask(
            { sTitle: title.trim(), sDescription: description.trim() },
            {
                onSuccess: () => {
                    setTitle('')
                    setDescription('')
                }
            }
        )
    }

    return (
        <section className="task-composer">
            <div className="task-composer__intro">
                <span className="task-composer__eyebrow">Create intelligently</span>
                <h2>Drop in a task and let AI organize the busywork.</h2>
                <p>Every task gets a category and difficulty score automatically, so the list stays sorted by effort instead of guesswork.</p>
            </div>

            <form onSubmit={handleSubmit} className="task-composer__form">
                <label className="task-field">
                    <span>Task title</span>
                    <input
                        type="text"
                        className="task-input"
                        placeholder="Prepare sprint review slides"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </label>

                <label className="task-field task-field--wide">
                    <span>Description</span>
                    <textarea
                        className="task-input task-input--textarea"
                        placeholder="Add the context or outcome you want to achieve"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        rows={4}
                        required
                    />
                </label>

                <button type="submit" className={`task-submit-btn ${isLoading ? 'loading' : ''}`} disabled={isLoading}>
                    {isLoading ? (
                        <>
                            <span className="spinner" />
                            Creating...
                        </>
                    ) : (
                        <>
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                                <path d="M12 5v14M5 12h14" strokeLinecap="round" />
                            </svg>
                            Add task
                        </>
                    )}
                </button>
            </form>
        </section>
    )
}

const TaskCategoryBadge = ({ theme }) => (
    <span
        className="task-category-badge"
        style={{
            backgroundColor: theme.badgeBg,
            color: theme.accent,
            borderColor: theme.borderSoft
        }}
    >
        {theme.label}
    </span>
)

const CategoryGlyph = ({ icon }) => {
    switch (icon) {
    case 'heart-pulse':
        return (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9">
                <path d="M3 12h3l2-4 3 8 2-4h8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        )
    case 'briefcase':
        return (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9">
                <path d="M9 6V4h6v2" strokeLinecap="round" strokeLinejoin="round" />
                <rect x="3" y="6" width="18" height="13" rx="2" />
                <path d="M3 11h18" strokeLinecap="round" />
            </svg>
        )
    case 'wallet':
        return (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9">
                <path d="M4 7.5A2.5 2.5 0 0 1 6.5 5H18a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H6.5A2.5 2.5 0 0 1 4 16.5v-9Z" />
                <path d="M15 12h3" strokeLinecap="round" />
            </svg>
        )
    case 'book-open':
        return (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9">
                <path d="M12 7a3 3 0 0 0-3-3H5v15h4a3 3 0 0 1 3 3m0-15a3 3 0 0 1 3-3h4v15h-4a3 3 0 0 0-3 3" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        )
    case 'user':
        return (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9">
                <circle cx="12" cy="8" r="3.2" />
                <path d="M5 19a7 7 0 0 1 14 0" strokeLinecap="round" />
            </svg>
        )
    default:
        return (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9">
                <path d="M9 12.75 11.25 15 15 9.75" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M19.5 12c0 4.142-3.358 7.5-7.5 7.5S4.5 16.142 4.5 12 7.858 4.5 12 4.5 19.5 7.858 19.5 12Z" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        )
    }
}

const TaskCard = ({ task, onRequestDelete }) => {
    const { mutate: toggleTask, isLoading: isToggling } = useToggleTask()
    const difficultyMeta = getDifficultyMeta(task.nDifficultyScore)
    const difficultyPercent = getDifficultyPercent(task.nDifficultyScore)
    const theme = getTaskCategoryTheme(task)
    const categoryIcon = getTaskCategoryIcon(task)
    const isDone = task.bIsCompleted
    const createdDate = formatTaskCreatedDate(task)

    return (
        <article
            className={`task-card ${isDone ? 'task-card--done' : ''}`}
            style={{
                borderLeftColor: theme.accent,
                boxShadow: isDone ? '0 14px 28px rgba(15, 23, 42, 0.05)' : `0 18px 34px ${theme.glow}`
            }}
        >
            <div className="task-card__wash" style={{ background: `linear-gradient(135deg, ${theme.panelWash}, transparent 55%)` }} />

            <div className="task-card__top">
                <div className="task-card__identity">
                    <div className="task-card__icon" style={{ backgroundColor: theme.iconBg, color: theme.accent }}>
                        <CategoryGlyph icon={categoryIcon} />
                    </div>
                    <div className="task-card__heading">
                        <TaskCategoryBadge theme={theme} />
                        <span className="task-card__date">{createdDate}</span>
                    </div>
                </div>

                <div className="task-card__actions">
                    <button
                        type="button"
                        className={`task-action-btn task-action-btn--check ${isDone ? 'done' : ''}`}
                        onClick={() => toggleTask(task._id)}
                        disabled={isToggling}
                        title={isDone ? 'Mark as pending' : 'Mark as completed'}
                    >
                        {isToggling ? (
                            <span className="spinner spinner--sm" />
                        ) : (
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                                <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        )}
                    </button>

                    <button
                        type="button"
                        className="task-action-btn task-action-btn--delete"
                        onClick={() => onRequestDelete(task)}
                        title="Delete task"
                    >
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </button>
                </div>
            </div>

            <div className="task-card__body">
                <h3>{task.sTitle}</h3>
                <p>{task.sDescription}</p>
            </div>

            <div className="task-card__meta">
                <div className="task-difficulty">
                    <div className="task-difficulty__header">
                        <span>Difficulty</span>
                        <strong style={{ color: isDone ? '#94a3b8' : difficultyMeta.accent }}>
                            {difficultyMeta.score}/10
                        </strong>
                    </div>
                    <div className="difficulty-bar-track" style={{ backgroundColor: isDone ? '#e2e8f0' : theme.trackBg }}>
                        <div
                            className="difficulty-bar-fill"
                            style={{
                                width: `${difficultyPercent}%`,
                                backgroundColor: isDone ? '#cbd5e1' : theme.accent,
                                boxShadow: isDone ? 'none' : `0 0 18px ${theme.glow}`
                            }}
                        />
                    </div>
                    <div className="task-card__footer-row">
                        <span className="task-difficulty__label" style={{ color: isDone ? '#94a3b8' : difficultyMeta.accent }}>
                            {difficultyMeta.label}
                        </span>
                        <span className="task-card__category-note" style={{ color: isDone ? '#94a3b8' : theme.accent }}>
                            AI tagged as {theme.label}
                        </span>
                    </div>
                </div>

                <div className={`task-status-chip ${isDone ? 'task-status-chip--done' : 'task-status-chip--pending'}`}>
                    <span className="task-status-chip__dot" />
                    {isDone ? 'Completed' : 'In progress'}
                </div>
            </div>
        </article>
    )
}

const EmptyState = () => (
    <div className="tasks-empty">
        <div className="tasks-empty__icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                <rect x="3" y="3" width="18" height="18" rx="4" />
                <path d="M9 12l2 2 4-4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        </div>
        <h3>Your board is clear.</h3>
        <p>Add the first task above and the dashboard will start grouping your workload automatically with AI category styling.</p>
    </div>
)

const TaskSection = ({ title, count, accentClass, tasks, onRequestDelete }) => (
    <section className="task-section">
        <div className="task-section__header">
            <div>
                <span className={`task-section__kicker ${accentClass}`}>{title}</span>
                <h3>{count} task{count === 1 ? '' : 's'}</h3>
            </div>
        </div>
        <div className="tasks-grid">
            {tasks.map((task) => (
                <TaskCard key={task._id} task={task} onRequestDelete={onRequestDelete} />
            ))}
        </div>
    </section>
)

const TaskList = ({ tasks, isLoading, isError, onRequestDelete }) => {
    if (isLoading) {
        return (
            <div className="tasks-skeleton-grid">
                {[1, 2, 3].map((item) => <div key={item} className="task-skeleton" />)}
            </div>
        )
    }

    if (isError) {
        return (
            <div className="tasks-error">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                    <circle cx="12" cy="12" r="10" />
                    <path d="M12 8v4M12 16h.01" strokeLinecap="round" />
                </svg>
                <p>Could not load tasks right now. Please try again in a moment.</p>
            </div>
        )
    }

    if (!tasks?.length) return <EmptyState />

    const pendingTasks = tasks.filter((task) => !task.bIsCompleted)
    const completedTasks = tasks.filter((task) => task.bIsCompleted)

    return (
        <div className="tasks-lists">
            {pendingTasks.length > 0 && (
                <TaskSection
                    title="Active queue"
                    count={pendingTasks.length}
                    accentClass="task-section__kicker--active"
                    tasks={pendingTasks}
                    onRequestDelete={onRequestDelete}
                />
            )}

            {completedTasks.length > 0 && (
                <TaskSection
                    title="Wrapped up"
                    count={completedTasks.length}
                    accentClass="task-section__kicker--done"
                    tasks={completedTasks}
                    onRequestDelete={onRequestDelete}
                />
            )}
        </div>
    )
}

const Dashboard = () => {
    const { data: tasks = [], isLoading, isError } = useGetTasks()
    const { data: metadata = {} } = useGetTasksMetadata()
    const { mutate: deleteTask, isLoading: isDeleting } = useDeleteTask()
    const [taskToDelete, setTaskToDelete] = useState(null)

    useEffect(() => {
        document.title = `${PROJECT_NAME} | Home`
    }, [])

    const totalTasks = getMetadataValue(metadata, ['totalTasks', 'total', 'taskCount'], tasks.length)
    const completedTasks = getMetadataValue(
        metadata,
        ['completedTasks', 'completed', 'completedCount'],
        tasks.filter((task) => task.bIsCompleted).length
    )
    const pendingTasks = getMetadataValue(
        metadata,
        ['pendingTasks', 'pending', 'pendingCount', 'activeTasks'],
        totalTasks - completedTasks
    )
    const averageDifficulty = Number(
        getMetadataValue(
            metadata,
            ['averageDifficulty', 'avgDifficulty', 'averageDifficultyScore'],
            tasks.length ? tasks.reduce((sum, task) => sum + (task.nDifficultyScore || 0), 0) / tasks.length : 0
        )
    ).toFixed(1)
    const completionRate = Math.round(
        Number(
            getMetadataValue(
                metadata,
                ['completionRate', 'completionPercentage', 'completedPercentage'],
                totalTasks ? (completedTasks / totalTasks) * 100 : 0
            )
        )
    )

    const stats = {
        total: totalTasks,
        completed: completedTasks,
        pending: pendingTasks,
        averageDifficulty,
        completionRate
    }

    const handleCloseDeleteModal = () => {
        if (isDeleting) return
        setTaskToDelete(null)
    }

    const handleConfirmDelete = () => {
        if (!taskToDelete?._id) return

        deleteTask(taskToDelete._id, {
            onSuccess: () => {
                setTaskToDelete(null)
            }
        })
    }

    return (
        <div className="home-page">
            <section className="dashboard-hero">
                <div className="dashboard-hero__content">
                    <span className="dashboard-hero__eyebrow">Smart task manager</span>
                    <h1>Plan the day around energy, not just deadlines.</h1>
                    <p>Your assistant scores each task, groups it by context, and helps you keep the active queue focused.</p>
                </div>

                <div className="dashboard-hero__stats">
                    <div className="hero-stat-card hero-stat-card--feature">
                        <span>Completion</span>
                        <strong>{stats.completionRate}%</strong>
                        <p>{stats.completed} of {stats.total} tasks finished</p>
                    </div>
                    <div className="hero-stat-card">
                        <span>Pending</span>
                        <strong>{stats.pending}</strong>
                    </div>
                    <div className="hero-stat-card">
                        <span>Avg. difficulty</span>
                        <strong>{stats.averageDifficulty}</strong>
                    </div>
                </div>
            </section>

            <section className="dashboard-overview">
                <div className="overview-card overview-card--highlight">
                    <span>Total tasks</span>
                    <strong>{stats.total}</strong>
                    <p>Everything currently on your board.</p>
                </div>
                <div className="overview-card">
                    <span>Active focus</span>
                    <strong>{stats.pending}</strong>
                    <p>Tasks still waiting for attention.</p>
                </div>
                <div className="overview-card">
                    <span>Completed</span>
                    <strong>{stats.completed}</strong>
                    <p>Work you have already wrapped up.</p>
                </div>
            </section>

            <TaskForm />

            <section className="tasks-panel">
                <div className="tasks-panel__header">
                    <div>
                        <span className="tasks-panel__eyebrow">Task board</span>
                        <h2>See what needs focus next.</h2>
                    </div>
                    <div className="tasks-panel__badge">{stats.total} total</div>
                </div>

                <TaskList
                    tasks={tasks}
                    isLoading={isLoading}
                    isError={isError}
                    onRequestDelete={setTaskToDelete}
                />
            </section>

            <CustomModal
                open={Boolean(taskToDelete)}
                handleClose={handleCloseDeleteModal}
                handleConfirm={handleConfirmDelete}
                isLoading={isDeleting}
                title="Delete task?"
                subtitle={taskToDelete ? `This will permanently remove <strong>${taskToDelete.sTitle}</strong> from your dashboard.` : ''}
                className="delete-task-modal"
                maxWidth="sm"
            >
                <div className="delete-task-modal__content">
                    <div className="delete-task-modal__icon">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                            <path d="M12 9v4M12 17h.01" strokeLinecap="round" />
                            <path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0Z" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </div>
                    <p>This action cannot be undone. Please confirm before we remove it.</p>
                </div>
            </CustomModal>
        </div>
    )
}

export default Dashboard
