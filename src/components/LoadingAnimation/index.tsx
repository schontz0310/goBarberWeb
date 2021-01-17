/* eslint-disable react/prop-types */
import React from 'react';
import Lottie from 'react-lottie';
import animationData from '../../assets/loading.json';

const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData,
  rendererSettings: {
    preserveAspectRatio: 'xMidYMid slice',
  },
};

interface ILoadProps {
  height: number;
  width: number;
}

const Loading: React.FC<ILoadProps> = ({ height, width }) => {
  return (
    <div
      style={{
        alignSelf: 'center',
        alignItems: 'center',
        alignContent: 'center',
        background: '#ffffff',
        borderRadius: '50%',
      }}
    >
      <Lottie options={defaultOptions} height={height} width={width} />
    </div>
  );
};
export default Loading;
