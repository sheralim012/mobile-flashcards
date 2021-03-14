import { configureStore } from '@reduxjs/toolkit';
import DeckReducer from '../reducers';

export default configureStore({
    reducer: {
        deck: DeckReducer,
    }
});
