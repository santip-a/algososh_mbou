import React, { useState, useMemo } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from '../ui/input/input';
import { Button } from '../ui/button/button';
import { Circle } from '../ui/circle/circle';
import styles from './styles.module.css';
import { ElementStates } from '../../types/element-states';
import { setPause } from '../utils/setPause';
import { Stack } from "./stack";

type TArrSymbol = {
  top: string
  value: string
  state: ElementStates
}

export const StackPage: React.FC = () => {
  const [inputValue, setInputValue] = useState<string>('');
  const [arrSymbols, setArrSymbols] = useState<TArrSymbol[]>([])
  const [taskInProgressPush, setTaskInProgressPush] = useState<boolean>(true);
  const [taskInProgressDel, setTaskInProgressDel] = useState<boolean>(true);
  const [loaderPush, setLoaderPush] = useState<boolean>(false);
  const [loaderPop, setLoaderPop] = useState<boolean>(false)

  const stack = useMemo(() => new Stack<TArrSymbol>(), []);

  const onChange = (evt: React.SyntheticEvent<HTMLInputElement, Event>) => {
    const element = evt.currentTarget.value;
    setTaskInProgressPush(false)
    setInputValue(element);
  };


  const push = async () => {
    setTaskInProgressPush(true);
    setLoaderPush(true);
    if (!inputValue) {
      return
    }  
    const arr = stack.getElemets();
    if (arr.length > 0) {
      arr[arr.length - 1].top = ''
    }
    stack.push({
      top: 'top',
      value: inputValue,
      state: ElementStates.Default
    })
    arr[arr.length - 1].state = ElementStates.Changing
    setArrSymbols([...arr]);
    await setPause(500);
    arr[arr.length - 1].state = ElementStates.Default
    setArrSymbols([...arr]);
    setInputValue('');
    setTaskInProgressPush(true);
    setTaskInProgressDel(false);
    setLoaderPush(false)
  }



  const pop = async () => {
    setTaskInProgressDel(true);
    setLoaderPop(true);
    stack.pop()
    const arr = stack.getElemets();
    if(arr.length === 0) {
      clearStack();
      setTaskInProgressDel(true);
      setLoaderPop(false);
      return
    }
    arr[arr.length - 1].state = ElementStates.Changing
    setArrSymbols([...arr]);
    await setPause(500);
    arr[arr.length - 1].state = ElementStates.Default
    setArrSymbols([...arr]);
    if (arrSymbols.length <= 1) {
      setArrSymbols([]);
      setTaskInProgressDel(false);
      setLoaderPop(false);
      return
    }
    arr[arr.length - 1].top = 'top';
    setArrSymbols([...arr]);
    setTaskInProgressDel(false);
    setLoaderPop(false);
  }

  const clearStack = () => {
    setArrSymbols([]);
    setTaskInProgressDel(true);
    stack.clear()
  }

  return (
    <SolutionLayout title="Стек">
      <div className={styles.container}>
        <Input
          extraClass={styles.input}
          type="text"
          maxLength={4}
          isLimitText={true}
          value={inputValue}
          onChange={onChange}
        />
        <Button
          text="Добавить"
          extraClass={styles.buttonAdd}
          onClick={push}
          disabled={taskInProgressPush}
          isLoader={loaderPush}
        />
        <Button
          text="Удалить"
          extraClass={styles.buttonDelete}
          onClick={pop}
          disabled={taskInProgressDel}
          isLoader={loaderPop}
        />
        <Button
          text="Очистить"
          disabled={taskInProgressDel}
          onClick={clearStack}
        />
      </div>

      <ul className={styles.circles}>
        {arrSymbols &&
          arrSymbols.map((item, index) => {
            return (
              <Circle
                key={index}
                state={item.state}
                extraClass={styles.circle}
                letter={item.value}
                index={index}
                head={item.top}
              />
            );
          })}
      </ul>

    </SolutionLayout>
  );
};
