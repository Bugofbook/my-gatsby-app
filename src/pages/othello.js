import React from 'react';    
import { compose } from 'redux';
import Layout from "../layout";
import GameInFo from "../component/GameinFo";
import GameMain from "../component/GameMain";
import {OthelloInitialData} from "../functions/initialstatedata";
import { SquaresDeepCopy, addChessToLists, setChessToSquares} from "../functions/gamebasics";
import { calculationArrays } from "../functions/catchgame";
import useCenterHook from "../useHook/useCenterHook";
// markup
const IndexPage = () => {
  const {history, gameinfo, jumpto, oneClick} = useCenterHook({initialstate: OthelloInitialData, canputJudge: canTicTacToePut, mainchange: tictactoeMainchange});
  const currentBoard = history[gameinfo.turns]
  const players = {
    player1: "Tom",
    player2: "Jerry",
  }
  const gamerule = TicTacToeRule
  return (
    <Layout>
      <GameMain
        currentBoard={currentBoard}
        gameinfo={gameinfo}
        players={players}
        gamerule={gamerule}
        mainchange={oneClick}
      />
      <GameInFo 
        players={players} 
        history={history} 
        gameinfo={gameinfo} 
        // adddata={()=>this.adddata(info.gamename,info.actionlists)} 
        jumpto={(step) => jumpto(step)}
      />
    </Layout>
  )
}

export default IndexPage

const TicTacToeRule =  
	<React.Fragment>
		<li>是奧賽羅棋的”極簡化版“</li>
		<li>雙方輪流放子</li>
		<li>當棋盤上都放滿棋子時，棋子多的玩家得勝</li>
		<li>還沒有限制下棋子的地方，之後會補上功能</li>
	</React.Fragment>

const canTicTacToePut = (gamehistory, gameinfo, rowskey, columnskey) => {
  if (gameinfo.gamestate === "Game End") {
    return false
  }
  const currentBoard = gamehistory[gamehistory.length - 1].squares
  return !currentBoard[rowskey][columnskey].lock
}
const tictactoeMainchange = (gamehistory, gameinfo, rowskey, columnskey) => {
  const history = gamehistory.slice(0, gameinfo.turns + 1);
  const current = history[history.length - 1];
  const player = current.nowplayer
  let newsquares = SquaresDeepCopy(current.squares);
  const  newchess = {
    rowskey: rowskey,
    columnskey: columnskey,
    value: (player === "player1") ? "BlackChess" : "WhiteChess",
    owner: player,
    lock: true,
  }
  return compose(
    JudgeGame,
    organizeBoard,
    addNewChess,
    )({
      squares: newsquares,
      player1chess: current.player1chess,
      player2chess: current.player2chess,
      actionlists: gameinfo.actionlists.slice(),
      chess: newchess,
      gamestate: gameinfo.gamestate,
    })
}

const addNewChess = (ProcessObject = {}) => {
	let chess = ProcessObject.chess
	ProcessObject.actionlists = addChessToLists(chess,ProcessObject.actionlists)
	ProcessObject.squares = setChessToSquares(chess,ProcessObject.squares)
	return ProcessObject
}
const organizeBoard = (ProcessObject = {}) => {
	let chess = ProcessObject.chess
	let squares = ProcessObject.squares
	let player = chess.owner
	//caculate the array to change chess	and flatten 2-dimension-array to 1-dimension-array
	let changeArrays = calculationArrays(chess, squares).reduce((accumulator,currentValue)=> accumulator.concat(currentValue),[])
	let changenumber = changeArrays.length
	//change chess by array
	if (changenumber > 0){
		ProcessObject.squares = changeArrays.reduce((presquares,nowchess) => setChessToSquares(nowchess,presquares),squares)
	}
	//re-caculate the number of player's chess
	if (player === "player1") {
		ProcessObject.player1chess += changenumber + 1
		ProcessObject.player2chess -= changenumber
	}
	else {
		ProcessObject.player1chess -= changenumber
		ProcessObject.player2chess += changenumber + 1
	}
	return ProcessObject
}

const JudgeGame = (ProcessObject = {}) => {
	let player1chess = ProcessObject.player1chess
	let player2chess = ProcessObject.player2chess
  if (player1chess ===0) {
    ProcessObject.gamestate = "Game End"
    ProcessObject.winner = "player2"
    ProcessObject.loser = "player1"
  }
  if (player2chess ===0) {
    ProcessObject.gamestate = "Game End"
    ProcessObject.winner = "player1"
    ProcessObject.loser = "player2"
  }
  if (player1chess + player2chess >= 64) {
    if (player1chess > player2chess) {
      ProcessObject.gamestate = "Game End"
      ProcessObject.winner = "player1"
      ProcessObject.loser = "player2"
    } else if (player2chess > player1chess) {
      ProcessObject.gamestate = "Game End"
      ProcessObject.winner = "player2"
      ProcessObject.loser = "player1"
    } else {
      ProcessObject.gamestate = "Game End"
      ProcessObject.winner = "No Winner"
      ProcessObject.loser = "No Loser"
    }
  } else {
    ProcessObject.gamestate = "Game Playing"
    ProcessObject.winner = ""
    ProcessObject.loser = ""
  }
	return ProcessObject
}