import React from "react";
import RegisterSection from "./RegisterSection";
import RegisterSectionForo from "./RegisterSectionForo";
import ExpoSpeakers from "./ExpoSpeakers";
import ExpoExplanation from "./ExpoExplanation";
import SponsorsLogos from "./SponsorsLogos";
import ExpoConferences from "./ExpoConferences";
import ForoConferences from "./ForoConferences";
import ExporSuccessCases from "./ExpoSuccessCases";
import ExpoMotivationalPhrase from "./ExpoMotivationalPhrase";
import ExpoRegister from "./ExpoRegister";

export default function Main() {
    return (
        <main>
            {/* <ExpoConferences /> */}
            <ForoConferences />
            {/* <ExpoSpeakers /> */}
            {/* <ExporSuccessCases /> */}
            {/* <RegisterSection /> */}
            <RegisterSectionForo />
            {/* <ExpoExplanation /> */}
            {/* <SponsorsLogos /> */}
            {/* <ExpoMotivationalPhrase /> */}
            {/* <ExpoRegister /> */}
        </main>
    );
}
