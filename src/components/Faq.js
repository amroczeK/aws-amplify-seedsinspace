import styled from "styled-components";
import React, { useState } from "react";
import Typography from "@material-ui/core/Typography";
import Collapse from "@material-ui/core/Collapse";

const AccordionPanel = ({ children, title }) => {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <AccordionHeader onClick={() => setOpen(o => !o)}>
        {title}
        <div style={{ textAlign: "end", flex: "1 0" }}>{open ? "-" : "+"}</div>
      </AccordionHeader>
      <Collapse in={open}>
        <AccordionContent>{children}</AccordionContent>
      </Collapse>
    </div>
  );
};

const FAQ = () => {
  return (
    <>
      <AccordionPanel title="Will aliens grow from the space seeds?">
        <StyledTypography>We don’t think so.</StyledTypography>
      </AccordionPanel>
      <AccordionPanel title="How do I submit our application?">
        <StyledTypography>Everyone must use the online submission form.</StyledTypography>
      </AccordionPanel>
      <AccordionPanel title="Who can participate?">
        <StyledTypography>
          This is open to all Australian schools or education institutions or home schools
          for students aged 3 – 25.
        </StyledTypography>
      </AccordionPanel>
      <AccordionPanel title="Can home-schooled students enter?">
        <StyledTypography>Absolutely!</StyledTypography>
      </AccordionPanel>
      <AccordionPanel title="When will the seeds be back?">
        <StyledTypography>
          On SpaceX 22 which is scheduled for a July 2021 splashdown.
        </StyledTypography>
      </AccordionPanel>
      <AccordionPanel title="Who do I contact if I have questions?">
        <StyledTypography>
          Send an email to {''}
          <a href="mailto: info@onegiantleapaustralia.com">
            info@onegiantleapaustralia.com
          </a>
        </StyledTypography>
      </AccordionPanel>
    </>
  );
};

const AccordionHeader = styled.h2`
  border: 1px solid green;
  padding: 1em;
  margin: 0;
  display: flex;
`;

const AccordionContent = styled.div`
  padding: 1em;
`;

const StyledTypography = styled(Typography)`
  font-weight: 550;
  text-decoration: none;
  margin: 10px;
`;

export default FAQ;
