import mockIssues1 from "../fixtures/issues-page-1.json";
import mockIssues2 from "../fixtures/issues-page-2.json";
import mockIssues3 from "../fixtures/issues-page-3.json";

describe("Issue List", () => {
  beforeEach(() => {
    // setup request mocks
    cy.intercept("GET", "https://prolog-api.profy.dev/project", {
      fixture: "projects.json",
    });
    cy.intercept(
      "GET",
      "https://prolog-api.profy.dev/issue?page=1&status=&level=",
      {
        fixture: "issues-page-1.json",
      },
    );
    cy.intercept(
      "GET",
      "https://prolog-api.profy.dev/issue?page=2&status=&level=",
      {
        fixture: "issues-page-2.json",
      },
    );
    cy.intercept(
      "GET",
      "https://prolog-api.profy.dev/issue?page=3&status=&level=",
      {
        fixture: "issues-page-3.json",
      },
    );

    // open issues page
    cy.visit(`http://localhost:3000/dashboard/issues`);
  });

  it("shows a loading indicator", () => {
    cy.get("[data-testid='loading-indicator']").should("be.visible");
    cy.get("[data-testid='issue-list']").should("be.visible");
    cy.get("[data-testid='loading-indicator']").should("not.exist");
  });

  context("desktop resolution", () => {
    beforeEach(() => {
      cy.viewport(1200, 900);
      // set button aliases
      cy.get("button").contains("Previous").as("prev-button");
      cy.get("button").contains("Next").as("next-button");
    });

    it("renders the issues", () => {
      cy.contains("Page 1 of 3");

      const issues = mockIssues1.items;
      cy.get("main")
        .find("tbody")
        .find("tr")
        .each(($el, index) => {
          const issue = issues[index];
          const firstLineOfStackTrace = issue.stack.split("\n")[1].trim();
          cy.wrap($el).get('[data-cy="issues-name"]').contains(issue.name);

          cy.wrap($el)
            .get('[data-cy="issues-message"]')
            .contains(issue.message);

          cy.wrap($el)
            .get('[data-cy="issues-numEvents"]')
            .contains(issue.numEvents);

          cy.wrap($el)
            .get('[data-cy="issues-numUsers"]')
            .contains(issue.numUsers);

          cy.wrap($el)
            .get('[data-cy="issues-stackTrace"]')
            .contains(firstLineOfStackTrace);
        });
    });

    it("paginates the data", () => {
      // test first page
      cy.contains("Page 1 of 3");
      cy.get("@prev-button").should("have.attr", "disabled");

      // test navigation to second page
      cy.get("@next-button").click();
      cy.get("@prev-button").should("not.have.attr", "disabled");
      cy.contains("Page 2 of 3");
      cy.get("tbody tr:first").contains(mockIssues2.items[0].message);

      // test navigation to third and last page
      cy.get("@next-button").click();
      cy.get("@next-button").should("have.attr", "disabled");
      cy.contains("Page 3 of 3");
      cy.get("tbody tr:first").contains(mockIssues3.items[0].message);

      // test navigation back to second page
      cy.get("@prev-button").click();
      cy.get("@next-button").should("not.have.attr", "disabled");
      cy.contains("Page 2 of 3");
      cy.get("tbody tr:first").contains(mockIssues2.items[0].message);
    });

    it("reverts to page 1 after reload", () => {
      cy.get("@next-button").click();
      cy.contains("Page 2 of 3");

      cy.reload();
      cy.get("[data-testid='loading-indicator']").should("be.visible");
      cy.get("[data-testid='loading-indicator']").should("not.exist");
      cy.contains("Page 1 of 3");
    });
  });
});
