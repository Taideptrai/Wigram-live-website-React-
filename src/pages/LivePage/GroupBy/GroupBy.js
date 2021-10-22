import './GroupBy.scss';
import { ReactComponent as IconGroupByChevron } from 'icons/group-by-chevron.svg';
import { useState } from 'react';

function GroupBy({ groupBy, setGroupBy }) {
  const [showGroupBy, setShowGroupBy] = useState(false);

  function onGroupByClick(groupByType) {
    setGroupBy(groupByType);
    setShowGroupBy(false);
  }

  return (
    <div className='group-by' onClick={() => setShowGroupBy(!showGroupBy)}>
      <div className='current-group-by'>{groupBy}</div>
      <IconGroupByChevron />

      {showGroupBy && (
        <GroupByDropdown
          currentGroupBy={groupBy}
          onClick={onGroupByClick}
        ></GroupByDropdown>
      )}
    </div>
  );
}

const GroupByDropdown = ({ currentGroupBy, onClick }) => {
  const groupByOptions = ['Days', 'Weeks', 'Months'];
  return (
    <div className='group-by-dropdown'>
      {groupByOptions.map((option, i) => (
        <div
          key={i}
          onClick={() => onClick(option)}
          className={option === currentGroupBy ? 'current' : ''}
        >
          {option}
        </div>
      ))}
    </div>
  );
};

export default GroupBy;
