import Index from "./Index"
import Notification from "./component/Notification";
import SetupLayer from "./SetupLayer";

export default function() {
  return (
    <SetupLayer>
      <Notification />
      <Index />
    </SetupLayer>
  )
}