import React, { useEffect, useState } from "react";
import Select from "../../components/form/Select";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import categoryActions from "../../redux/features/categoryActions";
import mentorActions from "../../redux/features/mentorActions";
import { PuffLoader } from "react-spinners";
import { Link } from "react-router-dom";

interface MentorsType {
  firstName: string;
  lastName: string;
  _id: string;
  image: string;
  email: string;
  category: string;
  status: string;
}

const Mentors = () => {
  const [filteredMentors, setFilteredMentors] = useState<Array<MentorsType>>([]);
  const [search, setSearch] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const loading = useSelector((state: RootState) => state.mentor.loading);
  const mentors = useSelector((state: RootState) => state.mentor.mentors);
  const dispatch: AppDispatch = useDispatch();
  const categories = useSelector((state: RootState) => state.category.categories);

  useEffect(() => {
    dispatch(categoryActions.categoryGet());
    dispatch(mentorActions.mentorGetAll());
  }, []);

  useEffect(() => {
    filterMentors(search, selectedCategory);
  }, [search, selectedCategory, mentors]);

  const filterMentors = (searchText: string, category: string) => {
    const filtered = mentors.filter(
      (mentor) =>
        (searchText === "" || mentor.firstName.toLowerCase().includes(searchText.toLowerCase())) &&
        (category === "All" || mentor.category === category)
    );
    setFilteredMentors(filtered);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(e.target.value);
  };

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
                value={selectedCategory}
                onchange={handleCategoryChange}
                options={categories}
                name="category"
              />
            </div>
            <div>
              <div className="text-blue-600 text-xl font-bold flex justify-between">
                <div>name</div>
                <div>category</div>
                <div>status</div>
              </div>

              {filteredMentors.map((mentor, index) => (
                <Link to={`/admin/mentor/${mentor._id}`} className="text-blue-600 flex justify-between hover:bg-blue-500 hover:text-white rounded-lg p-2 transition-all hover:scale-105 hover:p-3" key={index}>

                  <div>{mentor.firstName}</div>
                  <div>{mentor.category}</div>
                  <div>{mentor.status}</div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Mentors;
