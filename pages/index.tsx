import * as React from "react";
import { Query } from "react-apollo";
import { css, keyframes } from "emotion";
import { byPage as qLeaderboard, PlayersList } from "../graphql/leaderboard";
import ErrorMessage from "../components/common/ErrorMessage";
import Leaderboard from "../components/Leaderboard/Leaderboard";
import Records from "../components/Records";
import Search from "../components/Search";
import Layout from "../components/common/Layout";
import { SkeletonContext } from "../components/common/Skeleton";
import { FadeLoader as LoadingIcon } from "react-spinners";
import { Transition, animated } from "react-spring";

const fadeOut = keyframes`
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
`;

const records = css`
  grid-area: content;
  order: 3;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

const transitionTimeMs = 300;

const recordsExiting = css`
  ${records};
  animation: ${fadeOut} ${transitionTimeMs / 1000}s ease forwards;
`;

const searchArea = css`
  width: 330px;
  box-sizing: border-box;
  margin: 15px auto 30px;
`;

type State = {
  page: number;
  exiting: boolean;
};

export default class Home extends React.Component<{}, State> {
  state = {
    page: 0,
    exiting: false,
  };

  next = () => {
    this.setState(state => ({ page: state.page + 1 }));
  };
  previous = () => {
    this.setState(state => ({ page: state.page - 1 }));
  };
  render() {
    return (
      <Layout>
        <Query query={qLeaderboard} variables={{ page: this.state.page }}>
          {({ error, data, loading }) => {
            if (error) return <ErrorMessage message={error.message} />;
            if (!data.leaderboard) {
              return <ErrorMessage message="No data fetched" />;
            }
            const players = data.leaderboard as PlayersList;
            return (
              <SkeletonContext.Provider value={loading ? "loading" : "loaded"}>
                <Layout.Sidebar>
                  <h4>Leaderboard</h4>
                  <Leaderboard
                    players={players}
                    nextHandler={this.next}
                    previousHandler={this.previous}
                  />
                </Layout.Sidebar>
                <Layout.Content>
                  <div className={searchArea}>
                    <h4>Search a Player</h4>
                    <Search
                      beforeSearch={() => {
                        this.state.exiting = true;
                        this.forceUpdate();
                      }}
                      timeout={transitionTimeMs / 2}
                    />
                  </div>
                  <Transition
                    native
                    // @ts-ignore
                    items={this.state.exiting}
                    from={{ opacity: 0 }}
                    enter={{ opacity: 1 }}
                    leave={{ opacity: 0 }}
                    config={{
                      duration: 200,
                      tension: 0.1,
                    }}
                  >
                    {exiting => (props: any) =>
                      exiting ? (
                        <animated.div className={records} style={props}>
                          <LoadingIcon />
                        </animated.div>
                      ) : (
                        <animated.div className={records} style={props}>
                          <Records />
                        </animated.div>
                      )}
                  </Transition>
                </Layout.Content>
              </SkeletonContext.Provider>
            );
          }}
        </Query>
      </Layout>
    );
  }
}
