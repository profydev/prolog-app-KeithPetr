import { ProjectCard } from "../project-card";
import { LoadingIndicator } from "@features/ui";
import { useGetProjects } from "../../api/use-get-projects";
import styles from "./project-list.module.scss";

export function ProjectList() {
  const { data, isLoading, isError, error, refetch } = useGetProjects();

  if (isLoading) {
    return <LoadingIndicator />;
  }

  if (isError) {
    console.error(error);
    return (
      <div className={styles.errorContainer} data-cy="errorContainer">
        <div className={styles.error}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/icons/alert-circle.svg" alt="alert circle" />
          <div>There was a problem while loading the project data</div>
        </div>
        <button
          className={styles.button}
          data-cy="tryAgainButton"
          onClick={() => refetch()}
        >
          Try again
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/icons/arrow-right.svg" alt="arrow right" />
        </button>
      </div>
    );
  }

  return (
    <ul className={styles.list} data-cy="list">
      {data?.map((project) => (
        <li key={project.id}>
          <ProjectCard project={project} />
        </li>
      ))}
    </ul>
  );
}
