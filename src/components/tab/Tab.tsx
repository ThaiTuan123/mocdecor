// components/Tab.tsx
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
                                     hoverButton='hover:text-brown-900',
                                     hoverBorder='hover:border-brown-900'
                                 }) => {
    const [activeTab, setActiveTab] = useState(defaultActiveTab);

    return (
        <div className={background}>
            <div className="flex border-b border-stroke pl-36 pt-7">
                {tabs.map((tab, index) => (
                    <button
                        key={tab.value}
                        className={`px-8 pb-16px-plus-2px pt-3 focus:outline-none ${
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
            <div className="py-20 px-36">{renderContent(activeTab)}</div>
        </div>
    );
};

export default Tab;
