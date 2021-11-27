// SCSS
import './Pagination.scss'

const Pagination = ({ activePage, setActivePage, totalPages }) => {
  console.log(activePage)
  return (
    <div className="pagination-holder">
      <button
        className="pagination"
        onClick={() => setActivePage(activePage - 1)}
        disabled={`${activePage <= 1 ? 'true' : ''}`}
      >Prev</button>
      <div className="pagination-list">
        {activePage > 3 ? (
          <button
            className="pagination"
            onClick={() => setActivePage(activePage = 1)}
          >1</button>
        ) : null}
        {activePage > 4 ? (
          <button
            className="pagination"
            onClick={() => setActivePage(activePage = 2)}
          >2</button>
        ) : null}
        {/* Dot styles from 2 indicating that there are buttons close to the active page */}

        {/* The previous 2 buttons close to the active page */}
        {!(activePage-2 < 1) ? (
          <button
            className="pagination"
            onClick={() => setActivePage(activePage-2)}
          >{activePage-2}</button>
        ) : null}
        {!(activePage-1 < 1) ? (
          <button
            className="pagination"
            onClick={() => setActivePage(activePage-1)}
          >{activePage-1}</button>
        ) : null}
        {/* Active page */}
        <button className="pagination current-page">{activePage}</button>
        {/* The next 2 buttons close to the active page */}
        {!(activePage+1 > totalPages) ? (
          <button
            className="pagination"
            onClick={() => setActivePage(activePage+1)}
          >{activePage+1}</button>
        ) : null}
        {!(activePage+2 > totalPages) ? (
          <button
            className="pagination"
            onClick={() => setActivePage(activePage+2)}
          >{activePage+2}</button>
        ) : null}
        {/* Dot styles from 2 indicating that there are buttons close to the active page */}
        {activePage+3 < totalPages ? (
          <button
            className="pagination"
            onClick={() => setActivePage(totalPages-1)}
          >{totalPages-1}</button>
        ) : null}
        {activePage+2 < totalPages ? (
          <button
            className="pagination"
            onClick={() => setActivePage(totalPages)}
          >{totalPages}</button>
        ) : null}
      </div>
      <button
        className="pagination"
        onClick={() => setActivePage(activePage + 1)}
        disabled={`${activePage >= totalPages ? 'true' : ''}`}
      >Next</button>
    </div>
  )
}

export default Pagination
