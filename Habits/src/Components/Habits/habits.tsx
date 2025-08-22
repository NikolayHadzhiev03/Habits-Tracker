import { useEffect, } from "react";
import { useDispatch, useSelector } from "react-redux";
import { type RootState, type AppDispatch } from "../../Store/store";
import { fetchHabits } from "../../Store/habitSlice";

export default function Habits() {
    const dispatch = useDispatch<AppDispatch>();
    const { items: habits, loading, error } = useSelector((state: RootState) => state.habits);

    useEffect(() => {
        dispatch(fetchHabits());
    }, [dispatch]);


    return (
        <div className="box">
            <h1 className="myhabits">All Habits</h1>
            {habits.length > 0 ? (
                habits.map((habit) => (
                    <div key={habit._id}>
                        {habit.title} - {habit.done ? "Done" : "Not Done"}
                    </div>
                ))
            ) : (
                <p>No habits found.</p>
            )}
        </div>
    );
}
