import React from "react";
import Container from "@material-ui/core/Container";
import styled from "styled-components";
import { StyledLink } from "../components/styled-components/Links";

const Resources = () => {
  return (
    <Container maxWidth="md">
      <ContentContainer>
        <h1>Classroom Resources</h1>
        <p>
          Here are some downloadable classroom resources that you can use to record data
          for your seeds.
        </p>
        <StyledLink
          to={{
            pathname:
              "https://seeds-in-space-app.s3.ap-southeast-2.amazonaws.com/public/documents/Dates+of+Germination.pdf",
          }}
          target="_blank"
        >
          Dates of Germination (PDF)
        </StyledLink>
        <br />
        <StyledLink
          to={{
            pathname:
              "https://seeds-in-space-app.s3.ap-southeast-2.amazonaws.com/public/documents/Seed+Entry.pdf",
          }}
          target="_blank"
        >
          Seed Entry (PDF)
        </StyledLink>
        <br />
        <StyledLink
          to={{
            pathname:
              "https://seeds-in-space-app.s3.ap-southeast-2.amazonaws.com/public/documents/Scientific+Report.pdf",
          }}
          target="_blank"
        >
          Scientific Report (PDF)
        </StyledLink>
        <br />
        <StyledLink
          to={{
            pathname:
              "https://seeds-in-space-app.s3.ap-southeast-2.amazonaws.com/public/documents/Science+Journal.pdf",
          }}
          target="_blank"
        >
          Science Journal (PDF)
        </StyledLink>
        <br />
        <br />
        <h1>Useful Information</h1>
        <StyledLink
          to={{
            pathname: "https://iss.jaxa.jp/en/kuoa/ssaf/2020.html",
          }}
          target="_blank"
        >
          AHiS Portal Site
        </StyledLink>
        <br />
        <StyledLink
          to={{
            pathname:
              "https://www.theseedcollection.com.au/blog/our-blog/how-scarification-brings-stubborn-slow-germinating/",
          }}
          target="_blank"
        >
          Scarification
        </StyledLink>
        <br />
        <StyledLink
          to={{
            pathname:
              "https://www.gardeningknowhow.com/ornamental/trees/acacia/acacia-seed-propagation.htm",
          }}
          target="_blank"
        >
          Tips for Planting and Growing Seeds
        </StyledLink>
        <br />
        <StyledLink
          to={{
            pathname:
              "https://hilo.hawaii.edu/affiliates/prism/documents/lesson6seedgermination.pdf",
          }}
          target="_blank"
        >
          Seed Germination Activity #1 (PDF)
        </StyledLink>
        <br />
        <StyledLink
          to={{
            pathname: "https://www.biologycorner.com/worksheets/germination.html",
          }}
          target="_blank"
        >
          Seed Germination Activity #2
        </StyledLink>
      </ContentContainer>
    </Container>
  );
};

export default Resources;

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1rem;
  width: 100%;
`;
