import React from 'react';
import ReactDOM from 'react-dom'
import {NavLink} from 'react-router-dom';
import { Menu, Icon } from 'antd';

const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

class Menu1 extends React.Component {
  state = {
    current: 'mail',
  }

  handleClick = (item,key,keyPath) => {
    console.log(item);
    console.log(key)
    this.setState({
      current: item.key,
    });
  }

  render() {
    return (
      <Menu onClick={this.handleClick} selectedKeys={[this.state.current]} mode="horizontal">
        <Menu.Item key="mail">
          <Icon type="mail" />
          <NavLink exact to='/'>Component1</NavLink>
        </Menu.Item>
        <Menu.Item key="app">
          <Icon type="appstore" />
          <NavLink to='/Component2'>Component2</NavLink>
        </Menu.Item>
        <Menu.Item key="alipay">
          <Icon type="appstore" />
          <NavLink to='/Component3/ILoveWeb'>Component3</NavLink>
        </Menu.Item>
      </Menu>
    );
  }
}

export default Menu1;
