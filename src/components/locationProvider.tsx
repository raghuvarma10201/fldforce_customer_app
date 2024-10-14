import { Geolocation, PositionOptions } from "@capacitor/geolocation";
export const getCurrentLocation = async () => {
try {
    const position = await Geolocation.getCurrentPosition({enableHighAccuracy:false, maximumAge: 30000}); // cached location till 30 seconds 
    console.log("geoLocation ", position.coords);
    console.log("geoLocation ", position.coords.latitude);
    console.log("geoLocation ", position.coords.longitude);
    return position;
  } catch (e) {
    console.log("Geolocation Error or user not logged in.");
    return null;
  }
}