import Tab from "@/components/tab/Tab";
import React from "react";
import ProductGridFrame from "@/components/gridView/ProductGridFrame";

const TabFrame = () => {
    const tabsFrame = [
        {label: 'Khung dẹp', value: 'Khung dẹp'},
        {label: 'Khung nổi', value: 'Khung nổi'},
        {label: 'Khung 3D', value: 'Khung 3D'},
        {label: 'Khung nhựa', value: 'Khung nhựa'},
        {label: 'Khung gỗ', value: 'Khung gỗ'},
        {label: 'Khung mica', value: 'Khung mica'},
        {label: 'Khung trong suốt', value: 'Khung trong suốt'},
    ];

    const renderFrameContent = (activeTab: string) => {
        switch (activeTab) {
            case 'Khung dẹp':
                return <div><ProductGridFrame/></div>;
            case 'Khung nổi':
                return <div>Content for Khung nổi</div>;
            case 'Khung 3D':
                return <div>Content for Khung 3D</div>;
            case 'Khung nhựa':
                return <div>Content for Khung nhựa</div>;
            case 'Khung gỗ':
                return <div>Content for Khung gỗ</div>;
            case 'Khung mica':
                return <div>Content for Khung mica</div>;
            case 'Khung trong suốt':
                return <div>Content for Khung trong suốt</div>;
            default:
                return null;
        }
    };

    return (
        <Tab
            tabs={tabsFrame}
            defaultActiveTab="Khung dẹp"
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