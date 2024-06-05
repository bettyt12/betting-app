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
    targetMultiplier: 0,
  },
};

export const betSlice = createSlice({
  name: 'bets',
  initialState,
  reducers: {
    // makeNewBet: (state, action: { payload: Bet }) => {
    //   console.log(action.payload);
      
    //   state.bets.push(action.payload); 
    // },
    // handleBetChange: (state, action: { payload: { betAmount: number; targetMultiplier: number } }) => {
    //   state.current_bet = action.payload; 
    // },
    // generateNextNumber: (state,action) => {
    //   console.log(state);
      
    //   const nextNum = Math.random() * (100 - 1 + 1) + 1;
    //   state.next_number = nextNum; 
    // },
    makeNewBet: (state, action) => {
      state.bets = [...state.bets, action.payload];
    },
    handleBetChange: (state, action) => {
      console.log(state);
      
      state.current_bet = action.payload;
    },
    generateNextNumber: (state) => {
      console.log(state,"gfg");
      
      const nextNum = Math.random() * (100 - 1 + 1) + 1;
      state.next_number = parseFloat(parseFloat(`${nextNum}`).toFixed(2));
      console.log(state.next_number);
      
    }
  },
});

export const { makeNewBet, handleBetChange, generateNextNumber } = betSlice.actions;

export default betSlice.reducer;