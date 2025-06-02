import './App.css';
import './footer.css';
import './header.css';
import Footer from './components/footer';
import Header from './components/header';
import { Outlet } from 'react-router-dom';
import { ApolloClient, ApolloProvider, HttpLink, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

import AuthService from './utils/auth'

const httpLink = new HttpLink({
  uri: '/graphql',
})

const authLink = setContext((_, { headers }) => {
  const token = AuthService.getToken();

  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : ""
    }
  }
})

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <div className="app-wrapper">
        <Header />
        <div className="page-content">
          <Outlet />
        </div>
        <Footer />
      </div>
    </ApolloProvider>
  );
}

export default App;
