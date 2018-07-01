import React, { Component } from "react";
import API from "../utils/API";
import SearchForm from "../components/SearchForm";
import DeleteBtn from "../components/DeleteBtn";
import Alert from "../components/Alert";
import Jumbotron from "../components/Jumbotron";
import { Col, Row, Container } from "../components/Grid";
import { List, ListItem } from "../components/List";

class Search extends Component {
  state = {
    search: "",
    saved: "",
    topics: [],
    results: [],
    articles: [],
    error: ""
  };

  constructor(props) {
    super(props);
    this.myRef = React.createRef();
  }

  componentDidMount() {
    this.loadSave();
  }
  
  loadSave = () => {
    API.getSaved().then(res =>
      this.setState({ articles: res.data})
    )
    .catch(err => console.log(err));
  };

  delete = id => {
    API.deleteSaved(id)
      .then(res => this.loadSave())
      .catch(err => console.log(err));
      console.log(id)
  };

  handleInputChange = event => {
    this.setState({ search: event.target.value });
  };

  handleFormSubmit = event => {
    event.preventDefault();
    API.getSearch(this.state.search)
      .then(res => {
        if (res.data.status === "error") {
          throw new Error(res.data.message);
        }
        this.setState({ results: res.data.response.docs, error: "" });
      })
      .catch(err => this.setState({ error: err.message }));
  };

  handleSave = (event) => {
    event.preventDefault();
    API.save({
      title: this.state.results[event.currentTarget.dataset.id].headline.main,
      author: this.state.results[event.currentTarget.dataset.id].byline.original,
      url: this.state.results[event.currentTarget.dataset.id].web_url
    })
    .then(res => this.loadSave())
    .catch(err => console.log(err));
}

  render() {
    return (
      <div>
        <Container style={{ minHeight: "80%" }}>
          <h1 className="text-center">Search By topic!</h1>
          <Alert
            type="danger"
            style={{ opacity: this.state.error ? 1 : 0, marginBottom: 10 }}
          >
            {this.state.error}
          </Alert>
          <SearchForm
            handleFormSubmit={this.handleFormSubmit}
            handleInputChange={this.handleInputChange}
            topics={this.state.topics}
          />
          <ul className="list-group search-results">
            {this.state.results.map((result, i) => (
              <li key={i} ref={this.myRef} className="list-group-item" onClick={this.props.handleSave}>
                <a href={result.web_url}>{result.headline.main}</a>
                <button onClick={this.handleSave.bind(this)} data-id={i} className="btn btn-success">
                  Save
      </button>
              </li>
            ))}
          </ul>
          <Col size="md-6 sm-12">
            <Jumbotron>
              <h1>Saved Articles</h1>
            </Jumbotron>
            {this.state.articles.length ? (
              <List>
                {this.state.articles.map(article => (
                  <ListItem key={article._id}>
                  <a href={article.web_url}>{article.title}</a>
                    <DeleteBtn onClick={() => this.delete(article._id)} />
                  </ListItem>
                ))}
              </List>
            ) : (
              <h3>No Results to Display</h3>
            )}
          </Col>
        </Container>
      </div>
    );
  }
}

export default Search;
