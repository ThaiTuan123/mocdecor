// Order History Management Utilities

export interface OrderHistoryItem {
  id: string;
  date: string;
  status: 'pending' | 'processing' | 'completed' | 'cancelled';
  total: number;
  items: Array<{
    id: string;
    name: string;
    price: number;
    quantity: number;
    image: string;
    variation?: string;
  }>;
  customerInfo: {
    name: string;
    phone: string;
    email: string;
    address: string;
  };
  hasUploaded?: boolean;
}

// Save order to history
export const saveOrderToHistory = (order: OrderHistoryItem) => {
  try {
    const existingOrders = getOrderHistory();
    const orderExists = existingOrders.some(
      existingOrder => existingOrder.id === order.id
    );

    if (!orderExists) {
      const updatedOrders = [order, ...existingOrders];
      localStorage.setItem('orderHistory', JSON.stringify(updatedOrders));
    }
  } catch (error) {
    console.error('Error saving order to history:', error);
  }
};

// Get order history from localStorage
export const getOrderHistory = (): OrderHistoryItem[] => {
  try {
    const savedOrders = localStorage.getItem('orderHistory');
    return savedOrders ? JSON.parse(savedOrders) : [];
  } catch (error) {
    console.error('Error loading order history:', error);
    return [];
  }
};

// Mark order as uploaded
export const markOrderAsUploaded = (orderId: string) => {
  try {
    const existingUploaded = localStorage.getItem('uploadedOrders');
    const uploadedList = existingUploaded ? JSON.parse(existingUploaded) : [];

    if (!uploadedList.includes(orderId)) {
      uploadedList.push(orderId);
      localStorage.setItem('uploadedOrders', JSON.stringify(uploadedList));
    }
  } catch (error) {
    console.error('Error marking order as uploaded:', error);
  }
};

// Get uploaded orders
export const getUploadedOrders = (): string[] => {
  try {
    const uploadedOrders = localStorage.getItem('uploadedOrders');
    return uploadedOrders ? JSON.parse(uploadedOrders) : [];
  } catch (error) {
    console.error('Error loading uploaded orders:', error);
    return [];
  }
};

// Clear order history (for testing/admin purposes)
export const clearOrderHistory = () => {
  try {
    localStorage.removeItem('orderHistory');
    localStorage.removeItem('uploadedOrders');
  } catch (error) {
    console.error('Error clearing order history:', error);
  }
};
