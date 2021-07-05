import styled from 'styled-components'
import React, {useState, useContext} from 'react'

const ToggleContext = React.createContext()

function Accordion({ children, ...restProps }){
  return (
    <Container {...restProps}>{children}</Container>
  )
}

//Frame, Item, Header, Title, Body
Accordion.Frame = ({ children, ...restProps }) => (
  <Frame {...restProps}> {children} </Frame>
)

Accordion.Item = function AccordionItem({ children, ...restProps }) {

  const [toggle, setToggle] = useState(false)

  return (
    <ToggleContext.Provider value={{ toggle, setToggle }}>
      <Item {...restProps}> {children} </Item>
    </ToggleContext.Provider>
  )
}

Accordion.Header = function AccordionHeader({ children, ...restProps }) {

  const {toggle, setToggle} = useContext(ToggleContext)

  return (
      <Header {...restProps} onClick={() => setToggle(!toggle)}>
        {children}
        {toggle ? <h1> - </h1> : <h1> + </h1>}
      </Header>
    )
}

Accordion.Title = function AccordionTitle({ children, ...restProps }) {
  return <Title {...restProps}> {children} </Title>
}

Accordion.Body = function AccordionBody({ children, ...restProps }) {

  const {toggle} = useContext(ToggleContext)

  return toggle ? <Body {...restProps}> {children} </Body> : null;
}

const faqs = [

    {
        "id": 1,
        "header": "Will aliens grow from the space seeds?",
        "body": "We don’t think so."
    },
    {
        "id": 2,
        "header": "How do I submit our application?",
        "body": "Everyone must use the online submission form."
    },
    {
        "id": 3,
        "header": "Who can participate?",
        "body": "This is open to all Australian schools or education institutions or home schools for students aged 3 – 25."
    },
    {
        "id": 4,
        "header": "Can home-schooled students enter?",
        "body": "Yes"
    },
    {
        "id": 5,
        "header": "When will the seeds be back?",
        "body": "On SpaceX 22 which is scheduled for a July 2021 splashdown."
    },
    {
      "id": 6,
      "header": "Who do I contact if I have questions?",
      "body": "Send an email to info@onegiantleapaustralia.com"
    }
]

export default function Faq() {
  return (
    <>
    <h1 style={{textAlign: 'center', margin: "40px"}}>FAQ</h1>
      <Accordion>
        {faqs.map( (item) => (
        <Accordion.Frame>
          <Accordion.Item>
            <Accordion.Header>
              <Accordion.Title>{item.header}</Accordion.Title>
            </Accordion.Header>
            <Accordion.Body>{item.body}</Accordion.Body>
          </Accordion.Item>
        </Accordion.Frame>
        ))}
      </Accordion>
    </>
  );
}


const Container = styled.div`
  width: 600px;
  border: 1px solid white;
  margin: 0 auto;
`

//Frame, Item, Header, Title, Body
const Frame = styled.div`
  border: 1px solid #358C5F;
`

const Item = styled.div`
  & {
    cursor: pointer;
  }
`

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0 1rem;
  align-items: center;
`

const Title = styled.h2`
  font-size: 25px;
  color: var(--color2);
`

const Body = styled.h3`
  padding: 1rem;
  border-top: 1px solid #6BBE93;
`