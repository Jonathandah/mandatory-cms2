import { BehaviorSubject } from "rxjs";

export const items$ = new BehaviorSubject(
  JSON.parse(window.localStorage.getItem("items") || null)
);

export function updateItems(newItem) {
  if (!newItem) {
    window.localStorage.removeItem("items");
  } else {
    window.localStorage.setItem("items", JSON.stringify(newItem));
  }

  items$.next(newItem);
}
