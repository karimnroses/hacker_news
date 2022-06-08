const Pagination = ({ articlesPerPage, totalNumberOfArticles, paginate }) => {
    const totalNumberOfPages = [];
  
    for (
      let i = 1;
      i <= Math.ceil(totalNumberOfArticles / articlesPerPage);
      i++
    ) {
      totalNumberOfPages.push(i);
    }
  
    return (
        <ul className="pagination">
          {totalNumberOfPages.map((number) => (
            <li key={number} className="page-item">
                <button className="page-link" onClick={() => paginate(number)}>{number}</button>
            </li>
          ))}
        </ul>
    );
  };
  
  export default Pagination;