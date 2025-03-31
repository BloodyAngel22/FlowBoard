import Navigation from "../Navigation";
import NewProjectSection from "./NewProjectSection";
import ProjectsTable from "./ProjectsTable";

export default function ProjectsPage() {
  return (
    <>
      <Navigation />
      <NewProjectSection />
      <ProjectsTable />
    </>
  );
}