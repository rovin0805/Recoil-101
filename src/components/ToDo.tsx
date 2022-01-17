import React from "react";
import { useSetRecoilState } from "recoil";
import { Categories, IToDo, toDoState } from "../atoms";

function ToDo({ id, text, category }: IToDo) {
  const setToToDos = useSetRecoilState(toDoState);

  const onClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const {
      currentTarget: { name },
    } = event;
    setToToDos((prev) => {
      const targetIndex = prev.findIndex((toDo) => toDo.id === id);
      const front = prev.slice(0, targetIndex);
      const newToDo = { id, text, category: name as Categories };
      const back = prev.slice(targetIndex + 1);
      return [...front, newToDo, ...back];
    });
  };

  return (
    <li>
      <span>{text}</span>
      {category !== Categories.TO_DO && (
        <button name={Categories.TO_DO} onClick={onClick}>
          Doing
        </button>
      )}
      {category !== Categories.DOING && (
        <button name={Categories.DOING} onClick={onClick}>
          To Do
        </button>
      )}
      {category !== Categories.DONE && (
        <button name={Categories.DONE} onClick={onClick}>
          Done
        </button>
      )}
    </li>
  );
}

export default ToDo;
