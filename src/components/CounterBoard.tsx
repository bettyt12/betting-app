/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';

interface Props {
  number: number;
  onCountFinish: () => void;
}

const CounterBoard: React.FC<Props> = ({ number, onCountFinish }: Props) => {
  const current_bet = useSelector((state: any) => state.bets);

  // const [num, setNum] = useState(1);
  // const [decimal, setDecimal] = useState(0);
  const [num, setNum] = useState(1);
  const numRef = useRef(num);
  const [decimal, setDecimal] = useState(0);
  const decimalRef = useRef(decimal);

  const [n, d] = `${number}`.split('.');

  const [numCountEnded, setNumCountEnded] = useState(false);
  const [decimalCountEnded, setDecimalCountEnded] = useState(false);

  useEffect(() => {
    setNum(1);
    setDecimal(0);
    setNumCountEnded(false);
    setDecimalCountEnded(false);
  }, [number]);

  useEffect(() => {
    setNum((prev) => 1);
    numRef.current = 1;

    setDecimal((prev) => 0);
    decimalRef.current = 0;

    setNumCountEnded(false);
    setDecimalCountEnded(false);
  }, [number]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (numRef.current < Number(n)) {
        setNum((n) => n + 1);
        numRef.current = numRef.current + 1;
      } else {
        setNumCountEnded((prev) => true);
      }
    }, 30);

    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [number]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (decimalRef.current < Number(d)) {
        setDecimal((n) => n + 1);
        decimalRef.current = decimalRef.current + 1;
      } else {
        setDecimalCountEnded((prev) => true);
      }
    }, 40);

    return () => clearInterval(interval);
  }, [number]);

  useEffect(() => {
    if (numCountEnded && decimalCountEnded && number > 1) {
      onCountFinish();
    }
  }, [numCountEnded, decimalCountEnded]);

  return (
    <div
      className={`text-6xl md:text-8xl tracking-wider font-semibold mt-2 ${
        !numCountEnded || !decimalCountEnded
          ? 'text-white'
          : parseFloat(current_bet.targetMultiplier) >= number
          ? 'text-sky-600'
          : 'text-red-600'
      }`}
      style={{ display: 'flex', justifyContent: 'center' }}
    >
      {num}.{decimal < 10 ? `0${decimal}` : decimal}x
    </div>
  );
};

export default CounterBoard;
