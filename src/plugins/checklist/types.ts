import { Text } from "slate";

export type CheckListItemElement = {
  type: "check-list-item";
  checked: boolean;
  children: Text[];
};
