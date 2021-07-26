import React from 'react';

import '../../scss/DogTable.scss';
import NewDogForm from './NewDogForm';

const DogTableHeader = () => (
  <table
    id="dog-table-header"
    role="presentation"
    className="table table--fixed"
  >
    <thead>
    {/*<NewDogForm />*/}
    <tr role="row">
      <th role="columnheader" className="table__header table__player">
        Dog
      </th>
      <th role="columnheader" className="table__header table__player">
        ID
      </th>
    </tr>
    </thead>
  </table>
);

export default DogTableHeader;
