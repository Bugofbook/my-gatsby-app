import React from 'react';    
import { compose } from 'redux';
import Layout from "../layout";
import GameInFo from "../component/GameInFo";
import GameMain from "../component/GameMain";
import {TicTacToeSpecialInitialData} from "../functions/initialstatedata";
import { SquaresDeepCopy } from "../functions/gamebasics";
import { addNewChess, removeOldChess, ConeectJudge } from '../functions/connectgame'
import useCenterHook from "../useHook/useCenterHook";
// markup
const IndexPage = () => {
  const {history, gameinfo, jumpto, oneClick} = useCenterHook({initialstate: TicTacToeSpecialInitialData, canputJudge: canTicTacToePut, mainchange: tictactoeMainchange});
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
		<li>是井字棋的變化版</li>
		<li>雙方輪流放子</li>
		<li>先連成一線者得勝</li>
		<li>當現在盤面上有六顆棋子時。在第七個棋子落下前，會先移出最早放的棋子，再放下第七顆</li>
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
    ConeectJudge(3),
    addNewChess,
    removeOldChess
    )({
      squares: newsquares,
      lists: current.showlists.slice(),
      actionlists: gameinfo.actionlists.slice(),
      chess: newchess,
      gamestate: gameinfo.gamestate,
    })
}
