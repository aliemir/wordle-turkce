const second = 1000;
const minute = second * 60;
const hour = minute * 60;

export const parseTimeFromMs = (ms: number) => {
  const hours = Math.floor(ms / hour);
  const minutes = Math.floor((ms - hour * hours) / minute);
  const seconds = Math.floor((ms - hour * hours - minute * minutes) / second);

  return [hours, minutes, seconds];
};
