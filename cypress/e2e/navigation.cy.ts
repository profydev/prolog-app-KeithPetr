describe("Sidebar Navigation", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/dashboard");
  });

  context("desktop resolution", () => {
    beforeEach(() => {
      cy.viewport(1025, 900);
    });

    it("links are working", () => {
      // check that each link leads to the correct page
      cy.get("nav")
        .contains("Projects")
        .click()
        .url()
        .should("eq", "http://localhost:3000/dashboard")
        .get("h1")
        .contains("Projects");

      cy.get("nav")
        .contains("Issues")
        .click()
        .url()
        .should(
          "eq",
          "http://localhost:3000/dashboard/issues?page=1&status=&level=&project=",
        )
        .get("h1")
        .contains("Issues");

      cy.get("nav")
        .contains("Alerts")
        .click()
        .url()
        .should("eq", "http://localhost:3000/dashboard/alerts")
        .get("h1")
        .contains("Alerts");

      cy.get("nav")
        .contains("Users")
        .click()
        .url()
        .should("eq", "http://localhost:3000/dashboard/users")
        .get("h1")
        .contains("Users");

      cy.get("nav")
        .contains("Settings")
        .click()
        .url()
        .should("eq", "http://localhost:3000/dashboard/settings")
        .get("h1")
        .contains("Settings");

      cy.get("nav")
        .contains("Support")
        .should(
          "have.attr",
          "href",
          "mailto:support@prolog-app.com?subject=Support%20Request",
        );
    });

    it("is collapsible", () => {
      // collapse navigation
      cy.get("nav").contains("Collapse").click();

      // check that links still exist and are functionable
      cy.get("nav").find("a").should("have.length", 6).eq(1).click();
      cy.url().should(
        "eq",
        "http://localhost:3000/dashboard/issues?page=1&status=&level=&project=",
      );

      // check that text is not rendered
      cy.get("nav").contains("Issues").should("not.exist");
    });

    it("shows small logo when switching to landscape mode while navigation is collapsed", () => {
      cy.wait(2000);

      cy.get("nav").contains("Collapse").click();

      cy.wait(2000);

      cy.get('header img[src="/icons/logo-small.svg"]').should("be.visible");
      cy.get('img[src="/icons/logo-large.svg"]').should("not.be.visible");

      cy.viewport(900, 1025);

      cy.get('img[src="/icons/logo-large.svg"]').should("be.visible");
      cy.get('header img[src="/icons/logo-small.svg"]').should(
        "not.be.visible",
      );
    });
  });

  context("mobile resolution", () => {
    beforeEach(() => {
      cy.viewport("iphone-8");
    });

    function isInViewport(el: string) {
      cy.get(el).then(($el) => {
        // navigation should cover the whole screen
        const rect = $el[0].getBoundingClientRect();
        expect(rect.right).to.be.equal(rect.width);
        expect(rect.left).to.be.equal(0);
      });
    }

    function isNotInViewport(el: string) {
      cy.get(el).then(($el) => {
        // naviation should be outside of the screen
        const rect = $el[0].getBoundingClientRect();
        expect(rect.left).to.be.equal(-rect.width);
        expect(rect.right).to.be.equal(0);
      });
    }

    it("toggles sidebar navigation by clicking the menu icon", () => {
      // wait for animation to finish
      cy.wait(500);
      isNotInViewport("nav");

      // open mobile navigation
      cy.get("img[alt='open menu']").click();

      // wait for animation to finish
      cy.wait(500);
      isInViewport("nav");

      // check that all links are rendered
      cy.get("nav").find("a").should("have.length", 6);

      // Support button should be rendered but Collapse button not
      cy.get("nav").contains("Support").should("exist");
      cy.get("nav").contains("Collapse").should("not.be.visible");

      // close mobile navigation and check that it disappears
      cy.get("img[alt='close menu']").click();
      cy.wait(500);
      isNotInViewport("nav");
    });
  });
});
