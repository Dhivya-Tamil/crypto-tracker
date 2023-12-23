import { useState } from 'react';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import { IconButton } from '@mui/material';
import { Link } from 'react-router-dom';

export default function TemporaryDrawer() {
  const [open, setOpen] = useState(false);

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

 

  return (
    <div>
          <IconButton onClick={()=>setOpen(true)}>
            <MenuRoundedIcon className='link' />
          </IconButton>
          <Drawer
            anchor={"right"}
            open={open}
            onClose={()=>setOpen(false)}
          >
           <div className='drawer-div'>
            <Link to='/' className='link'>Home</Link>
            <Link to='/compare' className='link'>Compare</Link>
            <Link to='/dashBoard' className='link'>DashBoard</Link>
           </div>
          </Drawer>
    </div>
  );
}