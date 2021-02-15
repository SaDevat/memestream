import React, { useState, useEffect } from "react";
import { TextField, Button, Typography, Paper } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import FileBase from "react-file-base64";

import useStyles from "./styles";
import { createMeme, updateMeme } from "../../actions/memes";

const Form = ({ currentId, setCurrentId }) => {
  const [memeData, setMemeData] = useState({
    url: "",
    title: "",
    message: "",
    tags: "",
    selectedFile: "",
  });
  const meme = useSelector((state) =>
    currentId ? state.memes.find((message) => message._id === currentId) : null
  );
  const dispatch = useDispatch();
  const classes = useStyles();

  useEffect(() => {
    if (meme) setMemeData(meme);
  }, [meme]);

  const clear = () => {
    setCurrentId(0);
    setMemeData({
      url: "",
      title: "",
      message: "",
      tags: "",
      selectedFile: "",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (currentId === 0) {
      dispatch(createMeme(memeData));
      clear();
    } else {
      dispatch(updateMeme(currentId, memeData));
      clear();
    }
  };

  return (
    <Paper className={classes.paper}>
      <form
        autoComplete="off"
        noValidate
        className={`${classes.root} ${classes.form}`}
        onSubmit={handleSubmit}
      >
        <Typography variant="h6">
          {currentId ? `Editing "${meme.title}"` : "Creating a Memory"}
        </Typography>
        <TextField
          name="url"
          variant="outlined"
          label="url"
          fullWidth
          value={memeData.url}
          onChange={(e) => setMemeData({ ...memeData, url: e.target.value })}
        />
        <TextField
          name="title"
          variant="outlined"
          label="Title"
          fullWidth
          value={memeData.title}
          onChange={(e) => setMemeData({ ...memeData, title: e.target.value })}
        />
        <TextField
          name="message"
          variant="outlined"
          label="Message"
          fullWidth
          multiline
          rows={4}
          value={memeData.message}
          onChange={(e) =>
            setMemeData({ ...memeData, message: e.target.value })
          }
        />
        <TextField
          name="tags"
          variant="outlined"
          label="Tags (coma separated)"
          fullWidth
          value={memeData.tags}
          onChange={(e) =>
            setMemeData({ ...memeData, tags: e.target.value.split(",") })
          }
        />

        {/* TRYING TO IMPLEMENT UPLOAD IMAGE FEATURE, NOT WORKING AS OF YET */}
        {/* <div className={classes.fileInput}>
          <FileBase
            type="file"
            multiple={false}
            onDone={({ base64 }) =>
              setMemeData({ ...memeData, selectedFile: base64 })
            }
          />
        </div> */}
        <Button
          className={classes.buttonSubmit}
          variant="contained"
          color="primary"
          size="large"
          type="submit"
          fullWidth
        >
          Submit
        </Button>
        <Button
          variant="contained"
          color="secondary"
          size="small"
          onClick={clear}
          fullWidth
        >
          Clear
        </Button>
      </form>
    </Paper>
  );
};

export default Form;
