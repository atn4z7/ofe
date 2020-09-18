import React, { useEffect, useState } from "react";
import styled from "styled-components/native";
import { TouchableOpacity } from "react-native";
import { connect } from "react-redux";
import { Ionicons } from "@expo/vector-icons";
import Actions from "./actions";
import Selectors from "./selectors";
import { State, User } from "./types";
import theme from "./theme";
import Posts from "./Posts";

interface HomeProps {
  users: User[];
  fetchUsers: () => void;
}

export const Home = React.memo(
  ({ users, fetchUsers }: HomeProps): React.ReactElement => {
    const [index, setIndex] = useState(0);
    useEffect(() => {
      fetchUsers();
    }, []);
    console.log(index);
    console.log(users);

    if (!users.length) {
      return null;
    }

    const user = users[index];

    const next = () => {
      const length = users.length;
      const nextIndex = (index + 1) % length;
      setIndex(nextIndex);
    };
    const prev = () => {
      const length = users.length;
      const prevIndex = (index + length - 1) % length;
      setIndex(prevIndex);
    };

    return (
      <Container>
        <TopBar>
          <Column>
            <H1>{user.name}</H1>
            <S1>{user.website}</S1>
          </Column>
          <Column>
            <Row>
              <TouchableOpacity onPress={prev}>
                <ArrowIcon
                  name="md-arrow-back"
                  size={32}
                  color={theme.colors.accent}
                />
              </TouchableOpacity>
              <TouchableOpacity onPress={next}>
                <ArrowIcon
                  name="md-arrow-forward"
                  size={32}
                  color={theme.colors.accent}
                />
              </TouchableOpacity>
            </Row>
          </Column>
        </TopBar>
        <ContentContainer>
          <Posts userId={user.id} />
        </ContentContainer>
      </Container>
    );
  }
);

export default connect(
  (state: State) => ({
    users: Selectors.userData(state),
  }),
  (dispatch) => ({
    fetchUsers: () => dispatch(Actions.users.fetchUsers.trigger()),
  })
)(Home);

const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.white};
  align-items: center;
`;

const TopBar = styled.View`
  width: 100%;
  padding: ${({ theme }) => theme.space.lg}px;
  background-color: ${({ theme }) => theme.colors.contentBg};
  justify-content: space-between;
  flex-direction: row;
`;

const ContentContainer = styled.View`
  flex: 1;
  width: 100%;
  background-color: ${({ theme }) => theme.colors.contentBg};
`;

const Column = styled.View``;

const Row = styled.View`
  flex-direction: row;
`;

const ArrowIcon = styled(Ionicons)`
  margin: 0 ${({ theme }) => theme.space.md}px;
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
