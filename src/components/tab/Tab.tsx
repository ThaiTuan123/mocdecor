import React, {useState} from 'react';

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
                                     hoverBorder = 'hover:border-brown-900'
                                 }) => {
    const [activeTab, setActiveTab] = useState(defaultActiveTab);

    return (
        <div className={background}>
            <div className="overflow-x-auto">
                <div
                    className="2xl:mx-auto 2xl:container flex border-b border-stroke ml-0 lg:px-36 lg:ml-6 px-6 pt-3 md:pt-7 overflow-x-scroll whitespace-nowrap no-scrollbar">
                    {tabs.map((tab, index) => (
                        <button
                            key={tab.value}
                            className={`px-5 md:px-6 lg:px-8 pb-16px-plus-2px pt-3 focus:outline-none transition-colors duration-300 ease-in-out ${
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
            <div
                className="2xl:container 2xl:mx-auto py-7 md:py-20 px-6 md:px-6 lg:px-36">{renderContent(activeTab)}</div>
        </div>
    );
};

export default Tab;
