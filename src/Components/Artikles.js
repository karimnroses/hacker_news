import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { ClipLoader } from "react-spinners";
import Pagination from "./Pagination";

function Artikles() {
  const [articles, setArticles] = useState("");
  const [searchedWord, setSearchedWord] = useState([]);
  const [articlesPerPage] = useState(7); //defining how many articles per page we want
  const [currentPage, setCurrentPage] = useState(1); //defining that we will start at page 1
  const indexOfLastArticle = currentPage * articlesPerPage;
  const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;

  const handelSubmit = (e) => {
    setSearchedWord(e.target.firstChild.value);
    e.preventDefault();
    e.target.firstChild.value = "";
    console.log(searchedWord);
  };

  let url = `https://hn.algolia.com/api/v1/search?query=${searchedWord}&hitsPerPage=80`;
  useEffect(() => {
    axios
      .get(url)
      .then((response) => setArticles(response.data.hits))
      .catch((err) => console.log(err));
  }, [url]);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <>
      <form onSubmit={handelSubmit}>
        <input type="text" placeholder="type a search term"></input>
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
        {articles ? (
          articles
            .slice(indexOfFirstArticle, indexOfLastArticle)
            .map((article) => (
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
        ) : (
          <ClipLoader color="purple" size={150} />
        )}

        {articles && (
          <Pagination
            articlesPerPage={articlesPerPage}
            totalNumberOfArticles={articles.length}
            paginate={paginate}
          />
        )}
      </div>
    </>
  );
}

export default Artikles;
