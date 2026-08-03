import Bar from "./Bar";
import DanceFloor from "./DanceFloor";
import DJBooth from "./DJBooth";
import Entrance from "./Entrance";
import VenueWalls from "./VenueWalls";

function Venue({ children }) {
  return (
    <div className="venue">
      <VenueWalls />

      <Entrance />
      <DanceFloor />
      <Bar />
      <DJBooth />

      <div className="venue__tables">{children}</div>
    </div>
  );
}

export default Venue;
