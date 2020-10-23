import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import "./PlaceItem.css";
import Card from "./../../Shared/Card";
import Button from "./../../Shared/UIelements/Button";
import Modal from "./../../Shared/UIelements/Model";
import { AuthContext } from "./../../Shared/Context/AuthContext";     
import { useHttpClient } from "../../Shared/hooks/http-hook";
import ErrorModal from "../../Shared/UIelements/ErrorModel";
import LoadingSpinner from "../../Shared/UIelements/LoadingSpinner";
const PlaceItem = ({ place }) =>{

  const auth = useContext(AuthContext);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const cancelDeleteHandler = () => {
    setShowDeleteConfirmation(false);
  };
  const history = useHistory();
  const confirmDeleteHandler = async () => {
    console.log("Delete");  
    setShowDeleteConfirmation(false);
    try {
      await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/places/${place.id}`,
        "DELETE",
        null,
        {
          Authorization: "Bearer " + auth.token,
        }
      );
      history.pushState("/");
    } catch (error) {}
  };

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && <LoadingSpinner asOverlay />}
      <Modal
        show={showDeleteConfirmation}
        onCancel={cancelDeleteHandler}
        header="Are you sure"
        contentClass="place-item__modal-content"
        footerClass="place-item__modal-actions"
        footer={
          <React.Fragment>
            <Button inverse onClick={cancelDeleteHandler}>
              Cancel
            </Button>
            <Button danger onClick={confirmDeleteHandler}>
              Delete
            </Button>
          </React.Fragment>
        }
      >
        <p>Do you really want to delete the place?</p>
      </Modal>
      <li className="place-item">
        <Card className="place-item__content">
          <div className="place-item__image">
            <img src={`${process.env.REACT_APP_ASSET_URL}/${place.image}`}/>
          </div>
          <div className="place-item__info">
            <h2>{place.title}</h2>
            <h3>{place.description}</h3>
            <p>Address:{place.address}</p>
          </div>
          {auth.isLoggedIn && auth.userId === place.creatorId && (
            <div className="place-item__actions">
              <Button to={`/places/${place.id}`}>Edit</Button>
              <Button
                danger
                onClick={(event) => setShowDeleteConfirmation(true)}
              >
                Delete
              </Button>
            </div>
          )}
        </Card>
      </li>
    </React.Fragment>
  );
};

export default PlaceItem;

