import "./App.css";
import { useState } from "react";
import Sidebar from "./components/Sidebar/Sidebar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homepage from "./components/Homepage/Homepage";
import Teams from "./components/Teams/Teams";
import Issues from "./components/Github/Issues";
import { FavouriteChannels, FavouriteUsers, MonthlyTracker, RecentMessages } from "./components/Slack";
import PullRequests from "./components/Github/PullRequests";
import Commits from "./components/Github/Commits";

function App() {
  const [menuItemSelected, setMenuItemSelected] = useState(0);
  const [subMenuItemSelected, setSubMenuItemSelected] = useState(0);
  return (
    <div className="App">
      <div className="AppGlass">
        <BrowserRouter>
          <Sidebar
            menuItemSelected={menuItemSelected}
            setMenuItemSelected={setMenuItemSelected}
            subMenuItemSelected={subMenuItemSelected}
            setSubMenuItemSelected={setSubMenuItemSelected}
          />
          <div className="MainDash">
            <Routes>
              <Route
                path="/"
                element={
                  <Homepage setMenuItemSelected={setMenuItemSelected} setSubMenuItemSelected={setSubMenuItemSelected} />
                }
              ></Route>
              <Route
                path="/home"
                element={
                  <Homepage setMenuItemSelected={setMenuItemSelected} setSubMenuItemSelected={setSubMenuItemSelected} />
                }
              ></Route>
              <Route path="/slack">
                <Route path="/slack/monthly-tracker" element={<MonthlyTracker />} />
                <Route path="/slack/recent-messages" element={<RecentMessages />} />
                <Route path="/slack/favourite-channels" element={<FavouriteChannels />} />
                <Route path="/slack/favourite-users" element={<FavouriteUsers />} />
              </Route>
              <Route path="/teams" element={<Teams />}></Route>
              <Route path="/github">
                <Route path="/github/issues" element={<Issues />} />
                <Route path="/github/pull-requests" element={<PullRequests />} />
                <Route path="/github/commits" element={<Commits />} />
              </Route>
            </Routes>
          </div>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
