"use client";

import styles from './todo-list.module.scss';
import logo from '../../../public/focal-point-logo.png';
import Image from 'next/image';
import dayjs from 'dayjs';
import 'dayjs/locale/pt-br';
import { useState } from 'react';

export default function Todo() {
    dayjs.locale('pt-br');
    const today = dayjs();
    let todaysDate = today.format('dddd, DD [de] MMMM [de] YYYY');
    const [dayOfWeek, restOfDate] = todaysDate.split(', ');
    todaysDate = `${dayOfWeek.charAt(0).toUpperCase() + dayOfWeek.slice(1)}, ${restOfDate}`;

   const [showModal, setShowModal ] = useState(false);

   const handleOpenModal = () => {
        setShowModal(true);
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
                <p className={styles.todaysDate}>
                    <time dateTime={todaysDate}>{todaysDate}</time>
                </p>
            </header>
            <main className={styles.tasksContainer}>
                <p>Suas tarefas de hoje</p>
                <div>
                    {/* Here will go the tasks */}
                </div>
                <p>Tarefas finalizadas</p>
                <div>
                    {/* Here will go the finished tasks */}
                </div>
            </main>
            <button 
                className={styles.addTask} 
                onClick={setShowModal}
            >
            Adicionar nova tarefa
            </button>

            {showModal && (
                <div className={styles.openModal}>
                
                </div>)
            }
            
        </div>
    )
}