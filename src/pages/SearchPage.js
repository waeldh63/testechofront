import React, { useEffect, useState, useRef } from "react";
import my_tableService from "../services/my_tableService";
import { useDispatch, useSelector } from "react-redux";
import { addSearchQuery } from "../redux/action";

const SearchPage = () => {
  const [records, setRecords] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setsearchQuery] = useState(false);
  const limit = 30;

  const dispatch = useDispatch();
  const searchHistory = useSelector((state) => state.searchHistory);

  const [isFocused, setIsFocused] = useState(false);
  const handleFocus = () => {
    setIsFocused(true);
  };
  const handleBlur = () => {
    setIsFocused(false);
  };

  const fetchData = async () => {
    try {
      const record = await my_tableService.getDataPaginated(currentPage, limit);
      setRecords((prevRecords) => [...prevRecords, ...record.data]);
    } catch (error) {
      console.error("getDataPaginated failed:", error);
    } finally {
      setLoading(false);
    }
  };
  const searchByFirstname = async () => {
    try {
      dispatch(addSearchQuery(searchQuery));
      const record = await my_tableService.searchByFirstname(searchQuery);
      setRecords();
      setRecords(record.data);
    } catch (error) {
      console.error("login failed:", error);
    }
  };

  const handleScrollToBottom = () => {
    setCurrentPage((currentPage) => currentPage + 1);
  };
  useEffect(() => {
    fetchData();
  }, [currentPage]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY || window.pageYOffset;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;

      if (scrollTop + windowHeight >= documentHeight) {
        handleScrollToBottom();
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  if (loading) return <p>Loading...</p>;
  return (
    <div className="row ">
      <div className="col-md-8 d-flex flex-row align-items-center mx-auto mt-3">
        <input
          class="form-control mx-auto"
          type="search"
          placeholder="Search"
          aria-label="Search"
          onChange={(e) => setsearchQuery(e.target.value)}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
        <button
          type="button"
          class="btn btn-primary"
          onClick={() => searchByFirstname()}
        >
          Primary
        </button>
      </div>

      <div className="col-md-8 d-flex flex-row align-items-center mx-auto">
        <ul>
          {isFocused &&
            searchHistory.map((item, index) => <li key={index}>{item}</li>)}
        </ul>
      </div>
      <div className="col-md-8 d-flex flex-column align-items-center mx-auto">
        {records.map((record) => (
          <div
            key={record.id}
            className=" col-md-8 d-flex flex-column mx-auto border border-primary mt-1"
          >
            <label>first name: {record.firstname}</label>
            <label>last name: {record.lastname}</label>
            <label>email: {record.email}</label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchPage;
