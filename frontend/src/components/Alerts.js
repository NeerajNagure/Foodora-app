import './Alerts.css';

function Alerts({style,options,message,close}){

    return(
        <>
        <div className={`alert alert--${options.type}`}>
            {message}
        </div>
        </>
    )
}

export default Alerts;
