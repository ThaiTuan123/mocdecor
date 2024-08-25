import Tab from "@/components/tab/Tab";
import React from "react";
import ProductGridFrame from "@/components/gridView/ProductGridFrame";
import languages from "@/configs/languages";

const TabFrame = () => {
    const tabsFrame = [
        {
            label: languages.get('tab.label.flatFrame'),
            value: languages.get('tab.label.flatFrame')
        },
        {
            label: languages.get('tab.label.floatingFrame'),
            value: languages.get('tab.label.floatingFrame')
        },
        {
            label: languages.get('tab.label.3DFrame'),
            value: languages.get('tab.label.3DFrame')
        },
        {
            label: languages.get('tab.label.plasticFrame'),
            value: languages.get('tab.label.plasticFrame')
        },
        {
            label: languages.get('tab.label.woodFrame'),
            value: languages.get('tab.label.woodFrame')
        },
        {
            label: languages.get('tab.label.micaFrame'),
            value: languages.get('tab.label.micaFrame')
        },
        {
            label: languages.get('tab.label.transparentFrame'),
            value: languages.get('tab.label.transparentFrame')
        },
    ];

    const renderFrameContent = (activeTab: string) => {
        switch (activeTab) {
            case languages.get('tab.label.flatFrame'):
                return <div><ProductGridFrame/></div>;
            case languages.get('tab.label.floatingFrame'):
                return <div>{languages.get('tab.content.floatingFrame')}</div>;
            case languages.get('tab.label.3DFrame'):
                return <div>{languages.get('tab.content.3DFrame')}</div>;
            case languages.get('tab.label.plasticFrame'):
                return <div>{languages.get('tab.content.plasticFrame')}</div>;
            case languages.get('tab.label.woodFrame'):
                return <div>{languages.get('tab.content.woodFrame')}</div>;
            case languages.get('tab.label.micaFrame'):
                return <div>{languages.get('tab.content.micaFrame')}</div>;
            case languages.get('tab.label.transparentFrame'):
                return <div>{languages.get('tab.content.transparentFrame')}</div>;
            default:
                return null;
        }
    };

    return (
        <Tab
            tabs={tabsFrame}
            defaultActiveTab={languages.get('tab.label.flatFrame')}
            renderContent={renderFrameContent}
            background={"bg-image-gradient-frame bg-cover"}
            textColor="text-white"
            borderActive='border-white'
            hoverButton='hover:text-white'
            hoverBorder='hover:border-white'
            textColorInactive='text-black-50'
        />
    );
};

export default TabFrame;