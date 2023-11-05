import capitalize from "lodash/capitalize";
import mockProjects from "../fixtures/projects.json";

describe("Project List", () => {
  const testLoadingImage = () => {
    it("displays the spinner when the data is loading", () => {
      cy.intercept("GET", "https://prolog-api.profy.dev/project", {
        fixture: "projects.json",
        delayMs: 2000,
      });
      cy.visit(`http://localhost:3000/dashboard`);
      cy.get("[data-cy=loadingImg]").should("be.visible");
      cy.get("[data-cy=loadingImg]").should("not.exist");
    });
  };

  const testFetchError = () => {
    beforeEach(() => {
      cy.visit("http://localhost:3000/dashboard");
    });
    it("reloads data when 'Try again' button is clicked after an error", () => {
      // Intercept the API request and force it to return an error
      cy.intercept("GET", "https://prolog-api.profy.dev/project", {
        body: {},
        statusCode: 400, // Simulate an error response
      }).as("getProjectsError");

      cy.wait(6000);

      // Verify that the error container is displayed
      cy.get("[data-cy=errorContainer]").should("be.visible");

      // intercept request with data
      cy.intercept("GET", "https://prolog-api.profy.dev/project", {
        fixture: "projects.json",
      }).as("getProjects");

      // Click the "Try again" button
      cy.get("[data-cy=tryAgainButton]").click();

      // Wait for the request to resolve after clicking the button
      cy.wait("@getProjects");

      // Verify that the data is loaded (assuming it's visible on success)
      cy.get("[data-cy=list]").find("li").should("have.length", 3);
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
    testFetchError();
  });

  context("mobile resolution", () => {
    beforeEach(() => {
      cy.viewport("iphone-8");
    });
    testLoadingImage();
    testFetchError();
  });
});
