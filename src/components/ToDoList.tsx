import React from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  Categories,
  categoryState,
  toDoSelector,
  minuteState,
  hourSelector,
} from "../atoms";
import CreateToDo from "./CreateToDo";
import ToDo from "./ToDo";

function ToDoList() {
  const toDos = useRecoilValue(toDoSelector);
  const [category, setCategory] = useRecoilState(categoryState);
  const [minutes, setMinutes] = useRecoilState(minuteState);
  const hours = useRecoilValue(hourSelector);

  const onInput = (event: React.FormEvent<HTMLSelectElement>) => {
    const {
      currentTarget: { value },
    } = event;
    setCategory(value as Categories);
  };

  const onMinutesChange = (event: React.FormEvent<HTMLInputElement>) => {
    setMinutes(+event.currentTarget.value);
  };

  return (
    <div>
      <h1>To Do List</h1>
      <hr />
      <div>
        <input
          value={minutes}
          onChange={onMinutesChange}
          type="number"
          placeholder="Minutes"
        />
        <input value={hours} type="number" placeholder="Hours" />
      </div>
      <hr />
      <select value={category} onInput={onInput}>
        <option value={Categories.TO_DO}>To Do</option>
        <option value={Categories.DOING}>Doing</option>
        <option value={Categories.DONE}>Done</option>
      </select>
      <CreateToDo />
      {toDos?.map((toDo) => (
        <ToDo key={toDo.id} {...toDo} />
      ))}
    </div>
  );
}

export default ToDoList;
