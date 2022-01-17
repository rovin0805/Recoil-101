import React from 'react';
import { useSetRecoilState } from 'recoil';
import { IToDo, toDoState } from '../atoms';

function ToDo({ id, text, category }: IToDo) {
  const setToToDos = useSetRecoilState(toDoState);

  const onClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const {
      currentTarget: { name },
    } = event;
    setToToDos(prev => {
      const targetIndex = prev.findIndex(toDo => toDo.id === id);
      const front = prev.slice(0, targetIndex);
      const newToDo = { id, text, category: name as IToDo['category'] };
      const back = prev.slice(targetIndex + 1);
      return [...front, newToDo, ...back];
    });
  };

  return (
    <li>
      <span>{text}</span>
      {category !== 'DOING' && (
        <button name='DOING' onClick={onClick}>
          Doing
        </button>
      )}
      {category !== 'TO_DO' && (
        <button name='TO_DO' onClick={onClick}>
          To Do
        </button>
      )}
      {category !== 'DONE' && (
        <button name='DONE' onClick={onClick}>
          Done
        </button>
      )}
    </li>
  );
}

export default ToDo;
