import { useState } from 'react';
import styles from '@/styles/TripCard.module.scss';
import TripModal from './TripModal';

type Trip = {
    id: number;
    name: string;
    image: string;
    description: string;
    long_description: string;
    rating: number;
};

type Props = {
    trip: Trip;
};

export default function TripCard({ trip }: Props) {
    const [open, setOpen] = useState(false);

    return (
        <>
            <div className={styles.card}>
                <img
                    src={trip.image}
                    alt={trip.name}
                    className={styles.image}
                />

                <h3 className={styles.title}>{trip.name}</h3>
                <p className={styles.rating}>⭐ {trip.rating}</p>
                <p className={styles.description}>{trip.description}</p>

                <button
                    className={styles.button}
                    onClick={() => setOpen(true)}
                >
                    More Info
                </button>
            </div>

            {open && (
                <TripModal
                    trip={trip}
                    onClose={() => setOpen(false)}
                />
            )}
        </>
    );
}
