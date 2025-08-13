import './NavBar.css'
import { Button } from '../'
export const NavBar = ({texts, changeLanguage}) => {

    return (
        <nav className="navbar">
            <div className="navbar__logo">
                <h1>Task Manager</h1>
            </div>

            <ul className="navbar__links">
                <li><a href="/">{texts.home}</a></li>
                <li><a href="/tasks">{texts.tasks}</a></li>
            </ul>

            <div className="navbar__actions">
                <Button label={texts.buttons.spanish} parentMethod={() => changeLanguage('es')} />
                <Button label={texts.buttons.english} parentMethod={() => changeLanguage('en')} />
            </div>
        </nav>
    )
}