import styled from "styled-components";

import Container from "@osn/common-ui/lib/styled/Container";
import User from "components/Profile/User";
import Tabs from "./Tabs";
import { MOBILE_SIZE } from "@osn/constants";
import {
  p_14_normal,
  p_16_semibold,
} from "@osn/common-ui/lib/styles/textStyles";
import FlexCenter from "@osn/common-ui/lib/styled/FlexCenter";
import Tooltip from "@osn/common-ui/lib/Tooltip";

const Wrapper = styled.div`
  background: #ffffff;
  border-bottom: solid 1px #f0f3f8;
  padding-top: 40px;
  @media screen and (max-width: ${MOBILE_SIZE}px) {
    padding-top: 20px;
  }
`;

const ContentWrapper = styled.div`
  > :not(:first-child) {
    margin-top: 32px;
  }
  > :nth-child(1) {
    flex-wrap: wrap;
    justify-content: center;
  }
  > :nth-child(2) {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
  }
`;

const AboutWrapper = styled(FlexCenter)`
  margin-top: 16px;
  padding-bottom: 4px;
  > * {
    display: flex;
    align-items: flex-start;
    > :nth-child(2) {
      margin-left: 8px;
      > :first-child {
        display: flex;
        align-items: center;
        > :first-child {
          margin-right: 4px;
        }
        ${p_16_semibold};
      }
      > :nth-child(2) {
        ${p_14_normal};
        color: #506176;
        margin-top: 1px;
      }
    }
    &:not(:first-child)::before {
      content: "";
      align-self: center;
      width: 1px;
      height: 20px;
      background: #e2e8f0;
      margin: 0 20px;
    }
  }
`;

export default function Header({ network, address, tab, setTab, overview }) {
  return (
    <Wrapper>
      <Container>
        <ContentWrapper>
          <div>
            <User network={network} address={address} />
            <AboutWrapper>
              <div>
                <img src="/imgs/icons/promise.svg" alt="" />
                <div>
                  <div>
                    <span>Promises</span>
                    <Tooltip
                      content={`Promised ${
                        overview?.promisesCount || 0
                      }, Kept ${overview?.fulfilledPromiseCount || 0}`}
                      size="fit"
                    >
                      <div>
                        <FlexCenter>
                          <img src="/imgs/icons/info.svg" alt="" />
                        </FlexCenter>
                      </div>
                    </Tooltip>
                  </div>
                  <div>
                    {overview?.fulfilledPromiseCount || 0}/
                    {overview?.promisesCount || 0}
                  </div>
                </div>
              </div>
              <div>
                <img src="/imgs/icons/treasury.svg" alt="" />
                <div>
                  <div>
                    <span>Rewards</span>
                    <Tooltip
                      content={`Received ${overview?.rewardsCount || 0} funds`}
                      size="fit"
                    >
                      <div>
                        <FlexCenter>
                          <img src="/imgs/icons/info.svg" alt="" />
                        </FlexCenter>
                      </div>
                    </Tooltip>
                  </div>
                  <div>{overview?.rewardsCount || 0}</div>
                </div>
              </div>
            </AboutWrapper>
          </div>
          <div>
            <Tabs value={tab} setValue={setTab} overview={overview} />
          </div>
        </ContentWrapper>
      </Container>
    </Wrapper>
  );
}
