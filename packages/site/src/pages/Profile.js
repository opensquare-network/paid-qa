import { useEffect, useState } from "react";
import styled from "styled-components";

import Header from "components/Profile/Header";
import Container from "@osn/common-ui/lib/styled/Container";
import { useParams } from "react-router";
import serverApi from "../services/serverApi";
import { newErrorToast } from "../store/reducers/toastSlice";
import { useDispatch } from "react-redux";
import FundsList from "../components/Profile/FundsList";
import RewardsList from "../components/Profile/RewardsList";
import ProfileDataList from "../components/Profile/ProfileDataList";

const ContentWrapper = styled.div`
  margin: 20px 0;
  .markdown-content {
    max-width: initial;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
`;

export default function Profile() {
  const { network, address } = useParams();
  const dispatch = useDispatch();
  const [tab, setTab] = useState("promises");
  const [overview, setOverview] = useState();

  useEffect(() => {
    serverApi
      .fetch(`/network/${network}/address/${address}`)
      .then(({ result, error }) => {
        setOverview(result);
        if (error) {
          dispatch(newErrorToast(error?.message || "Failed to load profile"));
        }
      });
  }, [dispatch, network, address]);

  return (
    <div>
      <Header
        network={network}
        address={address}
        tab={tab}
        setTab={setTab}
        overview={overview}
      />
      <Container>
        <ContentWrapper>
          <ProfileDataList tab={tab} network={network} address={address} />

          {tab === "funds" && <FundsList network={network} address={address} />}
          {tab === "rewards" && (
            <RewardsList network={network} address={address} />
          )}
        </ContentWrapper>
      </Container>
    </div>
  );
}
