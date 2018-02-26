export default (ms) => {
  const minutes = Math.floor(ms / 1000 / 60);
  const seconds = Math.floor((ms / 1000) % 60);
  return `${minutes < 10 ? `0${minutes}` : minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
};

export const getFullTime = (ms) => {
  const hours = Math.floor(ms / 1000 / 60 / 60);
  const minutes = Math.floor((ms / 1000 / 60) % 60);
  return `${hours === 1 ? `${hours} hour` : `${hours} hours`} and ${minutes === 1 ? `${minutes} minute` : `${minutes} minutes`}`;
};
