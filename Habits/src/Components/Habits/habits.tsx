import { getAllHabits } from "../../apis/habitsapi";
import { useEffect, useState } from "react";

interface Habit {
    _id: { $oid: string };
    payload: {
        title: string;
        done: boolean;
        userId: string;
    };
    userId: { $oid: string };
    timestamp: { $date: string };
    __v: number;
}

export default function Habits() {
    const { getAll } = getAllHabits();
    const [habits, setHabits] = useState<Habit[]>([]);

    useEffect(() => {
        const fetchHabits = async () => {
            try {
                const response = await getAll();
                setHabits(response ?? []);
            } catch (error) {
                console.log(error);
            }
        };
        fetchHabits();
    }, []);

    return (
        <div className="box">
            <h1 className="myhabits">My Habits</h1>
            {habits.length > 0 ? (
                habits.map((habit) => (
                    <div key={habit._id.$oid}>
                        {habit.payload.title} - {habit.payload.done ? "Done" : "Not Done"}
                    </div>
                ))
            ) : (
                <p>No habits found.</p>
            )}
        </div>
    );
}
