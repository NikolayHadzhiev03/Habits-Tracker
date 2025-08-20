import { createSlice,createAsyncThunk,PayloadAction } from "@reduxjs/toolkit";
import { getAllHabits,updateHabit,createHabit,ownerHabit } from "../apis/habitsapi";


interface Habit {
    _id : string;
    payload : {
        title : string,
        done : boolean,
    };
}

interface HabitState {
    items : Habit[];
    loading : boolean,
    error : string | null,
}

const   initialState: HabitState = {
    items : [],
    loading : false,
    error : null,
}


export const fetchHabits = createAsyncThunk("habit/fetchall", async ()=> {
    const { getAll } = getAllHabits();
    const res = await getAll();
    return res ?? [];
});

export const addHabit = createAsyncThunk("habit/createhabit",async(
    {title , userID}
    :{title: string ,userID : string})=> {
        const {create} = createHabit()
        return await create(title, userID)
});

export const changeHabit = createAsyncThunk("habit/updatehabit",async (habitID: string)=> {
    const { markHabitAsDone  } = updateHabit();
    return await markHabitAsDone(habitID);
})

export const ownerHabits = createAsyncThunk("habit/ownerHabits",async(token : string)=>{
    const {getOwnerOnes} = ownerHabit(token);

     return await getOwnerOnes();
})