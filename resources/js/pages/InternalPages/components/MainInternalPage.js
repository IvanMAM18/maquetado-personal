import React from 'react'
import RegisterForm from './RegisterForm'
import InternalPageHeader from './InternalPageHeader'
import ExpoExplanation from "../../Home/components/ExpoExplanation";

export default function MainInternalPage() {
    return (
        <main className='main-internal-page container'>
            <InternalPageHeader />
            {/* <RegisterForm /> */}
            <ExpoExplanation />
        </main>
    )
}
