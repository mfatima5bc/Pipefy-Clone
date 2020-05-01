import React, { useRef, useContext } from 'react';

import { useDrag, useDrop } from 'react-dnd';

import BoardContext from '../Board/context';

import { MdAdd } from 'react-icons/md';

import { Container } from './styles';

import Card from '../Card';

export default function List({ data, index: ListIndex }) {
  const ref = useRef();
  const { move } = useContext(BoardContext);

  const [, dropRef] = useDrop({
    accept: 'CARD',
    hover(item, monitor) {
      const fromlist = item.ListIndex;
      const tolist = ListIndex;

      if (data.cards.length === 0) {
        //console.log(data.cards);

        //console.log("na lista: ", ListIndex, "| id do card:", item.index, "lista origem: ", item.ListIndex);

        move(fromlist, tolist, item.index, 0);

        item.ListIndex = tolist;
        item.index = 0;
        //console.log(item);
      } else {
        const endList = ListIndex.length;
        console.log(endList, tolist);
      
        //console.log("tá por baixo, ");
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
