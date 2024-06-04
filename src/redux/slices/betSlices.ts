import { createSlice } from '@reduxjs/toolkit';

// Define interface for a single bet
interface Bet {
  betAmount: number;
  targetMultiplier: number;
}

// Define interface for the slice state
export interface BetState {
  bets: Bet[]; // Array of past bets with type Bet
  next_number: number;
  current_bet: {
    betAmount: number;
    targetMultiplier: number;
  };
}

const initialState: BetState = {
  bets: [],
  next_number: 0,
  current_bet: {
    betAmount: 0,
    targetMultiplier: 1,
  },
};

export const betSlice = createSlice({
  name: 'bets',
  initialState,
  reducers: {
    makeNewBet: (state, action: { payload: Bet }) => {
      state.bets.push(action.payload); 
    },
    handleBetChange: (state, action: { payload: { betAmount: number; targetMultiplier: number } }) => {
      state.current_bet = action.payload; 
    },
    generateNextNumber: (state) => {
      const nextNum = Math.random() * (100 - 1 + 1) + 1;
      state.next_number = nextNum; 
    },
  },
});

export const { makeNewBet, handleBetChange, generateNextNumber } = betSlice.actions;

export default betSlice.reducer;