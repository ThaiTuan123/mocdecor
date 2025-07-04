'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import images from '@/configs/images';
import { formatCurrency } from '@/utils/formatCurrency';
import {
  FaChevronDown,
  FaChevronUp,
  FaEye,
  FaUpload,
  FaRedo,
  FaCalendarAlt,
  FaBox,
} from 'react-icons/fa';
import languages from '@/configs/languages';
import { useRecoilState } from 'recoil';
import { cartState } from '@/recoil/atoms/cartAtom';
import { CartItem } from '@/types/cartType';
import { BASE_URL } from '@/utils/constants';
import ToastMessage from '@/components/toast/ToastMessage';
import { getOrCreateBrowserId } from '@/utils/browserId';
import { updateCart } from '@/services/api';
import {
  errorState,
  loadingState,
  successState,
} from '@/recoil/atoms/cartStatusAtom';

interface OrderItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  variation?: string;
  productId?: string;
  variationId?: string;
  detail?: string;
}

interface Order {
  id: string;
  date: string;
  status: 'pending' | 'processing' | 'completed' | 'cancelled';
  total: number;
  items: OrderItem[];
  customerInfo: {
    name: string;
    phone: string;
    email: string;
    address: string;
  };
  hasUploaded?: boolean;
  insertedAt?: string;
  viewedAt?: string;
  shippingFee?: number;
  cod?: number;
  note?: string;
  linkConfirmOrder?: string;
  allowResendImage?: boolean;
  hasImage?: boolean;
  imageSendCount?: number;
}

