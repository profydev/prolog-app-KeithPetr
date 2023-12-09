import mockProjects from "../fixtures/projects.json";
import { ProjectStatus } from "@api/projects.types";

describe("Project List", () => {
  const testFetchError = () => {
    describe("Project list - Error", () => {
      beforeEach(() => {
        // intercept request with error
        cy.intercept("GET", "https://prolog-api.profy.dev/project", {
          body: {},
          statusCode: 400,
        }).as("getProjectError");

        cy.visit("http://localhost:3000/dashboard");
      });

      it("error message displayed on failed request", () => {
        cy.wait(7000);

        cy.get("[data-cy=errorContainer]").should("be.visible");
      });

      it("data is successfully retrieved and displayed after inital error", () => {
        cy.wait(7000);

        cy.get("[data-cy=errorContainer]").should("be.visible");

        // intercept request with data
        cy.intercept("GET", "https://prolog-api.profy.dev/project", {
          fixture: "projects.json",
        }).as("getProjects");

        cy.get("[data-cy=tryAgainButton]").click();

        cy.wait("@getProjects");

        // check that data is displayed
        cy.get("[data-testid='project-list']")
          .find("li")
          .should("have.length", 3);
      });
    });
  };

  beforeEach(() => {
    // setup request mock
    cy.intercept("GET", "https://prolog-api.profy.dev/project", {
      fixture: "projects.json",
    });
    // open projects page
    cy.visit("http://localhost:3000/dashboard");
  });

  it("shows a loading indicator", () => {
    cy.get("[data-testid='loading-indicator']").should("be.visible");
    cy.get("[data-testid='project-list']").should("be.visible");
    cy.get("[data-testid='loading-indicator']").should("not.exist");
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
        const statusToText = {
          [ProjectStatus.info]: "Stable",
          [ProjectStatus.warning]: "Warning",
          [ProjectStatus.error]: "Critical",
        };

        cy.get("main li")
          .eq(index)
          .within(() => {
            cy.contains("[data-cy=name]", name);
            cy.contains("[data-cy=language]", languageNames[index]);
            cy.contains("[data-cy=numIssues]", numIssues);
            cy.contains("[data-cy=numEvents]", numEvents24h);
            cy.contains(
              "[data-cy=status]",
              statusToText[status as ProjectStatus],
            );
            cy.contains('a[href="/dashboard/issues"]', "issues");
          });
      });
    });

    testFetchError();
  });

  context("mobile resolution", () => {
    beforeEach(() => {
      cy.viewport("iphone-8");
    });
    testFetchError();
  });
});
