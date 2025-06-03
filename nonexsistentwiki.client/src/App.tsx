import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { AuthWindow } from './components/auth/AuthWindow';
import Header from './Header';
import PostsList from './components/PostsList';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { RegisterWindow } from './components/auth/RegistrationWindow';
import UserWindow from './components/auth/UserWindow';
import Home from './components/Home';
import Tab from './Tab';

export function App(){

  return (
    <BrowserRouter>
			<div className="d-flex flex-column vh-100 justify-content-between ">
				<Header/>
				<div className="mb-auto">
					<Routes>
						<Route path="/" element={<Home />} />
            <Route path="/wiki" element={<PostsList />} />

            <Route path="/user">
							<Route path="signup" element={<AuthWindow />} />
              <Route path="register" element={<RegisterWindow />} />
              <Route path='account' element={<UserWindow/>}/>
            </Route>
          </Routes>
				</div>
				<Tab/>
			</div>
		</BrowserRouter>
  );
};
// <Header />
//<PostsList />
export default App;