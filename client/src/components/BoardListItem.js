import React from 'react';
import {Grid2} from '@mui/material';
import BoardItem from './BoardItem';

function BoardListItem({ boards, onEdit, onDelete, onAddTask }) {
    return (
        <Grid2
            container
            spacing={3}
            style={{ padding: '20px' }}
            justifyContent="center"
            alignItems="flex-start"
        >
            {boards.map((board) => (
                <Grid2 item key={board.id}>
                    <BoardItem
                        board={board}
                        onEdit={onEdit}
                        onDelete={onDelete}
                        onCreateTask={onAddTask}
                    />
                </Grid2>
            ))}
        </Grid2>
    );
}

export default BoardListItem;