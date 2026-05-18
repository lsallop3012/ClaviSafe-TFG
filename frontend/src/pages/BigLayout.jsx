import Footer from "../components/footer"
import Header from "../components/header"
import {Outlet} from "react-router-dom"
import style from "./bigLayout.module.css"

function BigLayout() {
    return (
        <div className={style.BigLayout}>
            <Header />
            <Outlet />
            <Footer />
        </div>
    )
}

export default BigLayout;