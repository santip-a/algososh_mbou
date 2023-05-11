import React, { FC, useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from '../ui/input/input';
import { Button } from '../ui/button/button';
import { Circle } from '../ui/circle/circle';
import style from './string.module.css';
import { ElementStates } from '../../types/element-states';
import { setPause } from '../utils/setPause';

type TArrSymbol = {
  symbol: string
  state: ElementStates
}

export const StringComponent: FC = () => {
  const [inputValue, setInputValue] = useState<string>("");
  const [taskInProgress, setTaskInProgress] = useState<boolean>(false);
  const arrSymbols: TArrSymbol[] = inputValue.split('').map((item) => {
    return { symbol: item, state: ElementStates.Default }
  });
  const [sybolsState, setSybolsState] = useState<TArrSymbol[]>([])
  const [showCircles, setShowCircles] = useState<boolean>(false);

  const onChange = (evt: React.SyntheticEvent<HTMLInputElement, Event>) => {
    const element = evt.currentTarget.value;
    setInputValue(element);
  };

  const goTheTask = async () => {
    setTaskInProgress(true);
    setShowCircles(true)
    const length = arrSymbols.length - 1

    for (let i = 0; i <= Math.floor(length / 2); i++) {
      const temp = arrSymbols[i];

      temp.state = ElementStates.Changing;
      arrSymbols[length - i].state = ElementStates.Changing
      await setPause(1000);
      setSybolsState([...arrSymbols])

      temp.state = ElementStates.Modified;
      arrSymbols[length - i].state = ElementStates.Modified
      await setPause(1000);

      arrSymbols[i] = arrSymbols[length - i];
      arrSymbols[length - i] = temp;
      // setSybolsState([...arrSymbols])
    }

    setTaskInProgress(false);
  }


  return (
    <SolutionLayout title="Строка">
      <div className={style.block}>
        <Input
          data-testid="input"
          maxLength={11}
          extraClass={style.input}
          value={inputValue}
          onChange={onChange}
          isLimitText={true}
        />
        <Button
          data-testid="button"
          text={'Развернуть'}
          disabled={!inputValue}
          isLoader={taskInProgress}
          onClick={goTheTask}
        />
      </div>
      <ul className={style.circles}>
        {showCircles && sybolsState.map((item, index) => {
          return (
            <Circle
              extraClass={style.circle}
              letter={item.symbol}
              key={index}
              state={item.state} />
          )
        })}
      </ul>



    </SolutionLayout>
  );
};
