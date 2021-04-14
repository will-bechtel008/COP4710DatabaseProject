import React from 'react';
import './Orgs.css'
import Logout from '../login/Logout'

import axios from 'axios'

// Create Org component
import CreateOrg from './CreateOrg';

import CssBaseline from '@material-ui/core/CssBaseline'
import MaUTable from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'

import { useTable } from 'react-table'

import makeData from '../events/makeData'


const getOrgData = async () => {
  const getOrgs = "http://localhost:5000/users/organizations";
  const orgs = await axios.post(getOrgs, {});
  console.log("ORGS", orgs.data)
  return orgs.data;
}

function Table({ columns, data }) {
  // Use the state and functions returned from useTable to build your UI
  const { getTableProps, headerGroups, rows, prepareRow } = useTable({
    columns,
    data,
  })
  
  // Render the UI for your table
  return (
    <MaUTable {...getTableProps()}>
      <TableHead>
        {headerGroups.map(headerGroup => (
          <TableRow {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map(column => (
              <TableCell {...column.getHeaderProps()}>
                {column.render('Header')}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableHead>
      <TableBody>
        {rows.map((row, i) => {
          prepareRow(row)
          return (
            <TableRow {...row.getRowProps()}>
              {row.cells.map(cell => {
                return (
                  <TableCell {...cell.getCellProps()}>
                    {cell.render('Cell')}
                  </TableCell>
                )
              })}
            </TableRow>
          )
        })}
      </TableBody>
    </MaUTable>
  )
}

function Orgs() {
  const columns = React.useMemo(
    () => [
      {
        Header: 'Name',
        columns: [
          {
            Header: 'First Name',
            accessor: 'firstName',
          },
          {
            Header: 'Last Name',
            accessor: 'lastName',
          },
        ],
      },
      {
        Header: 'Info',
        columns: [
          {
            Header: 'Age',
            accessor: 'age',
          },
          {
            Header: 'Visits',
            accessor: 'visits',
          },
          {
            Header: 'Status',
            accessor: 'status',
          },
          {
            Header: 'Profile Progress',
            accessor: 'progress',
          },
        ],
      },
    ],
    []
    )
    
    const data = React.useMemo(() => makeData(20), [])
    const getOrgs = "http://localhost:5000/users/organizations";
    
    return (
      <div>
        <Logout />
      <h1 className='h1'>Universities and Organizations</h1>
      {/* <CreateOrg className='middlecolumn'/> */}
      <br/><br/><br/><br/><br/><br/>
      <CssBaseline />
      <Table columns={columns} data={data} />
    </div>
  )
}

export default Orgs
