import styled from "styled-components";
import sponsors from "../assets/sponsors";

const SponsorContainer = () => {
  return (
    <Grid>
      <Image src={sponsors.Jaxa} />
      <Image src={sponsors.ASA} />
      <Image src={sponsors.OGL} />
      <Image src={sponsors.Osmocote} />
      <Image src={sponsors.CRKennedy} style={{ gridColumn: "1/3" }} />
      <Image src={sponsors.SIA} />
      <Image src={sponsors.NSWGovt} />
      <Image src={sponsors.AJA} style={{ gridColumn: "1/3" }} />
      <Image src={sponsors.AHIS} />
      <Image src={sponsors.AMDA} />
    </Grid>
  );
};

export default SponsorContainer;

const Image = styled.img`
  max-height: 150px;
  width: auto;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  justify-items: center;
  background-color: #fff;
`;