const OrderHistory = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [loadingDetails, setLoadingDetails] = useState<string | null>(null);
  const [orderDetails, setOrderDetails] = useState<{ [key: string]: any }>({});
  const [loadingReorder, setLoadingReorder] = useState<string | null>(null);
  const [cartGlobal, setCartGlobal] = useRecoilState(cartState);
  const [showToast, setShowToast] = useState(false);
  const [showToastError, setShowToastError] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [browserId, setBrowserId] = useState<string | null>(null);
  const [cartLoading, setCartLoading] = useRecoilState(loadingState);
  const [cartSuccess, setCartSuccess] = useRecoilState(successState);
  const [cartError, setCartError] = useRecoilState(errorState);
  const router = useRouter();

  useEffect(() => {
    loadOrderHistory();
    
    // Initialize browser ID
    const initBrowserId = async () => {
      const id = await getOrCreateBrowserId();
      setBrowserId(id);
    };
    initBrowserId();
  }, []);

  const loadOrderHistory = async () => {
    try {
      // Load from localStorage
      const savedOrders = localStorage.getItem('orderHistory');

      if (savedOrders) {
        const orderList = JSON.parse(savedOrders);
        console.log('Loaded orders from localStorage:', orderList);

        // Convert localStorage format to Order format
        const formattedOrders: Order[] = orderList.map((order: any) => ({
          id: order.id,
          date: order.insertedAt
            ? new Date(order.insertedAt).toISOString().split('T')[0]
            : new Date().toISOString().split('T')[0],
          status: order.status || 'pending',
          total: 0, // Will be updated when fetching details
          items: [],
          customerInfo: {
            name: '',
            phone: '',
            email: '',
            address: '',
          },
          hasUploaded: false,
          insertedAt: order.insertedAt,
          viewedAt: order.viewedAt,
        }));

        setOrders(formattedOrders);

        // Fetch details for all orders
        formattedOrders.forEach(order => {
          fetchOrderDetailsBackground(order.id);
        });
      } else {
        // If no orders in localStorage, show empty state
        setOrders([]);
      }
    } catch (error) {
      console.error('Error loading order history:', error);
      setOrders([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchOrderDetails = async (orderId: string) => {
    if (orderDetails[orderId]) {
      return; // Already fetched
    }

    setLoadingDetails(orderId);
    try {
      const response = await fetch(`${BASE_URL}/pos-orders/${orderId}/history`);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log(`Order details for ${orderId}:`, data);

      setOrderDetails(prev => ({
        ...prev,
        [orderId]: data,
      }));

      // Update the order with detailed information
      setOrders(prev =>
        prev.map(order => {
          if (order.id === orderId) {
            // Map the API response to our Order interface
            const mappedItems: OrderItem[] = (data.items || []).map(
              (item: any) => ({
                id: item.id?.toString() || '',
                name: item.variationInfo?.name || 'Sản phẩm',
                price: item.variationInfo?.retailPrice || 0,
                quantity: item.quantity || 0,
                image: item.productImage || '',
                variation: item.variationInfo?.detail || '',
                productId: item.productId,
                variationId: item.variationId,
                detail: item.variationInfo?.detail,
              })
            );

            return {
              ...order,
              total: data.cod || 0,
              items: mappedItems,
              customerInfo: {
                name: data.customer?.name || data.billFullName || '',
                phone: data.customer?.phone || '',
                email: data.customer?.email || '',
                address: data.customer?.address || '',
              },
              status: getStatusFromCode(data.status || 0),
              hasUploaded: data.hasImage || false,
              shippingFee: data.shippingFee || 0,
              cod: data.cod || 0,
              note: data.note || '',
              linkConfirmOrder: data.link_confirm_order || '',
              allowResendImage: data.allowResendImage || false,
              imageSendCount: data.imageSendCount || 0,
            };
          }
          return order;
        })
      );
    } catch (error) {
      console.error('Error fetching order details:', error);
      // You might want to show a toast or notification here
    } finally {
      setLoadingDetails(null);
    }
  };

  const fetchOrderDetailsBackground = async (orderId: string) => {
    console.log(`Fetching details for order ${orderId} in background...`);
    console.log('Current orderDetails:', orderDetails);
    if (orderDetails[orderId]) {
      return; // Already fetched
    }

    try {
      const response = await fetch(`${BASE_URL}/pos-orders/${orderId}/history`);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log(`Order details for ${orderId}:`, data);

      setOrderDetails(prev => ({
        ...prev,
        [orderId]: data,
      }));

      // Update the order with detailed information
      setOrders(prev =>
        prev.map(order => {
          if (order.id === orderId) {
            // Map the API response to our Order interface
            const mappedItems: OrderItem[] = (data.items || []).map(
              (item: any) => ({
                id: item.id?.toString() || '',
                name: item.variationInfo?.name || 'Sản phẩm',
                price: item.variationInfo?.retailPrice || 0,
                quantity: item.quantity || 0,
                image: item.productImage || '',
                variation: item.variationInfo?.detail || '',
                productId: item.productId,
                variationId: item.variationId,
                detail: item.variationInfo?.detail,
              })
            );

            return {
              ...order,
              total: data.totalPrice || 0,
              items: mappedItems,
              customerInfo: {
                name: data.customer?.name || data.billFullName || '',
                phone: data.customer?.phone || '',
                email: data.customer?.email || '',
                address: data.customer?.address || '',
              },
              status: getStatusFromCode(data.status || 0),
              hasUploaded: data.hasImage || false,
              shippingFee: data.shippingFee || 0,
              cod: data.cod || 0,
              note: data.note || '',
              linkConfirmOrder: data.link_confirm_order || '',
              allowResendImage: data.allowResendImage || false,
              imageSendCount: data.imageSendCount || 0,
            };
          }
          return order;
        })
      );
    } catch (error) {
      console.error(`Error fetching order details for ${orderId}:`, error);
    }
  };

  const getStatusFromCode = (
    statusCode: number
  ): 'pending' | 'processing' | 'completed' | 'cancelled' => {
    switch (statusCode) {
      case 0:
        return 'pending';
      case 1:
        return 'processing';
      case 2:
        return 'completed';
      case 3:
      case -1:
        return 'cancelled';
      default:
        return 'pending';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'processing':
        return 'bg-blue-100 text-blue-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed':
        return 'Hoàn thành';
      case 'processing':
        return 'Đang xử lý';
      case 'pending':
        return 'Chờ xử lý';
      case 'cancelled':
        return 'Đã hủy';
      default:
        return 'Không xác định';
    }
  };

  const handleViewDetails = async (orderId: string) => {
    if (expandedOrder === orderId) {
      setExpandedOrder(null);
    } else {
      setExpandedOrder(orderId);
      // Fetch order details when expanding
      await fetchOrderDetails(orderId);
    }
  };

  const handleUploadImages = (orderId: string) => {
    router.push(`/gallery/${orderId}`);
  };

  const handleReorder = async (order: Order) => {
    if (order.items.length === 0) {
      setToastMessage('Không có sản phẩm để thêm vào giỏ hàng');
      setShowToastError(true);
      setTimeout(() => setShowToastError(false), 3000);
      return;
    }

    if (!browserId) {
      setToastMessage('Đang khởi tạo phiên làm việc...');
      setShowToastError(true);
      setTimeout(() => setShowToastError(false), 3000);
      return;
    }

    setLoadingReorder(order.id);

    try {
      // Add each item to cart using the same logic as ProductPopup
      for (const item of order.items) {
        if (item.variationId) {
          const body = {
            product: {
              id: item.variationId,
              quantity: item.quantity,
            },
          };

          // Use the same handleUpdateCart function as ProductPopup
          await handleUpdateCart(browserId, body);

          // Update local cart state with proper merging
          const cartUpdateObj: CartItem = {
            mainId: item.productId || item.id,
            id: item.variationId,
            quantity: item.quantity,
            retail_price: item.price,
            productName: item.name,
            sellerSku: item.variation || `SKU-${item.id}`,
            image: item.image,
            skuName: item.variation || item.detail || '',
          };

          setCartGlobal(prev => {
            if (!prev || prev.length === 0) {
              return [...prev, cartUpdateObj];
            }

            const existingItemIndex = prev.findIndex(
              cartItem =>
                cartItem.id === cartUpdateObj.id && 
                cartItem.mainId === cartUpdateObj.mainId
            );

            if (existingItemIndex !== -1) {
              const updatedCart = [...prev];
              updatedCart[existingItemIndex] = {
                ...updatedCart[existingItemIndex],
                quantity:
                  updatedCart[existingItemIndex].quantity + cartUpdateObj.quantity,
              };
              return updatedCart;
            } else {
              return [...prev, cartUpdateObj];
            }
          });
        }
      }

      // Show success message
      setToastMessage(`Đã thêm ${order.items.length} sản phẩm vào giỏ hàng thành công!`);
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);

    } catch (error) {
      console.error('Error adding items to cart:', error);
      
      // Fallback: still add to local cart if API fails
      order.items.forEach(item => {
        const cartUpdateObj: CartItem = {
          mainId: item.productId || item.id,
          id: item.variationId || item.id,
          quantity: item.quantity,
          retail_price: item.price,
          productName: item.name,
          sellerSku: item.variation || `SKU-${item.id}`,
          image: item.image,
          skuName: item.variation || item.detail || '',
        };

        setCartGlobal(prev => {
          if (!prev || prev.length === 0) {
            return [...prev, cartUpdateObj];
          }

          const existingItemIndex = prev.findIndex(
            cartItem =>
              cartItem.id === cartUpdateObj.id && 
              cartItem.mainId === cartUpdateObj.mainId
          );

          if (existingItemIndex !== -1) {
            const updatedCart = [...prev];
            updatedCart[existingItemIndex] = {
              ...updatedCart[existingItemIndex],
              quantity:
                updatedCart[existingItemIndex].quantity + cartUpdateObj.quantity,
            };
            return updatedCart;
          } else {
            return [...prev, cartUpdateObj];
          }
        });
      });

      // Show warning message
      setToastMessage(`Đã thêm ${order.items.length} sản phẩm vào giỏ hàng (chỉ cục bộ - có lỗi kết nối API)`);
      setShowToastError(true);
      setTimeout(() => setShowToastError(false), 3000);
    } finally {
      setLoadingReorder(null);
    }
  };

  const handleUpdateCart = async (browserId: string, body: any) => {
    try {
      setCartLoading(true); // Bắt đầu trạng thái loading
      setCartError(null); // Reset trạng thái lỗi
      setCartSuccess(false); // Reset trạng thái thành công

      await updateCart(browserId, body); // Gọi API

      // Nếu thành công
      setCartSuccess(true);
      setTimeout(() => {
        setCartSuccess(false);
      }, 1000);
    } catch (error) {
      console.error('Error updating cart:', error); // Log lỗi để debug
      setCartError('Failed to update cart. Please try again.'); // Thông báo lỗi
      throw error; // Re-throw để handleReorder có thể catch
    } finally {
      setCartLoading(false); // Đặt lại trạng thái loading
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-pampas pt-20">
        <div className="flex items-center justify-center py-20">
          <div className="text-center">
            <div className="mx-auto h-12 w-12 animate-spin rounded-full border-b-2 border-primary"></div>
            <p className="mt-4 text-gray-600">Đang tải lịch sử đơn hàng...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex min-h-44 justify-center bg-image-hero-gallery bg-cover bg-no-repeat py-8 text-white md:min-h-80 md:py-16">
        <div className="flex w-full flex-col items-center gap-2 px-6 md:w-2/3 md:px-0">
          <div className="flex flex-row gap-1">
            <span className="text-black-50">
              {languages.get('gallery.hero.intro.text')}
            </span>
            <span>/</span>
            <span>Lịch sử đơn hàng</span>
          </div>
          <h1 className="text-center text-2xl font-bold uppercase md:text-6lg">
            Lịch sử đơn hàng
          </h1>

          <span className="order-1 w-full text-center font-raleway text-lg md:w-1/2 md:text-2lg lg:order-2">
            Quản lý và theo dõi các đơn hàng của bạn
          </span>
        </div>
      </div>
      <div className="container mx-auto px-4 py-8 sm:px-6">
        {orders.length === 0 ? (
          // Empty State
          <div className="rounded-lg bg-white p-8 text-center shadow-lg sm:p-12">
            <FaBox className="mx-auto mb-4 text-gray-400" size={48} />
            <h3 className="mb-2 text-lg font-semibold text-gray-600 sm:text-xl">
              Chưa có đơn hàng nào
            </h3>
            <p className="mb-6 text-sm text-gray-500 sm:text-base">
              Bạn chưa có đơn hàng nào. Hãy khám phá sản phẩm của chúng tôi!
            </p>
            <button
              onClick={() => router.push('/products')}
              className="rounded-lg bg-primary px-4 py-2 text-sm text-white transition-colors hover:bg-opacity-90 sm:px-6 sm:py-3 sm:text-base"
            >
              Mua sắm ngay
            </button>
          </div>
        ) : (
          // Orders List
          <div className="space-y-6">
            {orders.map(order => (
              <div
                key={order.id}
                className="overflow-hidden rounded-lg bg-white shadow-lg"
              >
                {/* Order Header */}
                <div className="border-b border-gray-200 p-4 sm:p-6">
                  <div className="flex flex-col gap-4">
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-start">
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-900">
                          Đơn hàng #{order.id}
                        </h3>
                        <p className="text-sm text-gray-500">
                          Ngày đặt:{' '}
                          {order.insertedAt
                            ? new Date(order.insertedAt).toLocaleDateString(
                                'vi-VN',
                                {
                                  year: 'numeric',
                                  month: '2-digit',
                                  day: '2-digit',
                                  hour: '2-digit',
                                  minute: '2-digit',
                                }
                              )
                            : new Date(order.date).toLocaleDateString('vi-VN')}
                        </p>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        <span
                          className={`rounded-full px-3 py-1 text-sm font-medium ${getStatusColor(order.status)}`}
                        >
                          {getStatusText(order.status)}
                        </span>
                        {order.hasUploaded && (
                          <span className="rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-800">
                            Đã upload ảnh
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="mt-4">
                      <p className="text-lg font-bold text-primary">
                        {order.cod && order.cod > 0
                          ? formatCurrency(order.cod)
                          : 'Đang tải...'}
                      </p>
                      <p className="text-sm text-gray-500">
                        {order.items.length > 0
                          ? `${order.items.length} sản phẩm`
                          : 'Đang tải...'}
                      </p>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="mt-4 flex flex-wrap gap-2 sm:gap-3">
                    <button
                      onClick={() => handleViewDetails(order.id)}
                      className="flex items-center gap-2 rounded-lg bg-blue-50 px-3 py-2 text-sm text-blue-600 transition-colors hover:bg-blue-100 sm:px-4"
                      disabled={loadingDetails === order.id}
                    >
                      {loadingDetails === order.id ? (
                        <div className="h-4 w-4 animate-spin rounded-full border-b-2 border-blue-600"></div>
                      ) : (
                        <FaEye size={14} />
                      )}
                      <span className="hidden sm:inline">
                        {expandedOrder === order.id
                          ? 'Ẩn chi tiết'
                          : 'Xem chi tiết'}
                      </span>
                      <span className="sm:hidden">
                        {expandedOrder === order.id ? 'Ẩn' : 'Chi tiết'}
                      </span>
                      {expandedOrder === order.id ? (
                        <FaChevronUp size={14} />
                      ) : (
                        <FaChevronDown size={14} />
                      )}
                    </button>

                    <button
                      onClick={() => handleUploadImages(order.id)}
                      className="flex items-center gap-2 rounded-lg bg-green-50 px-3 py-2 text-sm text-green-600 transition-colors hover:bg-green-100 sm:px-4"
                    >
                      <FaUpload size={14} />
                      <span className="hidden sm:inline">
                        {order.hasUploaded ? 'Xem ảnh' : 'Upload ảnh'}
                      </span>
                      <span className="sm:hidden">
                        {order.hasUploaded ? 'Ảnh' : 'Upload'}
                      </span>
                    </button>

                    <button
                      onClick={() => handleReorder(order)}
                      disabled={loadingReorder === order.id || cartLoading || order.items.length === 0}
                      className="flex items-center gap-2 rounded-lg bg-primary bg-opacity-10 px-3 py-2 text-sm text-primary transition-colors hover:bg-opacity-20 sm:px-4 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      {(loadingReorder === order.id || cartLoading) ? (
                        <div className="h-4 w-4 animate-spin rounded-full border-b-2 border-primary"></div>
                      ) : cartSuccess ? (
                        <div className="flex h-4 w-4 items-center justify-center">
                          <svg
                            className="h-4 w-4"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth="2"
                          >
                            <path
                              d="M5 13l4 4L19 7"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </div>
                      ) : (
                        <FaRedo size={14} />
                      )}
                      {(loadingReorder === order.id || cartLoading) ? 'Đang thêm...' : cartSuccess ? 'Thành công!' : 'Đặt lại'}
                    </button>
                  </div>
                </div>

                {/* Order Details */}
                {expandedOrder === order.id && (
                  <div className="bg-gray-50 p-6">
                    {loadingDetails === order.id ? (
                      <div className="flex items-center justify-center py-8">
                        <div className="text-center">
                          <div className="mx-auto h-8 w-8 animate-spin rounded-full border-b-2 border-primary"></div>
                          <p className="mt-2 text-gray-600">
                            Đang tải chi tiết đơn hàng...
                          </p>
                        </div>
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                        {/* Items */}
                        <div>
                          <h4 className="mb-4 font-semibold text-gray-900">
                            Sản phẩm đã đặt
                          </h4>
                          {order.items.length > 0 ? (
                            <div className="space-y-3">
                              {order.items.map((item, index) => (
                                <div
                                  key={index}
                                  className="flex items-center gap-3 rounded-lg bg-white p-3"
                                >
                                  <Image
                                    src={
                                      item.image ||
                                      '/assets/imgs/pictures/default-product.jpg'
                                    }
                                    alt={item.name}
                                    width={60}
                                    height={60}
                                    className="rounded-lg object-cover"
                                  />
                                  <div className="flex-1">
                                    <h5 className="text-sm font-medium text-gray-900 sm:text-base">
                                      {item.name}
                                    </h5>
                                    {item.variation && (
                                      <p className="text-xs text-gray-500 sm:text-sm">
                                        {item.variation}
                                      </p>
                                    )}
                                    <div className="mt-1 flex items-center justify-between">
                                      <span className="text-xs text-gray-600 sm:text-sm">
                                        SL: {item.quantity}
                                      </span>
                                      <span className="text-sm font-medium text-primary">
                                        {formatCurrency(item.price)}
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          ) : (
                            <p className="text-gray-500">
                              Chưa có thông tin sản phẩm
                            </p>
                          )}
                        </div>

                        {/* Customer Info */}
                        <div>
                          <h4 className="mb-4 font-semibold text-gray-900">
                            Thông tin khách hàng
                          </h4>
                          <div className="space-y-3 rounded-lg bg-white p-4">
                            <div>
                              <span className="text-sm text-gray-500">
                                Họ tên:
                              </span>
                              <p className="text-sm font-medium sm:text-base">
                                {order.customerInfo.name || 'Chưa có thông tin'}
                              </p>
                            </div>
                            {order.shippingFee && (
                              <div>
                                <span className="text-sm text-gray-500">
                                  Phí vận chuyển:
                                </span>
                                <p className="text-sm font-medium sm:text-base">
                                  {formatCurrency(order.shippingFee)}
                                </p>
                              </div>
                            )}
                            {order.cod && (
                              <div>
                                <span className="text-sm text-gray-500">
                                  COD:
                                </span>
                                <p className="text-sm font-medium sm:text-base">
                                  {formatCurrency(order.cod)}
                                </p>
                              </div>
                            )}
                            {order.note && (
                              <div>
                                <span className="text-sm text-gray-500">
                                  Ghi chú:
                                </span>
                                <p className="text-sm font-medium sm:text-base">
                                  {order.note}
                                </p>
                              </div>
                            )}
                            {order.linkConfirmOrder && (
                              <div>
                                <span className="text-sm text-gray-500">
                                  Link thanh toán:
                                </span>
                                <a
                                  href={order.linkConfirmOrder}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-sm font-medium text-blue-600 hover:underline sm:text-base"
                                >
                                  Xem đơn hàng
                                </a>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
      
      {/* Toast Messages */}
      {showToast && (
        <ToastMessage
          message={toastMessage}
          onClose={() => setShowToast(false)}
        />
      )}
      {showToastError && (
        <ToastMessage
          isError
          message={toastMessage}
          onClose={() => setShowToastError(false)}
        />
      )}
    </div>
  );
};

export default OrderHistory;
