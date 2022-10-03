// Packages
import { useState } from 'react';

// Utils
import { getPropByString } from '../utils/getPropByString';

// Sort data asc as default
const getDefaultSorting = (defaultTableData: any, columns: any) => {
  const sorted = [...defaultTableData].sort((a, b) => {
    const filterColumn = columns.filter((column: any) => column.sortbyOrder);

    // Merge all array objects into single object and extract accessor and sortbyOrder keys
    let { accessor = 'id', sortbyOrder = 'asc' } = Object.assign({}, ...filterColumn);

    if (getPropByString(a, accessor) === null) return 1;
    if (getPropByString(b, accessor) === null) return -1;
    if (getPropByString(a, accessor) === null && getPropByString(b, accessor) === null) return 0;

    const ascending = getPropByString(a, accessor).toString().localeCompare(getPropByString(b, accessor).toString(), 'en', {
      numeric: true,
    });

    return sortbyOrder === 'asc' ? ascending : -ascending;
  });
  return sorted;
};

// Custom Hook to sort data
export const useSortableTable = (data: any, columns: any) => {
  const [tableData, setTableData] = useState(getDefaultSorting(data, columns));

  const handleSorting = (sortField: any, sortOrder: any) => {
    if (sortField) {
      const sorted = [...tableData].sort((a, b) => {
        if (getPropByString(a, sortField) === null) return 1;
        if (getPropByString(b, sortField) === null) return -1;
        if (getPropByString(a, sortField) === null && getPropByString(b, sortField) === null) return 0;
        return (
          getPropByString(a, sortField).toString().localeCompare(getPropByString(b, sortField).toString(), 'en', {
            numeric: true,
          }) * (sortOrder === 'asc' ? 1 : -1)
        );
      });
      setTableData(sorted);
    }
  };

  return [tableData, handleSorting];
};