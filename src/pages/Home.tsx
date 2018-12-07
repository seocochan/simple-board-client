import * as React from 'react';

import { Banner, Information, Welcome } from 'components/home';
import { IUserSummary } from 'payloads';

interface Props {
  currentUser: IUserSummary | null;
}

const Home: React.SFC<Props> = ({ currentUser }) => {
  return (
    <div>
      <Banner />
      {currentUser ? <Welcome username={currentUser.username}/> : <Information />}
    </div>
  );
};

export default Home;
