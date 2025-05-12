import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    messages: [],
    loading: false,
    error: null
};

const messageSlice = createSlice({
    name: "message",
    initialState,
    reducers: {
        setMessages: (state, action) => {
            // Ensure we always store an array
            state.messages = action.payload?.messages || action.payload || [];
        },
        addMessage: (state, action) => {
            // Initialize as empty array if undefined
            if (!state.messages) state.messages = [];
            state.messages.push(action.payload);
        },
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        setError: (state, action) => {
            state.error = action.payload;
        }
    }
});

export const {setMessages, addMessage, setLoading, setError} = messageSlice.actions;
export default messageSlice.reducer;