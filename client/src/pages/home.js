import React, { Component } from "react";
import API from "../utils/API";
import Container from "../components/Container";
import SearchForm from "../components/SearchForm";
import SearchResults from "../components/SearchResults";
import Alert from "../components/Alert";

class Search extends Component {
  state = {
    search: "",
    saved: "",
    topics: [],
    results: [],
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
    API.getSaved()
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
        </Container>
      </div>
    );
  }
}

export default Search;
