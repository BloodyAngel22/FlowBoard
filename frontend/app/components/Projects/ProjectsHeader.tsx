import FlowBoardLogo from "../FlowBoardLogo";
import NewProjectSection from "./NewProjectSection";

export default function ProjectsHeader() {
  return (
    <>
      <div className="border-b border-zinc-800 bg-zinc-950/80 backdrop-blur-sm">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <FlowBoardLogo />
          <NewProjectSection />
        </div>
      </div>
    </>
  );
}
