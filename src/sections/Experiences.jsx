import { Timeline } from "../components/Timeline";
import { experiences } from "../constants";

const Experiences = () => {
  return (
    <section
      id="experience"
      className="relative flex-wrap items-center justify-between py-0 -mt-4 sm:flex sm:space-y-0 overflow-hidden"
    >

      {/* Timeline Content */}
      <Timeline data={experiences} />
    </section>
  );
};

export default Experiences;
