import React from 'react';
import styled from 'styled-components';

import media from './styled/mediaQueries';

const Footer = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  display: flex;
  flex-direction: column;
  text-align: center;
  padding: 10px 20px;
  color: #555;
  background-color: #f7f1e3;
  font-size: 14px;
  div {
    margin: 10px 5px;
  }
  a {
    color: #555;
    font-weight: 600;
    margin-left: 6px;
  }
  ${media.medium`
    flex-direction: row;
    justify-content: space-between;
  `}
`;

export default () => (
  <Footer>
    <div>
      enjoyed with
      <a href="https://developer.spotify.com/web-api/" target="_blank" rel="noopener noreferrer">
        Spotify Web API
      </a>
    </div>
    <div>
      created by
      <a href="https://github.com/anya92" target="_blank" rel="noopener noreferrer">
        anya92
      </a>
    </div>
  </Footer>
);
