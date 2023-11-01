import { version } from "../../package.json";

describe("Footer Navigation", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/dashboard");
  });

  context("Desktop resolution", () => {
    beforeEach(() => {
      cy.viewport(1025, 900);
    });

    it("displays the version", () => {
      cy.get("footer")
        .find("p")
        .should("be.visible")
        .contains(`Version: ${version}`);
    });

    it("contains 4 anchor elements with appropriate text", () => {
      cy.wait(1000);
      cy.get("footer") // Select the footer element
        .find("a") // Find all anchor elements within the footer
        .should("have.length", 4) // Ensure there are 4 anchor elements
        .each(($el, index) => {
          // Use each() to iterate through the anchor elements
          const expectedText = ["Docs", "API", "Help", "Community"];
          cy.wrap($el).should("contain", expectedText[index]); // Check the text of each anchor
        });
    });

    it("logo exists and is visible", () => {
      cy.get("footer").find("img").should("be.visible");
    });
  });
});
