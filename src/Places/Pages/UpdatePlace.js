import React, { useState, useEffect, useContext } from "react";
import "./NewPlace.css";
import Input from "./../../Shared/UIelements/Input";
import Button from "./../../Shared/UIelements/Button";
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH,
} from "../../Users/components/util/validators";
import useForm from "../../Shared/hooks/formhooks";
import { AuthContext } from "../../Shared/Context/AuthContext";
import { useParams, useHistory } from "react-router-dom";
import { useHttpClient } from "../../Shared/hooks/http-hook";
import LoadingSpinner from "../../Shared/UIelements/LoadingSpinner";
import ErrorModel from "../../Shared/UIelements/ErrorModel";
const UpdatePlace = () => {
  const auth = useContext(AuthContext);
  const placeId = useParams().pid;
  const [loadedPlace, setLoadedPlace] = useState();
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const [formState, inputHandler, setFormData] = useForm({
    inputs: {
      title: {
        valid: "",
        isValid: false,
      },
      description: {
        value: "",
        isValid: false,
      },
    },
    isValid: false,
  });

  useEffect(() => {
    let identifiedPlace;

    const fetchPlace = async () => {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/places/${placeId}`
        );
        identifiedPlace = responseData.place;
        setLoadedPlace(responseData.place);
        setFormData({
          inputs: {
            title: {
              value: identifiedPlace.title,
              isValid: true,
            },
            description: {
              value: identifiedPlace.description,
              isValid: true,
            },
          },
          isValid: true,
        });
      } catch (error) {}
    };

    fetchPlace();
  }, [setFormData, sendRequest]);

  const history = useHistory();
  const updateSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/places/${placeId}`,
        "PATCH",
        JSON.stringify({
          title: formState.inputs.title.value,
          description: formState.inputs.description.value,
        }),
        {
          "Content-Type": "application/json",
          Authorization: "Bearer " + auth.token,
        }
      );
      history.push(`/`);
    } catch (error) {}
  };

  if (isLoading) {
    return <LoadingSpinner asOverlay />;
  }
  return (
    <React.Fragment>
      <ErrorModel error={error} onClear={clearError} />
      {!loadedPlace && <LoadingSpinner asOverlay />}
      {loadedPlace && (
        <form className="place-form" onSubmit={updateSubmitHandler}>
          <Input
            element="input"
            id="title"
            label="Title"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please enter a valid title"
            value={loadedPlace.title}
            isValid={true}
            onInput={inputHandler}
          />
          <Input
            id="description"
            label="Description"
            validators={[VALIDATOR_MINLENGTH(10)]}
            errorText="Please enter a valid description."
            value={loadedPlace.description}
            isValid={true}
            onInput={inputHandler}
          />
          <Button type="submit" disabled={!formState.isValid}>
            UPDATE PLACE
          </Button>
        </form>
      )}
    </React.Fragment>
  );
};

export default UpdatePlace;
