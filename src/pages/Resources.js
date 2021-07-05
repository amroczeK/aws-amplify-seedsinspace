import React from "react";
import Container from "@material-ui/core/Container";
import styled from "styled-components";

const Resources = () => {
  return (
    <Container maxWidth="md">
      <ContentContainer>
        <h1>Resources Page</h1>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam quis condimentum
          erat. In dignissim euismod tortor a sodales. Pellentesque non porta turpis.
          Morbi urna orci, ullamcorper quis pretium a, imperdiet vitae est. Morbi placerat
          nisl vitae erat facilisis, quis dapibus enim ultrices. Quisque sodales commodo
          nibh sed consequat. Morbi eu mi lacus. Suspendisse pretium arcu sed eros
          pulvinar, vitae imperdiet dui auctor. Nam vel massa venenatis, efficitur nibh
          ut, venenatis odio. Phasellus tincidunt odio a velit malesuada dignissim.
        </p>
        <p>
          Vestibulum tempus odio ut lectus pharetra finibus. Donec ut diam id augue
          lacinia rutrum. Ut porta et augue a egestas. Donec at nisi volutpat justo
          consectetur lobortis vitae sagittis mauris. Praesent efficitur ante massa, eget
          efficitur metus accumsan ac. Ut mattis porttitor dui at rhoncus. In quis rutrum
          nunc, vel consequat odio. In ut ultrices dui. Cras convallis at enim id
          ultricies. Phasellus venenatis ac mi non eleifend. Nullam dignissim orci a
          convallis scelerisque. Phasellus ornare interdum sapien, gravida facilisis augue
          imperdiet non. Nam tincidunt quis sapien venenatis laoreet.
        </p>
        <p>
          Donec venenatis velit sed porta vestibulum. Phasellus quis porta ante. Etiam
          ultrices interdum ante, eu elementum velit sagittis quis. Mauris mollis lectus a
          nulla condimentum, nec tempus orci lacinia. In quis massa maximus, sodales augue
          et, fermentum quam. Curabitur ex ligula, scelerisque vel nulla eget, vulputate
          convallis elit. Proin sagittis ut nisl in egestas. Maecenas consectetur arcu sed
          vulputate maximus. Aliquam consectetur libero pulvinar nisl aliquam, a viverra
          dolor tempor. Sed sodales nisl metus, non consectetur ligula vulputate vel.
          Maecenas in mattis nibh. Phasellus sit amet efficitur eros. Curabitur quis
          lectus venenatis arcu scelerisque facilisis a ut libero.
        </p>
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