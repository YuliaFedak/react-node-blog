import React, {createContext} from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import User from "./blog/user"
import Blog from "./blog/blog"

export const Context = createContext(null)

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
      <Context.Provider value={{
          user: new User(),
          blog: new Blog()
      }}>

            <App />
      </Context.Provider>,
);

