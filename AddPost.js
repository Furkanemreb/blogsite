import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import EditModal from "./EditModal";
import { db } from "../utils/firebase";
import { ref, remove } from "firebase/database";

export default function AddPost({ id, title, date, content, imageUrl }) {
  
  const handleDelete = () => {
    remove(ref(db, `posts/${id}`))
      .then((res) => {})
      .catch((error) => {
        console.log(error);
      });
  };

  return (
      <Card sx={{ maxWidth: 345, backgroundColor:"#9ca3af", marginTop:"14px"}}>
        <CardMedia sx={{ height: "200px" , objectFit: "cover" }} image={imageUrl} title={title}/>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {date}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {content}
          </Typography>
        </CardContent>
        <CardActions style={{justifyContent:"end"}}>
          <EditModal defaultValues={{ id, title, date, content, imageUrl }} />
          <Button color="error" onClick={handleDelete}>Delete</Button>
        </CardActions>
      </Card>
  );
}