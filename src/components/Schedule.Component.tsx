import { useState } from "react";
import { Day } from "../models/Day";
import { ToDoItem, ItemType, ItemCategory } from "../models/ToDoItem";
import set from "date-fns/set";
// import sub from "date-fns/sub";
import differenceInHours from "date-fns/differenceInHours";
import formatISO from "date-fns/formatISO";
import format from "date-fns/format";

import "./styles/Schedule.Component.scss";

const randomString = () => {
  return (Math.random() + 1).toString(36).substring(2);
};

export const ScheduleComponent = () => {
  const [myDay, setMyDay] = useState<Day>({
    starTime: set(new Date(), {
      hours: 8,
      minutes: 0,
      seconds: 0,
      milliseconds: 0,
    }),
    endTime: set(new Date(), {
      hours: 17,
      minutes: 0,
      seconds: 0,
      milliseconds: 0,
    }),
    interval: 30,
  });

  const [availableTime, setAvailableTime] = useState(
    differenceInHours(myDay.endTime, myDay.starTime)
  );

  const [toDoItems, setTodoItems] = useState<ToDoItem[]>([]);

  const [toDoItem, setToDoItem] = useState<ToDoItem>({
    id: randomString(),
    name: "",
    duration: 0,
    deadLine: myDay.endTime,
    type: ItemType.Fixed,
    category: ItemCategory.Static,
  });

  const toDoItemNameChange = (e: any) => {
    const value = e.target.value;
    setToDoItem({ ...toDoItem, name: value });
  };

  const toDoItemDescChange = (e: any) => {
    const value = e.target.value;
    setToDoItem({ ...toDoItem, description: value });
  };

  const toDoItemDurationChange = (e: any) => {
    const value = +e.target.value;
    setToDoItem({ ...toDoItem, duration: value });
  };

  const toDoItemDeadlineChange = (e: any) => {
    const value = e.target.value;
    setToDoItem({ ...toDoItem, deadLine: new Date(value) });
  };

  const toDoItemStartDateChange = (e: any) => {
    const value = e.target.value;
    setToDoItem({
      ...toDoItem,
      startDate: value ? new Date(value) : undefined,
    });
  };

  const toDoItemEndDateChange = (e: any) => {
    const value = e.target.value;
    setToDoItem({
      ...toDoItem,
      endDate: value ? new Date(value) : undefined,
    });
  };

  const toDoItemTypeChange = (e: any) => {
    const value = e.target.value;
    setToDoItem({ ...toDoItem, type: value });
  };

  const toDoItemCategoryChange = (e: any) => {
    const value = e.target.value;
    setToDoItem({ ...toDoItem, category: value });
  };

  const addToDoItem = () => {
    const items = [...toDoItems, { ...toDoItem, id: randomString() }];
    setTodoItems(items);
  };

  return (
    <div className="schedule-component-content">
      <div className="schedule-component-header">
        <h1>My Schedule</h1>
      </div>
      <div className="my-schedule-info">
        <div className="schedule-info-item start-day">
          <div className="start-day-label">Start</div>
          <div className="start-day-value">{formatISO(myDay.starTime)}</div>
        </div>
        <div className="schedule-info-item end-day">
          <div className="end-day-label">End</div>
          <div className="end-day-value">{formatISO(myDay.endTime)}</div>
        </div>
        <div className="schedule-info-item time-available">
          <div className="time-available-label">Available Time</div>
          <div className="time-available-value">{availableTime}</div>
        </div>
        <div className="schedule-info-item tasks-available">
          <div className="tasks-available-label">Number of Tasks</div>
          <div className="tasks-available-value">{toDoItems.length}</div>
        </div>
      </div>
      <div className="todo-item-container">
        <div className="add-todo-item-header">
          <h2>Add New To Do item</h2>
        </div>
        <div className="to-do-item-content">
          <div className="to-do-item-name">
            <div className="to-do-item-label">Name</div>
            <input
              type="text"
              onChange={toDoItemNameChange}
              value={toDoItem.name}
            />
          </div>
          <div className="to-do-item-description">
            <div className="to-do-item-label">Description</div>
            <input
              type="text"
              onChange={toDoItemDescChange}
              value={toDoItem.description}
            />
          </div>
          <div className="to-do-item-duration">
            <div className="to-do-item-label">Duration</div>
            <input
              type="number"
              onChange={toDoItemDurationChange}
              value={toDoItem.duration}
            />
          </div>
          <div className="to-do-item-deadline">
            <div className="to-do-item-label">Deadline</div>
            <input
              type="datetime-local"
              onChange={toDoItemDeadlineChange}
              value={format(toDoItem.deadLine, "yyyy-MM-dd'T'HH:mm")}
              step={1800}
            />
          </div>
          <div className="to-do-item-start-date">
            <div className="to-do-item-label">Start Date</div>
            <input
              type="datetime-local"
              onChange={toDoItemStartDateChange}
              value={
                toDoItem.startDate
                  ? format(toDoItem.startDate, "yyyy-MM-dd'T'HH:mm")
                  : undefined
              }
              step={1800}
            />
          </div>
          <div className="to-do-item-end-date">
            <div className="to-do-item-label">End Date</div>
            <input
              type="datetime-local"
              onChange={toDoItemEndDateChange}
              value={
                toDoItem.endDate
                  ? format(toDoItem.endDate, "yyyy-MM-dd'T'HH:mm")
                  : undefined
              }
              step={1800}
            />
          </div>
          <div className="to-do-item-type">
            <div className="to-do-item-label">Type</div>
            <select
              name="to-do-item-type"
              value={toDoItem.type}
              onChange={toDoItemTypeChange}
            >
              {Object.keys(ItemType).map((key) => (
                <option key={key} value={key}>
                  {key}
                </option>
              ))}
            </select>
          </div>

          <div className="to-do-item-category">
            <div className="to-do-item-label">Category</div>
            <select
              name="to-do-item-type"
              value={toDoItem.category}
              onChange={toDoItemCategoryChange}
            >
              {Object.keys(ItemCategory).map((key) => (
                <option key={key} value={key}>
                  {key}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="to-do-item-actions">
          <button className="to-do-item-add" onClick={addToDoItem}>
            Add
          </button>
        </div>
      </div>
    </div>
  );
};
