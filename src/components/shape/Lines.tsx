import React from 'react';

interface LineProps {
  height?: 'h-0.5' | 'h-px';
}

const Line: React.FC<LineProps> = ({ height = 'h-0.5' }) => {
  return <div className={`w-full ${height} bg-alto`}></div>;
};

export default Line;
