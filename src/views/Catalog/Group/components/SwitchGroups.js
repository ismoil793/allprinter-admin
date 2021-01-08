import React, { Component } from "react";
import Switch from "react-switch";
import { httpPost } from "../../../../api";
import { Notyf } from "notyf";
import "notyf/notyf.min.css";

class GroupSwitchExample extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: this.props.active
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(checked) {
    this.setState(prevState => ({ checked: !prevState.checked }));

    setTimeout(() => {
      const notyf = new Notyf();
      httpPost({
        url: `api/admin/group/update/${this.props.id}`,
        data: {
          active: this.state.checked
        }
      })
        .then(response => {
          console.log(response);
          if (this.state.checked) {
            notyf.success("Группа включена");
          } else {
            notyf.error("Группа отключена");
          }
        })
        .catch(error => {
          console.log(error);
        });
    }, 100);
  }

  render() {
    return (
      <label>
        <Switch onChange={this.handleChange} checked={this.state.checked} />
      </label>
    );
  }
}
export default GroupSwitchExample;
