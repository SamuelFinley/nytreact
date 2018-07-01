import React from "react";
import "./SearchForm.css";

// Using the datalist element we can create autofill suggestions based on the props.breeds array
const SearchForm = props => (
  <form className="search">
    <div className="form-group">
      <label htmlFor="topic">topic</label>
      <input
        value={props.search}
        onChange={props.handleInputChange}
        name="topic"
        list="topics"
        type="text"
        className="form-control"
        id="topic"
      />
      <datalist id="topics">
        {props.topics.map(topic => <option value={topic} key={topic} />)}
      </datalist>
      <button
        type="submit"
        onClick={props.handleFormSubmit}
        className="btn btn-success"
      >
        Search
      </button>
    </div>
  </form>
);

export default SearchForm;
