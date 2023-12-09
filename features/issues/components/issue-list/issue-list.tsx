import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { ProjectLanguage } from "@api/projects.types";
import { useGetProjects } from "@features/projects";
import { useGetIssues } from "../../api/use-get-issues";
import { IssueRow } from "./issue-row";
import styles from "./issue-list.module.scss";
import { Issue } from "@api/issues.types";
import { LoadingIndicator } from "@features/ui";

export function IssueList() {
  const [filteredIssues, setFilteredIssues] = useState<Issue[]>([]);
  const router = useRouter();
  const page = Number(router.query.page || 1);
  const selectedStatus = router.query.status || "";
  const selectedLevel = router.query.level || "";
  const projectName = router.query.project || "";
  const navigateToPage = (newPage: number) =>
    router.push({
      pathname: router.pathname,
      query: {
        page: newPage,
        status: selectedStatus,
        level: selectedLevel,
        project: projectName,
      },
    });

  console.log("issue-list projectName: ", projectName);

  const issuesPage = useGetIssues(page);
  const projects = useGetProjects();
  const { items, meta } = issuesPage.data || {};

  console.log("issue-list items: ", items);

  const projectIdToLanguage = (projects.data || []).reduce(
    (prev, project) => ({
      ...prev,
      [project.id]: project.language,
    }),
    {} as Record<string, ProjectLanguage>,
  );

  useEffect(() => {
    // Check if projectName is not an empty string
    if (projectName.toString().trim() !== "") {
      // Update the filtered issues based on the project name
      const filtered = (items || []).filter((issue) =>
        projectIdToLanguage[issue.projectId].includes(
          projectName.toString().trim().toLowerCase(),
        ),
      );
      console.log("filtered: ", filtered);
      setFilteredIssues(filtered);
    } else {
      // If projectName is an empty string, show all items
      setFilteredIssues(items || []);
    }
  }, [items, projectName]);

  useEffect(() => {
    // Set the page number in the URL when the component mounts
    router.push({
      pathname: router.pathname,
      query: {
        page,
        status: selectedStatus,
        level: selectedLevel,
        project: projectName,
      },
    });
  }, []); // Empty dependency array to run only once when the component mounts

  console.log("filtered issues: ", filteredIssues);

  if (projects.isLoading || issuesPage.isLoading) {
    return <LoadingIndicator />;
  }

  if (projects.isError) {
    console.error(projects.error);
    return <div>Error loading projects: {projects.error.message}</div>;
  }

  if (issuesPage.isError) {
    console.error(issuesPage.error);
    return <div>Error loading issues: {issuesPage.error.message}</div>;
  }

  console.log("issue list items: ", projectIdToLanguage);

  return (
    <div className={styles.container}>
      <table className={styles.table}>
        <thead>
          <tr className={styles.headerRow}>
            <th className={styles.headerCell}>Issue</th>
            <th className={styles.headerCell}>Level</th>
            <th className={styles.headerCell}>Events</th>
            <th className={styles.headerCell}>Users</th>
          </tr>
        </thead>
        <tbody>
          {(filteredIssues || []).map((issue) => (
            <IssueRow
              key={issue.id}
              issue={issue}
              projectLanguage={projectIdToLanguage[issue.projectId]}
            />
          ))}
        </tbody>
      </table>
      <div className={styles.paginationContainer}>
        <div>
          <button
            className={styles.paginationButton}
            onClick={() => navigateToPage(page - 1)}
            disabled={page === 1}
          >
            Previous
          </button>
          <button
            className={styles.paginationButton}
            onClick={() => navigateToPage(page + 1)}
            disabled={page === meta?.totalPages}
          >
            Next
          </button>
        </div>
        <div className={styles.pageInfo}>
          Page <span className={styles.pageNumber}>{meta?.currentPage}</span> of{" "}
          <span className={styles.pageNumber}>{meta?.totalPages}</span>
        </div>
      </div>
    </div>
  );
}
