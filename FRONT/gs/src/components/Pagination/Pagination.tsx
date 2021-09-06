/* eslint-disable */

import React, { useState } from 'react';
import './styles.css';

interface Props {
  totalPosts: number;
  paginate: (page: number) => void;
  currentPage: string;
  itensPerPage: string;
  setItensPerPage: (value: string) => void;
}

const Pagination: React.FC<Props> = ({
  totalPosts,
  paginate,
  currentPage,
  itensPerPage,
  setItensPerPage,
}) => {
  const pageNumbers: number[] = [];
  const [irPara, setIrPara] = useState(currentPage);
  const [irParaErro, setIrParaErro] = useState(false);

  const FIRST_ITEM_PAGE =
    parseInt(itensPerPage, 10) * parseInt(currentPage, 10) - (parseInt(itensPerPage, 10) - 1);
  const LAST_ITEM_PAGE = parseInt(itensPerPage, 10) * parseInt(currentPage, 10);

  for (let i = 1; i <= Math.ceil(totalPosts / parseInt(itensPerPage, 10)); i++) {
    pageNumbers.push(i);
  }

  const paginationNumber = () => {
    let pageRange: number[] = [];
    const page = parseInt(currentPage, 10);

    const LEFT_PAGES = pageNumbers.indexOf(page);
    const RIGHT_PAGES = pageNumbers.length - (pageNumbers.indexOf(page) + 1);

    if (LEFT_PAGES === 0) {
      pageRange.push(page);
      //console.log('LEFT_PAGES 0');
      for (let j = page + 1; j <= page + 3; j++) {
        if (!pageNumbers.includes(j)) {
          break;
        }
        pageRange.push(j);
      }
    } else if (LEFT_PAGES === 1) {
      //console.log('LEFT_PAGES 1');
      pageRange.push(page - 1, page);
      for (let j = page + 1; j <= page + 2; j++) {
        if (!pageNumbers.includes(j)) {
          break;
        }
        pageRange.push(j);
      }
    } else if (RIGHT_PAGES === 0) {
      //console.log('RIGHT_PAGES 0');
      for (let j = page - 1; j >= page - 3; j--) {
        if (!pageNumbers.includes(j)) {
          break;
        }
        pageRange.push(j);
      }
      pageRange.reverse();
      pageRange.push(page);
    } else if (RIGHT_PAGES === 1) {
      //console.log('RIGHT_PAGES 1');
      for (let j = page - 1; j >= page - 2; j--) {
        if (!pageNumbers.includes(j)) {
          break;
        }
        pageRange.push(j);
      }
      pageRange.reverse();
      pageRange.push(page, page + 1);
    } else {
      //console.log('ELSE_PAGES');
      for (let j = page - 1; j >= page - 1; j--) {
        if (!pageNumbers.includes(j)) {
          break;
        }
        pageRange.push(j);
      }
      pageRange.push(page, page + 1, page + 2);
    }

    return pageRange.map((number) => (
      <li key={number}>
        <button
          className={`page-number ${
            parseInt(currentPage, 10) === number ? 'page-number-active' : ''
          }`}
          onClick={() => paginate(number)}
        >
          {number}
        </button>
      </li>
    ));
  };

  const handleNextPage = () => {
    const nextPage = parseInt(currentPage, 10) + 1;
    paginate(nextPage);
  };

  const handlePreviousPage = () => {
    const previousPage = parseInt(currentPage, 10) - 1;
    paginate(previousPage);
  };

  const handleIrPara = () => {
    const pageNumber = parseInt(irPara, 10);
    if (!pageNumbers.includes(pageNumber)) {
      setIrParaErro(true);
      return;
    }
    paginate(pageNumber);
    setIrParaErro(false);
  };

  const handleLastPage = () => {
    paginate(pageNumbers[pageNumbers.length - 1]);
  };

  const handleFirstPage = () => {
    paginate(1);
  };

  return (
    <div className="container-wrapper-pagination">
      <div className="row-container-pagination">
        <div className="select-pages-pagination">Visualizar</div>
        <select
          className="page-item-quantity"
          onChange={(value) => {
            setItensPerPage(value.target.value);
            paginate(1);
          }}
          value={itensPerPage}
        >
          <option value="10">10</option>
          <option value="15">15</option>
          <option value="20">20</option>
          <option value="25">25</option>
        </select>
        <span className="page-map-pagination">{`[${FIRST_ITEM_PAGE} a ${
          LAST_ITEM_PAGE > totalPosts ? totalPosts : LAST_ITEM_PAGE
        } de ${totalPosts}]`}</span>
      </div>
      <div className="row-container-pagination">
        <button
          type="button"
          className={`btn-goto ${irParaErro ? 'btn-goto-erro' : ''}`}
          onClick={handleIrPara}
        >
          Ir Para
        </button>
        <input
          type="number"
          className="input-goto"
          value={irPara}
          onChange={(value) => setIrPara(value.target.value)}
        />
        <div>
          <nav>
            <ul className="pagination">
              <li className="page-item">
                <button
                  className="button-page"
                  aria-label="First"
                  disabled={parseInt(currentPage, 10) === 1}
                  onClick={handleFirstPage}
                >
                  <span aria-hidden="true">&laquo;</span>
                </button>
              </li>
              <li className="page-item">
                <button
                  className="button-page"
                  aria-label="Previous"
                  onClick={handlePreviousPage}
                  disabled={parseInt(currentPage, 10) === 1}
                >
                  <span aria-hidden="true">&lsaquo;</span>
                </button>
              </li>
              {paginationNumber()}
              <li>
                <button
                  className="button-page"
                  aria-label="Next"
                  onClick={handleNextPage}
                  disabled={parseInt(currentPage, 10) === pageNumbers.length}
                >
                  <span>&rsaquo;</span>
                </button>
              </li>
              <li>
                <button className="button-page" aria-label="Last" onClick={handleLastPage}>
                  <span>&raquo;</span>
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Pagination;
