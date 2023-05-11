import React, { FC, useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from '../ui/input/input';
import { Button } from '../ui/button/button';
import style from './string.module.css';
import { setPause } from '../utils/setPause';
import { Circle } from '../ui/circle/circle';


export const FibonacciPage: FC = () => {

  const [inputValue, setInputValue] = useState<string>('');
  const [taskInProgress, setTaskInProgress] = useState<boolean>(false);
  const [numbersState, setNumbersState] = useState<number[]>([])
  const [showCircles, setShowCircles] = useState<boolean>(false);
  const [disabledBatton, setDisabledBatton] = useState<boolean>(false)
  const fib: number[] = [];
  const fibNumbers: number[] = fib.map((item) => {
    return item
  });

  const onChange = (evt: React.SyntheticEvent<HTMLInputElement, Event>) => {
    const element = Number( evt.currentTarget.value)
    
    if (element > 19) {
      setDisabledBatton(true)
    } else {
      setDisabledBatton(false)
    }
    setInputValue(String(element));
  };

  const goTheTask = async (inputValue: string ) => {

    setShowCircles(true);
    setTaskInProgress(true);
    const fibNumber = Number(inputValue)
    if (fibNumber <= 0 || fibNumber > 19) {
      return 0;
    }
    for (let i = 1; i <= fibNumber; i++) {
      if (i <= 2) {
        fib[i] = 1
        fibNumbers.push(fib[i]);
        setNumbersState([...fibNumbers])
        await setPause(500);
        continue
      }
      fib[i] = fib[i - 2] + fib[i - 1];
      fibNumbers.push(fib[i]);
      setNumbersState([...fibNumbers])
      await setPause(500);
    }
    setTaskInProgress(false)
  }


  return (
    <SolutionLayout title="Последовательность Фибоначчи">
      <div className={style.block}>
        <Input
          max={19}
          extraClass={style.input}
          value={inputValue}
          onChange={onChange}
          isLimitText={true}
          type="number"
        />
        <Button
          text={'Рассчитать'}
          disabled={!inputValue || disabledBatton}
          isLoader={taskInProgress}
          onClick={() => goTheTask(inputValue)}
        />
      </div>
      <ul className={style.circles}>
        {showCircles && numbersState.map((item, index) => {
          return (
            <Circle
              extraClass={style.circle}
              letter={String(item)}
              key={index}
              index={index}
            />
          )
        })}
      </ul>
    </SolutionLayout>
  );
};
