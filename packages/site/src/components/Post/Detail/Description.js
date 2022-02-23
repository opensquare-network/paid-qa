import styled from "styled-components";

const Wrapper = styled.div`
  > :first-child {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-weight: 600;
    font-size: 16px;
    line-height: 24px;
  }
  > :nth-child(2) {
    margin-top: 16px;
    font-size: 14px;
    line-height: 24px;
    color: #506176;
  }
`;

export default function Description() {
  return (
    <Wrapper>
      <div>
        <div>Description</div>
        <img src="/imgs/icons/ipfs.svg" alt="" />
      </div>
      <div>
        Viverra venenatis volutpat turpis vel viverra lectus amet justo. In
        luctus fermentum enim ut nulla metus. Suscipit id tortor, sit facilisis.
        Massa, ut mattis elementum tellus, viverra ut adipiscing. Non platea id
        habitant vel morbi mollis consectetur. Tristique velit facilisis nullam
        porttitor accumsan mattis in sed est. Adipiscing in lacus, viverra
        pellentesque vestibulum condimentum enim non auctor. Ullamcorper quis
        viverra commodo, odio interdum ullamcorper nunc porta. In mauris nunc
        felis diam at suspendisse sed amet egestas.
      </div>
    </Wrapper>
  );
}
