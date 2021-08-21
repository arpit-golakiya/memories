import React,{useState,useEffect} from "react";
import { TextField,Button,Typography,Paper } from "@material-ui/core";
import FileBase from "react-file-base64";
import {useDispatch} from "react-redux";
import {createPost} from "../../actions/posts";
import {updatePost} from "../../actions/posts";
import { useSelector } from "react-redux";

import useStyle from './style';
const Form = ({currentId,setCurrentId}) => {
    const [postData, setPostData] = useState({ creator:"",title:"",message:"",tags:"",selectedFile:""});
    const post = useSelector((state) => currentId ? state.posts.find((p) => p._id === currentId) : null);
    console.log(post);
    const classes = useStyle();
    const dispatch = useDispatch();

    useEffect(() => {
        if (post) setPostData(post);
    },[post]);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (currentId){
            dispatch(updatePost(currentId,postData));
        }else {
            dispatch(createPost(postData));
        }
        clear();
    }

    const clear = () => {
        setCurrentId(null);
        setPostData({ creator:"",title:"",message:"",tags:"",selectedFile:""});
    }

    return(
        <Paper className={classes.paper}>
            <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
                <Typography variant="h6">{currentId ? 'Editing' : 'Creating' } Memory</Typography>
                <TextField
                    variant="outlined"
                    name="creator"
                    label="Creator"
                    fullWidth
                    value={postData.creator}
                    onChange={(e) => setPostData({...postData,creator: e.target.value})}
                />
                <TextField
                    variant="outlined"
                    name="title"
                    label="title"
                    fullWidth
                    value={postData.title}
                    onChange={(e) => setPostData({...postData,title: e.target.value})}
                />
                <TextField
                    variant="outlined"
                    name="message"
                    label="message"
                    fullWidth
                    value={postData.message}
                    onChange={(e) => setPostData({...postData,message: e.target.value})}
                />
                <TextField
                    variant="outlined"
                    name="tags"
                    label="tags"
                    fullWidth
                    value={postData.tags}
                    onChange={(e) => setPostData({...postData,tags: e.target.value.split(",")})}
                />
                <div className={classes.fileInput}>
                    <FileBase
                        type="file"
                        multiple={false}
                        onDone={({base64}) => setPostData({...postData, selectedFile: base64})}
                    />
                </div>
                <Button className={classes.buttonSubmit} variant="contained" size="large" color="primary" type="submit" fullWidth>Submit</Button>
                <Button variant="contained" color="secondary" size="small" fullWidth onClick={clear}>Clear</Button>
            </form>
        </Paper>
    )
};

export default Form;