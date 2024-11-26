import React from 'react';

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";
import {Homie, Profile, CreateCampaign, CampaignDetails} from './pages'
import {Navbar, Sidebar} from './components'

export default function Home() {
  return (
    <Router>
   
      <div className="relative sm:p-8 p-4 bg-[#170e3b] min-h-screen flex flex-row">
          <div className="relative hidden sm:flex mr-10">
            <Sidebar/>
          </div>

          <div className="flex-1 max-sm:w-full max-w-[1280px] mx-auto sm:pr-5 text-blue-200">
            <Navbar/>


            <Routes>
              <Route path='/' element={<Homie/>}/>
              <Route path="/profile" element={<Profile />} />
              <Route path="/create-campaign" element={<CreateCampaign />} />
              <Route path="/campaign-details/:id" element={<CampaignDetails />} />
            </Routes>
            
          </div>
          {/* <Homie/> */}
      </div>
      </Router>
    );
  }
