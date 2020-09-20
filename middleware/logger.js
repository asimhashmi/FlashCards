export default function logger(store) {
  return (next) => (action) => {
    console.group(action.type);
    console.log("Action:");
    console.log(action);
    const returnValue = next(action);
    console.log("New State:");
    console.log(store.getState());
    console.groupEnd();

    return returnValue;
  };
}
