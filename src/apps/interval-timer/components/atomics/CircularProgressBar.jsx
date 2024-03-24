import { prop } from 'ramda';
import styled from 'styled-components';

const Box = styled.div`
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  align-items: center;
  background-color: ${prop('$backgroundColor')};
`;

const Circle = styled.div`
  width: 200px;
  height: 200px;
  border-radius: 50%;
  overflow: hidden;
  position: relative;
  background-color: inherit;
  text-align: center;
  margin: 20px;
  border: 1px solid ${prop('color')};
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Overlay = styled.div`
  width: 50%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
  background-color: inherit;
`;

const Content = styled.div`
  position: relative;
  width: 174px;
  height: 174px;
  border-radius: 50%;
  z-index: 3;
  border: 1px solid ${prop('color')};
  display: flex;
  justify-content: center;
  align-items: center;
`;

const AnimationBase = styled.div`
  width: 50%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  border: 13px solid ${prop('color')};
  border-radius: 100px 0px 0px 100px;
  border-right: 0;
  transform-origin: right;
`;

const ProgressHalf = styled(AnimationBase).attrs((props) => {
  return {
    style: {
      transform: `rotate(${props.$progress}deg)`,
    },
  };
})`
  /* left half of the circle is the cover with z-index 1, so if we want to move over it we need to set the index to > 1 */
  z-index: ${(props) => (props.$progress > 180 ? 2 : 0)};
`;

function progressToDegrees(progress) {
  return Math.round((progress * 360) / 100);
}

export function CircularProgressBar({ children, progress, bgColor, color }) {
  const progressRight = progressToDegrees(progress > 50 ? 50 : progress);
  const progressLeft = progressToDegrees(progress > 50 ? progress : 0);

  return (
    <Box $backgroundColor={bgColor}>
      <Circle>
        <Overlay color={color}></Overlay>
        <Content>{children}</Content>
        <ProgressHalf $progress={progressRight} color={color}></ProgressHalf>
        <ProgressHalf $progress={progressLeft} color={color}></ProgressHalf>
      </Circle>
    </Box>
  );
}
