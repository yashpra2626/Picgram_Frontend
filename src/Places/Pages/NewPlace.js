import React, { useContext } from "react";
import "./NewPlace.css";
import Input from "./../../Shared/UIelements/Input";
import Button from "./../../Shared/UIelements/Button";
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH,
} from "../../Users/components/util/validators";
import useForm from "../../Shared/hooks/formhooks";
import { AuthContext } from "../../Shared/Context/AuthContext";
import { useHttpClient } from "../../Shared/hooks/http-hook";
import { useHistory } from "react-router-dom";
import ErrorModal from "../../Shared/UIelements/ErrorModel";
import LoadingSpinner from "../../Shared/UIelements/LoadingSpinner";
import ImageUpload from "../../Shared/UIelements/ImageUpload";

const initialState = {
  inputs: {
    title: { value: "", isValid: false },
    description: { value: "", isValid: false },
    address: { value: "", isValid: false },
  },
  isValid: false,
};

const NewPlace = () => {
  const auth = useContext(AuthContext);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [formState, inputHandler] = useForm(initialState);
  //console.log(`User Id is:`,auth.userId);
  const history = useHistory();
  const submitHandler = async (event) => {
    event.preventDefault();

    const formData = new FormData();

    formData.append("title", formState.inputs.title.value);
    formData.append("description", formState.inputs.description.value);
    formData.append("address", formState.inputs.address.value);
    //formData.append('creatorId',auth.userId);
    formData.append("image", formState.inputs.image.value);
    //console.log(formState.inputs);
    try {
      await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/places`,
        "POST",
        formData,
        {
          Authorization: "Bearer " + auth.token,
        }
      );
      history.push(`/${auth.userId}/places`);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && <LoadingSpinner asOverlay />}
      <form className="place-form" onSubmit={submitHandler}>
        <Input
          element
          id="title"
          errorText="Please enter a valid title"
          validators={[VALIDATOR_REQUIRE()]}
          label="Title"
          onInput={inputHandler}
        />

        <Input
          id="description"
          errorText="Please write a valid description"
          label="Description"
          validators={[VALIDATOR_MINLENGTH(10)]}
          onInput={inputHandler}
        />
        <Input
          element
          id="address"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please mention a valid address"
          label="Address"
          onInput={inputHandler}
        />
        <ImageUpload id="image" onInput={inputHandler} />
        <Button type="submit" disabled={!formState.isValid}>
          Add Place
        </Button>
      </form>
    </React.Fragment>
  );
};

export default NewPlace;
