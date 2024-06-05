import React from 'react';
import { AnimatePresence, motion } from "framer-motion";

interface Bet {
  id: string; // Assuming bet has a unique identifier
  targetMultiplier: number;
  generatedNumber: number;
  betAmount: number;
}

const RecentHistory: React.FC<Props> = ({ bets }: Props) => {
  const bets_list = [...bets].reverse(); 

  return (
    <div className=' flex flex-col gap-2 p-4 bg-slate-950 border border-slate-500 w-full rounded-md'>
      <p className='text-white text-center font-medium'>Recent History</p>
      <div className='flex flex-col gap-1 overflow-x-hidden overflow-y-auto h-72 '>
        <AnimatePresence mode={'popLayout'}>
          {bets_list.map((bet: Bet) => {
            const won = bet.targetMultiplier >= bet.generatedNumber;
            return (
              <motion.div
                layout
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{ type: "spring" }}
                key={bet.id}
                className={`flex flex-row gap-1 md:gap-2  bg-slate-900 lg:gap-4 xl:gap-8 items-center px-4 py-2  border-[1px] rounded-xl ${
                  won ? 'border-slate-950' : 'border-red-500'
                }`}
              >
                <div className='flex flex-col'>
                  <p className='text-slate-400 text-[10px] md:text-[12px]'>Bet Amount</p>
                  <div className='flex flex-row items-end gap-1'>
                    <p className='text-white text-[10px] md:text-[11px] mb-1'>ETB</p>
                    <p className='text-white font-bold text-base md:text-lg'>{bet.betAmount}</p>
                  </div>
                </div>

                {won && (
                  <>
                    <div className='w-1.5 h-1.5 bg-slate-500 rounded-full'></div>

                    <div className='flex flex-col'>
                      <p className='text-slate-400 text-[10px] md:text-[12px]'>Won Amount</p>
                      <div className='flex flex-row items-end gap-1'>
                        <p className='text-white text-[10px] md:text-[11px] mb-1'>ETB</p>
                        <p className='text-white font-bold text-base md:text-lg'>{bet.betAmount * bet.targetMultiplier}</p>
                      </div>
                    </div>
                  </>
                )}

                <div className='w-1.5 h-1.5 bg-slate-500 rounded-full'></div>

                <div className='flex flex-col'>
                  <p className='text-slate-400 text-[10px] md:text-[12px]'>Target Multiplier</p>
                  <p className='text-white font-bold text-base md:text-lg'>{bet.targetMultiplier}</p>
                </div>

                <div className='flex flex-grow justify-end'>
                  <p className={`italic text-lg md:text-xl font-bold ${won ? 'text-blue-600' : 'text-red-600'}`}>
                    {won ? 'WIN' : 'LOSE'}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
};

interface Props {
  bets: Bet[];
}

export default RecentHistory;
