import { configureStore } from "@reduxjs/toolkit";


const store = configureStore({
    reducer : {
        //add a habit reducer
    },
});


export type RootState = ReturnType<typeof store.getState>;
export type AddDispatch =typeof store.dispatch;