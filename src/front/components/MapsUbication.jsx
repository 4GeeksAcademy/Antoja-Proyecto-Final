import { useEffect } from "react";

export const MapsUbication = () => {

    useEffect(() => {

        const address = "Avenida Apoquindo 3000, Las Condes, Santiago, Chile";
        const apiKey = import.meta.env.VITE_GOOGLE_MAPS_KEY;

        fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${apiKey}`)
            .then(res => res.json())
            .then(data => {
                if (data.status === "OK") {
                    const location = data.results[0].geometry.location;

                    const map = new window.google.maps.Map(document.getElementById("mapa"), {
                        center: location,
                        zoom: 14,
                    });

                    new window.google.maps.Marker({
                        position: location,
                        map: map,
                        title: "Antoja Pizzería",
                    });
                } else {
                    console.error("No se pudo geocodificar la dirección:", data.status);
                }
            })
            .catch(err => {
                console.error("Error al obtener coordenadas:", err);
            });

    }, []);

    return (
        <div className="container-fluid container-ubication ">
            <div className="row justify-content-center">
                <div className="col-12 text-center mb-4">
                    <h2>Ubicación</h2>
                </div>
                <div className="col-12 px-4">
                    <div id="mapa" style={{
                        width: "100%",
                        height: "400px", 
                        borderRadius: "8px"
                    }}></div>;
                </div>
            </div>
        </div>
    )
};