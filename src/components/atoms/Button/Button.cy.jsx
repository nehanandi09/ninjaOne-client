/* eslint-disable no-undef */

import Button from './index'

describe('Button', () => {
  const variations = [
    {
      variant: 'primary',
      expectedBackgroundColor: 'rgb(51, 122, 183)'
    },
    {
      variant: 'secondary',
      expectedBackgroundColor: 'rgb(255, 255, 255)'
    },
    {
      variant: 'danger',
      expectedBackgroundColor: 'rgb(213, 57, 72)'
    },
  ]

  beforeEach(() => {
    cy.mount(
      <Button
        text="Submit"
        variant="primary"
        onClick={() => {}}
        testId="button"
      />
    )
  })

  it('should render the button correctly', () => {
    cy.get('[data-testid="button"]').should('exist')
    cy.contains('Submit').should('exist')
  })

  variations.forEach((variation) => {
    it(`should have the correct background color for ${variation.variant} variant`, () => {
      cy.mount(
        <Button
          text="Submit"
          variant={variation.variant}
          onClick={() => {}}
          testId="button"
        />
      )

      cy.get('[data-testid="button"]')
        .should('have.css', 'background-color')
        .and('equal', variation.expectedBackgroundColor)
    })
  })

  it('should trigger the onClick event correctly', () => {
    const onClick = cy.stub().as('onClick')
    cy.mount(
      <Button
        text="Submit"
        variant="primary"
        onClick={onClick}
        testId="button"
      />
    )

    cy.get('[data-testid="button"]').click()
    cy.get('@onClick').should('have.been.called')
  })
})
