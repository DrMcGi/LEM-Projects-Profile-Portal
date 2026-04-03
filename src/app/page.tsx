import { existsSync } from "node:fs";
import path from "node:path";
import { ProjectsProfileExperience } from "@/components/projects-profile-experience";

function resolvePublicAsset(relativePath: string) {
  const absolutePath = path.join(process.cwd(), "public", relativePath);
  return existsSync(absolutePath) ? `/${relativePath.replaceAll("\\", "/")}` : null;
}

export default function HomePage() {
  const logoPath = resolvePublicAsset(path.join("logos", "LEM-Projects_Logo.png"));
  const profilePdfPath =
    resolvePublicAsset(path.join("documents", "LEM-Company-Profile.pdf")) ??
    resolvePublicAsset(path.join("documents", "lem-projects-business-profile.pdf"));

  return <ProjectsProfileExperience logoPath={logoPath} profilePdfPath={profilePdfPath} />;
}
