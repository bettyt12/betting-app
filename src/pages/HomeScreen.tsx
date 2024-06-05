import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { makeNewBet } from '../redux/slices/betSlices';
import TopList from '../components/TopList';
import BettingForm from '../components/BettingForm';
import RecentHistory from '../components/RecentHistory';
import CounterBoard from '../components/CounterBoard';

const generateUUID = () => {
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const length = 10;

  let result = '';
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }

  return result;
};

const HomeScreen = (): JSX.Element => {
  const dispatch = useDispatch();

  const { bets, next_number, current_bet } = useSelector(
    (state: any) => state.bets
  );

  const SubmitBet = () => {
    const data = {
      ...current_bet,
      generatedNumber: next_number,
      id: generateUUID(),
    };
    console.log(data);

    dispatch(makeNewBet(data));
  };

  return (
    <div className="flex flex-1 min-h-screen p-1 md:p-4 lg:p-4 xl:p-6 flex-col gap-4 bg-slate-950">
      <div className="flex flex-col bg-slate-900 relative justify-center flex-grow rounded-xl min-h-[300px] w-full">
        <CounterBoard number={next_number} onCountFinish={SubmitBet} />
        <TopList bets={bets} />
      </div>
      <div className="flex flex-col lg:flex-row gap-4 ">
        <div className="flex bg-slate-900 rounded-xl h-auto w-full lg:w-1/2">
          <BettingForm />
        </div>
        <div className="lg:h-1/4 w-full lg:w-1/2">
          <RecentHistory bets={bets} />
        </div>
      </div>
    </div>
  );
};

export default HomeScreen;
