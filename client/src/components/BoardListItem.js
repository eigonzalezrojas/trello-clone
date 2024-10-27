import React from 'react';
import {Box, Grid} from '@mui/material';
import BoardItem from './BoardItem';

function BoardListItem({ boards, onEdit, onDelete, onAddTask }) {
    return (
        <Grid
            container
            spacing={3}
            style={{ padding: '20px' }}
            justifyContent="center"
            alignItems="flex-start"
        >
            {boards.map((board) => (
                <Grid item key={board.id}>
                    <BoardItem
                        board={board}
                        onEdit={onEdit}
                        onDelete={onDelete}
                        onCreateTask={onAddTask}
                    />
                </Grid>
            ))}
        </Grid>
    );
}

export default BoardListItem;