import {
  createSlice,
  createAsyncThunk,
  type PayloadAction,
} from "@reduxjs/toolkit";
import {
  getAllHabits,
  updateHabit,
  createHabit,
  ownerHabit,
} from "../apis/habitsapi";

interface Habit {
  _id: string;
  title: string;
  done: boolean;
}

interface HabitState {
  items: Habit[];
  loading: boolean;
  error: string | null;
}

const initialState: HabitState = {
  items: [],
  loading: false,
  error: null,
};

export const fetchHabits = createAsyncThunk("habit/fetchall", async () => {
  const { getAll } = getAllHabits();
  const res = await getAll();
  return res ?? [];
});

export const addHabit = createAsyncThunk(
  "habit/createhabit",
  async ({ title, userID }: { title: string; userID: string }) => {
    const { create } = createHabit();
    const res = await create(title, userID);
    return {
      _id: res._id ?? res.payload?._id ?? "temp-id",
      title: res.title ?? res.payload?.title ?? title,
      done: res.done ?? res.payload?.done ?? false,
    };
  }
);

export const changeHabit = createAsyncThunk(
  "habits/changeHabit",
  async (habitId: string, { rejectWithValue }) => {
    try {
      const { markHabitAsDone } = updateHabit();
      const updated = await markHabitAsDone(habitId);
      return updated;
    } catch (err: any) {
      return rejectWithValue(err.message || "Failed to update habit");
    }
  }
);

export const ownerHabits = createAsyncThunk(
  "habit/ownerHabits",
  async (token: string) => {
    const { getOwnerOnes } = ownerHabit(token);
    return await getOwnerOnes();
  }
);

const habitSlice = createSlice({
  name: "habits",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchHabits.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchHabits.fulfilled, (state, action: PayloadAction<any[]>) => {
        state.items = action.payload.map((h) => ({
          _id: h._id,
          title: h.title ?? h.payload?.title ?? "",
          done: h.done ?? h.payload?.done ?? false,
        }));
        state.loading = false;
      })
      .addCase(fetchHabits.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "Error fetching habits";
      })
      .addCase(addHabit.fulfilled, (state, action: PayloadAction<any>) => {
        state.items.push({
          _id: action.payload._id,
          title: action.payload.title ?? action.payload.payload?.title ?? "",
          done: action.payload.done ?? action.payload.payload?.done ?? false,
        });
      })
      .addCase(changeHabit.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(changeHabit.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;
        const index = state.items.findIndex(
          (h) => h._id === action.payload._id
        );
        if (index !== -1) {
          state.items[index] = {
            _id: action.payload._id,
            title: action.payload.title ?? action.payload.payload?.title ?? "",
            done: action.payload.done ?? action.payload.payload?.done ?? false,
          };
        }
      })
      .addCase(changeHabit.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(ownerHabits.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(ownerHabits.fulfilled, (state, action: PayloadAction<any[]>) => {
        state.items = action.payload.map((h) => ({
          _id: h._id,
          title: h.title ?? h.payload?.title ?? "",
          done: h.done ?? h.payload?.done ?? false,
        }));
        state.loading = false;
        state.error = "";
      })
      .addCase(ownerHabits.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "Error fetching owner habits";
      });
  },
});

export default habitSlice.reducer;
