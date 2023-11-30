/* eslint-disable no-undef */

import DeviceModal from './index'

describe('<DeviceModal />', () => {
  const device = {
    system_name: 'Device 1',
    type: 'WINDOWS',
    hdd_capacity: '256'
  }

  it('should render the modal correctly when editing a device', () => {
    cy.mount(
      <DeviceModal
        onCancelClick={() => {}}
        onSubmitClick={() => {}}
        device={device}
        testId="device-modal"
      />
    )

    cy.get('[data-testid="device-modal"]').should('exist')
    cy.contains('Edit device').should('exist')
    cy.get('[data-testid="name-input"]').should('have.value', device.system_name)
    cy.contains('[data-testid="type-input"]', 'Windows').should('exist')
    cy.get('[data-testid="capacity-input"]').should('have.value', device.hdd_capacity)
    cy.get('[data-testid="cancel-button"]')
      .contains('Cancel')
      .should('exist')
    cy.get('[data-testid="submit-button"]')
      .contains('Submit')
      .should('exist')
  })

  it('should render the modal correctly when adding a new device', () => {
    cy.mount(
      <DeviceModal
        onCancelClick={() => {}}
        onSubmitClick={() => {}}
        device={null}
        testId="device-modal"
      />
    )

    cy.get('[data-testid="device-modal"]').should('exist')
    cy.contains('Add device').should('exist')
    cy.get('[data-testid="name-input"]').should('have.value', '')
    cy.get('[data-testid="type-input"]').should('exist')
    cy.get('[data-testid="capacity-input"]').should('have.value', '')
    cy.get('button')
      .contains('Cancel')
      .should('exist')
    cy.get('button')
      .contains('Submit')
      .should('exist')
  })

  it('should trigger the onCancelClick event correctly', () => {
    const onCancelClick = cy.stub().as('onCancelClick')
    cy.mount(
      <DeviceModal
        onCancelClick={onCancelClick}
        onSubmitClick={() => {}}
        device={device}
        testId="device-modal"
      />
    )

    cy.get('[data-testid="cancel-button"]').click()
    cy.get('@onCancelClick').should('have.been.called')
  })

  it('should trigger the onSubmitClick event correctly', () => {
    const onSubmitClick = cy.stub().as('onSubmitClick')
    cy.mount(
      <DeviceModal
        onCancelClick={() => {}}
        onSubmitClick={onSubmitClick}
        device={device}
        testId="device-modal"
      />
    )

    cy.get('[data-testid="name-input"]').clear().type('New Device')
    cy.get('[data-testid="type-input"]').click()
    cy.contains('#react-select-5-option-2', 'Mac').click()
    cy.get('[data-testid="capacity-input"]').clear().type('512')
    cy.get('[data-testid="submit-button"]').click()
    cy.get('@onSubmitClick').should('have.been.calledWith', 'New Device', 'MAC', '512')
  })

  it('should disable the submit button when required fields are empty', () => {
    cy.mount(
      <DeviceModal
        onCancelClick={() => {}}
        onSubmitClick={() => {}}
        testId="device-modal"
      />
    )

    cy.get('[data-testid="submit-button"]').should('be.disabled')

    cy.get('[data-testid="name-input"] + small')
      .should('contain.text', 'This field is required!')
    cy.get('[data-testid="name-input"]').type('New Device')
    cy.get('[data-testid="submit-button"]').should('be.disabled')
    cy.get('[data-testid="name-input"] + small')
      .should('not.exist')

    cy.get('[data-testid="type-input"] + small')
      .should('contain.text', 'This field is required!')
    cy.get('[data-testid="type-input"]').click()
    cy.contains('#react-select-6-option-2', 'Mac').click()
    cy.get('[data-testid="submit-button"]').should('be.disabled')
    cy.get('[data-testid="type-input"] + small')
      .should('not.exist')
    
    cy.get('[data-testid="capacity-input"] + small')
      .should('contain.text', 'This field is required!')
    cy.get('[data-testid="capacity-input"]').type('512')
    cy.get('[data-testid="capacity-input"] + small')
      .should('not.exist')

    cy.get('[data-testid="submit-button"]').should('not.be.disabled')
  })
})