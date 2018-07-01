import axios from "axios";

// Export an object containing methods we'll use for accessing the Dog.Ceo API

export default {
  getSearch: function(searchTerm) {
    let queryURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json";

    // add the api key parameter (the one we received when we registered)
    queryURL += "?api-key=b9f91d369ff59547cd47b931d8cbc56b:0:74623931";
    queryURL += "&q=" + searchTerm;
    // if (parseInt(startYear)) {
    //   queryURL += "&begin_date=" + startYear + "0101";
    // }
    // if (parseInt(endYear)) {
    //   queryURL += "&end_date=" + endYear + "0101";
    // }
    return axios.get(queryURL);
  },
  getSaved: function() {
    return axios.get("/api/articles");
  },
  deleteSaved: function(id) {
    return axios.delete("/api/articles" + id);
  },
  save: function(data) {
    return axios.post("/api/articles", data);
  }
};