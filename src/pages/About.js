import Container from "@material-ui/core/Container";
import Logo from "../assets/logo.png";
import styled from "styled-components";
import FAQ from "../components/Faq";
import SponsorContainer from "../components/SponsorContainer";

const About = () => {
  return (
    <Container maxWidth="md">
      <ContentContainer>
        <LogoContainer>
          <StyledImg src={Logo}></StyledImg>
        </LogoContainer>
        <h1>About the program</h1>
        <p style={{ textAlign: "justify" }}>
          The ‘What’ll Happen to The Wattle??!’ (WHTW) project is the first official
          ‘Seeds in Space’ program for Australia. In collaboration with the Japan
          Aerospace Exploration Agency (JAXA), One Giant Leap Australia Foundation is
          supported by the Australian Space Agency (ASA) for this 2-year project.
        </p>
        <p style={{ textAlign: "justify" }}>
          The overall program – ‘Space Seed for Asian Future’ (SSAF) program is part of
          the overarching Kibo-ABC collaboration of countries in the Asia-Pacific. The
          Asian Herbs in Space (AHiS) is Mission 1. Australian schools and community
          groups have been invited to grow the sweet basil for JAXA as a ground control
          experiment and share the data collected.
        </p>
        <p style={{ textAlign: "justify" }}>
          WHTW is Mission 2. A number of Australian schools and community groups have been
          selected to grow the Golden Wattle seeds that have been to space and compare
          them to the ones that stayed on Earth but are from the same seed lot.
        </p>
        <p style={{ textAlign: "justify" }}>
          The Acacia Pycnantha (Golden Wattle) seeds were launched from Cape Kennedy on
          Monday 7th December 2020 at 3:39 am AEST on the SpaceX 21st Commercial Resupply
          Services (CRS-21) Launch. The seeds were on board the International Space
          Station for 6 months before returning to the USA on SpaceX 22 (CRS-22) 10th July
          1:30 pm AEST. Once there, they were sent back to JAXA and then sorted and
          forwarded to One Giant Leap Australia Foundation Headquarters for distribution
          to the groups participating in the WHTW project.
        </p>

        <h1>About the foundation</h1>
        <p style={{ textAlign: "justify" }}>
          The One Giant Leap Australia Foundation is a Not For Profit Organisation whose
          purpose is to advance STEM education and careers. We provide life changing
          opportunities for students and educators to develop and build their knowledge
          and understanding of Science, Technology, Engineering and Mathematics.
        </p>

        <h1>Frequently asked questions</h1>
        <FAQ />

        <br />
        <h1>Sponsors</h1>
        <SponsorContainer />
      </ContentContainer>
    </Container>
  );
};

export default About;

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1rem;
  width: 100%;
`;

const LogoContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const StyledImg = styled.img`
  width: 300px;
  height: auto;
  align-self: center;
  margin: 2em 0;
`;
