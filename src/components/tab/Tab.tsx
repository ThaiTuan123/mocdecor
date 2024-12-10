import React, { useState } from 'react';

interface TabProps {
  tabs: { label: string; value: string }[];
  defaultActiveTab: string;
  renderContent: (activeTab: string) => React.ReactNode;
  background?: string;
  textColor?: string;
  textColorInactive?: string;
  borderActive?: string;
  hoverButton?: string;
  hoverBorder?: string;
}

const Tab: React.FC<TabProps> = ({
  tabs,
  defaultActiveTab,
  renderContent,
  background = 'bg-white',
  textColor = 'text-brown-900',
  textColorInactive = 'text-gray-500',
  borderActive = 'border-brown-900',
  hoverButton = 'hover:text-brown-900',
  hoverBorder = 'hover:border-brown-900',
}) => {
  const [activeTab, setActiveTab] = useState(defaultActiveTab);

  return (
    <div className={background}>
      <div className="overflow-x-auto">
        <div className="ml-0 flex overflow-x-scroll whitespace-nowrap border-b border-stroke px-6 pt-3 no-scrollbar 2xl:container md:pt-7 lg:ml-6 lg:px-36 2xl:mx-auto">
          {tabs.map((tab, index) => (
            <button
              key={tab.value}
              className={`px-5 pb-16px-plus-2px pt-3 transition-colors duration-300 ease-in-out focus:outline-none md:px-6 lg:px-8 ${
                activeTab === tab.value
                  ? `border-b-2 ${borderActive} ${textColor}`
                  : `${textColorInactive} ${hoverButton} hover:border-b-2 ${hoverBorder}`
              } ${index < tabs.length - 1 ? 'mr-6' : ''}`}
              onClick={() => setActiveTab(tab.value)}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>
      <div className="px-6 py-7 2xl:container md:px-6 md:py-14 lg:px-20 lg:py-16 xl:px-36 2xl:mx-auto 3xl:px-80">
        {renderContent(activeTab)}
      </div>
    </div>
  );
};

export default Tab;
