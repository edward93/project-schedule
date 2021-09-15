export type ToDoItem = {
  id: string;
  name: string;
  description?: string;
  duration: number;
  deadLine: Date;
  startDate?: Date;
  endDate?: Date;
  type: ItemType;
  category: ItemCategory;
};

export enum ItemType {
  Fixed = "Fixed",
  Dynamic = "Dynamic",
}

export enum ItemCategory {
  Fluid = "Fluid",
  Static = "Static",
}
