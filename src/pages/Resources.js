import React, { useEffect, useState } from "react";
import Container from "@material-ui/core/Container";
import styled from "styled-components";
import { StyledLink } from "../components/styled-components/Links";
import { Storage } from "aws-amplify";

const resourceList = [
  "Dates of Germination.pdf",
  "Seed Entry.pdf",
  "Scientific Report.pdf",
  "Science Journal.pdf",
];

const getSignedURLs = () =>
  new Promise((resolve, reject) => {
    let promises = [];
    resourceList.forEach(e => {
      let promise = new Promise((resolve, reject) => {
        Storage.get(`documents/${e}`)
          .then(signedURL =>
            resolve({ title: `${e.replace(".pdf", "")} (PDF)`, signedURL })
          )
          .catch(error => reject(error));
      });
      promises.push(promise);
    });
    Promise.all(promises)
      .then(results => {
        resolve(results);
      })
      .catch(console.log);
  });

const Resources = () => {
  const [resources, setResources] = useState(null);

  useEffect(() => {
    getSignedURLs().then(r => {
      setResources(r);
    });
  }, [setResources]);

  // NOTE: process.env.REACT_APP_RESOURCE_URL is being pulled from .env in local development and AWS Amplify Environment Variables during build/deployment in amplify.yml in Amplify GUI
  return (
    <Container maxWidth="md">
      <ContentContainer>
        <h1>Classroom Resources</h1>
        <p>
          Here are some downloadable classroom resources that you can use to record data
          for your seeds.
        </p>
        {resources?.map(({ signedURL, title }, i) => (
          <>
            <StyledLink
              key={i}
              to={{
                pathname: signedURL,
              }}
              target="_blank"
            >
              {`${title}`}
            </StyledLink>
            <br />
          </>
        ))}
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
