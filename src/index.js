import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class Connect4 extends React.Component
{  
  constructor(props)
  {
    super(props)
    this.state = {

    turn1: true,
    board: [],
    end: false,
    message: ''
    }
    //bind play peice so it can be called from the event triggers
    this.placePeice = this.placePeice.bind(this);
  }


  togglePlayer()
  {this.setState({'turn1':!this.state.turn1})}

  //initialize/reset a board
  createBoard()
  {//create rowws and collums
    let board = [];
    for (let r = 0; r < 6; r++) {
      let row = [];
      for (let c = 0; c < 7; c++) { row.push(null) }
      board.push(row);
    }
    this.setState({//reset states to their default
      board,
      turn1: true,
      end: false,
      message: ''
    });
  }
 
  placePeice(c){
    if (!this.state.end)
    {let board=this.state.board;//create a board in this function and make it the same as the board state
      for (let r = 5; r >= 0; r--) {//goes through all rowws in this collum of the board and checks if thir empty
        if (!board[r][c]) {
          if(this.state.turn1)//when it finds an empty slot, chaks if its turn 1, if so fills slot with 1, if not then its turn t, fill slot with 2
          {board[r][c] = 1}
          else
          {board[r][c] =2}
          break;
        }
      }
      //check board for wins/tie
      //x will be set to the result of any check, the one that do not return a win/tie will return null and be ignored
      //if thers a winner/tie end is set to true and a mesage dispalys, otherwise it updates the bard and togles the curent turn
      let x = this.checkVertical(board)||this.checkHorizontal(board)||this.checkDiagonalRight(board)||this.checkDiagonalLeft(board)||this.checkTie(board);
      if (x=== 1)
      {
        this.setState({board});//update the board
        this.setState({end : true});
        this.setState({ message: 'red wins' });
      }
      else if(x===2)
      {
        this.setState({board});//update the board
        this.setState({end : true});
        this.setState({ message: 'yellow wins' });
      }
      else if(x==='tie')
      {
        this.setState({board});//update the board
        this.setState({end : true});
        this.setState({ message: 'tie' });
      }
      else
      {
        this.setState({board});//update the board
        this.togglePlayer();
      }

    }
    else{this.setState({ message: 'Game Over, Please Restart' });}
  }

  checkVertical(board)
  {   
    for (let r = 3; r < 6; r++) // Check only if row is 3 or greater
    {
      for (let c = 0; c < 7; c++) //check each collum
      {
        if (board[r][c]) //checks that the position is not empty
        {
          if (board[r][c] === board[r - 1][c] && board[r][c] === board[r - 2][c] &&board[r][c] === board[r - 3][c]) //checks if the first peice found is the same as the next 3
          {
            return board[r][c]; //returns the value of the 4 peices found   
          }
        }
      }
    }
  }

  checkHorizontal(board) 
  {  
    for (let r = 0; r < 6; r++)  //check each row
    {
      for (let c = 0; c < 4; c++) // Check only if column is 3 or less
      {
        if (board[r][c]) //checks that the position is not empty
        {
          if (board[r][c] === board[r][c + 1] && board[r][c] === board[r][c + 2] &&board[r][c] === board[r][c + 3]) //checks if the first peice found is the same as the next 3
          {
            return board[r][c];//returns the value of the 4 peices found  
          }
        }
      }
    }
  }

  
  checkDiagonalRight(board) 
  {
    // Check only if row is 3 or greater AND column is 3 or less
    for (let r = 3; r < 6; r++) 
    {
      for (let c = 0; c < 4; c++) 
      {
        if (board[r][c]) 
        {
          if (board[r][c] === board[r - 1][c + 1] &&board[r][c] === board[r - 2][c + 2] &&board[r][c] === board[r - 3][c + 3]) 
          {
            return board[r][c];
          }
        }
      }
    }
  }
  
  checkDiagonalLeft(board) 
  {
    // Check only if row is 3 or greater AND column is 3 or greater
    for (let r = 3; r < 6; r++) 
    {
      for (let c = 3; c < 7; c++) 
      {
        if (board[r][c]) 
        {
          if (board[r][c] === board[r - 1][c - 1] && board[r][c] === board[r - 2][c - 2] &&board[r][c] === board[r - 3][c - 3])
          {
            return board[r][c];
          }
        }
      }
    }
  }
  
  checkTie(board) 
  {//goes through each position on the board
    for (let r = 0; r < 6; r++) 
    {
      for (let c = 0; c < 7; c++) 
      {
        if (board[r][c] === null) //checks if they are empty if any position is empty returns null (this mean its not a tie yet)
        {
          return null;
        }
      }
    }
    return 'tie'; //if the previous return was never trigered then thers no empty slot, return tie   
  }
  

  render()
  {
    
    //button to start the game
    //bellow it is a generated table
    //uses the map function to thake the board state and make a table out of it (i found this code online, im assuming it ok to use)
    return (
      <div>
        
        <button className='button' onClick={() => {this.createBoard()}}>New Game</button>
        
        <table>
          <thead>
          </thead>
          <tbody>
            {this.state.board.map((row, i) => (<Row key={i} row={row} call={this.placePeice} />))}
          </tbody>
        </table>
        
        
        <label className="message" >{this.state.message}</label>
      </div>
    );
  }
}

 // Row component 
 //ther rows and buttons used in the table(based on code i found onine)
 const Row = ({ row, call }) => {
  return (
    <tr>
      {row.map((cell, i) => <C4Button key={i} value={cell} column={i} call={call} />)}
    </tr>
  );
};

const C4Button = ({ value, column, call }) => {
  let color = 'white';
  if (value === 1) {
    color = 'red';
  } else if (value === 2) {
    color = 'yellow';
  }
    
  return (
    <td>
      <button className="boardCell" onClick={() => {call(column)}}>
        <button className={color}></button>
      </button>
    </td>
  );
};


//render

ReactDOM.render(
  <div>
  <Connect4/>
  </div>,
  document.getElementById('root')
);





