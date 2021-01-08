import React, { Component } from "react";
import Switch from "react-switch";
import { httpPost } from "../../../../api";
import { Notyf } from 'notyf'
import 'notyf/notyf.min.css'

class ClassSwitchExample extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      checked: this.props.active
    };
    this.handleChange = this.handleChange.bind(this);
  }
 
  handleChange(checked) {
    this.setState(prevState => 
      ({ checked: !prevState.checked })
      );

      setTimeout(()=>{

        const notyf = new Notyf()
        httpPost({
          url:`api/admin/class/update/${this.props.id}`,
          data:{
            status: this.state.checked
          } 
        })
        .then(response => {
         
          if(this.state.checked){
            notyf.success('Класс включен')
          } else {
            notyf.error('Класс отключен')
          }
         
        })
        .catch(error =>{
          console.log(error)
        })


      }, 100)
     
    }
 
  render() {
    return (
      <label>
        <Switch onChange={this.handleChange} checked={this.state.checked} />
      </label>
    );
  }
}
export default ClassSwitchExample