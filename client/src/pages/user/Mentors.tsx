import React, { useEffect, useState } from "react";
import { AppDispatch, RootState } from "../../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { categoryGet } from "../../redux/features/categoryActions";
import Api from "../../services/Api";
import Select from "../../components/form/Select";

interface MentorsType {
    firstName: string;
    status: string;
    category: string;
}

const Mentors = () => {
    const [mentors, setMentors] = useState<Array<MentorsType>>([]);
    const [filteredMentors, setFilteredMentors] = useState<Array<MentorsType>>([]);
    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("");

    const dispatch: AppDispatch = useDispatch();
    const categories = useSelector((state: RootState) => state.category.categories);

    useEffect(() => {
        dispatch(categoryGet());
        (async () => {
            const { data } = await Api.get("/mentor/getAll");
            setMentors(data.mentors);
            console.log(data.mentors)
            setFilteredMentors(data.mentors);
        })();
    }, []);

    const changeHandler = (e: React.ChangeEvent<any>) => {
        e.preventDefault();
        const { name, value } = e.target;

        if (name === "search") {
            setSearch(value);
            filterMentors(value, category);
        } else if (name === "category") {
            setCategory(value);
            filterMentors(search, value);
        }
    };

    const filterMentors = (searchText: string, selectedCategory: string) => {
        const filtered = mentors.filter(
            (mentor) =>
                searchText ? mentor.firstName.toLowerCase().includes(searchText.toLowerCase()) : true &&
                    (selectedCategory === "All" || mentor.category === selectedCategory)
        );
        setFilteredMentors(filtered);
    };

    return (
        <>
            <div className="h-screen px-10 pt-20 flex flex-col gap-5">
                <div className="flex flex-col gap-5">
                    <div className="flex gap-2">
                        <input
                            className="w-fit focus:outline-blue-700 border-[1.4px] rounded-md border-blue-500 px-2 py-1 text-blue-600"
                            onChange={changeHandler}
                            name="search"
                            placeholder="Search by name"
                            type="text"
                        />
                        <Select value="" className="w-44" onchange={changeHandler} options={categories} name="category" />
                    </div>
                    <div>
                        {filteredMentors.map((e, i) => (
                            <div className="text-blue-600 flex justify-between" key={i}>
                                <div>{e.firstName}</div>
                                <div>{e.category}</div>
                                <div>{e.status}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Mentors;
