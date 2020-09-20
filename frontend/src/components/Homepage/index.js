import { Carousel, Divider, Space } from 'antd';
import React from 'react';
import { Image, Card, Row, Col } from 'antd';
import Meta from 'antd/lib/card/Meta';
import Products from '../Products';

function Homepage() {
  const data = [1, 2, 3, 4, 5, 6];
  return (
    <div className='container'>
      <Divider orientation='center'>Sản phẩm mới</Divider>
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
        }}
      >
        <Products products={data} />
      </div>
    </div>
  );
}

export default Homepage;
