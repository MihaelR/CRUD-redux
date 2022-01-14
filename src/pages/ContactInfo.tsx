import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useContactQuery } from "../services/contactsApi";
import { toast } from "react-toastify";
import "./ContactInfo.css";

const ContactInfo = () => {
  const { id } = useParams();
  const { data, error } = useContactQuery(id!);

  useEffect(() => {
    if (error) {
      toast.error("Something went wrong");
    }
  }, [error]);
  return (
    <div style={{ marginTop: "150px" }}>
      <div className="card">
        <div className="card-header">
          <p>Contact Detail</p>
        </div>
        <div className="container">
          <strong>ID: </strong>
          <span>{id}</span>
          <br />
          <br />
          <strong>Name: </strong>
          <span>{data && data.name}</span>
          <br />
          <br />
          <strong>Last name: </strong>
          <span>{data && data.lastName}</span>
          <br />
          <br />
          <strong>Age: </strong>
          <span>{data && data.age}</span>
          <br />
          <br />
          <strong>Telephone: </strong>
          <span>{data && data.telephone}</span>
          <br />
          <br />
          <strong>Email: </strong>
          <span>{data && data.email}</span>
          <br />
          <br />
          <strong>Link: </strong>
          <span>{data && data.link}</span>
          <br />
          <br />
          <strong>Tags: </strong>
          <span>{data && data.tag}</span>
          <br />
          <br />
          <Link to="/">
            <button className="btn btn-edit" data-testid="test1">
              Go Back
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ContactInfo;
