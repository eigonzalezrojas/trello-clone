import { DragDropContext, Droppable } from "@hello-pangea/dnd";
import Grid2 from "@mui/material/Grid2";
import Box from '@mui/material/Box';
import BoardItem from "./BoardItem";
import {useState} from "react";

function BoardListItem({ boards, onEdit, onDelete, onAddTask, onMoveTask, onTaskDeleted }) {
    const [highlightedBoardId, setHighlightedBoardId] = useState(null);
    const onDragEnd = (result) => {
        const { source, destination, draggableId } = result;

        if (!destination) {
            return;
        }

        if (
            source.droppableId === destination.droppableId &&
            source.index === destination.index
        ) {
            return;
        }

        const taskId = parseInt(draggableId, 10);
        const targetBoardId = parseInt(destination.droppableId, 10);

        if (source.droppableId !== destination.droppableId) {
            onMoveTask(taskId, targetBoardId);
        }
        setHighlightedBoardId(null);
    };
    const onDragEnter = (boardId) => {
        setHighlightedBoardId(boardId);
    };

    const onDragLeave = () => {
        setHighlightedBoardId(null);
    };

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <Grid2
                container
                spacing={3}
                sx={{ padding: '20px' }}
                justifyContent="center"
                alignItems="flex-start"
            >
                {boards.map((board) => (
                    <Grid2
                        key={board.id}
                        xs={12}
                        sm={6}
                        md={4}
                        lg={3}
                    >
                        <Droppable
                            droppableId={String(board.id)}
                        >
                            {(provided, snapshot) => (
                                <Box
                                    ref={provided.innerRef}
                                    {...provided.droppableProps}
                                    sx={{
                                        minWidth: 300,
                                        minHeight: 100,
                                        padding: 1,
                                        border: highlightedBoardId === board.id ?
                                            '2px dashed #1976d2' :
                                            snapshot.isDraggingOver ?
                                                '2px dashed #4caf50' :
                                                'none',
                                        borderRadius: 1,
                                        transition: 'all 0.2s ease',
                                        backgroundColor: snapshot.isDraggingOver ?
                                            'rgba(76, 175, 80, 0.08)' :
                                            'transparent'
                                    }}
                                    onDragEnter={() => onDragEnter(board.id)}
                                    onDragLeave={onDragLeave}
                                >
                                    <BoardItem
                                        board={board}
                                        onEdit={onEdit}
                                        onDelete={onDelete}
                                        onAddTask={onAddTask}
                                        onMoveTask={onMoveTask}
                                        onTaskDeleted={onTaskDeleted}
                                    />
                                    {provided.placeholder}
                                </Box>
                            )}
                        </Droppable>
                    </Grid2>
                ))}
            </Grid2>
        </DragDropContext>
    );
}

export default BoardListItem;