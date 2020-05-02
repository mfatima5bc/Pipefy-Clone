import React, { useRef, useContext } from 'react';
import { useDrag, useDrop } from 'react-dnd';

import BoardContext from '../Board/context';

import { Container, Label } from './styles';

export default function Card({ data, index, ListIndex }) {
  const ref = useRef();
  const { move, coordnatesUP } = useContext(BoardContext);

  const [{ isDragging }, dragRef] = useDrag({
    item: { type: 'CARD', index, ListIndex },
    collect: monitor => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [, dropRef] = useDrop({
    accept: 'CARD',
    hover(item, monitor) {
      const draggedListIndex = item.ListIndex;
      const targetListIndex = ListIndex;

      const draggedIndex = item.index;
      let targetIndex = index;

      if (draggedIndex === targetIndex && draggedListIndex === targetListIndex) {
        return;
      }

      const targetSise = ref.current.getBoundingClientRect(); // Rentorna o tamanho do card
      const targetCenter = (targetSise.bottom - targetSise.top) / 2; // Retora o centro do item que estou por cima

      const draggedOffset = monitor.getClientOffset(); //Isso pega a cordenado do item que está sendo arrastado
      const draggedTop = draggedOffset.y - targetSise.top;// isso pega a cordenada(distancia) do item que estou arrastando sobre o item que está por baixo, pois ele subtrai a minha distancia do topo do tamanho do card

      if (draggedIndex < targetIndex && draggedTop < targetCenter) {
        return; // aqui só arrasta pra itens depois
      }

      if (draggedIndex > targetIndex && draggedTop > targetCenter) {
        return; // aqui só arrasta se puder ir pra cima, ou seja um item que já está em baixo não vai mais pra baixo ainda
      }
      // 
      coordnatesUP(draggedListIndex, targetListIndex, draggedIndex, targetIndex, targetIndex);

      move(draggedListIndex, targetListIndex, draggedIndex, targetIndex);
      item.index = targetIndex;
      item.ListIndex = targetListIndex;
      //targetIndex = undefined;
    }    

  });

  dragRef(dropRef(ref));

  return (
    <Container ref={ref} isDragging={isDragging}>
      <header>
        {data.labels.map(label => <Label key={label} color={label} />)}
      </header>
      <p>{data.content}</p>
      { data.user && <img src={data.user} alt="" />}
    </Container>
  );
}
