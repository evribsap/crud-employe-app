import AddUserForm from "./addUserForm";
import UpdateUserForm from "./updateUserForm";
import { useSelector } from 'react-redux';
import { useReducer } from "react";

const formReducer = (state, event ) => {
  return {
      ...state,
      [event.target.name]:event.target.value
  }
}

export default function form() {

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [formData, setFormData ] = useReducer(formReducer, {});

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const formId = useSelector((state) => state.app.client.formId);

  return (
    <div className='container mx-auto py-5'>
      {formId ? UpdateUserForm({formId, formData, setFormData }) : AddUserForm({formData, setFormData}) }
    </div>
  )
}
