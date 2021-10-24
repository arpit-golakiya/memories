import ReactMapGL, { Marker, Popup } from "react-map-gl";
import { useEffect, useState } from "react";
import { Room, Star, StarBorder } from "@material-ui/icons";
import { format } from "timeago.js";
import "./location.css";
import { createPin,getPins } from '../../actions/Pins';
import {useDispatch, useSelector} from "react-redux";

function Location() {
    const dispatch = useDispatch();
    const { pins, isLoading } = useSelector((state) => state?.pins);

    const [_pins, setPins] = useState([]);
    const [currentPlaceId, setCurrentPlaceId] = useState(null);
    const [newPlace, setNewPlace] = useState(null);
    const [title, setTitle] = useState(null);
    const [desc, setDesc] = useState(null);
    const [star, setStar] = useState(0);
    const [viewport, setViewport] = useState({
        latitude: 47.040182,
        longitude: 17.071727,
        zoom: 4,
    });
    const user = JSON.parse(localStorage.getItem('profile'));


    const handleMarkerClick = (id, lat, long) => {
        setCurrentPlaceId(id);
        setViewport({ ...viewport, latitude: lat, longitude: long });
    };

    const handleAddClick = (e) => {
        const [longitude, latitude] = e.lngLat;
        setNewPlace({
            lat: latitude,
            long: longitude,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newPin = {
            title,
            desc,
            rating: star,
            lat: newPlace.lat,
            long: newPlace.long,
        };
        try {
            dispatch(createPin({ ...newPin, name: user?.result?.name }));
            // dispatch(createPin({ new_pin: newPin }));

            // const res = await axios.post("/pins", newPin);
            // setPins([...pins, res.data]);
            // setNewPlace(null);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        const _getPins = async () => {
            try {
                // const _pins = dispatch(getPins);
                dispatch(getPins());
                // console.log('_pins---',_pins);
                // setPins(_pins.data);
            } catch (err) {
                console.log('err--',err);
            }
        };
        _getPins();
    }, []);

    return (
        <div style={{ height: "100vh", width: "100%" }}>
            <ReactMapGL
                {...viewport}
                mapboxApiAccessToken={"pk.eyJ1IjoiYXJwaXQtZ29sYWtpeWEiLCJhIjoiY2t0a2NhZHZiMWtrZjJwbXIza2plcjFudyJ9.04wtiw1UgaPU37hc5y696Q"}
                width="100%"
                height="100%"
                transitionDuration="200"
                // mapStyle="mapbox.country-boundaries-v1"
                onViewportChange={(viewport) => setViewport(viewport)}
                onDblClick={handleAddClick}
            >
                {pins.map((p) => (
                    <>
                        <Marker
                            latitude={Number(p.lat)}
                            longitude={Number(p.long)}
                            offsetLeft={-3.5 * viewport.zoom}
                            offsetTop={-7 * viewport.zoom}
                        >
                            <Room
                                style={{
                                    fontSize: 7 * viewport.zoom,
                                    color: "tomato",
                                    cursor: "pointer",
                                }}
                                onClick={() => handleMarkerClick(p._id, p.lat, p.long)}
                            />
                        </Marker>
                        {p._id === currentPlaceId && (
                            <Popup
                                key={p._id}
                                latitude={p.lat}
                                longitude={p.long}
                                closeButton={true}
                                closeOnClick={false}
                                onClose={() => setCurrentPlaceId(null)}
                                anchor="left"
                            >
                                <div className="card">
                                    <label>Place</label>
                                    <h4 className="place">{p.title}</h4>
                                    <label>Review</label>
                                    <p className="desc">{p.desc}</p>
                                    <label>Rating</label>
                                    <div className="stars">
                                        {Array(p.rating).fill(<Star className="star" />)}
                                    </div>
                                    <label>Information</label>
                                    <span className="username">
                    Created by <b>{p.username}</b>
                  </span>
                                    <span className="date">{format(p.createdAt)}</span>
                                </div>
                            </Popup>
                        )}
                    </>
                ))}
                {newPlace && (
                    <>
                        <Marker
                            latitude={newPlace.lat}
                            longitude={newPlace.long}
                            offsetLeft={-3.5 * viewport.zoom}
                            offsetTop={-7 * viewport.zoom}
                        >
                            <Room
                                style={{
                                    fontSize: 7 * viewport.zoom,
                                    color: "tomato",
                                    cursor: "pointer",
                                }}
                            />
                        </Marker>
                        <Popup
                            latitude={newPlace.lat}
                            longitude={newPlace.long}
                            closeButton={true}
                            closeOnClick={false}
                            onClose={() => setNewPlace(null)}
                            anchor="left"
                        >
                            <div>
                                <form id="location-form" onSubmit={handleSubmit}>
                                    <label>Title</label>
                                    <input
                                        placeholder="Enter a title"
                                        autoFocus
                                        onChange={(e) => setTitle(e.target.value)}
                                    />
                                    <label>Description</label>
                                    <textarea
                                        placeholder="Say us something about this place."
                                        onChange={(e) => setDesc(e.target.value)}
                                    />
                                    <label>Rating</label>
                                    <select onChange={(e) => setStar(e.target.value)}>
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                        <option value="4">4</option>
                                        <option value="5">5</option>
                                    </select>
                                    <button type="submit" className="submitButton">
                                        Add Pin
                                    </button>
                                </form>
                            </div>
                        </Popup>
                    </>
                )}
            </ReactMapGL>
        </div>
    );
}

export default Location;