import {
  Search,
  SearchIconWrapper,
  StyledInputBase,
  CustomLink,
  SearchFilter,
} from "./styled";
import SearchIcon from "@mui/icons-material/Search";
import { Box } from "@mui/material";
import { onValue, ref } from "firebase/database";
import { useState, useEffect } from "react";
import { database } from "../../firebase";

const SearchBar = () => {
  const [searchValue, setSearchValue] = useState("");
  const [usersValue, setUsersValue] = useState([]);

  useEffect(() => {
    const rootRef = ref(database, "users");
    onValue(
      rootRef,
      (snapshot) => {
        const data = snapshot.val();
        const keys = Object.keys(data);
        keys.forEach((key) => {
          const usersData = { id: key, ...data[key] };
          setUsersValue((prev) => [...prev, usersData]);
        });
      },
      {
        onlyOnce: true,
      }
    );
  }, []);

  const onChangeSearch = (event) => {
    setSearchValue(event.target.value);
  };

  const onSelectedItem = (searchTerm) => {
    setSearchValue(searchTerm);
  };
  return (
    <Box position="relative">
      <Box>
        <Search>
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <StyledInputBase
            placeholder="Search Facebook"
            inputProps={{ "aria-label": "search" }}
            value={searchValue}
            onChange={onChangeSearch}
          />
        </Search>
      </Box>
      <SearchFilter>
        {usersValue
          .filter((item) => {
            const searchTerm = searchValue.toLowerCase();
            const name = item.fName.toLowerCase();
            return searchTerm && name.startsWith(searchTerm);
          })
          .map((item) => (
            <CustomLink to={`profile/${item.email}`} key={item.id}>
              <Box
                onClick={() => onSelectedItem(`${item.fName} ${item.lName}`)}
              >{`${item.fName} ${item.lName}`}</Box>
            </CustomLink>
          ))}
      </SearchFilter>
    </Box>
  );
};

export default SearchBar;
