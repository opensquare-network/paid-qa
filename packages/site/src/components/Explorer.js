import styled from "styled-components";

import Input from "@osn/common-ui/lib/styled/Input";
import TopicStatusSelect from "./TopicStatusSelect";
import AssetSelector from "./AssetSelector";
import { useDispatch, useSelector } from "react-redux";
import {
  filterAssetSelector,
  filterStatusSelector,
  setFilterAsset,
  setFilterStatus,
} from "store/reducers/topicSlice";

const Wrapper = styled.div`
  > :not(:first-child) {
    margin-top: 24px;
  }
`;

const TitleWrapper = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  > :first-child {
    font-family: "Montserrat";
    font-weight: bold;
    font-size: 36px;
    line-height: 36px;
  }
  > :nth-child(2) {
    font-weight: 600;
    font-size: 16px;
    line-height: 24px;
    color: #506176;
    margin-left: 40px;
  }
`;

const ContentWrapper = styled.div`
  padding: 24px;
  display: flex;
  background: #ffffff;
  border: 1px solid #f0f3f8;
  box-shadow: 0px 4px 31px rgba(26, 33, 44, 0.04),
    0px 0.751293px 3.88168px rgba(26, 33, 44, 0.03);
  > :not(:first-child) {
    margin-left: 20px;
  }
`;

const ItemWrapper = styled.div`
  :first-child {
    flex: 1 1 auto;
  }
  :not(:first-child) {
    flex: 0 0 243px;
  }
  > :first-child {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-weight: 600;
    font-size: 16px;
    line-height: 24px;
    > img {
      width: 24px;
      height: 24px;
    }
  }
  > :not(:first-child) {
    margin-top: 16px;
  }
`;

export default function Explorer() {
  const dispatch = useDispatch();
  const filterStatus = useSelector(filterStatusSelector);
  const filterAsset = useSelector(filterAssetSelector);
  const setAsset = (asset) => {
    dispatch(setFilterAsset(asset));
  };
  const setStatus = (status) => {
    dispatch(setFilterStatus(status));
  };
  console.log(filterStatus, filterAsset);

  return (
    <Wrapper>
      <TitleWrapper>
        <div>Explorer</div>
      </TitleWrapper>
      <ContentWrapper>
        <ItemWrapper>
          <div>
            <div>Search</div>
            <img src="/imgs/icons/search.svg" alt="" />
          </div>
          <Input placeholder="Search topic..." />
        </ItemWrapper>
        <ItemWrapper>
          <div>
            <div>Status</div>
            <img src="/imgs/icons/sort-by.svg" alt="" />
          </div>
          <TopicStatusSelect status={filterStatus} setStatus={setStatus} />
        </ItemWrapper>
        <ItemWrapper>
          <div>
            <div>Rewards</div>
            <img src="/imgs/icons/treasury.svg" alt="" />
          </div>
          <AssetSelector setAsset={setAsset} />
        </ItemWrapper>
      </ContentWrapper>
    </Wrapper>
  );
}
