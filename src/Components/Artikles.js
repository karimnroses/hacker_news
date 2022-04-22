import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { Form } from "react-bootstrap";

function Artikles() {
  const [articles, setArticles] = useState("");
  const [searchedWord, setSearchedWord] = useState("");
  let inputValue = React.createRef();
 
  const handelClick = (e) => {
    setSearchedWord(inputValue.current.value);
    //console.log(searchedWord);
  };
  const handelChange = (e) => {
    e.preventDefault();
    setSearchedWord(inputValue.current.value);
    //console.log(searchedWord);
  }
  let url = "https://hn.algolia.com/api/v1/search?query=" + searchedWord;
  useEffect(() => {
    axios
      .get(url)
      .then((response) => setArticles(response.data.hits))
      .catch((err) => console.log(err));
  }, [searchedWord]);

  return (
    <>
      <div className="flex-container">
        <form className="form">
          <label htmlFor="header-search">
          Search blog posts
          </label>
          <input
            type="text"
            id="header-search"
            placeholder="Search blog posts"
            name="search"
            ref={inputValue}
            value={searchedWord}
            onChange={handelChange}
          />
          <button onClick={handelClick} type="submit">
            Search
          </button>
        </form>
      </div>

      <div className="main">
        <h2>Results for: <span>{searchedWord}</span></h2>
        {/* Conditional Rendering mit ternary operator:
      Wenn "articles" truthy ist (also einen Wert hat)
      wollen wir das div mit den Inhalten aus der Response zeigen
      andernfalls zeige den String "Loading" */}
        {articles
          ? articles.map((article) => (
              <ul>
                <div key={article.objectID}>
                  <li>{article.title}</li>
                  <li>
                    <b>Autor:</b> {article.author}
                  </li>
                  <a href={article.url} target="_blank" rel="Link">
                    Read more
                  </a>
                </div>
              </ul>
            ))
          : "Loading....."}
      </div>
    </>
  );
}

export default Artikles;
