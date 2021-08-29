/* eslint-disable react/prop-types */
import React, { useState } from "react";
import {
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
  useSetRecoilState,
} from "recoil";

const toDoListState = atom({ key: "toDoListState", default: [] });

const toDoListFilterState = atom({
  key: "toDoListFilterState",
  default: "Show All",
});

const filteredToDoListState = selector({
  key: "filteredToDoListState",
  get: ({ get }) => {
    const myFilter = get(toDoListFilterState);
    const list = get(toDoListState);

    switch (myFilter) {
      case "Show Completed":
        return list.filter(item => item.isComplete);
      case "Show UnCompleted":
        return list.filter(item => !item.isComplete);
      default:
        return list;
    }
  },
});

const ToDoListFilters = () => {
  const [filter, setFilter] = useRecoilState(toDoListFilterState);
  const updateFilter = ({ target: { value } }) => {
    setFilter(value);
  };
  return (
    <div>
      필터:
      <select value={filter} onChange={updateFilter}>
        <option value="Show All">All</option>
        <option value="Show Completed">Completed</option>
        <option value="Show UnCompleted">UnCompleted</option>
      </select>
    </div>
  );
};

const toDoListStatsState = selector({
  key: "toDoListStatsState",
  get: ({ get }) => {
    const toDoList = get(toDoListState);
    const totalNum = toDoList.length;
    const totalCompletedNum = toDoList.filter(item => item.isComplete).length;
    const totalUnCompletedNum = totalNum - totalCompletedNum;
    const percentCompleted = totalNum === 0 ? 0 : totalCompletedNum / totalNum;

    return {
      totalNum,
      totalCompletedNum,
      totalUnCompletedNum,
      percentCompleted,
    };
  },
});

const ToDoListStats = () => {
  const { totalNum, totalCompletedNum, totalUnCompletedNum, percentCompleted } =
    useRecoilValue(toDoListStatsState);

  const formattedPercentCompleted = Math.round(percentCompleted * 100);

  return (
    <ul>
      <li>Total items: {totalNum}</li>
      <li>Items completed: {totalCompletedNum}</li>
      <li>Items not completed: {totalUnCompletedNum}</li>
      <li>Percent completed: {formattedPercentCompleted}%</li>
    </ul>
  );
};

let id = 0;
const getID = () => {
  id += 1;
  return id;
};

const ToDoCreator = () => {
  const [inputValue, setInputValue] = useState("");
  const setToDoList = useSetRecoilState(toDoListState);

  const addToDo = () => {
    setToDoList(oldToDoList => [
      ...oldToDoList,
      {
        id: getID(),
        text: inputValue,
        isComplete: false,
      },
    ]);
    setInputValue("");
  };

  const onChange = ({ target: { value } }) => {
    setInputValue(value);
  };

  return (
    <div>
      <input type="text" value={inputValue} onChange={onChange} />
      <button type="button" onClick={addToDo}>
        Add
      </button>
    </div>
  );
};

const replaceItemAtIndex = (arr, index, newValue) => {
  return [...arr.slice(0, index), newValue, ...arr.slice(index + 1)];
};

const removeItemAtIndex = (arr, index) => {
  return [...arr.slice(0, index), ...arr.slice(index + 1)];
};

const TodoItem = ({ item }) => {
  const [toDoList, setToDoList] = useRecoilState(toDoListState);
  const index = toDoList.findIndex(listItem => listItem === item);

  const editItemText = ({ target: { value } }) => {
    const newList = replaceItemAtIndex(toDoList, index, {
      ...item,
      text: value,
    });
    setToDoList(newList);
  };

  const toggleItemCompletion = () => {
    const newList = replaceItemAtIndex(toDoList, index, {
      ...item,
      isComplete: !item.isComplete,
    });
    setToDoList(newList);
  };

  const deleteItem = () => {
    const newList = removeItemAtIndex(toDoList, index);
    setToDoList(newList);
  };

  return (
    <div>
      <input
        type="checkbox"
        checked={item.isComplete}
        onChange={toggleItemCompletion}
      />
      <input type="text" value={item.text} onChange={editItemText} />
      <button type="button" onClick={deleteItem}>
        X
      </button>
    </div>
  );
};

const ToDoList = () => {
  const toDoList = useRecoilValue(filteredToDoListState);
  return (
    <div>
      <ToDoListStats />
      <ToDoListFilters />
      <ToDoCreator />
      {toDoList.map(toDoItem => (
        <TodoItem key={toDoItem.id} item={toDoItem} />
      ))}
    </div>
  );
};

export default ToDoList;
