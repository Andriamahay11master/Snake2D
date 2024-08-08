import { Link } from "react-router-dom"
import { MenuType } from "../../models/MenuType"
import './menu.scss'

interface MenuProps {
    linkMenu: MenuType[]
}
export default function Menu({linkMenu} : MenuProps) {
    return (
        <div className="menu">
            <div className="menu-top">
                <div className="menu-title">
                    <h1>Snake 2D</h1>
                    <img className="menu-img" src="/snake.gif"/>
                </div>
            </div>
            <div className="menu-content">
               <ul className="menu-list">
                    {linkMenu.map((link, index) => <li key={index}><Link to={link.href}>{link.label}</Link></li>) }
                </ul> 
            </div>
        </div>
    )
}