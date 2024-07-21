// import React from "react";
// import { APIProvider, Map } from "@vis.gl/react-google-maps";

// const center = { lat: 5.5544395, lng: -0.1978991 };

// const Location = () => {
//   if (loadError) {
//     return <div>Error loading maps</div>;
//   }

//   if (!isLoaded) {
//     return <div>Loading maps</div>;
//   }

//   return (
//     <div className="hidden md:flex flex-col gap-2 bg-white rounded-lg px-4 shadow-md">
//       <div className="flex justify-between items-center">
//         <p className="text-lg font-semibold">Location</p>
//         <button className="bg-blue-600 p-1 px-3 text-white font-bold rounded-md text-sm hover:bg-blue-700">
//           View on Google Maps
//         </button>
//       </div>
//       <div className="h-64 w-full rounded-md">
//         <APIProvider
//           apiKey={""}
//           onLoad={() => console.log("Maps API has loaded.")}
//         >
//           <Map
//             defaultZoom={13}
//             defaultCenter={center}
//             onCameraChanged={(ev) =>
//               console.log(
//                 "camera changed:",
//                 ev.detail.center,
//                 "zoom:",
//                 ev.detail.zoom
//               )
//             }
//           ></Map>
//         </APIProvider>
//       </div>
//     </div>
//   );
// };

// export default Location;
