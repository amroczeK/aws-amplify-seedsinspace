import styled from "styled-components";
import React, { useState } from "react";
import Container from "@material-ui/core/Container";

const AccordionPanel = ({ children, title }) => {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <AccordionHeader onClick={() => setOpen(o => !o)}>
        {title}
        <div style={{ textAlign: "end", flex: "1 0" }}>{open ? "-" : "+"}</div>
      </AccordionHeader>
      {open && <AccordionContent>{children}</AccordionContent>}
    </div>
  );
};

const FAQ = () => {
  return (
    <Container maxWidth="md">
      <h1 style={{ textAlign: "center", margin: "40px" }}>FAQ</h1>
      <AccordionPanel title="Will aliens grow from the space seeds?">
        <div>We don’t think so.</div>
      </AccordionPanel>
      <AccordionPanel title="How do I submit our application?">
        <div>Everyone must use the online submission form.</div>
      </AccordionPanel>
      <AccordionPanel title="Who can participate?">
        <div>
          This is open to all Australian schools or education institutions or home schools
          for students aged 3 – 25.
        </div>
      </AccordionPanel>
      <AccordionPanel title="Can home-schooled students enter?">
        <div>Absolutely!</div>
      </AccordionPanel>
      <AccordionPanel title="When will the seeds be back?">
        <div>On SpaceX 22 which is scheduled for a July 2021 splashdown.</div>
      </AccordionPanel>
      <AccordionPanel title="Who do I contact if I have questions?">
        <div>Send an email to info@onegiantleapaustralia.com</div>
      </AccordionPanel>
    </Container>
  );
};

const AccordionHeader = styled.h2`
  border: 1px solid green;
  padding: 1em;
  margin: 0;
  display: flex;
`;

const AccordionContent = styled.div`
  border: 1px solid green;
  padding: 1em;
`;

export default FAQ;
