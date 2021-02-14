import React from 'react';
import { Grid, CircularProgress } from '@material-ui/core';
import { useSelector } from 'react-redux';

import Meme from './Meme/Meme';
import useStyles from './styles';

const Memes = ({ setCurrentId }) => {
  const memes = useSelector((state) => state.memes);
  const classes = useStyles();

  return (
    !memes.length ? <CircularProgress /> : (
      <Grid className={classes.container} container alignItems="stretch" spacing={3}>
        {memes.map((meme) => (
          <Grid key={meme._id} item xs="auto" sm="auto" >
            <Meme meme={meme} setCurrentId={setCurrentId} />
          </Grid>
        ))}
      </Grid>
    )
  );
};

export default Memes;
