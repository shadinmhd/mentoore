import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import categoryActions from "../../redux/features/categoryActions";
import { PuffLoader } from "react-spinners";
import adminActions from "../../redux/features/adminActions";
import { Link } from "react-router-dom";
import Select from "../../components/form/Select";

interface UserType {
  name: string,
  _id: string,
  image: string,
  email: string,
  status: string
}

const Users = () => {
  const [filteredUsers, setFIlteredUsers] = useState<Array<UserType>>([]);
  const [search, setSearch] = useState<string>("");
  const [selectedStatus, setSelectedStatus] = useState("status")
  const status = [{ name: "active" }, { name: "banned" }, { name: "deleted" }, { name: "pending" }]


  const loading = useSelector((state: RootState) => state.admin.loading);
  const users = useSelector((state: RootState) => state.admin.users);

  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    dispatch(categoryActions.categoryGet());
    dispatch(adminActions.userGetAll());
  }, [dispatch]);

  useEffect(() => {
    filterMentors(search);
  }, [search, users, selectedStatus]);

  const filterMentors = (searchText: string) => {
    const filtered = users.filter(
      (user) => (searchText === "" || user.name.toLowerCase().includes(searchText.toLowerCase())) &&
        (selectedStatus == "status" || user.status == selectedStatus)
    );
    setFIlteredUsers(filtered);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedStatus(e.target.value)
  }

  return (
    <>
      <div className={`h-screen w-full px-10 pt-20 flex flex-col gap-5 ${loading && "items-center justify-center"}`}>
        {loading ? (
          <PuffLoader color="#2563eb" />
        ) : (
          <div className="flex flex-col gap-5">
            <div className="flex gap-2">
              <input
                className="w-fit focus:outline-blue-700 border-[1.4px] rounded-md border-blue-500 px-2 py-1 text-blue-600"
                value={search}
                onChange={handleSearchChange}
                placeholder="Search by name"
                type="text"
              />
              <Select
                className="w-44"
                value={selectedStatus}
                defaultValue={"status"}
                onchange={handleStatusChange}
                options={status}
                name="status"
              />
            </div>
            <div>
              <div className="flex flex-col gap-2 px-5">
                <div className="text-blue-600 text-xl font-bold flex justify-between">
                  <div>name</div>
                  <div>email</div>
                  <div>status</div>
                </div>
                {filteredUsers.map((user, index) => (
                  <Link to={`/admin/user/${user._id}`} className="text-blue-600 flex justify-between hover:bg-blue-500 hover:text-white rounded-lg p-2 transition-all hover:scale-105 hover:p-3" key={index}>
                    <div>{user.name}</div>
                    <div>{user.email}</div>
                    <div className={user.status == "active" ? "text-green-700" : "text-red-600"}>{user.status}</div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Users;
