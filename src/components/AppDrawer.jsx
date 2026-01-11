import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Home, Heart, Info, Menu, X } from 'lucide-react';


export default function AppDrawer() {
  const [isOpen, setIsOpen] = useState(false); 
  const navigate = useNavigate(); 


  const handletoggleDrawer = () => {
    setIsOpen(!isOpen);
  };

  const handleNavigation = (path) => {
    navigate(path);
    setIsOpen(false); 
  };

  return (
    <div className='fixed top-4 left-4 z-50'>
      <button
        onClick={handletoggleDrawer}
        className=" p-2 text-white bg-gray-800 rounded-full transition-all duration-300 ease-in-out inline-flex items-center justify-center"
      >
       {isOpen ?  <X className='w-6 h-6'/>: <Menu className='w-6 h-6' /> }
      </button>

     {isOpen && (
        <div className="absolute top-4 left-0 mt-8 w-56 bg-gray-800 text-white rounded shadow-lg overflow-hidden border border-gray-700">
          <MenuItem icon={Home} label="Home" onClick={() => handleNavigation("/")} />
          <MenuItem icon={Heart} label="Favourite" onClick={() => handleNavigation("/favourite")} />
          <MenuItem icon={Info} label="About" onClick={() => handleNavigation("/about")} />
        </div>
      )}  
      </div>
  );
};

function MenuItem({ icon: Icon, label, onClick }) {
    return (
        <button onClick={onClick} className='w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-700 transition-colors'>
            <Icon className='w-5 h-5' />
            <span>{label}</span>
        </button>
    )
}


