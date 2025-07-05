import React, { useEffect } from "react"
import rigoImageUrl from "../assets/img/rigo-baby.jpg";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { PhotoPage } from "../components/PhotoPage.jsx"
import { AboutUs } from "../components/AboutUs.jsx"
import { MapsUbication } from "../components/MapsUbication.jsx"

export const Home = () => {

	const { store, dispatch } = useGlobalReducer()
	
	useEffect(()=>{
	localStorage.clear()
	},[])


	return (
		<>
		<PhotoPage />
		<AboutUs />
		<MapsUbication />
		
		</>
	

	);
}; 