import 'leaflet/dist/leaflet.css';
import './Map.sass';
import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from "react-leaflet";
import RoutingMachine from './RoutingMachine';
import { useCookies } from "react-cookie";
import Swal from "sweetalert2/dist/sweetalert2.js";
import React from 'react';

// function LocationMarker(props) {
//     const [position, setPosition] = useState(null)

//     const leafletIcon = L.icon({
//         iconUrl: "https://leafletjs.com/examples/custom-icons/leaflet-green.png",
//         iconSize: [28, 85]
//     })

//     const map = useMapEvents({
//         click() {
//             if (!props.coorsdProd)
//                 map.locate()
//         },
//         locationfound(e) {
//             if (!props.coorsdProd) {
//                 setPosition(e.latlng)
//                 map.flyTo(e.latlng, map.getZoom())
//             } else {
//                 setPosition(props.coorsdProd)
//                 map.flyTo(position, map.getZoom())
//             }
//         },
//     })

//     return position === null ? null : (
//         <Marker position={position} /* icon={leafletIcon}  */>
//             <Popup>{props.coorsdProd ? "Localização do produto no mapa!" : "Você está aqui!"}</Popup>
//         </Marker>
//     )
// }

const Map = (props) => {
    const [cookies] = useCookies();

    const [map, setMap] = useState(null);
    const [coords, setCoords] = useState(null);
    const [funcaoUser, setFuncaoUser] = useState("");
    const [prodCoords, setProdCoords] = useState([-20.613124, -46.053519]);

    const coordsDefault = [-20.613124, -46.053519];

    const Toast = Swal.mixin({
        toast: true,
        position: "top",
        showConfirmButton: false,
        timer: 2500,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.addEventListener("mouseenter", Swal.stopTimer);
            toast.addEventListener("mouseleave", Swal.resumeTimer);
        },
    });

    useEffect(() => {
        if (map && props.product) {
            if (funcaoUser === "ROLE_ADMIN") {
                map.flyTo(prodCoords, 13, {
                    duration: 4
                })
            }
            else {
                map.flyTo(coords, 13, {
                    duration: 4
                })
            }
        }
    }, [coords, prodCoords])


    useEffect(() => {
        if (cookies.permissoes)
            setFuncaoUser(cookies.permissoes[0])

        if (navigator.geolocation) {
            if (funcaoUser !== "ROLE_ADMIN")
                navigator.geolocation.getCurrentPosition(function (position) {
                    setCoords([position.coords.latitude, position.coords.longitude])
                    console.log(coords)
                })
            if (funcaoUser === "ROLE_ADMIN")
                navigator.geolocation.getCurrentPosition(function (position) {
                    setProdCoords([position.coords.latitude, position.coords.longitude])
                    console.log(coords)
                })
        } else
            Toast.fire({ icon: "warning", title: "Falha ao buscar sua localização. O navegador não tem suporte a API Geolocation" });

        if (props.product) {
            setProdCoords([props.product.latitude, props.product.longitude]);
        }
    }, [])

    return (
        <div className="map">
            <MapContainer
                center={coords ? coords : coordsDefault}
                zoom={13}
                style={{ width: '90vw', height: '60vh' }}
                whenCreated={map => setMap(map)}
            >
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>'
                />
                {funcaoUser !== "ROLE_ADMIN" && coords != null ?
                    <RoutingMachine start={coords} end={prodCoords} />
                    :
                    <Marker position={prodCoords} >
                        <Popup>{prodCoords ? "Localização do produto no mapa!" : "Você está aqui!"}</Popup>
                    </Marker>
                }
            </MapContainer>
        </div>
    );
};

export default Map;