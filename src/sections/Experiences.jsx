import { Timeline } from "../components/Timeline";
import { experiences } from "../constants";

const Experiences = () => {
  return (
    <section
      id="experience"
      className="relative w-full overflow-hidden"
    >
      <Timeline data={experiences} />
    </section>
  );
};

export default Experiences;
