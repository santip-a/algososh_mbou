import React, { useEffect, useMemo, useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { LinkedList } from './linked-list'
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { ArrowIcon } from "../ui/icons/arrow-icon";
import styles from "./list-page.module.css";
import { ElementStates } from "../../types/element-states";
import { setPause } from '../utils/setPause';

type TArrSymbol = {
  value: string
  state: ElementStates
  insert: boolean
  remove: boolean
  stateMini: ElementStates
  valueMini: string
}

type TButtonState = {
  addHead: boolean
  addTail: boolean
  removeHead: boolean
  removeTail: boolean
  addByIndex: boolean
  removeByIndex: boolean
}

type TAllDisable = {
  diseble: boolean
  nameButton: string
}


export const ListPage: React.FC = () => {
  const [inputValue, setInputValue] = useState<string>('');
  const [inputIndex, setInputIndex] = useState<number>(0);
  const [arrSymbols, setArrSymbols] = useState<TArrSymbol[]>([]);
  const [isLoader, setIsLoader] = useState<TButtonState>({
    addHead: false,
    addTail: false,
    removeHead: false,
    removeTail: false,
    addByIndex: false,
    removeByIndex: false,
  });
  const [buttonState, setButtonState] = useState<TButtonState>({
    addHead: true,
    addTail: true,
    removeHead: false,
    removeTail: false,
    addByIndex: true,
    removeByIndex: true,
  })

  const allDis = {
    addHead: true,
    addTail: true,
    removeHead: true,
    removeTail: true,
    addByIndex: true,
    removeByIndex: true,
  }

  const linksList = useMemo(() => new LinkedList<TArrSymbol>(), []);

  useEffect(() => {
    initElemets();
    setArrSymbols(getList())
  }, [])


  const createElem = (value: string) => {
    return {
      value: value,
      state: ElementStates.Default,
      insert: false,
      remove: false,
      stateMini: ElementStates.Default,
      valueMini: ''
    };
  }


  const controlBatton = (value: string = '') => {
    
    let addByIndexState = true
    if (value && inputIndex) {
      addByIndexState = false
    }
    if (value) {
      setButtonState({ ...buttonState, addHead: false, addTail: false, addByIndex: addByIndexState });
    } else {
      setButtonState({ ...buttonState, addHead: true, addTail: true });
    }
  }

  const onChange = (evt: React.SyntheticEvent<HTMLInputElement, Event>) => {
    const element = evt.currentTarget.value;
    setInputValue(element);
    controlBatton(element)
  };

  const changeInputIndex = (evt: React.SyntheticEvent<HTMLInputElement, Event>) => {
    const element = evt.currentTarget.value;
    setInputIndex(Number(element));

    let addByIndexState = true
    if (element && inputValue  ) {
      addByIndexState = false
    }

    let verifIndex = false
    if (Number(element) >= arrSymbols.length) {
      verifIndex = true
    }

    if (element) {
      setButtonState({ ...buttonState, removeByIndex: verifIndex, addByIndex: addByIndexState });
    }
    else {
      setButtonState({ ...buttonState, removeByIndex: true, addByIndex: addByIndexState });
    }

  };


  const initElemets = () => {
    const initArr = Array.apply(null, Array(4)).map(function () {
      return createElem(String(Math.round(Math.random() * 100)))
    });

    initArr.forEach((elem) => {
      linksList.append(elem)
    })
  }


  const getList = () => {
    const s = linksList.getArray()
    const arr = s.map((elem) => {
      return {
        value: elem.data.value,
        state: elem.data.state,
        insert: false,
        remove: false,
        stateMini: ElementStates.Default,
        valueMini: ''
      }
    })
    return arr
  }



  const addInTail = async () => {
    setInputValue('');
    setIsLoader({ ...isLoader, addTail: true })
    // setButtonState({ ...buttonState, addHead: true, addTail: true });
    setButtonState({ ...allDis, addTail: false })
    const elem = createElem(inputValue)
    linksList.append(elem)
    arrSymbols[arrSymbols.length - 1].insert = true;
    arrSymbols[arrSymbols.length - 1].valueMini = inputValue;
    arrSymbols[arrSymbols.length - 1].stateMini = ElementStates.Modified
    setArrSymbols([...arrSymbols])
    await setPause(500);
    arrSymbols.push(elem)
    arrSymbols[arrSymbols.length - 2].insert = false;
    arrSymbols[arrSymbols.length - 1].state = ElementStates.Modified
    setArrSymbols([...arrSymbols])
    await setPause(500);
    arrSymbols[arrSymbols.length - 1].state = ElementStates.Default
    setArrSymbols(getList())
    setButtonState({ ...buttonState, removeHead: false, removeTail: false, addHead: true, addTail: true });
    setIsLoader({ ...isLoader, addTail: false })
  }

  const addInHead = async () => {
    setIsLoader({ ...isLoader, addHead: true })
    setButtonState({ ...allDis, addHead: false })
    setInputValue('')
    const elem = createElem(inputValue)
    linksList.prepend(elem)
    arrSymbols[0].insert = true;
    arrSymbols[0].valueMini = inputValue;
    arrSymbols[0].stateMini = ElementStates.Changing
    setArrSymbols([...arrSymbols])
    await setPause(500);
    arrSymbols.unshift(elem)
    arrSymbols[1].insert = false;
    arrSymbols[0].state = ElementStates.Modified
    setArrSymbols([...arrSymbols])
    await setPause(500);
    arrSymbols[0].state = ElementStates.Default
    setArrSymbols(getList())
    setButtonState({ ...buttonState, removeHead: false, removeTail: false, addHead: true, addTail: true })
    setIsLoader({ ...isLoader, addHead: false })
  }

  const removeElem = async (number: number) => {
    linksList.remove(number);
    setArrSymbols(getList());
    if (number === 0) {
      setIsLoader({ ...isLoader, removeHead: true })
      setButtonState({ ...allDis, removeHead: false })
    } else {
      setIsLoader({ ...isLoader, removeTail: true })
      setButtonState({ ...allDis, removeTail: false })
    }

    arrSymbols[number].remove = true;
    arrSymbols[number].valueMini = arrSymbols[number].value;
    arrSymbols[number].value = '';
    arrSymbols[number].stateMini = ElementStates.Changing;
    setArrSymbols([...arrSymbols])
    await setPause(500);
    arrSymbols[number].remove = false;
    number === 0 ? arrSymbols.shift() : arrSymbols.pop()
    setArrSymbols([...arrSymbols])

    setArrSymbols([...arrSymbols])
    await setPause(500);

    if (arrSymbols.length === 1) {
      setIsLoader({ ...isLoader, removeHead: false })
      setButtonState({ ...buttonState, removeHead: true, removeTail: true })
    } else {
      setIsLoader({ ...isLoader, removeTail: false })
      setButtonState({ ...buttonState, removeHead: false, removeTail: false })
    }

  }

  const removeByIndex = async () => {
    setIsLoader({ ...isLoader, removeByIndex: true })
    linksList.remove(inputIndex!)
    setButtonState({ ...allDis, removeByIndex: false })
    setInputIndex(0)

    for (let i = 0; i <= inputIndex!; i++) {
      arrSymbols[i].state = ElementStates.Changing;
      setArrSymbols([...arrSymbols])
      await setPause(500);
    }
    setArrSymbols([...arrSymbols])
    await setPause(500);

    arrSymbols[inputIndex!].remove = true;
    arrSymbols[inputIndex!].stateMini = ElementStates.Changing;
    arrSymbols[inputIndex!].valueMini = arrSymbols[inputIndex!].value;
    arrSymbols[inputIndex!].value = '';
    setArrSymbols([...arrSymbols])
    await setPause(500);

    arrSymbols.splice(inputIndex!, 1)
    for (let i = 0; i < inputIndex!; i++) {
      arrSymbols[i].state = ElementStates.Default;
    }
    setArrSymbols([...arrSymbols])
    await setPause(500);
    let battonState = false
    if (arrSymbols.length === 1) {
      battonState = true
    }
    setButtonState({
      ...buttonState,
      addByIndex: true,
      removeByIndex: true,
      removeHead: battonState,
      removeTail: battonState
    });
    setIsLoader({ ...isLoader, removeByIndex: false })
  }

  const addByIndex = async () => {
    const value = createElem(inputValue);
    setIsLoader({ ...isLoader, addByIndex: true })
    setButtonState({ ...allDis, addByIndex: false })
    setInputIndex(0);
    setInputValue('');

    for (let i = 0; i < inputIndex!; i++) {
      arrSymbols[i].insert = true;
      arrSymbols[i].valueMini = inputValue
      arrSymbols[i].stateMini = ElementStates.Changing;
      setArrSymbols([...arrSymbols])
      await setPause(500);
      arrSymbols[i].insert = false;
      arrSymbols[i].state = ElementStates.Changing;
    }

    arrSymbols[inputIndex!].insert = true;
    arrSymbols[inputIndex!].valueMini = inputValue
    arrSymbols[inputIndex!].stateMini = ElementStates.Changing;
    setArrSymbols([...arrSymbols])
    await setPause(500);
    arrSymbols[inputIndex!].insert = false;

    arrSymbols.splice(inputIndex!, 0, value)
    for (let i = 0; i < inputIndex!; i++) {
      arrSymbols[i].state = ElementStates.Default;
    }

    arrSymbols[inputIndex!].state = ElementStates.Modified;
    setArrSymbols([...arrSymbols])
    await setPause(500);
    arrSymbols[inputIndex!].state = ElementStates.Default;

    linksList.insertAfter(inputIndex!, value)
    setArrSymbols(getList());
    setButtonState({ ...buttonState, addHead: true, addTail: true, addByIndex: true, removeByIndex: true })
    setIsLoader({ ...isLoader, addByIndex: false })
  }

  return (
    <SolutionLayout title="Связный список">
      <div className={styles.container}>
        <Input
          type="text"
          maxLength={4}
          isLimitText={true}
          extraClass={styles.input}
          value={inputValue}
          onChange={onChange}
          disabled={
            isLoader.addHead ||
            isLoader.addTail ||
            isLoader.removeHead ||
            isLoader.removeTail ||
            isLoader.addByIndex ||
            isLoader.removeByIndex}
        />
        <Button
          text="Добавить в head"
          extraClass={styles.button_list}
          onClick={addInHead}
          disabled={buttonState.addHead}
          isLoader={isLoader.addHead}
        />
        <Button
          text="Добавить в tail"
          extraClass={styles.button_list}
          onClick={addInTail}
          disabled={buttonState.addTail}
          isLoader={isLoader.addTail}
        />
        <Button
          text="Удалить из head"
          extraClass={styles.button_list}
          onClick={() => removeElem(0)}
          disabled={buttonState.removeHead}
          isLoader={isLoader.removeHead}
        />
        <Button
          text="Удалить из tail"
          extraClass={styles.button_list}
          onClick={() => removeElem(arrSymbols.length - 1)}
          disabled={buttonState.removeTail}
          isLoader={isLoader.removeTail}
        />
      </div>
      <div className={styles.container}>
        <Input
          placeholder="Введите индекс"
          extraClass={styles.input}
          maxLength={2}
          value={inputIndex === 0 ? '' : inputIndex}
          onChange={changeInputIndex}
          disabled={
            isLoader.addHead ||
            isLoader.addTail ||
            isLoader.removeHead ||
            isLoader.removeTail ||
            isLoader.addByIndex ||
            isLoader.removeByIndex}
        />
        <Button
          text="Добавить по индексу"
          extraClass={styles.button_index}
          onClick={addByIndex}
          disabled={buttonState.addByIndex}
          isLoader={isLoader.addByIndex}
        />
        <Button
          text="Удалить по индексу"
          extraClass={styles.button_index}
          onClick={removeByIndex}
          disabled={buttonState.removeByIndex}
          isLoader={isLoader.removeByIndex}
        />
      </div>

      <ul className={styles.circles}>
        {arrSymbols.map((item, index) => {
          return (
            <li key={index} className={styles.items}>
              <Circle
                state={item.state}
                extraClass={styles.circle}
                letter={item.value}
                index={index}
                head={index === 0 ? "head" : ""}
                tail={index === arrSymbols.length - 1 ? "tail" : ""}
              />
              {arrSymbols.length > index + 1 && <ArrowIcon />}
              {item.insert && (
                <Circle
                  extraClass={styles.circle_insertion}
                  isSmall={true}
                  letter={item?.valueMini}
                  state={item.stateMini}
                />
              )}
              {item.remove && (
                <Circle
                  extraClass={styles.circle_removal}
                  isSmall={true}
                  letter={item.valueMini}
                  state={item.stateMini}
                />
              )}
            </li>
          );
        })}
      </ul>
    </SolutionLayout>
  );
};
