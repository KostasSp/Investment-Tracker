import { useEffect } from "react";

/* These counter functions optimise for the lowest waiting time between searches for the user, as a limited 
number of API calls can be made every minute (due to the API's restrictions). As soon as the first search is 
made, the counter starts, and resets 60 seconds after the first search. 
The alternative would be to let the user simply make searches that would be denied by the API, which does not 
provide an ETA on when a new API call can be made. Consequently, the user would have to keep searching to check 
availability, wasting time and API calls*/
const startCounter = (setLimitReached, apiCallCount) => {
  let seconds = 0;
  let count = setInterval(() => {
    seconds++;
    if (seconds === 60) {
      setLimitReached(false);
      clearInterval(count);
      apiCallCount.current = 0;
    }
  }, 1000);
};

//need to clear this somehow, otherwise a new interval is set every minute...
const resetCounter = (setLimitReached, apiCallCount) => {
  setInterval(() => (apiCallCount.current = 0), 60000);
  setLimitReached(true);
};

export { startCounter, resetCounter };
