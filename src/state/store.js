import rootReducer from './reducer';
import { configureStore } from '@reduxjs/toolkit';

// const store = createStore(rootReducer, applyMiddleware(thunk));
const store = configureStore({reducer: rootReducer});

export default store;