import { BiPlus } from "react-icons/bi";
import SuccessMessage from "./success";
import ErrorMessage from "./error";

import { useQueryClient, useMutation } from 'react-query';
import { addUser, getUsers } from "../../lib/helper";



export default function AddUserForm({formData, setFormData}) {

    const queryClient = useQueryClient();

    const addMutation = useMutation(addUser, {
        onSuccess: () => {
            queryClient.prefetchQuery('users', getUsers)
        }
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        if (Object.keys(formData).length == 0) {
            return (
                console.log("Form Data is empty")
            )
        }
        let { firstName, lastName, email, salary, date, status } = formData;

        const model = {
            name: `${firstName} ${lastName}`,
            email,
            salary,
            date,
            status : status ?? "Active",
        }

        addMutation.mutate(model)
    };

    if(addMutation.isLoading) {
        return(
            <div>
                Loading!
            </div>
        )
    }

    if(addMutation.isSuccess) {
        return (
            <SuccessMessage message={"Data Added"} />
        )
    }

    if(addMutation.isError) {
        return (
            <ErrorMessage message={"Error"} />
        )
    }

    return (
        <form onSubmit={handleSubmit} className="grid md:grid-cols-2 w-5/6 gap-4">
            <div className="input-type">
                <input onChange={setFormData} type="text" name="firstName" placeholder="First Name" className="border w-full px-5 py-3 focus:outline-none rounded-md" />
            </div>
            <div className="input-type">
                <input onChange={setFormData} type="text" name="lastName" placeholder="Last Name" className="border w-full px-5 py-3 focus:outline-none rounded-md" />
            </div>
            <div className="input-type">
                <input onChange={setFormData} type="text" name="email" placeholder="Email" className="border w-full px-5 py-3 focus:outline-none rounded-md" />
            </div>
            <div className="input-type">
                <input onChange={setFormData} type="text" name="salary" placeholder="Salary" className="border w-full px-5 py-3 focus:outline-none rounded-md" />
            </div>
            <div className="input-type">
                <input onChange={setFormData} type="date" name="date" className="border px-5 py-3 focus:outline-none rounded-md" />
            </div>

            <div className="flex gap-10 items-center">
                <div className="form-check">
                    <input  onChange={setFormData} type="radio" name="status" value="Active" id="radioDefault1" className="form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-green-500 checked:border-green-500 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left cursor-pointer"/>
                    <label htmlFor="radioDefault1" className="inline-block text-gray-800 pl-2">
                        Active
                    </label>
                </div>
                <div className="form-check">
                    <input onChange={setFormData} type="radio" name="status" value="Inactive" id="radioDefault2" className="form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-green-500 checked:border-green-500 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left cursor-pointer"/>
                    <label htmlFor="radioDefault2" className="inline-block text-gray-800 pl-2">
                        Inactive
                    </label>
                </div>
            </div>

            <button className="flex justify-center text-md w-2/6 bg-green-500 text-white px-4 py-2 border rounded-md hover:bg-gray-50 hover:border-green-500 hover:text-green-500">
                Add
                <span className="pl-2"><BiPlus size={24}/></span>
            </button>
        </form>
    )
}