import React, { Component, Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import * as router from 'react-router-dom';
import { 
  Container,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,

} from 'reactstrap';
import Echo from "laravel-echo";
import Socketio from "socket.io-client";

import {
  AppAside,
  AppFooter,
  AppHeader,
  AppSidebar,
  AppSidebarFooter,
  AppSidebarForm,
  AppSidebarHeader,
  AppSidebarMinimizer,
  AppBreadcrumb2 as AppBreadcrumb,
  AppSidebarNav2 as AppSidebarNav,
} from '@coreui/react';
// sidebar nav config
// import navigation from '../../_nav';
// routes config
import routes from '../../routes';
import Cookies from "universal-cookie"
// import { Notyf } from 'notyf'
import Snowfall from 'react-snowfall'
import { getLoggedUserData } from './api'

const DefaultAside = React.lazy(() => import('./DefaultAside'));
const DefaultFooter = React.lazy(() => import('./DefaultFooter'));
const DefaultHeader = React.lazy(() => import('./DefaultHeader'));

class DefaultLayout extends Component {
 
  constructor(props) {
    super(props);

    this.state = {
      loggedIn: false,
      sidebars: {
        items: []
      },
      redirectUrl: '/',
      admin_id: undefined,
      successModal: false,
      asteriskType: 1,
      clientId: undefined
    };
    this.toggleSuccess = this.toggleSuccess.bind(this);
  }

  async componentDidMount () {
  await  getLoggedUserData()
      .then(response => {
        const sidebars = response.data.data.sidebars;
        const admin_id = response.data.data.id;
        const keys = Object.keys(sidebars);
        let tempUrls = [];

        let result = keys.map((key) => {
         
          let tempObj = {};
          const firsLevelChildKeys = Object.keys(sidebars[key].childs);
          
          tempObj = sidebars[key].data;
          if(firsLevelChildKeys.length !== 0) {
            tempObj.children = [];
            firsLevelChildKeys.forEach(childKey => {
              let tempObj2 = {};
              const secondLevelChildKeys = Object.keys(sidebars[key].childs[childKey].childs);
              tempObj2 = sidebars[key].childs[childKey].data;    
              if(secondLevelChildKeys.length !== 0) {
                tempObj2.children = [];
                secondLevelChildKeys.forEach(grandChildKey => {
                  tempObj2.children.push(sidebars[key].childs[childKey].childs[grandChildKey].data);
                  tempUrls.push(sidebars[key].childs[childKey].childs[grandChildKey].data.url)
                })
              } else if (sidebars[key].childs[childKey].data.hasOwnProperty('url')) tempUrls.push(sidebars[key].childs[childKey].data.url)
              tempObj.children.push(tempObj2)
            })
          } else if (sidebars[key].data.hasOwnProperty('url')) tempUrls.push(sidebars[key].data.url);
          return tempObj;
        })
     
       
        let final = []
        for (let i = 0 ; i < result.length ; i++){
          if(result[i].type === 'admin'){
          final.push(result[i])
          }
        }
       
        this.setState({
          sidebars: {
            items: final
          },
          redirectUrl: tempUrls[0],
          admin_id: admin_id
        })
      });

    const cookie = new Cookies();

    let echo = new Echo({
      broadcaster: "socket.io",
      host: `https://api.brandstore.uz:6001`,
      client: Socketio,
      auth: {
        headers: {
          Authorization: `Bearer ${cookie.get("access_token")}`
        }
      }
    });
    
    if (this.state.admin_id) {
      echo
        .private(`Admin.${this.state.admin_id}`)
        .listen(".App\\Events\\Asterisk\\AdminCallCreated", event => {
          if (event.call.user === null) {
            this.setState({
              asteriskType: 2,
              successModal: true
            })
          } else {
            this.setState({
              clientId: event.call.user.id,
              asteriskType: 1,
              successModal: true
            })
          }
        });
    }
  }

  loading = () => <div className="animated fadeIn pt-1 text-center">Загрузка...</div>

  signOut(e) {
    e.preventDefault()
    this.props.history.push('/login')
  }
  
  toggleSuccess() {
    this.setState({
      successModal: !this.state.successModal,
    });
  }

  openOrderPage(id) {
    this.toggleSuccess();
    this.props.history.push(`/clients/${id}`)
  }

  openCreateOrderPage() {
    this.toggleSuccess();
    this.props.history.push(`/orders/add`)
  }

  render() {
    const cookies = new Cookies()
    if (!cookies.get("access_token")) {
      return <Redirect to="/login" />
    }
    
    return (
      <div className="app">
        <Modal isOpen={this.state.successModal} toggle={this.toggleSuccess} centered
                className={'modal-success '}>
          <ModalHeader toggle={this.toggleSuccess}>Астериск</ModalHeader>
          <ModalBody>
            {this.state.asteriskType === 1 ? "Открыть карточку пользователя?" : this.state.asteriskType === 2 ? "Абонент в базе не обнаружен. Создать заказ?" : "Что то пошло не так"}
          </ModalBody>
          <ModalFooter>
            <Button color="success" onClick={this.state.asteriskType === 1 ? () => this.openOrderPage(this.state.clientId) : this.state.asteriskType === 2 ? () => this.openCreateOrderPage() : null}>Да</Button>
            {' '}
            <Button color="secondary" onClick={this.toggleSuccess}>Нет</Button>
          </ModalFooter>
        </Modal>
        <AppHeader fixed>
          <Suspense  fallback={this.loading()}>
            <DefaultHeader onLogout={e=>this.signOut(e)}/>
          </Suspense>
        </AppHeader>
        <div className="app-body">
          <AppSidebar fixed display="lg">
            <Snowfall snowflakeCount={10}/>
            <AppSidebarHeader />
            <AppSidebarForm />
            <Suspense>
            <AppSidebarNav navConfig={this.state.sidebars} {...this.props} router={router}/>
            </Suspense>
            <AppSidebarFooter />
            <AppSidebarMinimizer />
          </AppSidebar>
          <main className="main">
            <AppBreadcrumb appRoutes={routes} router={router}/>
            <Container fluid>
              <Suspense fallback={this.loading()}>
            
                <Switch>
                  {routes.map((route, idx) => {
                    return route.component ? (
                      <Route
                        key={idx}
                        path={route.path}
                        exact={route.exact}
                        name={route.name}
                        render={props => (
                          <route.component {...props} />
                        )} />
                    ) : (null);
                  })}
                  <Redirect from="/" to={this.state.redirectUrl} />
                </Switch>
              </Suspense>
            </Container>
          </main>
          <AppAside fixed>
            <Suspense fallback={this.loading()}>
              
              <DefaultAside />
            </Suspense>
          </AppAside>
        </div>
        <AppFooter>
          <Suspense fallback={this.loading()}>
            <DefaultFooter />
          </Suspense>
        </AppFooter>
      </div>
    );
  }
}

export default DefaultLayout;
