import { Outlet } from "react-router-dom/dist"
import ScrollToTop from "../components/ScrollToTop"
import { Navbar } from "../components/Navbar"
import { Footer } from "../components/Footer"
import { Comment } from "./Comment"
import { CarouselProducts } from "../components/CarouselProducts"
import { AboutUs } from "../components/AboutUs"
import { Contacts } from "../components/Contacts"
import { MapsUbication } from "../components/MapsUbication"

// Base component that maintains the navbar and footer throughout the page and the scroll to top functionality.
export const Layout = () => {
    return (
        <ScrollToTop>
            <Navbar />
            <CarouselProducts />
            <AboutUs />
            <Contacts />
            <MapsUbication />
            <Footer />
        </ScrollToTop>
    )
}