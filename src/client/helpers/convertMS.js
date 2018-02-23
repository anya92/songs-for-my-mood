export default ms => {
  let minutes = Math.floor(ms / 1000 / 60);
  let seconds = Math.floor(ms / 1000 % 60);
  return `${minutes < 10 ? `0${minutes}`: minutes}:${seconds < 10 ? `0${seconds}`: seconds}`;
};
