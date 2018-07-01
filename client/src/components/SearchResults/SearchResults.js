import React from "react";
import "./SearchResults.css";

const SearchResults = props => (
  
  <ul className="list-group search-results">
    {props.results.map((result, i) => (
      console.log(result),
      <li key={i} ref={this.myRef} className="list-group-item" onClick={props.handleSave}>
        <a href={result.web_url}>{result.headline.main}</a>
        <button
        onClick={props.handleSave}
        className="btn btn-success"
      >
        Save
      </button>
      </li>
    ))}
  </ul>
);

export default SearchResults;
