export const ListFunctions = () => {
  const deleteRow = (index, array, setFunc) => {
    let newArr = [array];
    newArr.splice(index, 1);
    setFunc({ data: newArr });
  };
};
