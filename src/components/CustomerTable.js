import React, { Component } from 'react';
import * as actionCreators from '../store/actions';
import { connect } from 'react-redux';

import {
  Card,
  Col,
  Row,
  Icon,
  Avatar,
  Tooltip,
  Popconfirm,
  Input,
  message,
  Button,
  Drawer,
  Divider,
  Skeleton,
  Form
} from 'antd';
import 'antd/dist/antd.css';

const { Meta } = Card;

const pStyle = {
  fontSize: 16,
  color: 'rgba(0,0,0,0.85)',
  lineHeight: '24px',
  display: 'block',
  marginBottom: 16
};

const DescriptionItem = ({ title, content }) => (
  <div
    style={{
      fontSize: 14,
      lineHeight: '22px',
      marginBottom: 7,
      color: 'rgba(0,0,0,0.65)'
    }}
  >
    <p
      style={{
        marginRight: 8,
        display: 'inline-block',
        color: 'rgba(0,0,0,0.85)'
      }}
    >
      {title}:
    </p>
    {content}
  </div>
);

class CustomerTable extends Component {
  componentWillReceiveProps(props) {
    console.log(props);
  }
  constructor(props) {
    super(props);
    this.state = {
      search: '',
      customerDrawerVisible: false,
      createCustomerDrawerVisible: false,
      currentCustomer: {}
    };
    this.customerDrawer = this.customerDrawer.bind(this);
    this.CustomerList = this.CustomerList.bind(this);
    this.filterData = this.filterData.bind(this);
    this.cancel = this.cancel.bind(this);
    this.createCustomerDrawer = this.createCustomerDrawer.bind(this);
  }

  showCustomerDrawer = () => {
    this.setState({ customerDrawerVisible: true });
  };

  onCloseCustomerDrawer = () => {
    this.setState({ customerDrawerVisible: false });
  };

  showCreateCustomerDrawer = () => {
    this.setState({ createCustomerDrawerVisible: true });
  };

  onCloseCreateCustomerDrawer = () => {
    this.setState({ createCustomerDrawerVisible: false });
  };

  createCustomerDrawer = () => {
    return (
      <Drawer
        width={640}
        placement="right"
        closable={true}
        onClose={this.onCloseCreateCustomerDrawer}
        visible={this.state.createCustomerDrawerVisible}
      >
        <p style={{ ...pStyle, marginBottom: 24 }}>Customer Profile</p>

        <Form>
          <Form.Item>
            <Row>
              <Col span={12} style={{ paddingRight: '2em' }}>
                <Input placeholder="First Name..." />
              </Col>
              <Col span={12}>
                <Input placeholder="Last Name..." />
              </Col>
            </Row>
          </Form.Item>
          <Form.Item>
            <Row>
              <Input placeholder="Street address.." />
            </Row>
          </Form.Item>
          <Form.Item>
            <Row>
              <Col span={12} style={{ paddingRight: '2em' }}>
                <Input placeholder="City..." />
              </Col>
              <Col span={12}>
                <Input placeholder="Postal Code..." />
              </Col>
            </Row>
          </Form.Item>
        </Form>
      </Drawer>
    );
  };

  customerDrawer = () => {
    const customer = this.state.currentCustomer;
    return (
      <Drawer
        width={640}
        placement="right"
        closable={true}
        onClose={this.onCloseCustomerDrawer}
        visible={this.state.customerDrawerVisible}
      >
        <p style={{ ...pStyle, marginBottom: 24 }}>Customer Profile</p>
        <p style={pStyle}>Customer ID: {customer.id}</p>
        <Row>
          <Col span={12}>
            <DescriptionItem
              title="Full Name"
              content={customer.firstname + ' ' + customer.lastname}
            />
          </Col>
          <Col span={12}>
            <DescriptionItem
              title="Address"
              content={`${customer.streetaddress}, ${customer.city}, ${
                customer.postcode
              }`}
            />
          </Col>
        </Row>
        <Row>
          <Skeleton active paragraph={{ rows: 4 }} title={false} />
        </Row>

        <Divider />
        <p style={pStyle}>Contacts</p>
        <Row>
          <Col span={12}>
            <DescriptionItem title="Email" content={customer.email} />
          </Col>
          <Col span={12}>
            <DescriptionItem title="Phone Number" content={customer.phone} />
          </Col>
        </Row>
        <Row>
          <Skeleton active paragraph={{ rows: 4 }} title={false} />
        </Row>
      </Drawer>
    );
  };

