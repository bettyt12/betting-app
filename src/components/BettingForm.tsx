import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { handleBetChange, generateNextNumber } from '../redux/slices/betSlices'; // Assuming these are action creators
import TextInput from './TextInput'; // Replace if TextInput has types

interface Bet {
	[key: string]: number | string;
  targetMultiplier: number;
  betAmount: number;
	name:string;
  // Add other bet properties as needed
}

interface AppState {
  current_bet: Bet;
  // Add other state properties as needed
}

const BettingForm: React.FC = () => {
  const dispatch = useDispatch<any>();

  const current_bet = useSelector<any, Bet>((state) => state.bets.current_bet);

  const handleBetClick = () => {
    dispatch(generateNextNumber()); // Assuming generateNextNumberAction is defined
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const updatedBet: Bet = { ...current_bet }; // Use spread operator for immutability
    updatedBet[e.target.name] = Number(e.target.value); // Ensure numeric values
    dispatch(handleBetChange(updatedBet)); // Assuming handleBetChangeAction is defined
  };

  const formValidation = (name: string, value: string): string | undefined=> {
    switch (name) {
      case 'targetMultiplier':
        if (isNaN(Number(value))) {
          return "Invalid target multiplier.";
        }
        if (Number(value) < 1 || Number(value) > 100) {
          return "Must be from 1.01 to 100.00";
        }
        return ;
      case 'betAmount':
        if (isNaN(Number(value))) {
          return "Invalid bet amount.";
        }
        return ;
      default:
        return undefined;
    }
  };

  const canBet = (): boolean => {
    const targetCheck = formValidation('targetMultiplier', current_bet.targetMultiplier.toString());
    const betAmount = formValidation('betAmount', current_bet.betAmount.toString());

    return !targetCheck && !betAmount; // All validations must pass for successful bet
  };

  return (
    <div className='w-full h-full flex flex-col p-4 gap-4 lg:gap-6 bg-slate-900'>
      <div className='flex flex-row gap-4'>
        <TextInput
          name='betAmount'
          label='Bet Amount'
          formValidation={formValidation}
          onChangeHandler={handleInputChange}
          value={current_bet.betAmount.toString()}
          placeholder='enter amount'
        />
        <TextInput
          name='profitToWin'
          label='Profit to Win'
          formValidation={formValidation} // Disable validation since it's calculated
          onChangeHandler={()=>{}} // Disable input change since it's calculated
          value={(current_bet.betAmount * current_bet.targetMultiplier).toString()}
        />
      </div>
      <TextInput
        name='targetMultiplier'
        label='Target Multiplier'
        formValidation={formValidation}
        onChangeHandler={handleInputChange}
        value={current_bet.targetMultiplier.toString()}
      />
      <TextInput
        name='winChance'
        label='Win Chance'
        formValidation={undefined} // Disable validation since it's calculated
        onChangeHandler={()=>{}} // Disable input change since it's calculated
        value={`${((current_bet.targetMultiplier) / 100) * 100}%`}
        placeholder='win chance'
      />
      <button disabled={!canBet()} className='px-8 py-2 bg-primary-blue hover:opacity-80 duration-300 text-white rounded-lg' onClick={handleBetClick}>
        Bet
      </button>
    </div>
  );
};

export default BettingForm;


