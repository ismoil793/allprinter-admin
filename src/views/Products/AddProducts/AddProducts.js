import React, { Component } from 'react';
import { Button, Col, Nav, NavItem, NavLink, Row, TabContent, TabPane, } from 'reactstrap';
import AddForms from './AddForm'
import InfoProduct from './components/InfoProduct'
import Character from './components/Characteristics'
import SeoProduct from './components/SeoProduct'
import ImageProduct from './components/ImageProduct'
import PriceProduct from './components/PriceProduct';
import DescriptionProduct from './components/DesciptionProduct';


class AddProducts extends Component {

  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      activeTab: new Array(4).fill('1'),
      productData: [],
      newProductData: [], //after connecting categories
      isCreateNewProduct: false,

      descriptionData: {
        weight: '',
        description_short: '',
        data: '',
        isActive: null
      },

      files: [],
      categories: [],
      meta: {
        meta_title: "",
        meta_description: "",
        meta_keywords: "",
      }
    };
  }

  handleChildrenFormData = (type, data) => {
    this.setState({ [type]: data })
  }

  handleInfoProduct = (val) => {
    this.setState({ isCreateNewProduct: val })
  }

  callbackFunction = (childData) => {
    this.setState({ productData: childData })
  }

  newCallbackFunction = (childData) => {
    this.setState({ productData: childData })
  }

  lorem() {
    return 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit.'
  }

  toggle(tabPane, tab) {
    const newArray = this.state.activeTab.slice()
    newArray[tabPane] = tab
    this.setState({
      activeTab: newArray,
    });
  }

  handleSubmit = () => {

    this.handleInfoProduct(true)
  }

  tabPane() {
    return (
      <>
        <TabPane tabId="1">
          {
            <InfoProduct
              id={this.state.productData.id}
              handleInfoProduct={this.handleInfoProduct}
              isCreateNewProduct={this.state.isCreateNewProduct}
              parentCallback={this.callbackFunction}
              formData={this.state}
            />}

          {<ImageProduct
            id={this.state.productData.id}
            handleChildrenFormData={this.handleChildrenFormData}
          />}

          {<DescriptionProduct
            id={this.state.productData.id}
            handleChildrenFormData={this.handleChildrenFormData}
          />}

          {<AddForms
            parentCallback={this.newCallbackFunction}
            id={this.state.productData.id}
            category={this.state.productData.categories}
            handleChildrenFormData={this.handleChildrenFormData}
          />}
          {<SeoProduct
            id={this.state.productData.id}
            handleChildrenFormData={this.handleChildrenFormData}
          />}


          <Button onClick={this.handleSubmit}
            type="button"
            size="sm"
            color="primary"
          >
            <i className="fa fa-dot-circle-o"></i> Сохранить
          </Button>

        </TabPane>


        {/*<TabPane tabId="8">*/}
        {/*</TabPane>*/}
        {/*<TabPane tabId="3">*/}
        {/*</TabPane>*/}

        <TabPane tabId="2">
          {<Character id={this.state.productData.id} features={this.state.productData.features} />}
        </TabPane>

        {/* <TabPane tabId="4">
          {`4. ${this.lorem()}`}
        </TabPane> */}
        <TabPane tabId="5">
        </TabPane>

        <TabPane tabId="6">
          {<ImageProduct id={this.state.productData.id} />}
        </TabPane>
        <TabPane tabId="7">
          {<PriceProduct id={this.state.productData.id} />}
        </TabPane>
        {/*<TabPane tabId="1"> */}
        {/*  {<InfoProduct parentCallback = {this.callbackFunction} />}*/}
        {/*</TabPane>*/}
        {/*<TabPane tabId="8">*/}
        {/*  {<DescriptionProduct id = {this.state.productData.id}  />}*/}
        {/*</TabPane>*/}
        {/*<TabPane tabId="3">*/}
        {/*  {<AddForms  parentCallback = {this.newCallbackFunction} */}
        {/*  id={this.state.productData.id} category={this.state.productData.categories} />}*/}
        {/*</TabPane>*/}
        {/*<TabPane tabId="2">*/}
        {/*  {<Character id = {this.state.productData.id} features={this.state.productData.features} />}*/}
        {/*</TabPane>*/}
        {/*/!* <TabPane tabId="4">*/}
        {/*  {`4. ${this.lorem()}`}*/}
        {/*</TabPane> *!/*/}
        {/*<TabPane tabId="5">*/}
        {/*  {<SeoProduct id = {this.state.productData.id}/>}*/}
        {/*</TabPane>*/}
        {/*<TabPane tabId="6">*/}
        {/*  {<ImageProduct id = {this.state.productData.id} />}*/}
        {/*</TabPane>*/}
        {/*<TabPane tabId="7">*/}
        {/*  {<PriceProduct id = {this.state.productData.id} />}*/}
        {/*</TabPane>*/}
      </>
    );
  }

  render() {

    return (
      <div className="animated fadeIn">
        <Row>
          <Col xs="12" md="12" className="mb-12">
            <Nav tabs>
              <NavItem>
                <NavLink
                  active={this.state.activeTab[0] === '1'}
                  onClick={() => {
                    this.toggle(0, '1');
                  }}
                >
                  Информация
                </NavLink>
              </NavItem>
              {/*<NavItem>*/}
              {/*  <NavLink*/}
              {/*    active={this.state.activeTab[0] === '8'}*/}
              {/*    onClick={() => { this.toggle(0, '8'); }}*/}
              {/*  >*/}
              {/* Описание*/}
              {/*  </NavLink>*/}
              {/*</NavItem>*/}

              {/*<NavItem>*/}
              {/*  <NavLink*/}
              {/*    active={this.state.activeTab[0] === '3'}*/}
              {/*    onClick={() => { this.toggle(0, '3'); }}*/}
              {/*  >*/}
              {/*  Линки*/}
              {/*  </NavLink>*/}
              {/*</NavItem>*/}

              <NavItem>
                <NavLink
                  active={this.state.activeTab[0] === '2'}
                  onClick={() => {
                    this.toggle(0, '2');
                  }}
                >
                  Характеристики
                </NavLink>
              </NavItem>

              {/* <NavItem>
                <NavLink
                  active={this.state.activeTab[0] === '4'}
                  onClick={() => { this.toggle(0, '4'); }}
                >
                 Доставка
                </NavLink>
              </NavItem> */}
              {/*<NavItem>*/}
              {/*  <NavLink*/}
              {/*    active={this.state.activeTab[0] === '5'}*/}
              {/*    onClick={() => { this.toggle(0, '5'); }}*/}
              {/*  >*/}
              {/*    Seo*/}
              {/*  </NavLink>*/}
              {/*</NavItem>*/}
              {/*<NavItem>*/}
              {/*  <NavLink*/}
              {/*    active={this.state.activeTab[0] === '6'}*/}
              {/*    onClick={() => { this.toggle(0, '6'); }}*/}
              {/*  >*/}
              {/*   Изображение*/}
              {/*  </NavLink>*/}
              {/*</NavItem>*/}
              <NavItem>
                <NavLink
                  active={this.state.activeTab[0] === '7'}
                  onClick={() => {
                    this.toggle(0, '7');
                  }}
                >
                  Вариации Продукта
                </NavLink>
              </NavItem>

            </Nav>
            <TabContent activeTab={this.state.activeTab[0]}>
              {this.tabPane()}
            </TabContent>
          </Col>

        </Row>
      </div>
    );
  }
}

export default AddProducts;
