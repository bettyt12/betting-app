import { configureStore } from '@reduxjs/toolkit';
import betReducer from '../slices/betSlices'; 
import { BetState } from '../slices/betSlices';

interface AppState {
  bets: BetState; 
}

export default configureStore<AppState>({
  reducer: {
    bets: betReducer,
  },
});