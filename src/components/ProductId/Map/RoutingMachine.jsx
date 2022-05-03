import L from "leaflet";
import { createControlComponent } from "@react-leaflet/core";
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';
import "leaflet-routing-machine";

const createRoutineMachineLayer = (props) => {

    let leafletElment = L.Routing.control({
        waypoints: [
            L.latLng(props.start[0], props.start[1]),
            L.latLng(props.end[0], props.end[1])
        ],
        language: "pt-BR",
        lineOptions: {
            styles: [
                {
                    color: '#F0572D',
                },
            ],
        },
        // createMarker: function (i, waypoint, n) {
        //     const marker = L.marker(waypoint.latLng, {
        //         draggable: true,
        //         bounceOnAdd: false,
        //         bounceOnAddOptions: {
        //             duration: 1000,
        //             height: 800,
        //             function() {
        //                 (bindPopup(myPopup).openOn(map))
        //             }
        //         },
        //         icon: L.icon({
        //             iconUrl: 'https://w7.pngwing.com/pngs/548/724/png-transparent-yellow-pin-illustration-paper-drawing-pin-global-positioning-system-icon-yellow-pushpin-angle-orange-pin-thumbnail.png',
        //             iconSize: [38, 95],
        //             iconAnchor: [22, 94],
        //             popupAnchor: [-3, -76],
        //             shadowUrl: 'https://w7.pngwing.com/pngs/548/724/png-transparent-yellow-pin-illustration-paper-drawing-pin-global-positioning-system-icon-yellow-pushpin-angle-orange-pin-thumbnail.png',
        //             shadowSize: [68, 95],
        //             shadowAnchor: [22, 94]
        //         })
        //     });
        //     return marker;
        // }
    });
    return leafletElment;
}
const RoutingMachine = createControlComponent(createRoutineMachineLayer);
export default RoutingMachine