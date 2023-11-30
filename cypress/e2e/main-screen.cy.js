/* eslint-disable no-undef */
import devices from '../fixtures/devices.json'

describe('MainScreen', () => {
  beforeEach(() => {
    cy.intercept('GET', 'http://localhost:3000/devices', devices)
    cy.visit('localhost:5173')
  })

  it('should render top components correctly', () => {
    cy.get('[data-testid="header"]')
      .should('exist')
      .and('be.visible')

    cy.get('[data-testid="add-button"]')
      .contains('Add device')
      .should('exist')
      .and('be.visible')

    cy.get('[data-testid="search-bar"]')
      .should('exist')
      .and('be.visible')

    cy.get('[data-testid="type-select"]')
      .should('exist')
      .and('be.visible')

    cy.get('[data-testid="sort-select"]')
      .should('exist')
      .and('be.visible')

    cy.get('[data-testid="refresh-icon"]')
      .should('exist')
      .and('be.visible')

    cy.get('device-modal').should('not.exist')
  })

  it('should render the correct number of devices', () => {
    cy.get('[data-testid="device-item"]').should('have.length', devices.length)
  })

  it('should filter devices by type', () => {
    // Testing for all devices
    cy.get('[data-testid="type-select"]').click()
    cy.contains('#react-select-2-option-0', 'All').click()
  
    cy.get('[data-testid="device-item"]').should('have.length', 12)
    cy.contains('div', 'All').parent().within(() => {
      cy.get('[role="button"]').click()
    })

    // Testing for Windows type
    cy.get('[data-testid="type-select"]').click()
    cy.contains('#react-select-2-option-1', 'Windows').click()
  
    cy.get('[data-testid="device-item"]').should('have.length', 6)
    cy.get('[data-testid="device-item"]')
      .contains('Windows workstation')
      .should('exist')
    cy.contains('div', 'Windows').parent().within(() => {
      cy.get('[role="button"]').click()
    })

    // Testing for Mac type
    cy.get('[data-testid="type-select"]').click()
    cy.contains('#react-select-2-option-2', 'Mac').click()

    cy.get('[data-testid="device-item"]').should('have.length', 4)
    cy.get('[data-testid="device-item"]')
      .contains('Mac workstation')
      .should('exist')
    cy.contains('div', 'Mac').parent().within(() => {
      cy.get('[role="button"]').click()
    })

    // Testing for Linux type
    cy.get('[data-testid="type-select"]').click()
    cy.contains('#react-select-2-option-3', 'Linux').click()

    cy.get('[data-testid="device-item"]').should('have.length', 2)
    cy.get('[data-testid="device-item"]')
      .contains('Linux workstation')
      .should('exist')
    cy.contains('div', 'Linux').parent().within(() => {
      cy.get('[role="button"]').click()
    })

    // Texting for multiple device types
    cy.get('[data-testid="type-select"]').click()
    cy.contains('#react-select-2-option-1', 'Windows').click()
    cy.get('[data-testid="type-select"]').click()
    cy.contains('#react-select-2-option-2', 'Mac').click()

    cy.get('[data-testid="device-item"]').should('have.length', 10)
    cy.get('[data-testid="device-item"]').should('contain', 'Windows workstation')
    cy.get('[data-testid="device-item"]').should('contain', 'Mac workstation')
  })

  it('should sort devices', () => {
    // Sort by HDD capacity descending
    cy.get('[data-testid="sort-select"]')
      .should('be.visible')
      .click()
    cy.contains('#react-select-3-option-1', 'HDD Capacity Descending').click()
    const order2 = [...devices].sort((a, b) => b.hdd_capacity - a.hdd_capacity)
    cy.get('[data-testid="device-item"]')
      .each(($deviceItem, index) => {
        const device = order2[index]
        cy.wrap($deviceItem)
          .contains(device.system_name)
          .should('exist')
      })

    // Sort by HDD capacity ascending
    cy.get('[data-testid="sort-select"]')
      .should('be.visible')
      .click()
    cy.contains('#react-select-3-option-2', 'HDD Capacity Ascending').click()

    const order1 = [...devices].sort((a, b) => a.hdd_capacity - b.hdd_capacity)
    cy.get('[data-testid="device-item"]')
      .each(($deviceItem, index) => {
        const device = order1[index]
        cy.wrap($deviceItem)
          .contains(device.system_name)
          .should('exist')
      })

    // Sort by Name ascending
    cy.get('[data-testid="sort-select"]')
      .should('be.visible')
      .click()
    cy.contains('#react-select-3-option-3', 'Name Ascending').click()
    const order3 = [...devices].sort((a, b) => a.system_name.localeCompare(b.system_name))
    cy.get('[data-testid="device-item"]')
      .each(($deviceItem, index) => {
        const device = order3[index]
        cy.wrap($deviceItem)
          .contains(device.system_name)
          .should('exist')
      })

    // Sort by Name descending
    cy.get('[data-testid="sort-select"]')
      .should('be.visible')
      .click()
    cy.contains('#react-select-3-option-4', 'Name Descending').click()
    const order4 = [...devices].sort((a, b) => b.system_name.localeCompare(a.system_name))
    cy.get('[data-testid="device-item"]')
      .each(($deviceItem, index) => {
        const device = order4[index]
        cy.wrap($deviceItem)
          .contains(device.system_name)
          .should('exist')
      })
  })

  it('should search for devices', () => {
    cy.get('[data-testid="search-bar"]')
      .type('MOON-SMART')
    //Filters fixture with specific text
    const filteredList = devices.filter(device => {
      let deviceName = device.system_name.toLowerCase()
      return deviceName.includes('MOON-SMART'.toLowerCase())
    })
    //Compares fixture with the rendered list
    cy.get('[data-testid="device-item"]')
      .should('have.length', filteredList.length)
      .each((device) => {
        //Checks if the rendered device items are really the only ones that contains that specific name
        cy.wrap(device)
          .contains('MOON-SMART')
      })
  })

})