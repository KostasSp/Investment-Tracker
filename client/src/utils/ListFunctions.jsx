// I don't think redux would be suitable for these because state does not get passed to components that are
//not a direct parent-child relationship. Redux creator suggests not to use Redux unless absolutely necessary
export const deleteRow = (index, data, setData) => {
  let newArr = [...data["data"]];
  newArr.splice(index, 1);
  setData({
    data: newArr,
  });
};

export const changeListOrder = (index, direction, data, setData) => {
  let newArr = data.data;
  let holder = newArr[direction];
  if (typeof holder === "undefined") return;
  newArr[direction] = newArr[index];
  newArr[index] = holder;
  setData({
    data: newArr,
  });
};
