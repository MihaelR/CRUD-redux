import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  useAddContactMutation,
  useContactQuery,
  useUpdateContactMutation,
} from "../services/contactsApi";
import "./AddEditContact.css";

const initialState = {
  name: "",
  lastName: "",
  age: "",
  telephone: "",
  email: "",
  link: "",
  tag: "",
};

const AddEditContact = () => {
  const [formValue, setFormValue] = useState(initialState);
  const [editMode, setEditMode] = useState(false);

  const [addContact] = useAddContactMutation();
  const [updateContact] = useUpdateContactMutation();
  const { name, lastName, age, telephone, email, link, tag } = formValue;
  const navigate = useNavigate();
  const { id } = useParams();

  const { data, error } = useContactQuery(id!);

  useEffect(() => {
    if (error && id) {
      toast.error("Something went wrong");
    }
  }, [error, id]);

  // Sort options.
  const tagOptions = ["art", "sport", "it"];

  useEffect(() => {
    if (id) {
      setEditMode(true);
      if (data) {
        setFormValue({ ...data });
      }
    } else {
      setEditMode(false);
      setFormValue({ ...initialState });
    }
  }, [id, data]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (!name && !lastName && !telephone && !email && !age && !link && !tag) {
      toast.error("Please provide value into each input field");
    } else {
      if (!editMode) {
        await addContact(formValue);
        navigate("/");
        toast.success("Contact Added Successfully");
      } else {
        await updateContact(formValue);
        navigate("/");
        setEditMode(false);
        toast.success("Contact Updated Successfully");
      }
    }
  };

  const handleInputChange = (e: any) => {
    let { name, value } = e.target;
    setFormValue({ ...formValue, [name]: value });
  };
  return (
    <div style={{ marginTop: "100px" }}>
      <form
        style={{
          margin: "auto",
          padding: "15px",
          maxWidth: "400px",
          alignContent: "center",
        }}
        onSubmit={handleSubmit}
      >
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          name="name"
          placeholder="Your Name..."
          value={name || ""}
          onChange={handleInputChange}
        />
        <label htmlFor="lastName">Last name</label>
        <input
          type="text"
          id="lastName"
          name="lastName"
          placeholder="Your last name..."
          value={lastName || ""}
          onChange={handleInputChange}
        />
        <label htmlFor="age">Age</label>
        <input
          type="text"
          id="age"
          name="age"
          placeholder="Your age is..."
          value={age || ""}
          onChange={handleInputChange}
        />
        <label htmlFor="Telephone">Telephone</label>
        <input
          type="text"
          id="telephone"
          name="telephone"
          placeholder="Your number is..."
          value={telephone || ""}
          onChange={handleInputChange}
        />
        <label htmlFor="email">Email</label>
        <input
          type="text"
          id="email"
          name="email"
          placeholder="Your Email..."
          value={email || ""}
          onChange={handleInputChange}
        />
        <label htmlFor="contact">Link BIO</label>
        <input
          type="text"
          id="link"
          name="link"
          placeholder="Your link for bio..."
          value={link || ""}
          onChange={handleInputChange}
        />
        <label htmlFor="tag">Tag</label>
        <select
          style={{ width: "400px", borderRadius: "2px", height: "40px" }}
          onChange={handleInputChange}
          value={tag}
          name="tag"
        >
          {tagOptions &&
            tagOptions.map((tagOption: any, index: any) => {
              return (
                <option value={tag} key={index}>
                  #{tagOption}
                </option>
              );
            })}
        </select>
        <input type="submit" value={id ? "Update" : "Save"} />
      </form>
    </div>
  );
};

export default AddEditContact;
