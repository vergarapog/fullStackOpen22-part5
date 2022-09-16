describe("Blog app", () => {
  beforeEach(function () {
    cy.request("POST", "http://localhost:3003/api/testing/reset")
    const user = {
      username: "root",
      name: "root",
      password: "root",
    }
    const user2 = {
      username: "root2",
      name: "root2",
      password: "root2",
    }
    cy.request("POST", "http://localhost:3003/api/users", user)
    cy.request("POST", "http://localhost:3003/api/users", user2)

    cy.visit("http://localhost:3000")
  })

  it("Login form is shown", function () {
    cy.contains("Login")
  })

  describe("Login", function () {
    it("succeeds with correct credentials", function () {
      cy.contains("Login").click()
      cy.get("#username").type("root")
      cy.get("#password").type("root")
      cy.get("#loginButton").click()

      cy.contains("Add Blog")
    })

    it("fails with incorrect credentials", function () {
      cy.contains("Login").click()
      cy.get("#username").type("roots")
      cy.get("#password").type("roots")
      cy.get("#loginButton").click()

      cy.contains("Wrong Credentials")
      cy.get("html").should("not.contain", "Add Blog")
    })
  })

  describe("When logged in", function () {
    beforeEach(function () {
      cy.login({ username: "root", password: "root" })
    })

    it("A blog can be added", function () {
      cy.contains("Add Blog").click()

      cy.get("#title").type("first title")
      cy.get("#author").type("first author")
      cy.get("#url").type("first url")
      cy.get("#createBlog").click()

      cy.contains("first title")
    })

    describe.only("A blog", function () {
      beforeEach(function () {
        cy.createBlog({
          title: "first blog",
          author: "first author",
          url: "first url",
        })
        cy.createBlog({
          title: "second blog",
          author: "second author",
          url: "second url",
        })
        cy.createBlog({
          title: "third blog",
          author: "third author",
          url: "third url",
          likes: 3,
        })
      })

      it("can be liked", function () {
        cy.contains("second blog").parent().find("button").click()
        cy.contains("like").click()
        cy.contains("Likes: 1")
      })

      it("can be deleted by the user that owns it", function () {
        // cy.contains("Add Blog").click()

        // cy.get("#title").type("fourth blog")
        // cy.get("#author").type("fourth author")
        // cy.get("#url").type("fourth url")
        // cy.get("#createBlog").click()

        // cy.contains("fourth blog")

        cy.contains("third blog by third author")
          .parent()
          .find("button")
          .click()
        cy.contains("Remove").click()

        cy.get("html").should("not.contain", "third blog")
      })

      it("cannot be deleted by the user who doesn't own it", function () {
        cy.contains("Logout").click()

        cy.contains("Login").click()
        cy.get("#username").type("root2")
        cy.get("#password").type("root2")
        cy.get("#loginButton").click()

        cy.contains("third blog by third author")
          .parent()
          .find("button")
          .click()

        cy.get("#removeButton").should("have.css", "display", "none")
      })

      it.only("list should be displayed according to the blog with the highest likes", function () {
        cy.get(".blog-title").eq(0).should("contain", "third blog")
        cy.get(".blog-title").eq(1).should("contain", "first blog")
      })
    })
  })
})
