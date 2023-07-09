import {
  Row,
  Col,
  Breadcrumb,
  Badge,
  Button,
  Avatar,
} from "antd";


import { NavLink, Link } from "react-router-dom";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import Notification from "../Notification";
import { useNotifications } from "../../utils/firebase/NotificationFb";
import { useEffect, useState } from "react";
import useComponentVisible from "../../hooks/useComponentVisible";















const toggler = [
  <svg
    width="20"
    height="20"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 448 512"
    key={0}
  >
    <path d="M16 132h416c8.837 0 16-7.163 16-16V76c0-8.837-7.163-16-16-16H16C7.163 60 0 67.163 0 76v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16z"></path>
  </svg>,
];



function Header({
  name,
  onPress,
}) {
  const history = useHistory();
  const notificationList = useNotifications()
  const notificationCount = notificationList.filter(
    item => item.read === false
  ).length

  const [showNotification, setShowNotification] = useState(false)
  const toggleNotifications = () =>
    setShowNotification(!showNotification)

  const { ref, isComponentVisible } = useComponentVisible(false)
  useEffect(() => {
    if (isComponentVisible) setShowNotification(true)
    else setShowNotification(false)
  }, [isComponentVisible])


  const handleLogout = () => {
    localStorage.removeItem('token')
    history.push('/login')
  }
  const handleGoToMessagePage = () => {
    history.push('/chat')
  }

  return (
    <>
      <Row gutter={[24, 0]}>
        <Col span={24} md={6}>
          <Breadcrumb>
            <Breadcrumb.Item>
              <NavLink to="/">Pages</NavLink>
            </Breadcrumb.Item>
            <Breadcrumb.Item style={{ textTransform: "capitalize" }}>
              {name.replace("/", " / ")}
            </Breadcrumb.Item>
          </Breadcrumb>
        </Col>
        <Col span={24} md={18} className="header-control">


          <Button
            type="link"
            className="sidebar-toggler"
            onClick={() => onPress()}
          >
            {toggler}
          </Button>
          <>
            <div className='header__action-notify' ref={ref}>
              <Badge style={{ cursor: 'pointer', fontSize: 10 }} count={notificationCount} onClick={toggleNotifications}>
                <Avatar style={{ cursor: 'pointer', background: '#F0F2F5' }} shape='circle' size='default' >
                  <i className="fa-solid fa-bell" style={{ cursor: 'pointer', fontSize: 18, color: '#192843' }}></i>
                </Avatar>
              </Badge>
              {console.log(showNotification, isComponentVisible)}
              {!showNotification && isComponentVisible && (
                <div className="header__action-notify-area">
                  <Notification notificationList={notificationList} />
                </div>
              )}
            </div>
            <div onClick={handleGoToMessagePage}>
              <Avatar style={{ cursor: 'pointer', background: '#F0F2F5' }} shape='circle' size='default' >
                <i className="fa-solid fa-comment-dots" style={{ fontSize: 18, color: '#192843' }} />
              </Avatar>
            </div>
          </>

          <Link to="/login" onClick={handleLogout} className="btn-sign-in">
            <span>Logout</span>
          </Link>

        </Col>
      </Row>
    </>
  );
}

export default Header;
