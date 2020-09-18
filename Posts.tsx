import React, { useEffect, useState } from "react";
import { FlatList, ActivityIndicator } from "react-native";
import styled from "styled-components/native";
import { connect, ConnectedProps } from "react-redux";
import { Ionicons } from "@expo/vector-icons";
import Actions from "./actions";
import Selectors from "./selectors";
import { State, Post } from "./types";

interface PostProps {
  userId: string;
  posts: Post[];
  fetchPosts: (userId: string) => void;
  isFetching: boolean;
}

export const Posts = React.memo(
  ({
    userId,
    posts,
    fetchPosts,
    isFetching,
  }: PostProps): React.ReactElement => {
    const [index, setIndex] = useState(0);
    useEffect(() => {
      fetchPosts(userId);
    }, [userId]);

    console.log(index);

    if (isFetching) {
      return <ActivityIndicator size="large" />;
    }

    const renderItem = ({ item }) => {
      const { id, userId, title, body } = item;
      console.log(item);
      return (
        <ItemContainer>
          <H1>{title}</H1>
          <S1>{body}</S1>
        </ItemContainer>
      );
    };

    return (
      <List
        data={posts}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
      />
    );
  }
);

const mapStateToProps = (state: State) => ({
  posts: Selectors.postsData(state),
  isFetching: Selectors.isFetchingPosts(state),
});

const mapDispatchToProps = (dispatch) => ({
  fetchPosts: (userId: number) =>
    dispatch(Actions.posts.fetchPosts.trigger(userId)),
});

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(Posts);

const List = styled(FlatList as new () => FlatList<Post>)`
  background-color: ${({ theme }) => theme.colors.white};
  flex: 1;
`;

const ItemContainer = styled.View`
  padding: ${({ theme }) => theme.space.lg}px;
`;
const H1 = styled.Text`
  font-size: 16px;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.basic};
`;

const S1 = styled.Text`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.basic200};
`;
