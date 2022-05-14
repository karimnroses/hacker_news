import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";

function Artikles() {
  const [articles, setArticles] = useState("");
  const [searchedWord, setSearchedWord] = useState([]);
  //let inputValue = React.createRef();

  const handelSubmit = (e) => {
    setSearchedWord(e.target.firstChild.value);
    e.preventDefault();
    e.target.firstChild.value = "";
    console.log(searchedWord);
  };

  let url = `https://hn.algolia.com/api/v1/search?query= ${searchedWord}`;
  useEffect(() => {
    axios
      .get(url)
      .then((response) => setArticles(response.data.hits))
      .catch((err) => console.log(err));
  }, [url]);

  return (
    <>
      <form onSubmit={handelSubmit}>
        <input
          type="text"
          placeholder="type a search term"
        ></input>
        <button type="submit" className="submitBtn">
          submit
        </button>
      </form>

      <div className="main">
        <h3>
          Results for: <span>{searchedWord}</span>
        </h3>
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
                  <a href={article.url} target="_blank" rel="noreferrer">
                    Read more
                  </a>
                </div>
              </ul>
            ))
          : <h3>Loading...</h3>
          }
      </div>
    </>
  );
}

export default Artikles;
