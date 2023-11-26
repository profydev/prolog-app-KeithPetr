import { axios } from "./axios";
import type { Issue } from "./issues.types";
import type { Page } from "@typings/page.types";

const ENDPOINT = "/issue";

export async function getIssues(
  page: number,
  options?: { signal?: AbortSignal },
  filters?: object,
) {
  console.log("Before API Call:", filters);
  const { data } = await axios.get<Page<Issue>>(ENDPOINT, {
    params: { page, ...filters },
    signal: options?.signal,
  });
  console.log("After API Call:", filters);
  console.log("After API Call Data:", data);
  return data;
}
