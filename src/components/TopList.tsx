import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';

interface Bet {
  id: string; // Assuming id is a unique identifier for each bet
  targetMultiplier: number;
  generatedNumber: number;
}

interface TopListProps {
  bets: Bet[]; // Type the bets prop to be an array of Bet objects
}

const TopList: React.FC<TopListProps> = ({ bets }) => {
  const filteredBets = bets.slice(0, Math.min(bets.length, 5)).reverse(); // Concise filtering and reversal
console.log(bets);

  return (
    <div className='absolute left-0 top-0 flex flex-row gap-1 lg:gap-3 w-full justify-end p-2 md:p-4'>
      <div className='md:w-auto w-full flex flex-row gap-2'>
        <AnimatePresence mode={'sync'}>
          {filteredBets.map((bet) => {
            const won = bet.targetMultiplier >= bet.generatedNumber;
            return (
              <motion.div
                key={bet.id}
                layout
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{ type: 'spring' }}
                className={`px-3 text-[13px] flex-grow flex justify-center items-center md:text-base md:px-6 py-1.5 rounded-full font-medium tracking-wide text-white ${
                  won ? 'bg-blue-800' : 'bg-blue-400'
                }`}
              >
                {bet.generatedNumber}x
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default TopList;