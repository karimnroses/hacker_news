import React from "react";
import axios from 'axios';
import { useState, useEffect } from "react"
import { Form } from "react-bootstrap"

function Artikles() {

  const [articles, setArticles] = useState(null);

  useEffect(() => {
    axios
      .get("https://hn.algolia.com/api/v1/search?query=react")
      .then((response) => setArticles(response.data.hits))
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
    <div className="flex-container">
      <Form className="form">
        <Form.Group>
          <div>
          <Form.Label>Search news: </Form.Label>
          </div>
          <div>
          <Form.Control type="text" placeholder="Search here..."  />        
          </div>
          </Form.Group>
          
      </Form>
    </div>

    <div>
      <h1>Let's fetch</h1>
      {/* Conditional Rendering mit ternary operator:
      Wenn "articles" truthy ist (also einen Wert hat)
      wollen wir das div mit den Inhalten aus der Response zeigen
      andernfalls zeige den String "Loading" */}
      {articles
        ?  articles.map((article) => (
          <ul>
            <div key={article.objectID}>
              <li>{article.title}</li>
              <li>{article.author}</li>
              <a href={article.url} target="_blank" rel="Link">Read more</a>
            </div>
            </ul>
          ))
        : "Loading....."}
    </div>
    </>
  );
}

export default Artikles;
