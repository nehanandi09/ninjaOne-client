/* eslint-disable no-undef */
import { Provider } from 'react-redux'
import { store } from '../../../state/store'
import DeviceItem from './index'

describe('<DeviceItem />', () => {
  const device = {
    id: "e8okoP2l5",
    system_name: "DESKTOP-DUMB",
    type: "WINDOWS",
    hdd_capacity: "10"
  }

  beforeEach(() => {
    cy.mount(
      <Provider store={store}>
        <DeviceItem device={device} dataKey={device.id}/>
      </Provider>
    )
  })

  it('should render the componenet correctly', () => {
    cy.get('[data-testid="device-item"]').should('exist')
    cy.contains(device.system_name).should('exist')
    cy.contains(`Windows workstation - ${device.hdd_capacity} GB`).should('exist')
  })

  it('should toggle the options menu correctly', () => {
    cy.get('[data-testid="device-menu"]').should('not.exist')
    cy.get('[data-testid="device-menu-toggle"]').click()
    cy.get('[data-testid="device-menu"]').should('be.visible')
    cy.get('[data-testid="device-menu-toggle"]').click()
    cy.get('[data-testid="device-menu"]').should('not.exist')
  })
})