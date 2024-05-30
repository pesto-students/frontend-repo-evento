import CreateEventView from "@/components/manager/views/CreateEventView";
import { CreateEventProvider } from "@/context/manager/CreateEventContext";

const Page = () => {
  return (
    <CreateEventProvider>
      <CreateEventView />
    </CreateEventProvider>
  );
};

export default Page;
