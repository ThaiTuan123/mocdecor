export function formatVietnameseCurrency(amount: string) {
  const amountNumber = Number(amount);
  const formattedAmount = amountNumber
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  return `${formattedAmount} đ`;
}
