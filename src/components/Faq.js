import styled from "styled-components";
import React, { useState } from "react";
import Typography from "@material-ui/core/Typography";
import Collapse from "@material-ui/core/Collapse";

import { ArrowIosUpwardOutline } from "@styled-icons/evaicons-outline/ArrowIosUpwardOutline";
import { ArrowIosDownwardOutline } from "@styled-icons/evaicons-outline/ArrowIosDownwardOutline";

const AccordionPanel = ({ children, title }) => {
  const [open, setOpen] = useState(false);

  return (
    <AccordionContainer>
      <AccordionHeader onClick={() => setOpen(o => !o)}>
        {title}
        <div style={{ textAlign: "end", flex: "1 0" }}>
          {open ? (
            <ArrowIosUpwardOutline size="15" />
          ) : (
            <ArrowIosDownwardOutline size="15" />
          )}
        </div>
      </AccordionHeader>
      <Collapse in={open}>
        <AccordionContent>{children}</AccordionContent>
      </Collapse>
    </AccordionContainer>
  );
};

const FAQ = () => {
  return (
    <>
      <AccordionPanel title="Will aliens grow from the space seeds?">
        <StyledTypography>We don’t think so.</StyledTypography>
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
      <AccordionPanel title="Who do I contact if I have questions?">
        <StyledTypography>
          Send an email to {""}
          <a href="mailto: info@onegiantleapaustralia.com">
            info@onegiantleapaustralia.com
          </a>
        </StyledTypography>
      </AccordionPanel>
    </>
  );
};

const AccordionContainer = styled.div`
  border-bottom: 1px solid #cccccc;
  > * {
    &:first-of-type {
      border-top: 1px solid #cccccc;
    }
  }
`;

const AccordionHeader = styled.h2`
  padding: 1em;
  margin: 0;
  margin-top: -1px;
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
