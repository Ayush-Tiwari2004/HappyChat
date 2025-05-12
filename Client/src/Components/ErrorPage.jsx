import React from "react";
import { useNavigate, useRouteError } from "react-router-dom";

export const ErrorPage = () => {
    const error = useRouteError();
    const navigate = useNavigate();

    const handlebackbtn = () =>{
        navigate(-1);
    };
    
    if (error.status === 404) {
        return (
            <>

                <section className=" w-full flex justify-center">
                    <div className="flex flex-col items-center">
                        <div className="mb-5">
                            <figure>
                                <img src="https://cdn.dribbble.com/users/722246/screenshots/3066818/404-page.gif" alt="404 page" />
                            </figure>
                            <div className="text-center">
                                <h1 className="text-red-700">
                                    Sorry this page does not exist.
                                </h1>
                            </div>
                        </div>
                        <button className="bg-red-600 border-2 border-gray-700 text-xl rounded-md py-1 px-2 w-fit text-white"
                        onClick={handlebackbtn}>Go back</button>
                    </div>
                </section>
            </>
        )
    }
    console.log(error);
}