import { Layout, Menu, Breadcrumb } from 'antd';
import './layout.style.css';
const { Header, Content, Footer } = Layout;
const Layout = ({ children }) => {
  return (
    <Layout className='layout'>
      <Header>
        <div className='logo'>Lyao</div>
        <Menu theme='dark' mode='horizontal' defaultSelectedKeys={['1']}>
          <Menu.Item key='1'>Products</Menu.Item>
          <Menu.Item key='2'>nav 2</Menu.Item>
          <Menu.Item key='3'>Lee Bao</Menu.Item>
        </Menu>
      </Header>
      <Content style={{ padding: '0 50px' }}>{children}</Content>
      <Footer style={{ textAlign: 'center' }}>
        Ant Design ©2018 Created by Ant UED
      </Footer>
    </Layout>
  );
};
