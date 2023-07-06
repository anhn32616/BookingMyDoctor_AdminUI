import React from 'react'
import './index.scss'
import { markNotificationAsRead } from '../../utils/firebase/NotificationFb'
import { formatRelative } from 'date-fns/esm'


function formatDate(seconds) {
    let formattedDate = '';

    if (seconds) {
        formattedDate = formatRelative(new Date(seconds), new Date());
        // Capitalize first letter AnhNT282
        formattedDate =
            formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1);
    }
    return formattedDate;
}

function NotificationItem({ notify }) {
    const handleNotifyItemClick = async (id) => {
        await markNotificationAsRead(id)
        window.location = '/appointment'

    }
    return <li className="notification__list-item" onClick={() => { handleNotifyItemClick(notify.id) }}>
        <div className="notification__list-item-img">
        </div>
        <div className="notification__list-item-content">
            {notify.message}
            <div className='notification__list-item-time'>
                <i className="fa-solid fa-clock"></i> {formatDate(notify.dateCreated)}
            </div>
        </div>
        <div>
            {!notify.read && (<i className="fa-solid fa-circle" style={{ color: "#0a60f5" }} />)}
        </div>
    </li>
}

export default NotificationItem
