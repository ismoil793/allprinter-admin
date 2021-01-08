import React from "react";
import CheckboxTree from "react-checkbox-tree";
import "react-checkbox-tree/lib/react-checkbox-tree.css";
import { httpGet } from "../../../api";

class  ParentBrand extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      categories: []
    };
  }

 async componentDidMount() {
  await httpGet({
    url: "api/admin/group",
    params: {
      group_id: localStorage.getItem("group_id")
    }
  })
    .then(response => {
      this.setState({
        checked: response.data.data.brands
      });
    
    })
    .catch(error => {
      console.log(error);
    });


    await httpGet({
        url: "api/admin/brand",
        params: {
         per_page: 200
        }
      })
      .then(response => {

        let categories = response.data.data;
        let nodes = [];
        for (let i = 0; i < categories.length; i++) {
          nodes.push({
            label: categories[i].name ,
            value: categories[i].id,
          
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



  onCheck = (checked) =>{
    this.setState({checked})
    this.props.categoryFunction(checked)
}




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
export default ParentBrand;
