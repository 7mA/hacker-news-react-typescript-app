import React from 'react';
import './style/App.css';
import NewsFeedContainer from './components/NewsFeedContainer';

const App: React.FC = () => {

  return (
    <div className="App mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
      <h1 className="md:text-4xl text-3xl font-bold tracking-tight text-gray-900 font-serif">Hacker News <br/> Top Stories</h1>
      <NewsFeedContainer />
    </div>
  );
}

export default App;
