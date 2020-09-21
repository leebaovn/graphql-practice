import { Carousel, Divider, Space } from 'antd';
import React from 'react';
import { Image, Card, Row, Col } from 'antd';
import Meta from 'antd/lib/card/Meta';
import Products from '../Products';
const contentStyle = {
  height: '600px',
  color: '#fff',
  lineHeight: '400px',
  textAlign: 'center',
  background:
    'url("https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/1200px-Image_created_with_a_mobile_phone.png") center no-repeat',
  backgroundSize: 'cover',
};

function Homepage() {
  const data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  return (
    <div className='container'>
      <Carousel autoplay>
        <div>
          <h3 style={contentStyle}>1</h3>
        </div>
        <div>
          <h3 style={contentStyle}>2</h3>
        </div>
        <div>
          <h3 style={contentStyle}>3</h3>
        </div>
        <div>
          <h3 style={contentStyle}>4</h3>
        </div>
      </Carousel>
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
