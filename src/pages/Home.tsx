import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import {
  useContactsQuery,
  useDeleteContactMutation,
} from "../services/contactsApi";
import "./Home.css";
import MetamaskConnect from "../web3/MetamaskConnect";
import tigerImg from "../assets/tiger.png";
import triangleImg from "../assets/triangles.png";
import englandImg from "../assets/england.png";
import germanyImg from "../assets/germany.png";
import { useTranslation } from "react-i18next";

const Home = () => {
  const { data, error } = useContactsQuery();
  const [deleteContact] = useDeleteContactMutation();
  const [tagType, setTagType] = useState("all");

  // Search based on name or email.
  const [searchField, setSearchField] = useState("");

  //Translation
  const { t, i18n } = useTranslation();

  const changeLanguage = (language) => {
    i18n.changeLanguage(language);
  };

  // Sort options.
  const sortOptions = data ? ["all", "art", "sport", "it"] : ["all"];

  // Notifications.
  useEffect(() => {
    if (error) {
      toast.error("Something went wrong");
    }
  }, [error]);

  const handleDelete = async (id: any) => {
    if (
      window.confirm("Are you sure that you wanted to delete that contact ?")
    ) {
      await deleteContact(id);
      toast.success("Contact Deleted Successfully");
    }
  };

  /* Search, filter based on name or email. */
  const filteredContacts = data
    ?.filter(
      (contact) => {
        return (
          contact.name.toLowerCase().includes(searchField.toLowerCase()) ||
          contact.email.toLowerCase().includes(searchField.toLowerCase())
        );
      }
      /* Sort */
    )
    .filter((contact) => {
      if (tagType === "all") {
        return contact;
      } else {
        return contact.tag === tagType;
      }
    })
    .sort((a, b) => (a.name > b.name ? 1 : -1));

  const handleChange = (e: any): void => {
    setSearchField(e.target.value);
  };

  return (
    <div>
      <MetamaskConnect />
      <img src={tigerImg} className="tiger-background" alt="tiger" />
      <div className="search-sort-add-container">
        <Link to="/add">
          <button className="btn btn-add">{t("home.addContact")}</button>
        </Link>
        <div className="sort-container">
          <h4 style={{ marginRight: "1rem" }}>{t("home.sortBy")}:</h4>
          <select
            style={{ width: "200px", borderRadius: "2px", height: "40px" }}
            onChange={(event) => setTagType(event.target.value)}
            value={tagType}
          >
            {sortOptions &&
              sortOptions.map((contact: any, index: any) => {
                return (
                  <option value={contact} key={index}>
                    {contact}
                  </option>
                );
              })}
          </select>
        </div>
        <input
          type="search"
          className="search-input"
          placeholder={t("home.searchContacts")}
          onChange={handleChange}
        />
        <button onClick={() => changeLanguage("en")}>
          <img src={englandImg} className="lang" alt="eng" />
        </button>
        <button onClick={() => changeLanguage("de")}>
          <img src={germanyImg} className="lang" alt="ger" />
        </button>
      </div>
      <table className="styled-table">
        <thead>
          <tr>
            <th style={{ textAlign: "center" }}>ID</th>
            <th style={{ textAlign: "center" }}>Name</th>
            <th style={{ textAlign: "center" }}>{t("home.lastName")}</th>
            <th style={{ textAlign: "center" }}>{t("home.age")}</th>
            <th style={{ textAlign: "center" }}>Email</th>
            <th style={{ textAlign: "center" }}>{t("home.telephone")}</th>
            <th style={{ textAlign: "center" }}>Link</th>
            <th style={{ textAlign: "center" }}>Tag</th>
            <th style={{ textAlign: "center" }}>{t("home.action")}</th>
          </tr>
        </thead>
        <tbody>
          {filteredContacts &&
            filteredContacts.map((item: any, index: any) => {
              return (
                <tr key={item.id}>
                  <th scope="row">{index + 1}</th>
                  <td>{item.name}</td>
                  <td>{item.lastName}</td>
                  <td>{item.age}</td>
                  <td>{item.email}</td>
                  <td>{item.telephone}</td>
                  <td>
                    <a
                      href={`https://${item.link}/`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {item.link}
                    </a>
                  </td>
                  <td>#{item.tag}</td>
                  <td>
                    <Link to={`/update/${item.id}`}>
                      <button className="btn btn-edit">{t("home.edit")}</button>
                    </Link>
                    <button
                      className="btn btn-delete"
                      onClick={() => handleDelete(item.id)}
                    >
                      {t("home.delete")}
                    </button>
                    <Link to={`/view/${item.id}`}>
                      <button className="btn btn-view">{t("home.view")}</button>
                    </Link>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
      <img src={triangleImg} className="triangles-background" alt="triangles" />
    </div>
  );
};

export default Home;
