/* eslint-disable no-undef */
import SelectInput from './index'

describe('<SelectInput />', () => {
  const options = [
    { label: 'Option 1', value: 'option1' },
    { label: 'Option 2', value: 'option2', isDisabled: true },
    { label: 'Option 3', value: 'option3' },
    { label: 'Option 4', value: 'option4' },
  ]

  beforeEach(() => {
    cy.mount(
      <SelectInput
        label="Select Option"
        options={options}
        onChange={() => {}}
        value=""
        testId="select-input"
      />
    )
  })

  it('should render the select input correctly', () => {
    cy.get('[data-testid="select-input"]').should('exist')
    cy.contains('Select Option:').should('exist')
    cy.get('[data-testid="select-input"]').click()
    options.forEach((option, index) => {
      cy.contains(`#react-select-2-option-${index}`, option.label)
        .should('exist')
    });
  })

  it('should trigger the onChange event correctly', () => {
    const onChange = cy.stub().as('onChange')
    cy.mount(
      <SelectInput
        label="Select Option"
        options={options}
        onChange={onChange}
        value=""
        testId="select-input"
      />
    )

    cy.get('[data-testid="select-input"]').click()
    cy.contains('#react-select-4-option-2', 'Option 3').click()
    cy.get('@onChange').should('have.been.calledWith', {
      label: 'Option 3', value: 'option3'
    })
  })
})