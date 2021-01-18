import React, {Component} from "react";
import {
  Col,
  Nav,
  Button,
  NavItem,
  NavLink,
  Row,
  TabContent,
  TabPane
} from "reactstrap";
import AddForms from "./AddForm";
import UpdateInfoProduct from "./components/InfoProduct";

import SeoProduct from "./components/SeoProduct";
import ImageProduct from "./components/ImageProduct";
import PriceProduct from "./components/PriceProduct";
import DescriptionProduct from "./components/DesciptionProduct";
import {httpGet, httpPost} from "../../../api";
import UpdateCharacter from "./components/Characteristics";
import {Notyf} from "notyf";

class UpdateProduct extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      activeTab: new Array(4).fill("1"),
      productData: [],

      brand_id: '',


      files: [],
      related_product_ids: [],
      descriptionData: {
        weight: '',
        description_short: '',
        data: '',
        isActive: null
      },
      categories: [],
      meta: {
        meta_title: "",
        meta_description: "",
        meta_keywords: "",
      }
    };


  }

  componentWillMount() {

    if (this.props.location.updateproduct_id !== undefined) {
      localStorage.setItem('id', this.props.location.updateproduct_id);
    }
  }

  componentDidMount() {
    this.getProduct(this.props.match.params.id)
  }

  getProduct = (id) => {


    httpGet({
      url: "api/admin/product",
      params: {
        product_id: id ? id : localStorage.getItem('id')
      }
    })
      .then(response => {
        this.setState({
          productData: response.data.data
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  lorem() {
    return "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit.";
  }

  toggle(tabPane, tab) {
    const newArray = this.state.activeTab.slice();
    newArray[tabPane] = tab;
    this.setState({
      activeTab: newArray
    });
  }

  handleChildrenFormData = (type, data) => {
    this.setState({[type]: data})
  }

  handleUpdate = () => {

    const notyf = new Notyf();

    const {descriptionData, files, categories, meta} = this.state;

    let formData = files.length ? new FormData() : null;

    if (files.length) {
      for (let i = 0; i < files.length; i++)
        formData.append('images[]', files[i])
    }

    httpPost({
      url: `api/admin/product/update/${this.state.productData.id}`,
      data: {
        active: descriptionData.isActive,
        description_short: {
          ru: descriptionData.description_short
        },
        description: {
          ru: descriptionData.data
        },
        weight: descriptionData.weight,
        categories,
        meta_title: {
          ru: meta.meta_title
        },
        meta_description: {
          ru: meta.meta_description
        },
        meta_keywords: {
          ru: meta.meta_keywords
        }
      }
    })
      .then(response => {
        notyf.success('Информация продукта обновлена')

      })
      .catch(error => {
        console.log(error);
      });
  }

  tabPane() {
    return (
      <>
        <TabPane tabId="1">
          {
            <UpdateInfoProduct
              id={this.state.productData.id}
              brand={this.state.productData.brand}
              class={this.state.productData.class}
              model={this.state.productData.model}
              handleChildrenFormData={this.handleChildrenFormData}
            />
          }
          {
            <ImageProduct
              id={this.state.productData.id}
              images={this.state.productData.images}
              brand={this.state.productData.brand}
              class={this.state.productData.class}
              model={this.state.productData.model}
            />
          }

          {
            <DescriptionProduct
              id={this.state.productData.id}
              brand={this.state.productData.brand}
              class={this.state.productData.class}
              model={this.state.productData.model}
            />
          }

          {
            <AddForms
              checked={this.state.productData.categories}
              id={this.state.productData.id}
              brand={this.state.productData.brand}
              class={this.state.productData.class}
              model={this.state.productData.model}
            />
          }
          {
            <SeoProduct
              id={this.props.location.updateproduct_id}
              meta_description={this.state.productData.meta_description}
              meta_keywords={this.state.productData.meta_keywords}
              meta_title={this.state.productData.meta_title}
              brand={this.state.productData.brand}
              class={this.state.productData.class}
              model={this.state.productData.model}
            />
          }

          <Button onClick={this.handleUpdate}
                  type="button"
                  size="sm"
                  color="primary"
          >
            <i className="fa fa-dot-circle-o"></i> Сохранить
          </Button>

        </TabPane>

        <TabPane tabId="2">
          {
            <UpdateCharacter
              getProduct={this.getProduct}
              features={this.state.productData.features}
              id={this.state.productData.id}
              brand={this.state.productData.brand}
              class={this.state.productData.class}
              model={this.state.productData.model}
            />
          }
        </TabPane>
        {/* <TabPane tabId="4">
          {`4. ${this.lorem()}`}
        </TabPane> */}


        <TabPane tabId="7">
          {
            <PriceProduct
              id={this.state.productData.id}
              items={this.state.productData.items}
              brand={this.state.productData.brand}
              class={this.state.productData.class}
              model={this.state.productData.model}
              shop_reference={this.state.productData.shop_reference}
              getProducts={this.getProduct}
            />
          }
        </TabPane>
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
                  active={this.state.activeTab[0] === "1"}
                  onClick={() => {
                    this.toggle(0, "1");
                  }}
                >
                  Информация
                </NavLink>
              </NavItem>


              <NavItem>
                <NavLink
                  active={this.state.activeTab[0] === "2"}
                  onClick={() => {
                    this.toggle(0, "2");
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


              <NavItem>
                <NavLink
                  active={this.state.activeTab[0] === "7"}
                  onClick={() => {
                    this.toggle(0, "7");
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

export default UpdateProduct;
