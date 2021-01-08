import React, { Component } from "react";
import { httpGet } from "../../../api";

export class GetCategoriesList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      posts: []
    };
  }

  componentDidMount() {
      httpGet({
        url: "api/categories", 
        headers: {
          "X-Localization": "ru",
          "Content-Type": "application/json"
        }
      })
      .then(response => {
       this.setState({ posts: response.data });
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    let { posts } = this.state;
    const rel = posts.map(cool => <li key={cool.id}> cool.name</li>);
    return <div>{rel}</div>;
  }
}

export default GetCategoriesList;
