import React, { FC } from 'react';
import { Link } from 'react-router-dom';

type Props = {
  setLoading: (loading: boolean) => void;
  // setSearchValue atualizará o valor searchValue, este deverá ser  usado para fazer a pesquisa.
  setSearchValue: (searchAPI: string) => void;
  setSearch: (search: string) => void;
  search: string;
  styles?: any;
  disabled?: boolean;
  linkToAdd?: string;
};

const Search: FC<Props> = ({
  setLoading,
  setSearchValue,
  search,
  setSearch,
  styles,
  disabled,
  linkToAdd,
}) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let timeout: any = 0;

  const onInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const duration = 2000;
    setLoading(true);
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      setSearchValue(e.target.value);
      setLoading(false);
    }, duration);
  };

  return (
    <div className="search-create" style={styles}>
      {linkToAdd ? (
        <Link to={linkToAdd} className="btn-create">
          <i
            style={{ fontSize: '1em', color: '#000', textDecoration: 'none' }}
            className="pi pi-plus"
          />
        </Link>
      ) : null}
      <span className="p-input-icon-left">
        <input
          disabled={disabled}
          type="text"
          placeholder="Pesquise"
          className="p-inputtext p-component"
          id="search-input"
          value={search}
          onChange={(e) => {
            onInput(e);
            setSearch(e.target.value);
          }}
        />
        <i className="pi pi-search" aria-label="search-icon" />
      </span>
    </div>
  );
};

export default Search;