  search = e => {
    const search = e.target.value;
    this.setState({ search }, () => {
      //console.log(this.state);
    });
  };

  confirm = (id, name) => {
    message.success(`Successfully removed customer ${name}`, 2);
    this.props.removeCustomerFunc(id);
    console.log(id, name);
  };

  filterData = () => {
    const keyword = this.state.search.toUpperCase();
    const data = this.props.customers.filter(
      v =>
        v.firstname.toUpperCase().includes(keyword) ||
        v.lastname.toUpperCase().includes(keyword) ||
        (v.firstname + ' ' + v.lastname).toUpperCase().includes(keyword)
    );
    return data;
  };

  cancel = () => {
    console.log('cancel');
  };

  CustomerList = props => {
    const data = props.data;
    const listItems = data.map(customer => (
      <Col span={8} key={customer.id}>
        <Card
          style={{ marginBottom: 30 }}
          bordered={true}
          actions={[
            <Tooltip title="Edit">
              <Button
                icon="edit"
                shape="circle"
                size="small"
                onClick={() => {
                  this.setState({ currentCustomer: customer });
                  this.showCustomerDrawer();
                }}
              />
            </Tooltip>,
            <Tooltip title="Trainings">
              <Button icon="book" shape="circle" size="small" />
            </Tooltip>,
            <Tooltip title="Delete">
              <Popconfirm
                title="Are you sure you want to delete this customer?"
                onConfirm={() =>
                  this.confirm(
                    customer.id,
                    customer.firstname + ' ' + customer.lastname
                  )
                }
                onCancel={this.cancel}
                okText="Yes"
                cancelText="No"
              >
                <Button icon="delete" shape="circle" size="small" />
              </Popconfirm>
            </Tooltip>
          ]}
        >
          <Meta
            title={`${customer.firstname} ${customer.lastname}`}
            avatar={
              <Avatar src="https://cdn3.iconfinder.com/data/icons/avatars-9/145/Avatar_Panda-512.png" />
            }
          />
          <p />
          <p>
            <Icon type="profile" theme="twoTone" />
          </p>
          <p>
            <Icon type="phone" theme="twoTone" /> {customer.phone}
          </p>
          <p>
            <Icon type="home" theme="twoTone" />
            {` ${customer.streetaddress}, ${customer.city}, ${
              customer.postcode
            }`}
          </p>
          <p>
            <Icon type="mail" theme="twoTone" />
            {` ${customer.email}`}
          </p>
        </Card>
      </Col>
    ));
    return (
      <Row gutter={16}>
        {listItems} {this.customerDrawer()} {this.createCustomerDrawer()}
      </Row>
    );
  };

  renderContent() {
    const searchLength = this.state.search.trim().length > 0;
    switch (searchLength) {
      case true:
        return <this.CustomerList data={this.filterData()} />;
      default:
        return <this.CustomerList data={this.props.customers} />;
    }
  }

  render() {
    const { Search } = Input;

    const addCustomerButton = (
      <Tooltip title="Add new customer">
        <Button
          icon="user-add"
          size="small"
          type="primary"
          shape="round"
          onClick={() => this.showCreateCustomerDrawer()}
          ghost
        />
      </Tooltip>
    );

    return (
      <div>
        <Search
          style={{ width: '100%', marginBottom: '2em', marginTop: '1em' }}
          placeholder="Name..."
          onChange={this.search}
          enterButton
          addonBefore={addCustomerButton}
        />
        {this.renderContent()}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    customers: state.customers
  };
};

export default connect(
  mapStateToProps,
  actionCreators
)(CustomerTable);
