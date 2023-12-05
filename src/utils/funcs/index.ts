export const formatMoney = (value: number) => {
  return Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  }).format(value);
};

export const onSelectAll = (
  event: React.MouseEvent<HTMLInputElement, MouseEvent>,
) => {
  const inputEl = event.target as HTMLInputElement;
  inputEl.select();
};
