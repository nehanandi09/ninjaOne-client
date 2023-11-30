/* eslint-disable no-undef */
import SearchBar from './index'

describe('<DeviceItem />', () => {

  beforeEach(() => {
    cy.mount(
      <SearchBar onChange={() => {}} />
    )
  })

  it('should render the search bar correctly', () => {
    cy.get('[data-testid="search-bar"]').should('exist')
    cy.get('svg').should('exist')
    cy.get('[placeholder="Search"]').should('exist')
  })

  it('should trigger the onChange event correctly', () => {
    const onChange = cy.stub().as('onChange')
    cy.mount(
      <SearchBar
        onChange={onChange}
      />
    )

    const searchTerm = 'example'
    cy.get('[placeholder="Search"]').type(searchTerm)
    cy.get('@onChange').should('have.been.calledWith', searchTerm)
  })

})