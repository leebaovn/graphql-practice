import { Button, Card, Col, Image } from 'antd';
import Meta from 'antd/lib/card/Meta';
import React from 'react';

function Products({ products }) {
  return (
    <>
      {products.map((item) => (
        <Col
          style={{ marginRight: '2rem', marginBottom: '1rem' }}
          span='4'
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
              <Button style={{ marginTop: '1rem' }}>Buy</Button>
            </div>
          </Card>
        </Col>
      ))}
    </>
  );
}

export default Products;
