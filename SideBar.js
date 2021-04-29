import React, {userEvent} from "react";
import "./Sidebar.css";
import SidebarRow from "./SidebarRow";
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import AccessibilityIcon from '@material-ui/icons/Accessibility';
import GroupIcon from '@material-ui/icons/Group';
import ModeCommentIcon from '@material-ui/icons/ModeComment';
import MoreIcon from '@material-ui/icons/More';
import MovieIcon from '@material-ui/icons/Movie';

function Sidebar() {
    return (
    <div className="sidebar">
        <SidebarRow src="https://unimailwinchesterac-my.sharepoint.com/personal/d_farr_19_unimail_winchester_ac_uk/Documents/Microsoft%20Teams%20Chat%20Files/Alt%20Logo.png" title="Fashion Winchester"/>
        <SidebarRow Icon={MonetizationOnIcon} title="COVID-19 Information Centre"/>
        <SidebarRow Icon={AccessibilityIcon} title="Pages"/>
        <SidebarRow Icon={GroupIcon} title="Friends"/>
        <SidebarRow Icon={ModeCommentIcon} title="Messenger"/>
        <SidebarRow Icon={MoreIcon} title="Marketplace"/>
        <SidebarRow Icon={MovieIcon} title="Videos"/>
      
        
    </div>
    );
}

export default Sidebar;