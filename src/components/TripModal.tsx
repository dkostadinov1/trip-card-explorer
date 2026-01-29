import styles from '@/styles/Modal.module.scss';

type Trip = {
    id: number;
    name: string;
    image: string;
    long_description: string;
    rating: number;
};

type Props = {
    trip: Trip;
    onClose: () => void;
};

export default function TripModal({ trip, onClose }: Props) {
    return (
        <div className={styles.overlay} onClick={onClose}>
            <div
                className={styles.modal}
                onClick={(e) => e.stopPropagation()}
            >
                <img src={trip.image} alt={trip.name} />
                <h2>{trip.name}</h2>
                <p>{trip.long_description}</p>
                <p>⭐ {trip.rating}</p>

                <button onClick={onClose}>Close</button>
            </div>
        </div>
    );
}
