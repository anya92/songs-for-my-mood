export default (mood, danceability, energy) => {
  let min_valence;
  let max_valence;
  let min_danceability;
  let max_danceability;
  let min_energy;
  let max_energy;

  switch (mood) {
    case 1:
    case 2:
      min_valence = 0.0;
      max_valence = 0.33;
      break;
    case 3:
      min_valence = 0.33;
      max_valence = 0.66;
      break;
    case 4:
    case 5:
      min_valence = 0.66;
      max_valence = 1.0;
      break;
    default:
      break;
  }

  switch (danceability) {
    case 1:
      min_danceability = 0.0;
      max_danceability = 0.33;
      break;
    case 2:
      min_danceability = 0.33;
      max_danceability = 0.66;
      break;
    case 3:
      min_danceability = 0.66;
      max_danceability = 1.0;
      break;
    default:
      break;
  }

  switch (energy) {
    case 1:
      min_energy = 0.0;
      max_energy = 0.33;
      break;
    case 2:
      min_energy = 0.33;
      max_energy = 0.66;
      break;
    case 3:
      min_energy = 0.66;
      max_energy = 1.0;
      break;
    default:
      break;
  }
  return {
    min_valence,
    max_valence,
    min_danceability,
    max_danceability,
    min_energy,
    max_energy,
  };
};
