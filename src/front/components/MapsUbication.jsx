import { useEffect } from "react";

export const MapsUbication = () => {

    useEffect(() => {

        const map = new window.google.maps.Map(document.getElementById("mapa"), {
            center: { lat: -33.4569, lng: -70.6483 }, // Santiago
            zoom: 14,
        });

        new window.google.maps.Marker({
            position: { lat: -33.4569, lng: -70.6483 },
            map: map,
            title: "Antoja Pizzería",
        });
    }, []);

    return (
        <div className="container p-0 ">
            <div className="row col-12">
                <div className="text-start mt-5 text-dark">
                    <h2>Ubicación</h2>
                </div>
                <div id="mapa" style={{ width: "100%", height: "400px" }}></div>;
            </div>
        </div>
    )
};