
import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.scss';
import Filter from './components/filter/filter';
import UsersList from './components/users-list/users-list';
import UseService from './service/useService';
import FormUser from './components/form-user/formUser';



function App() {
  
  const [filter, setFilter] = useState('company');
  const [data, setData] = useState([]);
  const [userId, setUserId] = useState(null); 

  const {getAllUsers} = UseService();

  const onUpdateFilter = (filter) => {
    setFilter(filter)
  }

  const onUpdateUserId = (userId) => {
    setUserId(userId)
  }

  useEffect(() => {
    getAllUsers().then(onUsersListLoaded)
  }, [])

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
            <FormUser user={data[index]}/>
          } />
        </Routes>
      </div>
   </Router>
  );
}

export default App;
