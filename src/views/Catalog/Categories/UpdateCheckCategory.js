import React from "react";
import CheckboxTree from "react-checkbox-tree";
import "react-checkbox-tree/lib/react-checkbox-tree.css";
import { httpGet } from "../../../api";


class UpdateParentCategory extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      categories: []
    };
  }

  componentDidMount() {

    httpGet({
      url: "api/admin/category", 
      params: {
        category_id: localStorage.getItem("category_id")
      }
    })
    .then(response => {
      this.setState({
        checked: response.data.data.category.id,
       });
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

        let result = [];
        result.push(this.props.selected_parent);
        this.setState({
          categories: nodes,
          checked: result
        });
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
          noCascade={true}
        />
      </div>
    );
  }
}
export default UpdateParentCategory;
