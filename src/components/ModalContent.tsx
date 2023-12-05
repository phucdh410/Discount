import { useState } from 'react';
import { Button, Dialog, Flex, Text, TextField } from '@radix-ui/themes';

import { IFood } from '@/types';
import { onSelectAll } from '@/utils/funcs';

export interface IModalContent {
  onSave: (newFood: IFood) => void;
}

export const ModalContent = ({ onSave }: IModalContent) => {
  //#region Data
  const [name, setName] = useState<string>('');
  const [price, setPrice] = useState<'' | number>('');
  const [amount, setAmount] = useState<'' | number>('');
  const [discountPrice, setDiscountPrice] = useState<'' | number>('');
  //#endregion

  //#region Event
  const onNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const onPriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPrice(Number(event.target.value));
  };

  const onAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(Number(event.target.value));
  };

  const onDiscountPriceChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setDiscountPrice(Number(event.target.value));
  };

  const onClear = () => {
    setName('');
    setPrice('');
    setAmount('');
    setDiscountPrice('');
  };

  const handleSave = () => {
    const uid = Math.random() * 10000000 + new Date().toDateString();
    const food = { uid, name, price, amount, discount_price: discountPrice };
    onSave(food);
  };
  //#endregion

  //#region Render
  return (
    <Dialog.Content>
      <Dialog.Title>Thêm món ăn</Dialog.Title>
      <Flex direction="column" gap="3">
        <label>
          <Text as="div" size="2" mb="1" weight="medium">
            Tên món ăn
          </Text>
          <TextField.Input
            radius="large"
            value={name}
            onChange={onNameChange}
            placeholder="Nhập tên món ăn"
          />
        </label>
        <label>
          <Text as="div" size="2" mb="1" weight="medium">
            Đơn giá
          </Text>
          <TextField.Input
            radius="large"
            type="number"
            value={price}
            onChange={onPriceChange}
            onClick={onSelectAll}
            placeholder="Nhập đơn giá"
          />
        </label>
        <label>
          <Text as="div" size="2" mb="1" weight="medium">
            Giá khuyến mãi (nếu có)
          </Text>
          <TextField.Input
            radius="large"
            type="number"
            value={discountPrice}
            onChange={onDiscountPriceChange}
            onClick={onSelectAll}
            placeholder="Nhập giá khuyến mãi"
          />
        </label>
        <label>
          <Text as="div" size="2" mb="1" weight="medium">
            Số lượng
          </Text>
          <TextField.Input
            radius="large"
            type="number"
            value={amount}
            onChange={onAmountChange}
            onClick={onSelectAll}
            placeholder="Nhập số lượng"
          />
        </label>
      </Flex>

      <Flex gap="3" mt="4" justify="end">
        <Dialog.Close>
          <Button variant="soft" color="gray" onClick={onClear}>
            Hủy
          </Button>
        </Dialog.Close>
        <Dialog.Close>
          <Button onClick={handleSave}>Thêm</Button>
        </Dialog.Close>
      </Flex>
    </Dialog.Content>
  );
  //#endregion
};
