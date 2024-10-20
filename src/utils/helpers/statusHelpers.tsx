// utils/statusHelpers.ts

import React from 'react';

export function getStatusElement(status: string) {
    switch (status) {
        case 'Đã xác nhận':
            return (
                <span className="text-x font-semibold text-done-text font-raleway uppercase">
                    {status}
                    </span>
            );
        case 'Đang giao hàng':
            return (
                <span className="text-x font-semibold text-loading-text font-raleway uppercase">
                    {status}
                    </span>
            );
        default:
            return <span>{status}</span>; // Fallback for other statuses
    }
}