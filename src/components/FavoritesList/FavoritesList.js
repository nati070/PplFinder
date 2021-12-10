import React, { useEffect, useState } from "react";
import Text from "components/Text";
import Spinner from "components/Spinner";
import CheckBox from "components/CheckBox";
import IconButton from "@material-ui/core/IconButton";
import FavoriteIcon from "@material-ui/icons/Favorite";
import * as S from "./style";

const FavoritesList = ({ users, isLoading }) => {
  const [choosenUsers, setChosenUsers] = useState([]);
  const [countries, setCountries] = useState({
    brazil: false,
    australia: false,
    canada: false,
    germany: false,
    israel: false,
  });

  const { brazil, australia, canada, germany, israel } = countries;
  useEffect(() => {
    setChosenUsers(users);
  }, [users]);

  useEffect(() => {
    if (!brazil && !australia && !canada && !germany && !israel) {
      return setChosenUsers(users);
    }
    const updateUsers = users.filter((user) => {
      if (user.location.country === "Brazil" && brazil) {
        return user;
      }
      if (user.location.country === "Australia" && australia) {
        return user;
      }
      if (user.location.country === "Canada" && canada) {
        return user;
      }
      if (user.location.country === "Germany" && germany) {
        return user;
      }
      if (user.location.country === "Israel" && israel) {
        return user;
      }
    });
    setChosenUsers(updateUsers);
  }, [countries]);

  const updateCountries = (country) => {
    switch (country) {
      case "BR":
        setCountries({ ...countries, brazil: !brazil });
        break;
      case "AU":
        setCountries({ ...countries, australia: !australia });
        break;
      case "CA":
        setCountries({ ...countries, canada: !canada });
        break;
      case "DE":
        setCountries({ ...countries, germany: !germany });
        break;
      case "IL":
        setCountries({ ...countries, israel: !israel });
        break;
    }
  };

  const clickOnUnFaforite = (index) => {
      users.splice(index,1);
      localStorage["usersFavor"] = JSON.stringify(users);
      setChosenUsers([...users]);
  };

  return (
    <S.UserList>
      <S.Filters>
        <CheckBox
          value="BR"
          label="Brazil"
          isChecked={brazil}
          onChange={updateCountries}
        />
        <CheckBox
          value="AU"
          label="Australia"
          isChecked={australia}
          onChange={updateCountries}
        />
        <CheckBox
          value="CA"
          label="Canada"
          isChecked={canada}
          onChange={updateCountries}
        />
        <CheckBox
          value="DE"
          label="Germany"
          isChecked={germany}
          onChange={updateCountries}
        />
        <CheckBox
          value="IL"
          label="Israel"
          isChecked={israel}
          onChange={updateCountries}
        />
      </S.Filters>
      <S.List>
        {choosenUsers.map((user, index) => {
          return (
            <S.User
              key={index}
            >
              <S.UserPicture src={user?.picture.large} alt="" />
              <S.UserInfo>
                <Text size="22px" bold>
                  {user?.name.title} {user?.name.first} {user?.name.last}
                </Text>
                <Text size="14px">{user?.email}</Text>
                <Text size="14px">
                  {user?.location.street.number} {user?.location.street.name}
                </Text>
                <Text size="14px">
                  {user?.location.city} {user?.location.country}
                </Text>
              </S.UserInfo>
              <S.IconButtonWrapper
                isVisible={true}
                onClick={() => clickOnUnFaforite(index)}
              >
                <IconButton>
                  <FavoriteIcon color="error" />
                </IconButton>
              </S.IconButtonWrapper>
            </S.User>
          );
        })}
        {isLoading && (
          <S.SpinnerWrapper>
            <Spinner color="primary" size="45px" thickness={6} variant="indeterminate" />
          </S.SpinnerWrapper>
        )}
      </S.List>
    </S.UserList>
  );
};

export default FavoritesList;
