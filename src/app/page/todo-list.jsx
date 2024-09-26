"use client";

import styles from './todo-list.module.scss';
import logo from '../../../public/focal-point-logo.png';
import Image from 'next/image';
import dayjs from 'dayjs';
import 'dayjs/locale/pt-br';
import { useEffect, useState } from 'react';
import { FiTrash } from "react-icons/fi";
import { v4 as uuidv4 } from 'uuid';

export default function Todo() {

    const [tasks, setTasks] = useState([]);
    const [newTaskTitle, setNewTaskTitle] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [taskToDelete, setTaskToDelete] = useState(null);
    const [showDeleteModal, setDeleteModal] = useState(false);

    // Load tasks from localStorage when component mounts
    useEffect(() => {
        if (typeof window !== "undefined") {
            const savedTasks = localStorage.getItem('tasks');
            if (savedTasks) {
                setTasks(JSON.parse(savedTasks));
            }
        }
    }, []);

    // Save tasks to localStorage when tasks change
    useEffect(() => {
        if (typeof window !== "undefined" && tasks.length > 0) {
            localStorage.setItem('tasks', JSON.stringify(tasks));
        }
    }, [tasks]);

    // Get current date and format it
    dayjs.locale('pt-br');
    const today = dayjs();
    let todaysDate = today.format('dddd, DD [de] MMMM [de] YYYY');
    const [dayOfWeek, restOfDate] = todaysDate.split(', ');
    todaysDate = `${dayOfWeek.charAt(0).toUpperCase() + dayOfWeek.slice(1)}, ${restOfDate}`;
    todaysDate = todaysDate.replace('-feira', '');

    // Open add task modal
    const toggleModal = () => {
        setShowModal((prevShowModal) => !prevShowModal);
    };

    // Handle adding tasks
    const handleAddTask = () => {
        if (newTaskTitle.trim()) {
            setTasks([...tasks, { id: uuidv4(), title: newTaskTitle, completed: false }]);
            setNewTaskTitle('');
            toggleModal();
        }
    };

    // Handle input change
    const handleInputChange = (event) => {
        setNewTaskTitle(event.target.value);
    };

    // Toggle task completion status
    const toggleTaskCompletion = (taskId) => {
        const updatedTasks = tasks.map(task =>
            task.id === taskId ? { ...task, completed: !task.completed } : task
        );
        setTasks(updatedTasks);
    };

    // Open delete task modal
    const openDeleteModal = (task) => {
        setTaskToDelete(task);
        setDeleteModal(true);
    };

    const handleDeleteTask = () => {
        if (taskToDelete) {
            const updatedTasks = tasks.filter(task => task.id !== taskToDelete.id);
            setTasks(updatedTasks);
            setDeleteModal(false);
            setTaskToDelete(null);
        }
    };

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <Image
                    src={logo}
                    alt='FocalPoint Logo'
                    width={150}
                    height={36}
                />
                <h1 className={styles.welcomeUser}>Bem-Vindo de volta, Marcus</h1>
                <p>
                    <time dateTime={todaysDate}>{todaysDate}</time>
                </p>
            </header>

            <main className={styles.tasksContainer}>
                <p>Suas tarefas de hoje</p>

                {/* Render active tasks */}
                <ul>
                    {tasks.length === 0 ? (
                        <p className={styles.noTasksAdded}>Nenhuma tarefa adicionada ainda</p>
                    ) : (
                        tasks
                            .filter(task => !task.completed)
                            .map((task) => (
                                <li key={task.id} className={styles.task}>
                                    <div>
                                        <input
                                            type="checkbox"
                                            checked={task.completed}
                                            onChange={() => toggleTaskCompletion(task.id)}
                                            className={`${styles.checkbox} ${task.completed ? styles.checked : styles.notCompleted}`}
                                        />
                                        <span className={`${styles.taskText} ${task.completed ? styles.completed : ''}`}>
                                            {task.title}
                                        </span>
                                    </div>
                                    <button onClick={() => openDeleteModal(task)}>
                                        <FiTrash size={24} />
                                    </button>
                                </li>
                            ))
                    )}
                </ul>

                {/* Render completed tasks */}
                {tasks.some(task => task.completed) && (
                    <>
                        <p>Tarefas finalizadas</p>
                        <ul>
                            {tasks
                                .filter(task => task.completed)
                                .map((task) => (
                                    <li key={task.id} className={styles.task}>
                                        <div>
                                            <input
                                                type="checkbox"
                                                checked={task.completed}
                                                onChange={() => toggleTaskCompletion(task.id)}
                                                className={`${styles.checkbox} ${task.completed ? styles.checked : ''}`}
                                            />
                                            <span className={`${styles.taskText} ${task.completed ? styles.completed : ''}`}>{task.title}</span>
                                        </div>
                                        <button onClick={() => openDeleteModal(task)}>
                                            <FiTrash size={24} />
                                        </button>
                                    </li>
                                ))}
                        </ul>
                    </>
                )}
            </main>

            <button
                className={styles.addTask}
                onClick={toggleModal}
            >
                Adicionar nova tarefa
            </button>

            {showModal && (
                <div className={styles.modalContainer}>
                    <div className={styles.openModal}>
                        <h2>Nova Tarefa</h2>
                        <div className={styles.newTaskInput}>
                            <span>Título</span>
                            <input
                                type="text"
                                placeholder='Digite'
                                value={newTaskTitle}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className={styles.modalButtons}>
                            <button className={styles.cancelButton} onClick={toggleModal}>Cancelar</button>
                            <button className={styles.addButton} onClick={handleAddTask}>Adicionar</button>
                        </div>
                    </div>
                </div>
            )}

            {showDeleteModal && (
                <div className={styles.modalContainer}>
                    <div className={styles.openDeleteModal}>
                        <h2>Deletar tarefa</h2>
                        <span className={styles.deleteModalText}>Tem certeza que você deseja deletar essa tarefa?</span>
                        <div className={styles.modalButtons}>
                            <button className={styles.cancelButton} onClick={() => setDeleteModal(false)}>Cancelar</button>
                            <button className={styles.deleteButton} onClick={handleDeleteTask}>Deletar</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}