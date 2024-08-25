export function formatVietnameseCurrency(amount: number) {
    const formattedAmount = amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    return `${formattedAmount} đ`;
  }