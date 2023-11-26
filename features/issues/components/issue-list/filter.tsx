import { Select, SelectStatus } from "@features/ui/";
import { Input, InputStatus } from "@features/ui/";
import { NewButton } from "@features/ui/";
import styles from "./filter.module.scss";
import { useState, useEffect } from "react";
import { useGetIssues } from "../../api/use-get-issues";
import { useRouter } from "next/router";

export function Filter() {
  const selectOptions = ["-- Status -- ", "Open", "Resolved"];
  const levelOptions = ["-- Level --", "Error", "Warning", "Info"];

  // Use the useRouter hook to get the current page from the URL
  const router = useRouter();
  const page = Number(router.query.page || 1);

  const [statusSelectOpen, setStatusSelectOpen] = useState(false);
  const [levelSelectOpen, setLevelSelectOpen] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState("");
  const [selectedLevel, setSelectedLevel] = useState("");
  const [projectName, setProjectName] = useState("");

  const { refetch: refetchIssues } = useGetIssues(page, {
    status: selectedStatus.toLowerCase(),
    level: selectedLevel.toLowerCase(),
  });

  const handleToggleStatusSelect = () => {
    setStatusSelectOpen(!statusSelectOpen);
    setLevelSelectOpen(false); // Close the other Select
  };

  const handleToggleLevelSelect = () => {
    setLevelSelectOpen(!levelSelectOpen);
    setStatusSelectOpen(false); // Close the other Select
  };

  const handleStatusOption = (option: string) => {
    setSelectedStatus(option === "-- Status -- " ? "" : option);
    setStatusSelectOpen(false);
  };

  const handleLevelOption = (option: string) => {
    setSelectedLevel(option === "-- Level --" ? "" : option);
    setLevelSelectOpen(false);
  };

  const handleProjectNameChange = (value: string) => {
    setProjectName(value);
  };
  console.log(projectName);

  useEffect(() => {
    // Set initial values based on query parameters in the URL
    setSelectedStatus((router.query.status as string) || "");
    setSelectedLevel((router.query.level as string) || "");
  }, [router.query.status, router.query.level]);

  useEffect(() => {
    // Reset page to 1 and clear filters when the component mounts or refreshes
    if (selectedStatus || selectedLevel || projectName) {
      router.push({
        pathname: router.pathname,
        query: { page: 1 },
      });
    }
  }, [router.pathname, selectedStatus, selectedLevel, projectName]);

  useEffect(() => {
    // Reset page to 1 when the selected status or level changes
    router.push({
      pathname: router.pathname,
      query: {
        page: 1,
        status: selectedStatus,
        level: selectedLevel,
        project: projectName,
      },
    });
  }, [selectedStatus, selectedLevel, projectName]);

  useEffect(() => {
    refetchIssues();
  }, [selectedStatus, selectedLevel, projectName, page]);

  return (
    <div className={styles.container}>
      <NewButton
        showText={true}
        showIcon={true}
        icon={<img src="/icons/check.svg" alt="Icon" />}
        iconPosition={"left"}
      >
        Resolve Selected Issues
      </NewButton>
      <div className={styles.flex}>
        <Select
          name={selectOptions}
          status={statusSelectOpen ? SelectStatus.open : SelectStatus.empty}
          isOpen={statusSelectOpen}
          onClick={handleToggleStatusSelect}
          onSelectOption={handleStatusOption}
        >
          {selectedStatus || selectOptions[0]}
        </Select>
        <Select
          name={levelOptions}
          status={levelSelectOpen ? SelectStatus.open : SelectStatus.empty}
          isOpen={levelSelectOpen}
          onClick={handleToggleLevelSelect}
          onSelectOption={handleLevelOption}
        >
          {selectedLevel || levelOptions[0]}
        </Select>
        <Input
          status={InputStatus.empty}
          projectName={projectName}
          onChange={handleProjectNameChange}
        />
      </div>
    </div>
  );
}
