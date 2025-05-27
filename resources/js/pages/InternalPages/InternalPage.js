import React from "react";
import Header from "../../components/layouts/Header";
import Footer from "../../components/layouts/Footer";
import MainInternalPage from "./components/MainInternalPage";

export default function InternalPage() {
    const getInternalPage = (pageName) => {
        switch (pageName) {
            case "page_1":
                return <Page1></Page1>;

            default:
                <NotFoundPage></NotFoundPage>;
        }
    };
    return (
        <>
            <Header />
            <MainInternalPage />
            <Footer />
        </>
    );
}
