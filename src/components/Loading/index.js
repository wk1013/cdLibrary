import { Spin } from 'antd';

const Loading = () => {
  return (
    <div
      style={{
        textAlign: 'center',
        width: '100%',
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <Spin />
    </div>
  );
};

export default Loading;
