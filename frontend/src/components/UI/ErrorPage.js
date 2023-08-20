import FooterAll from "./FooterAll";
import HeaderHome from "./HeaderHome";
import { useRouteError } from "react-router-dom";

function ErrorPage(){
    const error=useRouteError();
    let title='An error occurred!';
    let message='Something went wrong!';
    if(error.status===401){
        message=error.data.message;
    }
    if(error.status===404){
        title='Not found!';
        message='Could not find resource or page';
    }
    return(
        <>
       <HeaderHome/>
       <h1 style={{color:"rgb(219, 57, 84)",
                    textAlign:"center"}}>{title}</h1>
       <h2 style={{color:"rgb(219, 57, 84)",
                   textAlign:"center"}}>{message}</h2>
       <FooterAll/>
       </>
    )
}

export default ErrorPage;