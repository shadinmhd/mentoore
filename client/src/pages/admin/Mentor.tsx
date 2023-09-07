import React, { useState, useEffect } from "react"
import SubmitButton from "../../components/form/SubmitButton"
import userIcon from "../../assets/user.png"
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "../../redux/store"
import { useNavigate, useParams } from "react-router-dom"
import adminActions from "../../redux/features/adminActions"
import adminSlice from "../../redux/features/adminSlice"
import { PuffLoader } from "react-spinners"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons"
import Select from "../../components/form/Select"
import categoryActions from "../../redux/features/categoryActions"


const Mentor = () => {

  const navigate = useNavigate()
  const dispatch: AppDispatch = useDispatch()
  const params = useParams<{ id: string }>()
  const [previewImage, setPreviewImage] = useState<File | null>()
  let mentor = useSelector((state: RootState) => state.admin?.mentor)
  let loading = useSelector((state: RootState) => state.admin?.loading)
  let categories = useSelector((state: RootState) => state.category.categories)
  const status = [{ name: "active" }, { name: "banned" }, { name: "deleted" }, { name: "pending" }]


  useEffect(() => {
    dispatch(adminActions.mentorGet({ id: params.id as string }))
    dispatch(categoryActions.categoryGet())
  }, [dispatch])

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const data = new FormData()
    data.append("id", mentor._id)
    data.append("firstName", mentor.firstName)
    data.append("lastName", mentor.lastName)
    data.append("status", mentor.status)
    data.append("email", mentor.email)
    if (previewImage) {
      data.append("image", previewImage)
    }
    dispatch(adminActions.mentorEdit({ editInfo: data }))
  }

  const imageChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target
    if (files) {
      setPreviewImage(files[0])
    }
  }
  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    dispatch(adminSlice.actions.updateMentor({ name, value }))
  }

  const deleteHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    console.log("delete")
  }

  const backHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    navigate("/admin/mentors")
  }

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    e.preventDefault()
    const { name, value } = e.target
    console.log(e.target.name, e.target.value)
    dispatch(adminSlice.actions.updateMentor({ name, value }))
  }
  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    e.preventDefault()
    const { name, value } = e.target
    dispatch(adminSlice.actions.updateMentor({ name, value }))
  }

  return (
    <div className="h-screen w-full relative gap-5 flex-col flex items-center justify-center">
      <button onClick={backHandler} className="absolute top-0 left-0 p-5">
        <FontAwesomeIcon className="text-blue-600" icon={faArrowLeft} />
      </button>
      {
        loading ?
          <PuffLoader color="#2563eb" /> :
          <>
            <label htmlFor="image" className="hover:cursor-pointer">
              <img className="w-28 h-28 object-contain" src={previewImage && (URL.createObjectURL(previewImage)) || mentor?.image || userIcon} />
            </label>
            <form onSubmit={submitHandler} className="flex flex-col bg-white w-52 gap-2">
              <input value={mentor && mentor?.firstName} name="firstName" placeholder="first name" type="text" onChange={changeHandler}
                className='w-full focus:outline-blue-700 border-[1.4px] rounded-md border-blue-500 px-2 py-1 text-blue-600' />
              <input value={mentor && mentor?.lastName} name="lastName" placeholder="last name" type="text" onChange={changeHandler}
                className='w-full focus:outline-blue-700 border-[1.4px] rounded-md border-blue-500 px-2 py-1 text-blue-600' />
              <input value={mentor && mentor?.email} name="email" placeholder="email" type="email" onChange={changeHandler} className='w-full focus:outline-blue-700 border-[1.4px] rounded-md border-blue-500 px-2 py-1 text-blue-600' />
              <input hidden id="image" name="image" placeholder="image" type="file" onChange={imageChangeHandler} />
              <Select
                className="w-44"
                value={mentor.category}
                defaultValue={mentor.category}
                onchange={handleCategoryChange}
                options={categories}
                name="category"
              />
              <Select
                className="w-44"
                value={mentor.status}
                defaultValue={mentor.status}
                onchange={handleStatusChange}
                options={status}
                name="status"
              />
              <SubmitButton text="save" />
            </form>
            <div className="flex gap-5">
              <button onClick={deleteHandler} className='hover:bg-white hover:text-red-600 hover:shadow-2xl transition-all w-full py-[7px] px-2 bg-red-600 rounded-lg text-white'>
                delete
              </button>
            </div>
          </>
      }
    </div >
  )
}

export default Mentor