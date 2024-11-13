import React from 'react'
import { BrowserSafari, CameraVideo, List, People, PieChart, Watch } from "react-bootstrap-icons";
import { coming, dashboard, home, trendings } from '../statics/paths';
import { Modal, Toggle, Button, ButtonToolbar, Placeholder, Divider } from 'rsuite';
import SiderBar from './SiderBar';
import { Link, useLocation } from 'react-router-dom';
const TopLists = () => {
    const {pathname} = useLocation();
    const [open, setOpen] = React.useState(false);
    const [opens, setOpens] = React.useState(false);
    const [overflow, setOverflow] = React.useState(true);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const sidelist = [
        window.localStorage.getItem("userN") ? {
            icon: <People />,
            title: "Dashboard",
            tag: dashboard
        } : "",
        {
            icon: <BrowserSafari />,
            title: "Browse Movies",
            tag: home
        },
        {
            icon: <Watch />,
            title: "Upcoming",
            tag: coming
        },
        {
            icon: <PieChart />,
            title: "Tredings",
            tag: trendings
        },
        {
            icon: <CameraVideo />,
            title: "Watching Now",
            tag: "people"
        }
    ];
    const sidelist2 = [
        {
            icon: <BrowserSafari />,
            title: "Account Settings",
            tag: "hm"
        },
        {
            icon: <People />,
            title: "Followings",
            tag: coming
        },
    ];
    return (
        <>
            <ButtonToolbar>
                <Button onClick={handleOpen} className='list_btn'>
                    <List/>
                </Button>
            </ButtonToolbar>

            <Modal overflow={overflow} open={open} onClose={handleClose} >
                <Modal.Body>
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
                                    sidelist.map((item, key) => <button className={`button ${pathname === item.tag ? 'active' : ''}`} key={key}><Link to={item.tag}><span>{item.icon}</span> <span>{item.title}</span></Link></button>)
                                }
                                <Divider className='divider' />
                                <span>Quick Actions</span>
                                <br />
                                <br />
                                {
                                    sidelist2.map((item, key) => <button className={`button ${pathname === item.tag ? 'active' : ''}`} key={key}><Link onClick={() => setOpens(true)}><span>{item.icon}</span> <span>{item.title}</span></Link></button>)
                                }
                                <Modal open={opens} onClose={() => setOpens(false)}>
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
                                <Divider className='divider' />
                            </div>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    )
}

export default TopLists