import { Box, Button, Grid, styled } from "@mui/material";
import FlexBox from "components/FlexBox";
import SearchInput from "components/SearchInput";
import UserCard from "components/userManagement/UserCard";
import useTitle from "hooks/useTitle";
import { FC } from "react";
import { useNavigate } from "react-router-dom";

// styled component
const StyledFlexBox = styled(FlexBox)(({ theme }) => ({
  justifyContent: "space-between",
  alignItems: "center",
  flexWrap: "wrap",
  marginBottom: 20,
  [theme.breakpoints.down(500)]: {
    width: "100%",
    "& .MuiInputBase-root": { maxWidth: "100%" },
    "& .MuiButton-root": {
      width: "100%",
      marginTop: 15,
    },
  },
}));

const UserGrid: FC = () => {
  // change navbar title
  useTitle("놀이방");

  const navigate = useNavigate();
  const handleAddUser = () => navigate("/home/add-room");

  return (
    <Box pt={2} pb={4}>
      <StyledFlexBox>
        <SearchInput placeholder="Search user..." />
        <Button variant="contained" onClick={handleAddUser}>
          Add New Room
        </Button>
      </StyledFlexBox>

      <Grid container spacing={3}>
        {userList.map((user, index) => (
          <Grid item md={4} sm={6} xs={12} key={index}>
            <UserCard user={user} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};


// 방 정보 불러오는 api
const userList = [
  {
    cover: "/static/cover/cover-1.png",
    avatar: "/static/avatar/001-man.svg",
    name: "민석이짱",
    roomName: "초보만 들어오셈",
    seedMoney: 500,
    fullMember: 4,
    currentMember: 1,
    roomCode: "adsadvkjwi"
  },
  {
    cover: "/static/cover/cover-4.png",
    avatar: "/static/avatar/002-girl.svg",
    name: "짱짱맨",
    roomName: "고수만 와라",
    seedMoney: 1000,
    fullMember: 2,
    currentMember: 1,
    roomCode: "safasvasdnewo"
  },
];

export default UserGrid;
