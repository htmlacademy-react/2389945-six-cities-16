import type { SortNameType } from '../../lib/types';
import { useState } from 'react';
import { SortingList } from '../../const';

type SortListProps = {
  onChange: (name: SortNameType) => void;
  //activeSort: SortNameType;
  activeSort: SortingList;
};

export const SortList = ({
  onChange,
  activeSort,
}: SortListProps): JSX.Element => {
  const [isOpened, setIsOpened] = useState<boolean>(false);

  const handleOpenButtonClick = () => {
    setIsOpened(!isOpened);
  };

  const handleSortItemClick = (name: SortNameType) => {
    setIsOpened(false);
    onChange(name);
  };

  return (
    <form className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">Sort by </span>
      <span
        className="places__sorting-type"
        tabIndex={0}
        onClick={handleOpenButtonClick}
      >
        {activeSort}
        <svg className="places__sorting-arrow" width="7" height="4">
          <use xlinkHref="#icon-arrow-select"></use>
        </svg>
      </span>
      {isOpened && (
        <ul className="places__options places__options--custom places__options--opened">
          {(Object.entries(SortingList) as [SortNameType, SortingList][]).map(
            ([name, title]) => (
              <li
                key={name}
                className={`places__option${
                  name === activeSort ? ' places__option--active' : ''
                }`}
                onClick={() => handleSortItemClick(name)}
                tabIndex={0}
              >
                {title}
              </li>
            )
          )}
        </ul>
      )}
    </form>
  );
};
