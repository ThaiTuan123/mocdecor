// utils/statusHelpers.ts

import React from 'react';

export function getStatusElement(status: string) {
  switch (status) {
    case 'Đã xác nhận':
      return (
        <span className="font-raleway text-x font-semibold uppercase text-done-text">
          {status}
        </span>
      );
    case 'Đang giao hàng':
      return (
        <span className="font-raleway text-x font-semibold uppercase text-loading-text">
          {status}
        </span>
      );
    default:
      return <span>{status}</span>; // Fallback for other statuses
  }
}
