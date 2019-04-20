import React, { Component } from "react";
import * as actionCreators from "../store/actions";
import { connect } from "react-redux";
import moment from "moment";

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
  Form,
  DatePicker,
  InputNumber,
  Empty
} from "antd";
import "antd/dist/antd.css";
import Axios from "axios";

const { Meta } = Card;

const pStyle = {
  fontSize: 16,
  color: "rgba(0,0,0,0.85)",
  lineHeight: "24px",
  display: "block",
  marginBottom: 16
};

const DescriptionItem = ({ title, content }) => (
  <div
    style={{
      fontSize: 14,
      lineHeight: "22px",
      marginBottom: 7,
      color: "rgba(0,0,0,0.65)"
    }}
  >
    <p
      style={{
        marginRight: 8,
        display: "inline-block",
        color: "rgba(0,0,0,0.85)"
      }}
    >
      {title}:
    </p>
    {content}
  </div>
);

class CustomerTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: "",
      customerDrawerVisible: false,
      createCustomerDrawerVisible: false,
      trainingDrawerVisible: false,
      addTrainingDrawerVisible: false,
      createCustomerLoading: false,
      currentCustomer: {}
    };
    this.customerDrawer = this.customerDrawer.bind(this);
    this.CustomerList = this.CustomerList.bind(this);
    this.filterData = this.filterData.bind(this);
    this.cancel = this.cancel.bind(this);
    this.createCustomerDrawer = this.createCustomerDrawer.bind(this);
    this.trainingDrawer = this.trainingDrawer.bind(this);
  }

  showDrawer = drawerName => {
    let drawer = "";
    switch (drawerName) {
      case "customerDrawer":
        drawer = "customerDrawerVisible";
        break;
      case "createCustomerDrawer":
        drawer = "createCustomerDrawerVisible";
        break;
      case "trainingDrawer":
        drawer = "trainingDrawerVisible";
        break;
      case "addTrainingDrawer":
        drawer = "addTrainingDrawerVisible";
        break;
      default:
        console.error("showDrawer func: incorrect drawer name!");
        break;
    }
    return this.setState({ [drawer]: true });
  };

  closeDrawer = drawerName => {
    let drawer = "";
    switch (drawerName) {
      case "customerDrawer":
        drawer = "customerDrawerVisible";
        break;
      case "createCustomerDrawer":
        drawer = "createCustomerDrawerVisible";
        break;
      case "trainingDrawer":
        drawer = "trainingDrawerVisible";
        break;
      case "addTrainingDrawer":
        drawer = "addTrainingDrawerVisible";
        break;
      default:
        console.error("closeDrawer func: incorrect drawer name!");
        break;
    }
    return this.setState({ [drawer]: false });
  };

  addTraining = data => {
    const { activity, duration } = data;

    const url = "http://customerrest.herokuapp.com/api/trainings";
    const config = { headers: { "Content-Type": "application/json" } };
    if (activity.trim().length > 0 && duration > 0) {
      Axios.post(url, data, config);
      setTimeout(() => {
        message.success("New training added!");
      }, 1000);
      setTimeout(() => window.location.reload(), 1800);
    }
  };

  deleteTraining = url => {
    Axios.delete(url);
    setTimeout(() => {
      message.loading("Delete in progress..", 0);
    }, 200);
    setTimeout(() => window.location.reload(), 1800);
  };

  createCustomerFunc = customer => {
    this.setState({ createCustomerLoading: true });
    let check = true;
    const url = "http://customerrest.herokuapp.com/api/customers";
    const config = { headers: { "Content-Type": "application/json" } };

    for (let key in customer) {
      if (customer[key].trim() !== "") {
        check = false;
      } else {
        check = true;
      }
    }

    if (check) {
      this.setState({ createCustomerLoading: false });
    } else if (!check) {
      Axios.post(url, customer, config);

      setTimeout(() => {
        message.success("New customer added!");
        this.setState({ createCustomerLoading: false });
      }, 1000);
      setTimeout(() => window.location.reload(), 1800);
    }
  };

  trainingDrawer = () => {
    const customer = this.state.currentCustomer;
    if (customer.trainings !== undefined) {
      const hasTrainings = customer.trainings.map((e, i) => (
        <Row key={i}>
          <Divider />
          <p style={pStyle}>Date: {moment(e.date).format("DD/MM/YYYY")}</p>
          <p style={pStyle}>Activity: {e.activity}</p>
          <p style={pStyle}>Duration: {e.duration} min(s)</p>
          <Button
            type='danger'
            onClick={() => this.deleteTraining(e.links[0].href)}
          >
            Delete training
          </Button>
        </Row>
      ));

      const noTrainings = (
        <Row>
          <Divider />
          <Empty description={<p style={pStyle}>Time for some activity!</p>} />
        </Row>
      );

      const newTraining = {
        date: moment().format("YYYY-M-D"),
        activity: "",
        duration: 10,
        customer: customer.links[0].href
      };

      return (
        <Drawer
          width={640}
          placement='right'
          closable={true}
          onClose={() => this.closeDrawer("trainingDrawer")}
          visible={this.state.trainingDrawerVisible}
        >
          <p style={{ ...pStyle, marginBottom: 24 }}>{`${customer.firstname} ${
            customer.lastname
          }'s trainings`}</p>
          <p style={pStyle}>Customer ID: {customer.id}</p>

          <div>
            {customer.trainings[0].rel !== null ? hasTrainings : noTrainings}
            <Divider />
            <Button
              style={{ width: "100%" }}
              type='primary'
              onClick={() => this.showDrawer("addTrainingDrawer")}
            >
              Add new activity!
            </Button>
          </div>
          <Drawer
            title={`New activity for ${customer.firstname} ${
              customer.lastname
            }`}
            width={340}
            closable={true}
            onClose={() => this.closeDrawer("addTrainingDrawer")}
            visible={this.state.addTrainingDrawerVisible}
          >
            <Form>
              <Form.Item>
                <Row>
                  <Col>
                    <DatePicker
                      required
                      defaultValue={moment()}
                      style={{ width: "100%" }}
                      getPopupContainer={trigger => trigger.parentNode}
                      onChange={e =>
                        (newTraining.date = moment(e).format("YYYY-M-D"))
                      }
                    />
                  </Col>
                </Row>
              </Form.Item>
              <Form.Item>
                <Row>
                  <Col>
                    <Input
                      required
                      suffix={
                        <Icon
                          type='contacts'
                          style={{ color: "rgba(0,0,0,.25)" }}
                        />
                      }
                      onChange={e => (newTraining.activity = e.target.value)}
                      placeholder=' Activity...'
                    />
                  </Col>
                </Row>
              </Form.Item>
              <Form.Item>
                <Row>
                  <Col>
                    <InputNumber
                      required
                      style={{ width: "100%" }}
                      defaultValue={10}
                      min={0}
                      max={120}
                      formatter={e => `${e}min`}
                      parser={e => e.replace("min", "")}
                      onChange={e => (newTraining.duration = e)}
                      suffix={
                        <Icon
                          type='contacts'
                          style={{ color: "rgba(0,0,0,.25)" }}
                        />
                      }
                      placeholder=' Duration...'
                    />
                  </Col>
                </Row>
              </Form.Item>
              <Form.Item>
                <Button
                  type='primary'
                  htmlType='submit'
                  onClick={() => this.addTraining(newTraining)}
                  block
                >
                  Add
                </Button>
              </Form.Item>
            </Form>
          </Drawer>
        </Drawer>
      );
    } else {
      return <p />;
    }
  };

  createCustomerDrawer = () => {
    let customer = {
      firstname: "",
      lastname: "",
      streetaddress: "",
      postcode: "",
      city: "",
      email: "",
      phone: ""
    };
    return (
      <Drawer
        width={640}
        placement='right'
        closable={true}
        onClose={() => this.closeDrawer("createCustomerDrawer")}
        visible={this.state.createCustomerDrawerVisible}
        className='new-customer-drawer'
      >
        <p style={{ ...pStyle, marginBottom: 24 }}>New Customer Profile</p>

        <Form className='new-customer-form'>
          <Form.Item>
            <Row>
              <Col
                span={12}
                style={{ paddingRight: "2em" }}
                className='new-customer-firstname'
              >
                <Input
                  prefix={
                    <Icon
                      type='contacts'
                      style={{ color: "rgba(0,0,0,.25)" }}
                      theme='twoTone'
                      twoToneColor='#1890ff'
                    />
                  }
                  onChange={e => (customer.firstname = e.target.value)}
                  allowClear
                  required
                  placeholder='First Name...'
                />
              </Col>
              <Col span={12}>
                <Input
                  prefix={
                    <Icon
                      type='contacts'
                      style={{ color: "rgba(0,0,0,.25)" }}
                      theme='twoTone'
                      twoToneColor='#1890ff'
                    />
                  }
                  onChange={e => (customer.lastname = e.target.value)}
                  allowClear
                  required
                  placeholder='Last Name...'
                />
              </Col>
            </Row>
          </Form.Item>
          <Form.Item>
            <Row>
              <Input
                prefix={
                  <Icon
                    type='mail'
                    style={{ color: "rgba(0,0,0,.25)" }}
                    theme='twoTone'
                    twoToneColor='#1890ff'
                  />
                }
                onChange={e => (customer.email = e.target.value)}
                allowClear
                required
                placeholder='E-Mail...'
              />
            </Row>
          </Form.Item>
          <Form.Item>
            <Row>
              <Input
                prefix={
                  <Icon
                    type='mobile'
                    style={{ color: "rgba(0,0,0,.25)" }}
                    theme='twoTone'
                    twoToneColor='#1890ff'
                  />
                }
                onChange={e => (customer.phone = e.target.value)}
                allowClear
                required
                placeholder='Telephone...'
              />
            </Row>
          </Form.Item>
          <Form.Item>
            <Row>
              <Input
                prefix={
                  <Icon
                    type='environment'
                    style={{ color: "rgba(0,0,0,.25)" }}
                    theme='twoTone'
                    twoToneColor='#1890ff'
                  />
                }
                onChange={e => (customer.streetaddress = e.target.value)}
                allowClear
                required
                placeholder='Street address..'
              />
            </Row>
          </Form.Item>
          <Form.Item>
            <Row>
              <Col
                span={12}
                style={{ paddingRight: "2em" }}
                className='new-customer-city'
              >
                <Input
                  prefix={
                    <Icon
                      type='home'
                      style={{ color: "rgba(0,0,0,.25)" }}
                      theme='twoTone'
                      twoToneColor='#1890ff'
                    />
                  }
                  onChange={e => (customer.city = e.target.value)}
                  allowClear
                  required
                  placeholder='City...'
                />
              </Col>
              <Col span={12}>
                <Input
                  prefix={
                    <Icon
                      type='cloud'
                      style={{ color: "rgba(0,0,0,.25)" }}
                      theme='twoTone'
                      twoToneColor='#1890ff'
                    />
                  }
                  onChange={e => (customer.postcode = e.target.value)}
                  allowClear
                  required
                  placeholder='Postal Code...'
                />
              </Col>
            </Row>
          </Form.Item>
          <Form.Item>
            <Button
              type='primary'
              htmlType='submit'
              loading={this.state.createCustomerLoading}
              onClick={() => this.createCustomerFunc(customer)}
              block
            >
              Add
            </Button>
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
        placement='right'
        closable={true}
        onClose={() => this.closeDrawer("customerDrawer")}
        visible={this.state.customerDrawerVisible}
      >
        <p style={{ ...pStyle, marginBottom: 24 }}>Customer Profile</p>
        <p style={pStyle}>Customer ID: {customer.id}</p>
        <Row>
          <Col span={12}>
            <DescriptionItem
              title='Full Name'
              content={customer.firstname + " " + customer.lastname}
            />
          </Col>
          <Col span={12}>
            <DescriptionItem
              title='Address'
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
            <DescriptionItem title='Email' content={customer.email} />
          </Col>
          <Col span={12}>
            <DescriptionItem title='Phone Number' content={customer.phone} />
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
    this.setState({ search });
  };

  deleteCustomer = (id, name) => {
    message.success(`Successfully removed customer ${name}`, 2);
    this.props.removeCustomerFunc(id);
    const url = `http://customerrest.herokuapp.com/api/customers/${id}`;
    Axios.delete(url);
  };

  filterData = () => {
    const keyword = this.state.search.toUpperCase();
    const data = this.props.customers.filter(
      v =>
        v.firstname.toUpperCase().includes(keyword) ||
        v.lastname.toUpperCase().includes(keyword) ||
        (v.firstname + " " + v.lastname).toUpperCase().includes(keyword)
    );
    return data;
  };

  cancel = () => {
    console.log("cancel");
  };

  CustomerList = props => {
    const data = props.data;
    const listItems = data.map(customer => (
      <Col span={8} key={customer.id}>
        <Card
          style={{ marginBottom: 30 }}
          bordered={true}
          actions={[
            <Tooltip title='Edit'>
              <Button
                icon='edit'
                shape='circle'
                size='small'
                onClick={() => {
                  this.setState({ currentCustomer: customer });
                  this.showDrawer("customerDrawer");
                }}
              />
            </Tooltip>,
            <Tooltip title='Trainings'>
              <Button
                icon='book'
                shape='circle'
                size='small'
                onClick={() => {
                  this.setState({ currentCustomer: customer });
                  this.showDrawer("trainingDrawer");
                }}
              />
            </Tooltip>,
            <Tooltip title='Delete'>
              <Popconfirm
                title='Are you sure you want to delete this customer?'
                onConfirm={() =>
                  this.deleteCustomer(
                    customer.id,
                    customer.firstname + " " + customer.lastname
                  )
                }
                onCancel={this.cancel}
                okText='Yes'
                cancelText='No'
              >
                <Button icon='delete' shape='circle' size='small' />
              </Popconfirm>
            </Tooltip>
          ]}
        >
          <Meta
            title={`${customer.firstname} ${customer.lastname}`}
            avatar={
              <Avatar src='https://cdn3.iconfinder.com/data/icons/avatars-9/145/Avatar_Panda-512.png' />
            }
          />
          <p />
          <p>
            <Icon type='profile' theme='twoTone' />
          </p>
          <p>
            <Icon type='phone' theme='twoTone' /> {customer.phone}
          </p>
          <p>
            <Icon type='home' theme='twoTone' />
            {` ${customer.streetaddress}, ${customer.city}, ${
              customer.postcode
            }`}
          </p>
          <p>
            <Icon type='mail' theme='twoTone' />
            {` ${customer.email}`}
          </p>
        </Card>
      </Col>
    ));
    return (
      <Row gutter={16}>
        {listItems}
        <this.customerDrawer />
        <this.createCustomerDrawer />
        <this.trainingDrawer />
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
      <Tooltip title='Add new customer'>
        <Button
          icon='user-add'
          size='small'
          type='primary'
          shape='round'
          onClick={() => this.showDrawer("createCustomerDrawer")}
          ghost
        />
      </Tooltip>
    );

    return (
      <div>
        <Search
          style={{ width: "100%", marginBottom: "2em", marginTop: "1em" }}
          placeholder='Name...'
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
