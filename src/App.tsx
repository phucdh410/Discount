import { useMemo, useState } from 'react';
import { PlusIcon } from '@radix-ui/react-icons';
import {
  Box,
  Button,
  Dialog,
  Flex,
  Separator,
  Text,
  TextField,
  Theme,
} from '@radix-ui/themes';

import { formatMoney } from './utils/funcs';
import { ModalContent } from './components';
import { IFood } from './types';

import './styles/index.scss';
import '@radix-ui/themes/styles.css';

// const MOCK: IFood[] = [
//   {
//     uid: '12312d',
//     name: 'Gà mắm tỏi',
//     amount: 2,
//     price: 41400,
//     discount_price: '',
//   },
//   {
//     uid: '1231',
//     name: 'Gà xíu',
//     amount: 2,
//     price: 41400,
//     discount_price: '',
//   },
//   {
//     uid: '476566575',
//     name: 'Gà heo giòn',
//     amount: 1,
//     price: 41400,
//     discount_price: '',
//   },
//   {
//     uid: '14rr',
//     name: 'Gà xá xíu',
//     amount: 1,
//     price: 41400,
//     discount_price: 23000,
//   },
// ];

const PHI_GIAO_HANG = 0;
const TIEN_GIAM_GIA = 0;

function App() {
  //#region Data
  const [foodList, setFoodList] = useState<IFood[]>([]);
  const [shipFee, setShipFee] = useState<number>(PHI_GIAO_HANG | 0);
  const [discount, setDiscount] = useState<number>(TIEN_GIAM_GIA | 0);

  const total = useMemo(() => {
    let result = 0;
    foodList.forEach((e) => {
      if (e.discount_price) {
        result += (e.amount as number) * e.discount_price;
      } else {
        result += (e.amount as number) * (e.price as number);
      }
    });
    return result;
  }, [foodList]);

  const discountEach = useMemo(() => {
    const count = foodList.reduce(
      (prev, next) => prev + (next.amount as number),
      0,
    );
    const special = foodList.find((e) => e.discount_price);

    let addedDiscount = 0;
    if (special && special.discount_price) {
      addedDiscount = (special.price as number) - special.discount_price;
    }

    return Math.round((discount - shipFee + addedDiscount) / count);
  }, [foodList, shipFee, discount]);

  //#endregion

  //#region Event
  const onSaveNewItem = (newFood: IFood) => {
    setFoodList((prev) => [...prev, newFood]);
  };
  //#endregion

  //#region Render
  return (
    <Theme>
      <Dialog.Root>
        <Flex
          gap="3"
          align="center"
          justify="center"
          style={{
            height: '100vh',
            backgroundColor: '#e5f4ee',
          }}
        >
          <Box
            p="3"
            style={{
              minWidth: '300px',
              borderRadius: '10px',
              backgroundColor: 'white',
              boxShadow: 'rgba(149, 157, 165, 0.2) 0px 8px 24px',
            }}
          >
            <Flex direction="column" gap="2" width="100%">
              <Dialog.Trigger>
                <Button variant="outline" mb="3">
                  <PlusIcon />
                  Thêm món
                </Button>
              </Dialog.Trigger>
              {foodList.map((food) => (
                <Flex key={food.uid} align="center" justify="between">
                  <Text>
                    {food.name}&nbsp;
                    <span
                      style={{ fontWeight: 500, fontSize: 14 }}
                    >{`(x${food.amount})`}</span>
                  </Text>
                  <Text>
                    {formatMoney(
                      (food.price as number) * (food.amount as number),
                    )}
                  </Text>
                </Flex>
              ))}
              <Separator orientation="horizontal" size="4" />
              <Flex align="center" justify="between">
                <Text weight="medium">Tổng cộng</Text>
                <Text weight="medium"> {formatMoney(total)}</Text>
              </Flex>
              <Flex align="center" justify="between">
                <Text weight="medium">Phí giao hàng</Text>
                <Text weight="medium">{formatMoney(shipFee)}</Text>
              </Flex>
              <Flex align="center" justify="between">
                <Text weight="medium">Tiền giảm giá</Text>
                <Text weight="medium">{formatMoney(discount)}</Text>
              </Flex>
              <Flex align="center" justify="between">
                <Text weight="medium">Thành tiền</Text>
                <Text weight="medium">
                  {formatMoney(total + shipFee - discount)}
                </Text>
              </Flex>
            </Flex>
          </Box>
          <Flex direction="column" gap="3">
            <Box
              p="3"
              style={{
                minWidth: '300px',
                borderRadius: '10px',
                backgroundColor: 'white',
                boxShadow: 'rgba(149, 157, 165, 0.2) 0px 8px 24px',
              }}
            >
              <label>
                <Text as="div" size="2" mb="1" weight="medium">
                  Phí giao hàng
                </Text>
                <TextField.Input
                  type="number"
                  value={shipFee}
                  onChange={(e) => {
                    setShipFee(Number(e.target.value));
                  }}
                  placeholder="Nhập phí giao hàng"
                />
              </label>
              <label>
                <Text as="div" size="2" mb="1" weight="medium">
                  Tiền giảm giá
                </Text>
                <TextField.Input
                  type="number"
                  value={discount}
                  onChange={(e) => {
                    setDiscount(Number(e.target.value));
                  }}
                  placeholder="Nhập tiền giảm giá"
                />
              </label>
            </Box>
            <Box
              p="3"
              style={{
                minWidth: '300px',
                borderRadius: '10px',
                backgroundColor: 'white',
                boxShadow: 'rgba(149, 157, 165, 0.2) 0px 8px 24px',
              }}
            >
              <Flex direction="column" gap="2">
                <Flex align="center" justify="between">
                  <Text weight="medium">Tiền giảm mỗi phần</Text>
                  <Text weight="medium">{formatMoney(discountEach || 0)}</Text>
                </Flex>
                <Separator orientation="horizontal" size="4" />
                {foodList.map((food) => (
                  <Flex key={food.uid} align="center" justify="between">
                    <Text>
                      {food.name}&nbsp;
                      <span
                        style={{ fontWeight: 500, fontSize: 14 }}
                      >{`(x${food.amount})`}</span>
                    </Text>
                    <Text>
                      {formatMoney(
                        ((food.price as number) - discountEach) *
                          (food.amount as number),
                      )}
                    </Text>
                  </Flex>
                ))}
              </Flex>
            </Box>
          </Flex>
        </Flex>
        <ModalContent onSave={onSaveNewItem} />
      </Dialog.Root>
    </Theme>
  );
  //#endregion
}

export default App;
