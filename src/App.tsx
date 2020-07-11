import React from 'react';

import GlobalStyle from './styles/global';
import Signin from './pages/Signin';
// import Signup from './pages/Signup';

const App: React.FC = () => (
  <>
    <Signin />
    <GlobalStyle />
  </>
);

export default App;
