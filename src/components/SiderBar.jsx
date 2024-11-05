import React from 'react'
import { BrowserSafari, CameraVideo, People, PieChart, Watch } from "react-bootstrap-icons";
import { coming, home } from '../statics/paths';
import { Link, useLocation } from 'react-router-dom';
import { Divider } from 'rsuite';
const SiderBar = () => {
    const {pathname} = useLocation();
    const sidelist = [
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
            tag:"people"
        },
        {
            icon:<CameraVideo/>,
            title:"Watching Now",
            tag:"people"
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
        }
    ];
    return (
        <div className='sidebar'>
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
                        sidelist.map((item, key) => <button className={`button ${pathname === item.tag? 'active':''}`} key={key}><Link ><span>{item.icon}</span> <span>{item.title}</span></Link></button>)
                    }
                    <Divider className='divider'/>
                    <span>Quick Actions</span>
                    <br />
                    <br />
                    {
                        sidelist2.map((item, key) => <button className={`button ${pathname === item.tag? 'active':''}`} key={key}><Link ><span>{item.icon}</span> <span>{item.title}</span></Link></button>)
                    }
                    <Divider className='divider'/>
                </div>
            </div>
        </div>
    )
}

export default SiderBar