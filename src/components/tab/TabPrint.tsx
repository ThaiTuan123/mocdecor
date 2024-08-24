import Tab from "@/components/tab/Tab";
import React from "react";
import ProductGrid from "@/components/gridView/ProductGrid";

const TabPrint = () => {

    const tabsPrint = [
        {label: 'Ảnh in 6x9', value: '6x9'},
        {label: 'Ảnh in 9x12', value: '9x12'},
        {label: 'Ảnh Photostrip', value: 'Photostrip'},
        {label: 'Ảnh in Instagram', value: 'Instagram'},
    ];

    const renderPrintContent = (activeTab: string) => {
        switch (activeTab) {
            case '6x9':
                return <div><ProductGrid/></div>;
            case '9x12':
                return <div>Content for Ảnh in 9x12</div>;
            case 'Photostrip':
                return <div>Content for Ảnh Photostrip</div>;
            case 'Instagram':
                return <div>Content for Ảnh in Instagram</div>;
            default:
                return null;
        }
    };

    return (
        <Tab
            tabs={tabsPrint}
            defaultActiveTab="6x9"
            renderContent={renderPrintContent}
        />
    );
};

export default TabPrint;