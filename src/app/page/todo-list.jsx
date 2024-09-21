import styles from './todo-list.module.scss';
import logo from '../../../public/focal-point-logo.png'
import Image from 'next/image';

export default function Todo() {
    return (
        <header className={styles.header}>
            <Image
                src={logo}
                alt='FocalPoint Logo'
                width={150}
                height={36}
            />
            <h1>TODO List</h1>
            <p>
                Our flight is scheduled on
                <time datetime="2021-12-20">December 20th, 2021</time> at
                <time datetime="18:00">6:00pm</time>.
            </p>
        </header>
    )
}