/* eslint-disable no-undef */

import DeleteModal from './index'

describe('<DeleteModal />', () => {
  const deviceName = 'Device 1'

  it ('should render the delete modal correctly', () => {
    cy.mount(
      <DeleteModal
        deviceName={deviceName}
        onDeleteClick={() => {}}
        onCancelClick={() => {}}
      />
    )

    cy.get('[data-testid="delete-modal"]')
      .should('exist')
    cy.contains('Delete Device?')
      .should('exist')
    cy.contains(`You are about to delete the device ${deviceName}. This action cannot be undone.`)
      .should('exist')
  })

  it('should trigger the onCancelClick event correctly', () => {
    const onCancelClick = cy.stub().as('onCancelClick')
    cy.mount(
      <DeleteModal
        deviceName={deviceName}
        onDeleteClick={() => {}}
        onCancelClick={onCancelClick}
      />
    )

    cy.get('button')
      .contains('Cancel')
      .click()
    cy.get('@onCancelClick')
      .should('have.been.called')
  })
  
  it('should trigger the onDeleteClick event correctly', () => {
    const onDeleteClick = cy.stub().as('onDeleteClick')
    cy.mount(
      <DeleteModal
        deviceName={deviceName}
        onDeleteClick={onDeleteClick}
        onCancelClick={() => {}}
      />
    )

    cy.get('button')
      .contains('Delete')
      .click()
    cy.get('@onDeleteClick').should('have.been.called')
  })
})