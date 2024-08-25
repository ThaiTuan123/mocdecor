import Tab from "@/components/tab/Tab";
import React from "react";
import ProductGrid from "@/components/gridView/ProductGrid";
import languages from "@/configs/languages";

const TabPrint = () => {

    const tabsPrint = [
        {
            label: languages.get('tab.label.6x9'),
            value: languages.get('tab.label.6x9')
        },
        {
            label: languages.get('tab.label.9x12'),
            value: languages.get('tab.label.9x12')
        },
        {
            label: languages.get('tab.label.photostrip'),
            value: languages.get('tab.label.photostrip')
        },
        {
            label: languages.get('tab.label.instagram'),
            value: languages.get('tab.label.instagram')
        },
    ];

    const renderPrintContent = (activeTab: string) => {
        switch (activeTab) {
            case languages.get('tab.label.6x9'):
                return <div><ProductGrid/></div>;
            case languages.get('tab.label.9x12'):
                return <div>{languages.get('tab.content.9x12')}</div>;
            case languages.get('tab.label.photostrip'):
                return <div>{languages.get('tab.content.photostrip')}</div>;
            case languages.get('tab.label.instagram'):
                return <div>{languages.get('tab.content.instagram')}</div>;
            default:
                return null;
        }
    };

    return (
        <Tab
            tabs={tabsPrint}
            defaultActiveTab={languages.get('tab.label.6x9')}
            renderContent={renderPrintContent}
        />
    );
};

export default TabPrint;