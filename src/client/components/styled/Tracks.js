import styled from 'styled-components';

export const TracksContainer = styled.div`
  max-width: 600px;
  margin: 0 auto;
  color: #555;
  padding: 20px 0;
  font-family: ubuntu, sans-serif;
  display: grid;
  grid-gap: 10px;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr;
`;

export const Track = styled.div`
  padding: 10px 5px;
  display: flex;
  align-items: center;
  position: relative;
`;

export const Image = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  margin-right: 15px;
  overflow: hidden;
  img {
    height: 100%;
    width: 100%;
    object-fit: cover;
  }
`;

export const Info = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex: 1 1;
`;

export const Title = styled.div`
  margin-bottom: 10px;
  a {
    text-transform: uppercase;
    font-size: 1.15rem;
    color: #333;
    font-weight: 500;
    text-decoration: none;
  }
`;

export const Artist = styled.div`
  font-size: 1rem;  
`;

export const Play = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-end;
  font-weight: 600;
`;

export const Time = styled.div`
  margin-top: 10px;
  font-size: .9rem;
  font-weight: 300;
`;
