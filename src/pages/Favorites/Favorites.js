import React, { useState, useEffect } from "react";
import Text from "components/Text";
import FavoritesList from "components/FavoritesList";
import * as S from "./style";

const Favorites = () => {
  const [favorUsers, setFavorUsers] = useState([]);


  useEffect(() => {
    if (localStorage["usersFavor"]) {
      const data = JSON.parse(localStorage["usersFavor"]);
      setFavorUsers(data);
    }
  }, []);
  return (
    <S.Home>
      <S.Content>
        <S.Header>
          <Text size="64px" bold>
            PplFinder Favorites
          </Text>
        </S.Header>
        <FavoritesList users={favorUsers} />
      </S.Content>
    </S.Home>
  );
};

export default Favorites;
