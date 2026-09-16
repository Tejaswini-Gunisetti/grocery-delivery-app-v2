export const formatCurrency = (amount) => {
  const value = Number(amount) || 0;

  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: Number.isInteger(value) ? 0 : 2,
  }).format(value);
};
