import { Link } from 'react-router-dom';
import './FooterAll.css';

const FooterAll=()=>{
    return (
        <footer>
    <div className="logo">
        <img src={require("./../img/foodora-logo.jpeg")}/>
    </div>
    <div className="support">
        <p className="supp">Support</p>
        <p className='sup'>Who are we?</p>
        <p className='sup'>Mail us at foodalix@xyz.com</p>
        <p className='sup'>Phone-(+91) 123456789</p>
        <p className='sup'>Help</p>
    </div>
    <div className="legal">
        <p className="supp">Legal</p>
        <p>Terms & Conditions</p>
        <p>Privacy Policy</p>
        <p>Refund & Cancellation</p>
        <p>Report fraud</p>
    </div>
    <div>
        <p className="supp">Account</p>
        <p><Link to='/signupUser' className='account'>Create account</Link></p>
        <Link to='/loginUser' className='account'>Sign In</Link>
    </div>
</footer>
    )
}

export default FooterAll;