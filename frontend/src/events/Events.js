import React from 'react';
import './Events.css'
import Logout from '../login/Logout.js'
// table formatting
import CssBaseline from '@material-ui/core/CssBaseline'
import MaUTable from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import { useTable } from 'react-table'
import axios from 'axios'

// Create Event Component
import CreateEvent from './CreateEvent';
import Map from './Map.js'

function Table({ columns, data }) {
  // Use the state and functions returned from useTable to build your UI
  const { getTableProps, headerGroups, rows, prepareRow } = useTable({
    columns,
    data,
  })

  const onMapClick = (lat, lng, name) => {
    localStorage.setItem('lat', lat);
    localStorage.setItem('lng', lng);
    localStorage.setItem('eventName', name);

    window.location = '/Map';
  }

  const onCommentClick = (id, name) => {
    localStorage.setItem('eventName', name);
    localStorage.setItem('eventid', id);

    window.location = '/comments';
  }

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
              <button onClick={() => onMapClick(row.values.lat, row.values.lng, row.values.eventName)}> Map </button>
              <button onClick={() => onCommentClick(row.values.id, row.values.eventName)}> Comments </button>
              {/* <button onClick={() => console.log(row)}> test </button> */}
            </TableRow>
          )
        })}
      </TableBody>
    </MaUTable>
  )
}

const newEvent = (event) => {
  let x = String(event.latitude);
  let y = String(event.longitude);
  return {
    eventName: event.eventName,
    org: event.org,
    date: event.date,
    desc: event.desc,
    lat: x,
    lng: y,
    id: event._id
  }
}

function makeData(events, lens) {
  const makeDataLevel = (depth = 0) => {
    const len = lens[depth]
    return events.map(event=> {
      return {
        ...newEvent(event),
        subRows: lens[depth + 1] ? makeDataLevel(depth + 1) : undefined,
      }
    })
  }

  return makeDataLevel()
}

function EventTable ({events}) {
  const columns = React.useMemo(
    () => [
      {
        Header: 'Event Title',
        columns: [
          {
            Header: 'Event Name',
            accessor: 'eventName',
          },
        ],
      },
      {
        Header: 'Info',
        columns: [
          {
            Header: 'Organization',
            accessor: 'org',
          },
          {
            Header: 'Date',
            accessor: 'date',
          },
          {
            Header: 'Description',
            accessor: 'desc',
          },
          {
            Header: 'Latitude',
            accessor: 'lat',
          },
          {
            Header: 'Longitude',
            accessor: 'lng',
          },
          {
            Header: 'ID',
            accessor: 'id',
          },
        ],
      },
    ],
    []
  )

  const data = React.useMemo(() => makeData(events, events.length), [])
    return (
      <div>
      <Logout />
      <button className='orgs_button' onClick={() => {window.location = '/orgs'}}>
        Find Universities and organizations
      </button>
      <h1 className='h1'>EVENTS</h1>
      <CreateEvent className='middlecolumn'/>
      <CssBaseline />
      {events.length === 0 ? <h5>No Events to Display, go join a University or Organization if you have not already!</h5> : <Table columns={columns} data={data} />}
    </div>
    )
}

class Events extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      events: [],
      loading: false
    }
  }

    componentDidMount(): void {
      console.log(localStorage.getItem('login_token'))
      this.setState({loading: true});
      const userid = localStorage.getItem('login_token');
      axios.post("http://localhost:5000/users/events", {userid: userid})
        .then(res => {
          const events = res.data.Events;
          this.setState({events: events});
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
          <EventTable events={this.state.events} />
      )
    }
  }
}

export default Events