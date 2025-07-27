import request from "../utils/request";

const  Habit_URL = "http://localhost:5000/api/data";

export const getAllHabits = () => {
    const  getAll = async () => {
        return await request.get(`${Habit_URL}/`)
    }
    return {
        getAll,
    }
}

export const createHabit = () => {
  const create = async (title: string, userId: string) => {
    const response = await request.post(`${Habit_URL}/`, {
      title,
      done: false,
      userId,
    });
    return response.data;
  };

  return {
     create ,
     
    };
};

export const ownerHabit = (token: string) => {
  const getOwnerOnes = async () => {
    const res = await fetch(`${Habit_URL}/onlyOwnerones`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok) throw new Error("Failed to fetch");
    return await res.json();
  };

  return {
    getOwnerOnes,
  };
};

export const updateHabit = () => {
  const markHabitAsDone = async (habitId: string) => {
    try {
      const response = await request.put(`${Habit_URL}/${habitId}`, {
        done: true,
      });
      return response.data;
    } catch (error) {
      console.error("Failed to update habit", error);
      throw error;
    }
  };

  return {
    markHabitAsDone,
  };
};