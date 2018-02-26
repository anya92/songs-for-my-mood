import { css } from 'styled-components';

const sizes = {
  medium: 856,
  small: 520,
};

const media = Object.keys(sizes).reduce((acc, label) => {
  acc[label] = (...args) => css`
    @media all and (min-width: ${sizes[label]}px) {
      ${css(...args)}
    }
  `;

  return acc;
}, {});

export default media;
