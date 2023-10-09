import { useState, useCallback, useEffect } from "react";
import {
  GoogleMap,
  useJsApiLoader,
  Marker,
  GoogleMapProps,
} from "@react-google-maps/api";
import { fethEvents } from "../services/eonet.services";
import { Event } from "../interfaces";
import CustomMarker from "../assets/images/wildfires.png";

export const HomePage = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const containerStyle = {
    width: "100%",
    height: "100%",
  };

  const center = {
    lat: -3.745,
    lng: -38.523,
  };
  const position = {
    lat: 33.2128,
    lng: -100.2617235,
  };
  // eslint-disable-next-line
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: import.meta.env.VITE_API_KEY_GOOGLE,
  });
  const onLoad = useCallback(function callback(map: google.maps.Map) {
    // This is just an example of getting and using the map instance!!! don't just blindly copy!
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);
    console.log(map);
    setMap(map);
  }, []);

  const onUnmount = useCallback(function callback() {
    setMap(null);
  }, []);

  useEffect(() => {
    fethEvents()
      .then((data) => setEvents(data.events))
      .catch((error) => {
        console.error("Erro ao buscar os eventos:", error);
      });
  }, []);

  const _renderMarkers = (eventMarker: Event) => {
    //console.log(eventMarker);
    const eventPosition: { lat: number; lng: number } = {
      lat: eventMarker.geometry[0].coordinates[1],
      lng: eventMarker.geometry[0].coordinates[0],
    };
    return (
      <Marker
        key={eventMarker.id}
        position={eventPosition}
        options={{ icon: CustomMarker }}
      />
    );
  };
  return (
    <main className="bg-dark-400 w-full h-screen flex justify-center items-center py-4">
      {isLoaded ? (
        <GoogleMap
          mapContainerStyle={containerStyle}
          onLoad={onLoad}
          onUnmount={onUnmount}
        >
          {events && events.map((eventMarker) => _renderMarkers(eventMarker))}
          <Marker position={position} />
        </GoogleMap>
      ) : (
        <div>
          <p> Carregando...</p>
        </div>
      )}
    </main>
  );
};
