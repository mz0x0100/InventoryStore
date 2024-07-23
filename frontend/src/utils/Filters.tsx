import { SetStateAction } from "react";

export const useFilter = (
  items: Array<string>,
  setItems: React.Dispatch<SetStateAction<Array<string>>>
) => {
  const filter = (filter: string) => {
    const qualifiedItems: Array<string> = [];

    items.forEach((item) => {
      if (item.toLowerCase().indexOf(filter.toLowerCase()) > -1) {
        qualifiedItems.push(item);
      }
    });

    setItems(qualifiedItems);
  };

  return filter;
};

export const filterItems = (items: Array<string>, filter: string) => {
  const qualifiedItems: Array<string> = [];

  items.forEach((item) => {
    if (item.toLowerCase().indexOf(filter.toLowerCase()) > -1) {
      qualifiedItems.push(item);
    }
  });

  return qualifiedItems;
};
