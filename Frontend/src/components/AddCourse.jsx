import {Button , Card , TextField} from "@mui/material";
import {useState} from "react";

const AddCourse = () => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    return <div style={{display: "flex", justifyContent: "center"}}>
        <Card varint={"outlined"} style={{width: 400, padding: 20}}>
        <TextField
            onChange={(e) => {
                setTitle(e.target.value)
            }}
            fullWidth={true}
            label="Title"
            variant="outlined"
        />

        <TextField
            onChange={(e) => {
                setDescription(e.targetl.value)
            }}
            fullWidth={true}
            label="Description"
            variant="outlined"
        />

        <Button
            size={"large"}
            variant="contained"
            onClick={() => {
                fetch("http://localhost:3000/admin/courses", {
                    method: "POST",
                    body: JSON.stringify({
                        title: title,
                        description: description,
                        imageLink: "",
                        published: true
                    }),
                    headers: {
                        "Content-type": "application/json",
                        "Authorization": "Bearer " + localStorage.getItem("token")
                    }
                }).then((res) => {
                    res.json().then((data) =>{
                        localStorage.setItem("token" , data.token);
                    })
                })
            }}
        > Add course</Button>
        </Card>
    </div>
}

export default AddCourse;