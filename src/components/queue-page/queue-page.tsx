import React, { useEffect, useState, useMemo } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from '../ui/input/input';
import { Button } from '../ui/button/button';
import { Circle } from '../ui/circle/circle';
import styles from './styles.module.css';
import { ElementStates } from '../../types/element-states';
import { setPause } from '../utils/setPause';
import { Queue } from "./queue";

type TArrSymbol = {
  head: string
  value: string
  state?: ElementStates
  tail: string
}

type TBacklight = {
  index: number
  state: ElementStates
}

type TIsLoader = {
  isLoaderAdd: boolean
  isLoaderDel: boolean
  isLoaderClear: boolean
}


export const QueuePage: React.FC = () => {
  const [inputValue, setInputValue] = useState<string>('');
  const [arrSymbols, setArrSymbols] = useState<TArrSymbol[]>([])
  const [taskInProgressPush, setTaskInProgressPush] = useState<boolean>(true);
  const [taskInProgressDel, setTaskInProgressDel] = useState<boolean>(true);
  const [backlight, setBacklight] = useState<TBacklight>({ index: 0, state: ElementStates.Default })
  const [isLoader, setIsloader] = useState<TIsLoader>({
    isLoaderAdd: false,
    isLoaderDel: false,
    isLoaderClear: false
  })

  const queue = useMemo(() => new Queue<string>(7), []);

  useEffect(() => {
    const emptyArray = queue.getQueue()
    setArrSymbols([...emptyArray])
  }, []);


  const onChange = (evt: React.SyntheticEvent<HTMLInputElement, Event>) => {
    const element = evt.currentTarget.value;
    setTaskInProgressPush(false);
    setInputValue(element);
  };

  const showQueue = async (indx: number) => {
    const arrData = queue.getQueue();
    setArrSymbols([...arrData]);
    setBacklight({ index: indx, state: ElementStates.Changing })
    setBacklight({ index: indx, state: ElementStates.Default })
  }

  const enqueue = async () => {
    setIsloader({...isLoader, isLoaderAdd: true})
    const numberTail = queue.getTail();
    if (numberTail >= 7) {
      return
    }
    queue.enqueue(inputValue);
    showQueue(numberTail)
    setTaskInProgressDel(false);
    setTaskInProgressPush(true);
    setInputValue('')
    await setPause(500);
    setIsloader({...isLoader, isLoaderAdd: false})
  }

  const dequeue = async () => {
    setIsloader({...isLoader, isLoaderDel: true})
    const numberHead = queue.getHead();
    queue.dequeue('');
    showQueue(numberHead);
    await setPause(500);
    setIsloader({...isLoader, isLoaderDel: false})
  }

  const clear = async () => {
    setIsloader({...isLoader, isLoaderClear: true})
    queue.clear();
    const emptyArray = queue.getQueue()
    setArrSymbols([...emptyArray]);
    setTaskInProgressDel(true);
    await setPause(500);
    setIsloader({...isLoader, isLoaderClear: false})
  }


  return (
    <SolutionLayout title="Очередь">
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
          onClick={enqueue}
          disabled={taskInProgressPush}
          isLoader={isLoader.isLoaderAdd}
        />
        <Button
          text="Удалить"
          extraClass={styles.buttonDelete}
          onClick={dequeue}
          disabled={taskInProgressDel}
          isLoader={isLoader.isLoaderDel}
        />
        <Button
          text="Очистить"
          onClick={clear}
          isLoader={isLoader.isLoaderClear}
        />
      </div>

      <ul className={styles.circles}>
        {!!arrSymbols &&
          arrSymbols.map((item, index) => {
            return (
              <Circle
                key={index}
                state={index === backlight.index ? backlight.state : ElementStates.Default}
                extraClass={styles.circle}
                letter={item.value}
                index={index}
                head={item.head}
                tail={item.tail}
              />
            );
          })}
      </ul>

    </SolutionLayout>
  );
};
