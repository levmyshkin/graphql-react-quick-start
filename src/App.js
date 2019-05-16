import React from 'react';
import './App.css';
import gql from 'graphql-tag'
import ApolloClient from 'apollo-boost';
import {Query, ApolloProvider} from "react-apollo";
import ReactHtmlParser from 'react-html-parser';

const client = new ApolloClient({
  uri: 'http://drupal8.x.local/graphql'
})

const GET_NODE_BY_ID = gql`
query {
  nodeById(id: "1") {
    entityId
    entityCreated
    
    title
    status
    
    ... on NodeArticle {
      body {
        value
      }
      fieldImage {
        targetId
        alt
        title
        width
        height
        url
      }
    }
  }
}
`

function App() {
  return (
    <div className="App">
      <Query client={client} query={GET_NODE_BY_ID} >
        {({ loading, error, data }) => {
          if (error) return <div>Error ...</div>
          if (loading || !data) return <div>Loading ...</div>;

          return (
            <div className={'article'}>
              <div>{data.nodeById.title}</div>
              <div>{ReactHtmlParser(data.nodeById.body.value)}</div>
            </div>
          );
        }}
      </Query>
    </div>
  );
}

export default App;
