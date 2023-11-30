/* eslint-disable no-undef */

describe('Modals', () => {
  beforeEach(() => {
    cy.visit('localhost:5173')
  })

  it('should open add device modal and cancel creation', () => {
    // Checks if the cancel button at create device modal works
    cy.get('[data-testid="add-button"]').click()
    cy.get('[data-testid="device-modal"]').should('be.visible')
    cy.get('button')
      .contains('Cancel')
      .click()
    cy.get('[data-testid="device-modal"]').should('not.exist')
  })

  it('should open add device modal and create a new device', () => {
    // Checks if the device creation is working
    cy.get('[data-testid="add-button"]').click()
    cy.get('[data-testid="device-modal"]').should('be.visible')
    cy.get('[data-testid="name-input"]').type('GABS-PC')
    cy.get('[data-testid="type-input"]').click()
    cy.contains('#react-select-4-option-1', 'Windows').click()
    cy.get('[data-testid="capacity-input"]').type('128')
    cy.get('button')
      .contains('Submit')
      .click()
    cy.get('[data-testid="device-modal"]').should('not.exist')
    cy.get('[data-testid="device-item"]')
      .should('contain', 'GABS-PC')
      .should('contain', 'Windows workstation')
  })
  
  it('should open edit device modal and cancel operation', () => {
    cy.get('[data-testid="device-item"]')
      .filter(':contains("GABS-PC"):contains("Windows workstation"):contains("128 GB")')
      .first()
      .find('[data-testid="device-menu-toggle"]')
      .click()

    cy.get('[data-testid="device-menu"]').should('be.visible')
    cy.get('div')
      .contains('Edit')
      .click()
    cy.get('[data-testid="edit-modal"]').should('be.visible')
    //Checks for input with the device values
    cy.get('[data-testid="name-input"]')
      .should('have.value', 'GABS-PC')
    cy.get('[data-testid="type-input"]')
      .should('contain', 'Windows')
    cy.get('[data-testid="capacity-input"]')
      .should('have.value', '128')

    cy.get('button')
      .contains('Cancel')
      .click()
    cy.get('[data-testid="edit-modal"]').should('not.exist')
  })

  it('should open edit device modal and confirm operation', () => {
    cy.get('[data-testid="device-item"]')
    .filter(':contains("GABS-PC"):contains("Windows workstation"):contains("128 GB")')
    .first()
    .find('[data-testid="device-menu-toggle"]')
    .click()

    cy.get('[data-testid="device-menu"]').should('be.visible')
    cy.get('div')
      .contains('Edit')
      .click()
    cy.get('[data-testid="edit-modal"]').should('be.visible')
    //Checks for input with the device values
    cy.get('[data-testid="name-input"]')
      .type('NEW-GABS-PC')
    cy.get('[data-testid="type-input"]')
      .click()
    cy.contains('#react-select-4-option-3', 'Linux').click()
    cy.get('[data-testid="capacity-input"]')
      .type('256')
    cy.get('button')
      .contains('Submit')
      .click()

    cy.get('[data-testid="edit-modal"]').should('not.exist')

    cy.get('[data-testid="device-item"]')
      .should('contain', 'NEW-GABS-PC')
      .and('contain', 'Linux workstation')
      .and('contain', '256 GB')
      .should('exist')
  })

  it('should open delete modal and cancel deletion', () => {
    // Checks if the cancel button at delete modal works
    cy.get('[data-testid="device-menu-toggle"]')
      .first()
      .click()
    cy.get('[data-testid="device-menu"]').should('be.visible')
    cy.get('div')
      .contains('Delete')
      .click()
    cy.get('[data-testid="delete-modal"]').should('be.visible')
    cy.get('button')
      .contains('Cancel')
      .click()
    cy.get('[data-testid="delete-modal"]').should('not.exist')
  })

  it('should open delete modal and confirm deletion', () => {
    let deletedDeviceKey = ''
  
    cy.get('[data-testid="device-item"]').first().then((deviceItem) => {
      deletedDeviceKey = deviceItem.attr('data-key')
    })

    // Checks if the device is deleted
    cy.get('[data-testid="device-menu-toggle"]')
      .first()
      .click()
    cy.get('[data-testid="device-menu"]').should('be.visible')
    cy.get('div')
      .contains('Delete')
      .click()
    cy.get('[data-testid="delete-modal"]').should('be.visible')
    cy.get('button')
      .contains('Delete')
      .click()
    cy.get('[data-testid="delete-modal"]').should('not.exist')
    cy.get(`[data-key="${deletedDeviceKey}"]`).should('not.exist')
  })
})