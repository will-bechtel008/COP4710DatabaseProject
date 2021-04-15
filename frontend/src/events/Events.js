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

const getEventData = async () => {
  const userid = localStorage.getItem('login_token');
  const getEvents =  "http://localhost:5000/users/events";
  const events = await axios.post(getEvents, {userid: userid});
  console.log("EVENT DATA1", events.data.Events)
  return events.data.Events;
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

const newEvent = (event) => {
  return {
    eventName: event.eventName,
    location: event.location,
    org: event.org,
    date: event.date,
    desc: event.desc,
    comments: 'pending'
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
          {
            Header: 'Location',
            accessor: 'location',
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
            Header: 'Comments',
            accessor: 'comments',
          },
        ],
      },
    ],
    []
  )

  console.log("length: ", events.length)
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
      {events.length === 0 ? <h5>No Events to Display, go join a University or Organization!</h5> : <Table columns={columns} data={data} />}
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
      this.setState({loading: true});
      const userid = localStorage.getItem('login_token');
      axios.post("http://localhost:5000/users/events", {userid: userid})
        .then(res => {
          const events = res.data.Events;
          this.setState({events: events});
          console.log("events: ", this.state.events)
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