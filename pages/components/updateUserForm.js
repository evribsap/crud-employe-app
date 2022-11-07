import { BiBrush } from "react-icons/bi";
import SuccessMessage from "./success";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { getUser, getUsers, updateUser } from "../../lib/helper";



export default function UpdateUserForm({formId, formData, setFormData }) {

    const queryClient = useQueryClient()
    const {isLoading, isError, data, error } = useQuery(['users', formId], () => getUser(formId));
    const UpdateMutation = useMutation((newData) => updateUser(formId, newData), {
        onSuccess:async(data) => {
            //queryClient.setQueryData('users', (old) => [data])
            queryClient.setQueryData('users', getUsers)
        }
    });
    

    const { name, email, salary, date, status } = data;

    const [firstName, lastName] = name ? name.split('') : formData

    const handleSubmit = async (e) => {
        e.preventDefault();
        let userName=`${formData.firstName ?? firstName} ${formData.lastName ?? lastName}`
        let updated = Object.assign({}, data, formData, {name: userName})

        await UpdateMutation.mutate(updated)
    }

    if (isLoading) {
        return (
            <div>
                Loading..!
            </div>
        )
    }

    if (isError) {
        return (
            <div>
                Error!!!
            </div>
        )
    }

    return (
        <form onSubmit={handleSubmit} className="grid md:grid-cols-2 w-5/6 gap-4">
            <div className="input-type">
                <input onChange={setFormData} defaultValue={firstName} type="text" name="firstName" placeholder="First Name" className="border w-full px-5 py-3 focus:outline-none rounded-md" />
            </div>
            <div className="input-type">
                <input onChange={setFormData} defaultValue={lastName} type="text" name="lastName" placeholder="Last Name" className="border w-full px-5 py-3 focus:outline-none rounded-md" />
            </div>
            <div className="input-type">
                <input onChange={setFormData} defaultValue={email} type="text" name="email" placeholder="Email" className="border w-full px-5 py-3 focus:outline-none rounded-md" />
            </div>
            <div className="input-type">
                <input onChange={setFormData} defaultValue={salary} type="text" name="salary" placeholder="Salary" className="border w-full px-5 py-3 focus:outline-none rounded-md" />
            </div>
            <div className="input-type">
                <input onChange={setFormData} defaultValue={date} type="date" name="date" className="border px-5 py-3 focus:outline-none rounded-md" />
            </div>

            <div className="flex gap-10 items-center">
                <div className="form-check">
                    <input  onChange={setFormData} defaultChecked={status =="Active"} type="radio" name="status" value="Active" id="radioDefault1" className="form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-green-500 checked:border-green-500 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left cursor-pointer"/>
                    <label htmlFor="radioDefault1" className="inline-block text-gray-800 pl-2">
                        Active
                    </label>
                </div>
                <div className="form-check">
                    <input onChange={setFormData} defaultChecked={status !=="Active"} type="radio" name="status" value="Inactive" id="radioDefault2" className="form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-green-500 checked:border-green-500 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left cursor-pointer"/>
                    <label htmlFor="radioDefault2" className="inline-block text-gray-800 pl-2">
                        Inactive
                    </label>
                </div>
            </div>

            <button className="flex justify-center text-md w-2/6 bg-yellow-500 text-white px-4 py-2 border rounded-md hover:bg-gray-50 hover:border-yellow-400 hover:text-yellow-500">
                Update
                <span className="pl-2"><BiBrush size={24}/></span>
            </button>
        </form>
    )
}