import React, { useState, useEffect } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styles from './styles.module.css';
import { RadioInput } from '../ui/radio-input/radio-input';
import { Button } from '../ui/button/button';
import { Column } from '../ui/column/column'
import { ElementStates } from '../../types/element-states';
import { setPause } from '../utils/setPause';
import { Direction } from "../../types/direction"

type TArrSymbol = {
  number: number
  state: ElementStates
}

export const SortingPage: React.FC = () => {
  const [radioCheked, setRadioCheked] = useState<'selection' | 'bubble'>("selection");
  const [arrNumbers, setArrNumbers] = useState<TArrSymbol[]>([]);
  const [taskInProgressUpSort, setTaskInProgressUpSort] = useState<boolean>(false);
  const [taskInProgressDownSort, setTaskInProgressUDownSort] = useState<boolean>(false);


  useEffect(() => {
    randomArr();
  }, []);

  const swithSort = (variantSort: 'topSort' | 'downSort') => {
    if (radioCheked === 'selection') {
      getSelectionSort(variantSort)
    }
    if (radioCheked === 'bubble') {
      getBubbleSort(variantSort)
    }
  }


  const randomArr = () => {
    const arr: TArrSymbol[] = []
    const randomColumns = Math.floor(Math.random() * (17 - 3)) + 3;
    for (let i = 0; i <= randomColumns; i++) {
      arr.push({ number: Math.floor(Math.random() * (100 - 0)), state: ElementStates.Default })
    }
    setArrNumbers([...arr])
  }

  const getSelectionSort = async (variantSort: 'topSort' | 'downSort') => {
    const arrCopy: TArrSymbol[] = Object.assign([], arrNumbers);
    for (let i = 0; i < arrCopy.length; i++) {
      let indexMinMax = i;
      for (let j = i + 1; j < arrCopy.length; j++) {
        if (variantSort === 'topSort') {
          setTaskInProgressUpSort(true)
          if (arrCopy[j].number < arrCopy[indexMinMax].number) {
            indexMinMax = j
          }
        }
        if (variantSort === 'downSort') {
          setTaskInProgressUDownSort(true)
          if (arrCopy[j].number > arrCopy[indexMinMax].number) {
            indexMinMax = j
          }
        }
        arrCopy[i].state = ElementStates.Changing;
        arrCopy[j].state = ElementStates.Changing;
        setArrNumbers([...arrCopy]);
        await setPause(800);
        arrCopy[j].state = ElementStates.Default;
        setArrNumbers([...arrCopy]);
      }
      let temp = arrCopy[i].number;
      arrCopy[i].number = arrCopy[indexMinMax].number;
      arrCopy[indexMinMax].number = temp;
      arrCopy[i].state = ElementStates.Modified
      setArrNumbers([...arrCopy]);

    }
    setTaskInProgressUDownSort(false);
    setTaskInProgressUpSort(false)
    setArrNumbers([...arrCopy])
  }


  const getBubbleSort = async (variantSort: 'topSort' | 'downSort') => {
    const arrCopy: TArrSymbol[] = Object.assign([], arrNumbers);
    let d = 0
    for (let i = 0; i < arrCopy.length; i++) {
      for (let j = 0; j < (arrCopy.length - 1) - i; j++) {
        if (variantSort === 'topSort') {
          setTaskInProgressUpSort(true)
          if (arrCopy[j + 1].number < arrCopy[j].number) {
            let temp = arrCopy[j].number;
            arrCopy[j].number = arrCopy[j + 1].number;
            arrCopy[j + 1].number = temp;
          }
        }
        if (variantSort === 'downSort') {
          setTaskInProgressUDownSort(true)
          if (arrCopy[j + 1].number > arrCopy[j].number) {
            let temp = arrCopy[j].number;
            arrCopy[j].number = arrCopy[j + 1].number;
            arrCopy[j + 1].number = temp;
          }
        }
        d = j + 1
        arrCopy[j].state = ElementStates.Changing
        arrCopy[j + 1].state = ElementStates.Changing
        setArrNumbers([...arrCopy]);
        await setPause(800);
        arrCopy[j].state = ElementStates.Default
        arrCopy[j + 1].state = ElementStates.Default
        setArrNumbers([...arrCopy]);
      }
      arrCopy[d].state = ElementStates.Modified
    }
    arrCopy[0].state = ElementStates.Modified;
    setTaskInProgressUDownSort(false);
    setTaskInProgressUpSort(false)
    setArrNumbers([...arrCopy])
  }


  return (
    <SolutionLayout title="Сортировка массива">
      <div className={styles.block}>
        <RadioInput
          label="Выбор"
          extraClass={styles.radio}
          value="selection"
          checked={radioCheked === "selection"}
          onChange={() => setRadioCheked("selection")}
          disabled={taskInProgressDownSort || taskInProgressUpSort}
        />
        <RadioInput
          label="Пузырёк"
          extraClass={styles.radio}
          value="bubble"
          checked={radioCheked === "bubble"}
          onChange={() => setRadioCheked("bubble")}
          disabled={taskInProgressDownSort || taskInProgressUpSort}
        />
        <Button
          text="По возрастанию"
          sorting={Direction.Ascending}
          extraClass={styles.button_sortUp}
          // onClick={() => getSortUp("topSort")}
          onClick={() => swithSort("topSort")}
          isLoader={taskInProgressUpSort}
          disabled={taskInProgressDownSort}
        />
        <Button
          text="По убыванию"
          sorting={Direction.Descending}
          extraClass={styles.button_sortDown}
          onClick={() => swithSort("downSort")}
          isLoader={taskInProgressDownSort}
          disabled={taskInProgressUpSort}
        />
        <Button
          text="Новый массив"
          onClick={randomArr}
          disabled={taskInProgressUpSort || taskInProgressDownSort}
        />
      </div>
      <ul className={styles.columns}>
        {
          arrNumbers.map((item, index) => {
            return (
              <Column
                key={index}
                index={item.number!}
                state={item.state}
                extraClass={styles.column}
              />
            );
          })}
      </ul>
    </SolutionLayout>
  );
};
