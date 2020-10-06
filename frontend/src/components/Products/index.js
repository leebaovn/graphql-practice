import { Button, Card, Col, Image, Row } from 'antd';
import Meta from 'antd/lib/card/Meta';
import React, { useContext } from 'react';
import CartContext from './../../context/cart/cart-context';
import { ACTIONS } from './../../context/cart/cart-reducer';
import openNotification, { typeNotification } from './../Notification';

function Products({ products }) {
  const [CartState, CartDispatch] = useContext(CartContext);

  const addToCart = async () => {
    await CartDispatch({
      type: ACTIONS.ADD_ITEM,
      payload: {
        items: { id: 1, name: 'Product' },
      },
    });
    openNotification(typeNotification.success, 'Item added');
  };
  return (
    <Row gutter={[40, 24]}>
      {products.map((item) => (
        <Col
          // style={{ marginBottom: '1rem', marginRight: '2rem' }}
          span={6}
          key={item}
        >
          <Card
            hoverable
            style={{ width: 300 }}
            cover={
              <Image
                alt='example'
                src='https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png'
              />
            }
          >
            <Meta
              title='Europe Street beat'
              description='www.instagram.com Europe Street beat Europe Street beatEurope Street beat Europe Street beat'
            />
            <div
              className='price'
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'baseline',
              }}
            >
              <h3>$12,000</h3>
              <Button
                type='primary'
                style={{ marginTop: '1rem' }}
                onClick={addToCart}
              >
                Buy
              </Button>
            </div>
          </Card>
        </Col>
      ))}
    </Row>
  );
}

export default Products;
