import { useEffect, useState } from "react";
import { onValue, ref } from "firebase/database";
import { Grid } from "@mui/material";
import AddPost from "../components/AddPost";
import { db } from "../utils/firebase";
import InsertOrUpdateForm from "../components/InsertOrUpdateForm";

function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const reference = ref(db, "/");
    onValue(reference, (snapshot) => {
      const data = snapshot.val();
      if (!!data) {
        setPosts(data);
        console.log(data);
      } else {
        console.log("Data not found");
      }
    });
  }, []);

  return (
    <div style={{display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", padding:"30px"}}>
      <InsertOrUpdateForm />
      <Grid container>
        {posts.posts &&
          Object.entries(posts?.posts).map(([key, value], index) => (
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <AddPost
                key={index}
                id={key}
                title={value.title}
                date={value.date}
                content={value.content}
                imageUrl={value.imageUrl}
              />
            </Grid>
          ))}
      </Grid>
    </div>
  );
}

export default Home;