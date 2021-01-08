import React from "react";
import CheckboxTree from "react-checkbox-tree";
import "react-checkbox-tree/lib/react-checkbox-tree.css";
import { httpGet } from "../../../../api";

class UpdateCheckCategory extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      categories: []
    };
  }

  componentDidMount() {
    httpGet({
      url: "api/admin/product",
      params: {
        product_id: localStorage.getItem("id")
      }
    })
      .then(response => {
        this.setState({
          checked: response.data.data.categories.map(category => category.id)
        });
        console.log(this.state.checked)
      })
      .catch(error => {
        console.log(error);
      });

    httpGet({
      url: "api/admin/category",
      params: {
        type: "recursive"
      },
      headers: {
        "X-Localization": "ru",
        "Content-Type": "application/json"
      }
    })
      .then(response => {
        let categories = response.data.data;
        let nodes = [];
        for (let i = 0; i < categories.length; i++) {
          let child = [];
          for (let k = 0; k < categories[i].childs.length; k++) {
            child.push({
              label: categories[i].childs[k].name.ru,
              value: categories[i].childs[k].id
            });
          }
          nodes.push({
            label: categories[i].name.ru,
            value: categories[i].id,
            children: child
          });
        }

        this.setState({ categories: nodes });
      })
      .catch(error => {
        console.log(error);
      });
  }

  state = {
    checked: [],
    expanded: []
  };

  onCheck = checked => {
    this.setState({ checked });
    this.props.categoryFunction(checked);
  };

  render() {

    return (
      <div>
        <CheckboxTree
          nodes={this.state.categories}
          checked={this.state.checked}
          expanded={this.state.expanded}
          onCheck={this.onCheck}
          onExpand={expanded => this.setState({ expanded })}
        />
      </div>
    );
  }
}
export default UpdateCheckCategory;