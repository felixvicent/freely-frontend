export function formatCurrency(value?: number | string) {
  if (!value) value = 0;

  return new Intl.NumberFormat('pt-br', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 2,
  })
    .format(Number(value))
    .slice(3);
}
