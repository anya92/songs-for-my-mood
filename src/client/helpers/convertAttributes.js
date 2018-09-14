export default (mood, danceability, energy) => {
  let min_valence;
  let max_valence;
  let min_danceability;
  let max_danceability;
  let min_energy;
  let max_energy;

  switch (mood) {
    case 'sad':
    case 'angry':
      min_valence = 0.0;
      max_valence = 0.33;
      break;
    case 'fine':
      min_valence = 0.33;
      max_valence = 0.66;
      break;
    case 'cheerful':
    case 'happy':
      min_valence = 0.66;
      max_valence = 1.0;
      break;
    default:
      break;
  }

  switch (danceability) {
    case 'lay in my bed':
      min_danceability = 0.0;
      max_danceability = 0.33;
      break;
    case 'listen to music with my headphones':
      min_danceability = 0.33;
      max_danceability = 0.66;
      break;
    case 'dance all day... and night!':
      min_danceability = 0.66;
      max_danceability = 1.0;
      break;
    default:
      break;
  }

  switch (energy) {
    case 'soft and quiet':
      min_energy = 0.0;
      max_energy = 0.33;
      break;
    case 'not too quiet and not too loud':
      min_energy = 0.33;
      max_energy = 0.66;
      break;
    case 'fast and loud':
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
