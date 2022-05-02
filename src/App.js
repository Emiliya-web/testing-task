
import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Filter from './components/filter/filter';
import UsersList from './components/users-list/users-list';
import UserProfile from './components/user-profile/userProfile';
import UseService from './service/useService';



function App() {

  const url = 'https://jsonplaceholder.typicode.com/users';
  
  const [filter, setFilter] = useState('company');
  const [data, setData] = useState([]);
  const [userId, setUserId] = useState(null); 

  const {loading ,error, getAllUsers} = UseService();

  const onUpdateFilter = (filter) => {
    setFilter(filter)
  }

  const onUpdateUserId = (userId) => {
    setUserId(userId)
  }

  useEffect(() => {
    getAllUsers().then(onUsersListLoaded)
  }, [])

  // useEffect(() => {
  //   console.log(data)
  // }, [])

  const onUsersListLoaded = (users) => {
    setData(users)
  }

      
  const index = data.findIndex(elem => elem.id === userId);

  return (
   <Router>
      <div className="App">
        <Filter onUpdateFilter={onUpdateFilter}/>
        <Routes>
          <Route path="/" element={
            <UsersList filter={filter} onUpdateUserId={onUpdateUserId}/>
            } />
          <Route path="/user-profile" element={
            <UserProfile user={data[index]}/>
          } />
        </Routes>
      </div>
   </Router>
  );
}

export default App;
