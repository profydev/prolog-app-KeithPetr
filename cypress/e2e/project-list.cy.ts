import capitalize from "lodash/capitalize";
import mockProjects from "../fixtures/projects.json";

describe("Project List", () => {
  const testLoadingImage = () => {
    it("displays the loading image when the data is loading", () => {
      cy.intercept("GET", "https://prolog-api.profy.dev/project", {
        fixture: "projects.json",
        delayMs: 2000,
      }).as("getProjects");
      cy.reload();
      cy.get("[data-cy=loadingImg]").should("be.visible");
      cy.wait("@getProjects");
      cy.get("[data-cy=loadingImg]").should("not.exist");
    });
  };

  beforeEach(() => {
    // setup request mock
    cy.intercept("GET", "https://prolog-api.profy.dev/project", {
      fixture: "projects.json",
    }).as("getProjects");

    // open projects page
    cy.visit("http://localhost:3000/dashboard");

    // wait for request to resolve
    cy.wait("@getProjects");
  });

  context("desktop resolution", () => {
    beforeEach(() => {
      cy.viewport(1025, 900);
    });

    it("renders the projects", () => {
      const languageNames = ["React", "Node.js", "Python"];

      // get all project cards
      cy.get("main").find("li").should("have.length", mockProjects.length);

      mockProjects.forEach((project, index) => {
        // check that project data is rendered
        const { name, numIssues, numEvents24h, status } = project;

        const getStatusText = (status: string) =>
          status === "info"
            ? "stable"
            : status === "error"
            ? "critical"
            : "warning";

        cy.get("main li")
          .eq(index)
          .within(() => {
            cy.contains("[data-cy=name]", name);
            cy.contains("[data-cy=language]", languageNames[index]);
            cy.contains("[data-cy=numIssues]", numIssues);
            cy.contains("[data-cy=numEvents]", numEvents24h);
            cy.contains("[data-cy=status]", capitalize(getStatusText(status)));
            cy.contains('a[href="/dashboard/issues"]', "issues");
          });
      });
    });

    testLoadingImage();
  });

  context("mobile resolution", () => {
    beforeEach(() => {
      cy.viewport("iphone-8");
    });
    testLoadingImage();
  });
});
