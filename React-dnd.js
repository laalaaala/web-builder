import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const components = [
  { id: 'text', name: 'Textfeld' },
  { id: 'image', name: 'Bild' },
  { id: 'button', name: 'Schaltfläche' },
  // weitere Komponenten hinzufügen
];

const initialLayout = [];

function App() {
  const [layout, setLayout] = useState(initialLayout);

  function handleDragEnd(result) {
    if (!result.destination) {
      return;
    }

    const newLayout = Array.from(layout);
    const [removed] = newLayout.splice(result.source.index, 1);
    newLayout.splice(result.destination.index, 0, removed);

    setLayout(newLayout);
  }

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div className="palette">
        {components.map((component) => (
          <Draggable key={component.id} draggableId={component.id}>
            {(provided, snapshot) => (
              <div
                className="component"
                ref={provided.innerRef}
                {...provided.draggableProps}
                {...provided.dragHandleProps}
              >
                {component.name}
              </div>
            )}
          </Draggable>
        ))}
      </div>
      <div className="workspace">
        <Droppable droppableId="workspace">
          {(provided, snapshot) => (
            <div ref={provided.innerRef} {...provided.droppableProps}>
              {layout.map((componentId, index) => (
                <div key={componentId} className="component">
                  {componentId}
                </div>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </div>
    </DragDropContext>
  );
}

export default App;
