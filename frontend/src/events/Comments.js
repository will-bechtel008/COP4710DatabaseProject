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

function Table({ columns, data, eventid}) {
    // Use the state and functions returned from useTable to build your UI
    const { getTableProps, headerGroups, rows, prepareRow } = useTable({
      columns,
      data,
    })
  
    async function onCommentClick (commentid, text, oldRating) {
      try {
          const path = 'http://localhost:5000/comment/update';
          const rating = oldRating + 1;
          const eventid = localStorage.getItem('eventid');
          const userid = localStorage.getItem('login_token');
          const newComment = await axios.post(path, {userid, eventid, commentid, text, rating});
          window.location.reload();
      }
      catch (err) {};
    }
    async function onDeleteClick (commentid, text, oldRating) {
      try {
          const path = 'http://localhost:5000/comment/delete';
          const eventid = localStorage.getItem('eventid');
          const userid = localStorage.getItem('login_token');
          const newComment = await axios.post(path, {userid, eventid, commentid});
          window.location.reload();
      }
      catch (err) {};
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
                <button onClick={() => onCommentClick(row.values.id, row.values.text, row.values.rating)}> Like </button>
                <button onClick={() => onDeleteClick(row.values.id, row.values.text, row.values.rating)}> Delete </button>

              </TableRow>
            )
          })}
        </TableBody>
      </MaUTable>
    )
  }
  
  const newEvent = (event) => {
    return {
      text: event.text,
      rating: event.rating,
      date: event.timestamp,
      id: event._id,
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
  
  async function createNewComment(userid, eventid, text, rating) {
    try {
        const path = 'http://localhost:5000/comment/add';
        const newComment = await axios.post(path, {userid, eventid, text, rating});
        console.log('newComment: ', newComment);
        window.location.reload();

    }
    catch (err) {};
};

function handlePostClick(comment) {
    createNewComment(localStorage.getItem('login_token'), localStorage.getItem('eventid'), comment, 0);
};

  function CommentTable ({comments, name, eventid}) {
    const columns = React.useMemo(
      () => [
        {
          Header: 'Comment',
          columns: [
            {
              Header: 'Comments',
              accessor: 'text',
            },
            {
              Header: 'Rating',
              accessor: 'rating',
            },
          ],
        },
        {
          Header: 'Info',
          columns: [
            {
              Header: 'Time Posted',
              accessor: 'date',
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
  


    

    const data = React.useMemo(() => makeData(comments, comments.length), [])
    const comment = '';
    return (
        <div>
        <Logout />
        <button onClick={() => {window.location = '/events'}}>
          Back
        </button>
        <h1 className='h1'>{name}</h1>
        <br/><br/><br/><br/><br/>
        <CssBaseline />
        {comments.length === 0 ? <h5>No comments yet, share one below!</h5> : <Table columns={columns} data={data} eventid={eventid} />}
      </div>
      )
    }
    
    class Comments extends React.Component {
        constructor(props) {
            super(props);
            this.state={
                comments: [],
                name: '',
                eventid: '',
                text: '',
                loading: false
            }
        }
        
        componentDidMount(): void {
            this.setState({loading: true})
            const eventid = localStorage.getItem('eventid');
            axios.post('http://localhost:5000/event/get', {eventid: eventid})
            .then(res => {
                const comments = res.data.comments;
                const eventName = res.data.eventName;
                this.setState({comments: comments, name: eventName, eventid: eventid});
                this.setState({loading: false});
            });
        }
        
        render(): React.Node {
            if (this.state.loading) {
                return (
                    <div>Loading comments...</div>
                    )
                }
                else {
                    return (
                        <div>
                        <CommentTable comments={this.state.comments} name={this.state.name} eventid={this.state.eventid}/>
                        <input type='text' placeholder='Comment...' value={this.state.text} onChange={e => this.setState({text: e.target.value})}/>
                        <button onClick={() => handlePostClick(this.state.text)}>Submit</button>
                        </div>
                        )
                    }
                }
}

export default Comments