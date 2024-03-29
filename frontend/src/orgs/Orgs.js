import React from 'react';
import {useState} from 'react'
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

function Table({ columns, data }) {
  // Use the state and functions returned from useTable to build your UI
  const { getTableProps, headerGroups, rows, prepareRow } = useTable({
    columns,
    data,
  })

  console.log(rows)

  const onJoinClick = (id, type) => {
    const userid = localStorage.getItem('login_token');
    const uni = 'http://localhost:5000/university/join';
    const rso = 'http://localhost:5000/rso/join';
    let path = '';
    if (type === 'University' || type === 'uni')  {
      path = uni;
      axios.post(path, {userid: userid, universityid: id})
        .then(res => {
          console.log(res);
        })
        return;
    }
    else {
      path = rso;
      axios.post(path, {userid: userid, rsoid: id})
        .then(res => {
          console.log(res);
        })

    }
  }

  // Render the UI for the table
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
              {console.log(row)}
              {row.cells.map(cell => {
                return (
                  <TableCell {...cell.getCellProps()}>
                    {cell.render('Cell')}
                  </TableCell>
                )
              })}
              <button onClick={() => onJoinClick(row.values._id, row.values.orgType)}> Join </button>
            </TableRow>
          )
        })}
      </TableBody>
    </MaUTable>
  )
}

const newOrg = (org) => {
  return {
    orgName: org.name,
    orgType: org.orgType,
    location: org.location,
    desc: org.desc,
    activated: org.activated,
    _id: org._id
  }
}

// make data for rows
function makeData(orgs, lens) {
  const makeDataLevel = (depth = 0) => {
    const len = lens[depth]
    return orgs.map(org => {
      return {
        ...newOrg(org),
        subRows: lens[depth + 1] ? makeDataLevel(depth + 1) : undefined,
      }
    })
  }

  return makeDataLevel()
}

function OrgTable({orgs}) {
  const columns = React.useMemo(
    () => [
      {
        Header: 'Name',
        columns: [
          {
            Header: 'Organization Name',
            accessor: 'orgName',
          },
          {
            Header: 'University or Rso',
            accessor: 'orgType',
          },
        ],
      },
      {
        Header: 'Info',
        columns: [
          {
            Header: 'Location',
            accessor: 'location',
          },
          {
            Header: 'Description',
            accessor: 'desc',
          },
          {
            Header: 'Status',
            accessor: 'activated',
          },
          {
            Header: 'ID',
            accessor: '_id',
          },
        ],
      },
    ],
    []
    )

    // parse data
    const data = React.useMemo(() => makeData(orgs, orgs.length), [])
    return (
      <div>
        <Logout />
        <button className='orgs_button' onClick={() => {window.location = '/events'}}>
        Back
      </button>
      <h1 className='h1'>Universities and Organizations</h1>
      <CreateOrg className='middlecolumn'/>
      <CssBaseline />
      <Table columns={columns} data={data} />
    </div>
  )
}

class Orgs extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      orgs: [],
      loading: false
    }
  }

  // get starting values
  componentDidMount(): void {
    this.setState({loading: true});
    axios.post("http://localhost:5000/users/organizations")
      .then(res => {
        const orgs = res.data.orgs;
        this.setState({orgs: orgs});
        console.log('orgs: ', this.state.orgs)
        console.log('userid: ', localStorage.getItem('login_token'))
        this.setState({loading: false});
      });
  }

  render(): React.Node {
    if (this.state.loading) {
      return (
        <div>Loading data...</div>
      )
    }
    else {
      return (
        <OrgTable orgs={this.state.orgs}/>
      )
    }
  }
}

export default Orgs
