import TripCard from './TripCard';
import styles from '@/styles/Grid.module.scss';

type Trip = {
    id: number;
    name: string;
    image: string;
    description: string;
    long_description: string;
    rating: number;
};

type Props = {
    trips: Trip[];
};

export default function TripGrid({ trips }: Props) {
    return (
        <div className={styles.grid}>
            {trips.map((trip) => (
                <TripCard key={trip.id} trip={trip} />
            ))}
        </div>
    );
}
