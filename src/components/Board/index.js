import React, { useState } from 'react';
import produce from 'immer';

import { loadLists } from '../../services/api';

import BoardContext from './context';

import List from '../List';

import { Container } from './styles';

const data = loadLists();

export default function Board() {
  const [lists, setlists] = useState(data);
  const [fromList1, setFromList] = useState(0);
  const [toList1, setToList1] = useState(0);
  const [from1, setFrom1] = useState(0);
  const [to1, setTo1] = useState(0);
  const [target, setTarget] = useState();

  function move(fromList, toList, from, to) {
    setlists(produce(lists, draft => {
      const dragged = draft[fromList].cards[from];

      draft[fromList].cards.splice(from, 1);
      draft[toList].cards.splice(to, 0, dragged);
    }));
  }

  //
  function coordnatesUP(fromList, toList, from, to, target) {
    setTarget(target);
    setFromList(fromList);
    setToList1(toList);
    setFrom1(from);
    setTo1(to);
  }

  function getCoord() {
    //console.log(fromList1);
    const coord = {
      fromList1, toList1, from1, to1, target
    }
    return coord;    
  }

  return (
    <BoardContext.Provider value={{ lists, move, coordnatesUP, getCoord }}>
      <Container>

        {lists.map((list, index) => <List key={list.title} index={index} data={list} />)}

      </Container>
    </BoardContext.Provider>
  );
}
