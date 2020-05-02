import React, { useRef, useContext } from 'react';

import { useDrag, useDrop } from 'react-dnd';

import BoardContext from '../Board/context';

import { MdAdd } from 'react-icons/md';

import { Container } from './styles';

import Card from '../Card';

export default function List({ data, index: ListIndex }) {
  const ref = useRef();
  const { move, getCoord } = useContext(BoardContext);

  const [, dropRef] = useDrop({
    accept: 'CARD',
    hover(item, monitor) {
      const fromlist = item.ListIndex;
      const tolist = ListIndex;
      //console.log('lista: ', ListIndex);
      const coord = getCoord();

      if (data.cards.length === 0) {
        move(fromlist, tolist, item.index, 0);

        item.ListIndex = tolist;
        item.index = 0;
      } else if (coord.target === undefined || coord.target === null) {//add aqui a funcao de add item ao fim da lista
        console.log("entrou")
        //move(coord.fromList1, ListIndex, coord.from1, 1);
        
        //console.log("na lista");
      }

    }
  });

  return (
    <Container ref={dropRef} done={data.done}>
      <header>
        <h2>{data.title}</h2>
        {data.creatable && (
          <button type='button'>
            <MdAdd size={24} color="#FFF" />
          </button>
        )}
      </header>

      <ul>
        {data.cards.map((card, index) => (
          <Card
            key={card.id}
            ListIndex={ListIndex}
            index={index}
            data={card}
          />)
        )}
      </ul>

    </Container>
  );
}
