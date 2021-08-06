import styled from "styled-components";
import sponsors from "../assets/sponsors";

const SponsorContainer = () => {
  return (
    <Grid>
      <Image src={sponsors.Jaxa} />
      <Image src={sponsors.ASA} />
      <Image src={sponsors.OGL} />
      <Image src={sponsors.Osmocote} />
      <Image src={sponsors.CRKennedy} gridcol="1/3" />
      <Image src={sponsors.SIA} />
      <Image src={sponsors.NSWGovt} />
      <Image src={sponsors.AJA} gridcol="1/3" />
      <Image src={sponsors.AHIS} />
      <Image src={sponsors.AMDA} />
    </Grid>
  );
};

export default SponsorContainer;

const Image = styled.img`
  height: 150px;
  width: auto;
  min-width: 0;
  grid-column: ${props => props.gridcol};

  @media (max-width: 768px) {
    grid-column: auto;
    height: auto;
    max-height: 150px;
    width: 200px;
  }
`;

const Grid = styled.div`
  display: grid;
  justify-items: center;
  align-items: center;
  background-color: #fff;
  grid-row-gap: 1em;
  grid-template-columns: 1fr 1fr;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;
