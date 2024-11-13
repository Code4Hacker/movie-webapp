import React, { useState } from 'react'
import { BrowserSafari, CameraVideo, People, PieChart, Watch } from "react-bootstrap-icons";
import { coming, dashboard, home, trendings } from '../statics/paths';
import { Link, useLocation } from 'react-router-dom';
import { Divider, Modal } from 'rsuite';
const SiderBar = () => {
    const [open, setOpen] = useState(false)
    const {pathname} = useLocation();
    const sidelist = [
        window.localStorage.getItem("userN") ?{
            icon:<People/>,
            title:"Dashboard",
            tag:dashboard
        }:"",
        {
            icon:<BrowserSafari/>,
            title:"Browse Movies",
            tag: home
        },
        {
            icon:<Watch/>,
            title:"Upcoming",
            tag:coming
        },
        {
            icon:<PieChart/>,
            title:"Tredings",
            tag:trendings
        }
    ];
    const sidelist2 = [
        {
            icon:<BrowserSafari/>,
            title:"Account Settings",
            tag: "hm"
        },
        {
            icon:<People/>,
            title:"Followings",
            tag:coming
        },
    ];
    return (
        <div className='sidebar lefted'>
            <div className="container">
                <div className="headline">
                    <h5>
                        <span>X-</span><span>Gemini</span>
                        <span>Movie</span>
                    </h5>
                </div>
                <div className="lists">
                    <span>Menu Tabs</span>
                    <br />
                    <br />
                    {
                        sidelist.map((item, key) => <button className={`button ${pathname === item.tag? 'active':''}`} key={key}><Link to={item.tag}><span>{item.icon}</span> <span>{item.title}</span></Link></button>)
                    }
                    <Divider className='divider'/>
                    <span>Quick Actions</span>
                    <br />
                    <br />
                    {
                        sidelist2.map((item, key) => <button className={`button ${pathname === item.tag? 'active':''}`} key={key}><Link onClick={() => setOpen(true)}><span>{item.icon}</span> <span>{item.title}</span></Link></button>)
                    }
                    <Modal open={open} onClose={() => setOpen(false)}>
                        <Modal.Body>
                            <h2 style={{
                                color:'var(--secondary)'
                            }}>Hahah!</h2>
                            <h1>Gotcha Us...</h1>
                            <p style={{
                                color:'var(--slim_grey2)'
                            }}>Sorry for disappointing but this feature will be back soon, just stay alert. Best friend for Movies</p>
                        </Modal.Body>
                    </Modal>
                    <Divider className='divider'/>
                </div>
            </div>
        </div>
    )
}

export default SiderBar