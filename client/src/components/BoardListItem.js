import { DragDropContext, Droppable } from "@hello-pangea/dnd";
import Grid from "@mui/material/Grid";
import BoardItem from "./BoardItem";

function BoardListItem({ boards, onEdit, onDelete, onAddTask, onMoveTask }) {
    const onDragEnd = (result) => {
        const { source, destination, draggableId } = result;
        if (!destination ||
            (source.droppableId === destination.droppableId && source.index === destination.index)) {
            return;
        }
        const taskId = parseInt(draggableId, 10);
        const targetBoardId = parseInt(destination.droppableId, 10);
        onMoveTask(taskId, targetBoardId);
    };

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <Grid container spacing={3} style={{ padding: '20px' }} justifyContent="center" alignItems="flex-start">
                {boards.map((board) => (
                    <Droppable key={board.id} droppableId={board.id.toString()}>
                        {(provided) => (
                            <Grid item ref={provided.innerRef} {...provided.droppableProps} sx={{ minWidth: 300 }}>
                                <BoardItem
                                    board={board}
                                    onEdit={onEdit}
                                    onDelete={onDelete}
                                    onAddTask={onAddTask}
                                    onMoveTask={onMoveTask}
                                />
                                {provided.placeholder}
                            </Grid>
                        )}
                    </Droppable>
                ))}
            </Grid>
        </DragDropContext>
    );
}

export default BoardListItem;