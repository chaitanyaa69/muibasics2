import React from 'react';
import { Paper, Button } from '@mui/material'

export interface ItemProps {
    item:{
        author:string;
        download_url:string;
        height:number;
        id:string;
        url:string;
        width:number;
    }
};


const Items =(props : ItemProps) =>{

    return (
        <Paper>
            <div
                style={{
                    backgroundImage: `url(${props.item.download_url})`,
                    height: '350px',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
                ></div>
        </Paper>
    );
};

export default Items;