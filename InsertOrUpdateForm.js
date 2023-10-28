import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { db } from "../utils/firebase";
import { push, ref, set, update } from "firebase/database";
import { Button, TextField, Typography } from "@mui/material";

const formFields = [
  {
    name: "title",
    label: "New Title",
    type: "text",
    validation: { required: true },
  },
  {
    name: "date",
    label: "Date",
    type: "date",
    validation: { required: true },
  },
  {
    name: "content",
    label: "Description",
    type: "text",
    validation: { required: true },
  },
  {
    name: "imageUrl",
    label: "Add File",
    type: "file",
    validation: { required: true },
  },
];

const InsertOrUpdateForm = ({ defaultValues }) => {
  const { register, handleSubmit, setValue, reset, formState: { errors },} = useForm({ defaultValues: defaultValues,});

  const [filePreview, setFilePreview] = useState(defaultValues ? defaultValues.imageUrl : null);

  const uploadImage = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const base64 = await convertBase64(file);
      setValue("imageUrl", base64);
      setFilePreview(base64);
    }
  };

  const convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);

      fileReader.onload = () => {
        resolve(fileReader.result);
      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  const handleFormSubmit = (data, event) => {
    if (data.id) {
      update(ref(db, `posts/${data.id}`), data)
        .then((res) => {
          alert("Güncelleme işlemi gerçekleştirildi. Ekranı kapatabilirsiniz.");
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      push(ref(db, "posts"), data)
        .then((res) => {
          reset();
          setFilePreview(null);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} style={{backgroundColor:"#d1d5db", borderRadius:"10px"}}>
      <div style={{ margin: "14px" }}>
        {formFields.map((field, index) => (
          <div key={index}>
            <Typography variant="h5">{field.label}</Typography>
            {field.type === "file" ? (
              <div>
                <TextField type="file" onChange={(e) => uploadImage(e)} sx={{ width: "100%" }} />
                {filePreview && (
                  <img src={filePreview} alt="File Preview" style={{ maxWidth: "100px", maxHeight: "100px", marginLeft:"6px" }}/>
                )}
              </div>
            ) : (
              <TextField placeholder={field.label} type={field.type} {...register(field.name, field.validation)} sx={{ width: "100%" }}/>
            )}
            {errors[field.name] && (
              <p style={{ color: "#b91c1c" }}>Bu alanı doldurunuz.</p>
            )}
          </div>
        ))}
          <Button size="medium" variant="contained" type="submit" 
          disabled={ Object.keys(errors).length > 0 || (!defaultValues && !filePreview )} >
          {!defaultValues ? "Upload" : "Update"}
          </Button>
      </div>
    </form>
  );
};

export default InsertOrUpdateForm;