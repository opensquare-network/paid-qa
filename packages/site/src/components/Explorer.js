import styled from "styled-components";
import { useEffect, useMemo, useState } from "react";
import debounce from "lodash.debounce";

import Input from "@osn/common-ui/lib/styled/Input";
import TopicStatusSelect from "./TopicStatusSelect";
import AssetSelector from "./AssetSelector";
import { useDispatch, useSelector } from "react-redux";
import {
  filterAssetSelector,
  filterStatusSelector,
  setFilterAsset,
  setFilterStatus,
  setFilterTitle,
} from "store/reducers/topicSlice";
import { MOBILE_SIZE } from "@osn/common/src/utils/constants";
import {
  h3_36_bold,
  p_16_semibold,
} from "@osn/common-ui/lib/styles/textStyles";
import FlexBetween from "@osn/common-ui/lib/styled/FlexBetween";
import MobileVisible from "@osn/common-ui/lib/styled/MobileVisible";

const Wrapper = styled.div`
  > :not(:first-child) {
    margin-top: 24px;
  }
`;

const TitleWrapper = styled(FlexBetween)`
  align-items: flex-end;
  > :first-child {
    ${h3_36_bold};
  }
  > :nth-child(2) {
    ${p_16_semibold};
    color: #506176;
    margin-left: 40px;
  }
`;

const ContentWrapper = styled.div`
  padding: 24px;
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  background: #ffffff;
  border: 1px solid #f0f3f8;
  box-shadow: 0px 4px 31px rgba(26, 33, 44, 0.04),
    0px 0.751293px 3.88168px rgba(26, 33, 44, 0.03);
  @media screen and (max-width: ${MOBILE_SIZE}px) {
    .mobile-invisible {
      display: none;
    }
  }
`;

const ItemWrapper = styled.div`
  :first-child {
    flex: 1 1 auto;
  }
  :not(:first-child) {
    flex: 0 0 243px;
    @media screen and (max-width: ${MOBILE_SIZE}px) {
      flex: 1 1 auto;
    }
  }
  > :first-child {
    display: flex;
    align-items: center;
    justify-content: space-between;
    ${p_16_semibold};
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
  const [collapsed, setCollapsed] = useState(true);

  useEffect(() => {
    return () => {
      //reset filter when leave home page
      dispatch(setFilterAsset("all"));
      dispatch(setFilterStatus("all"));
      dispatch(setFilterTitle(""));
    };
  }, [dispatch]);

  const setAsset = (asset) => {
    dispatch(setFilterAsset(asset));
  };
  const setStatus = (status) => {
    dispatch(setFilterStatus(status));
  };
  const debouncedSetTitle = useMemo(
    () => debounce((text) => dispatch(setFilterTitle(text)), 500),
    [dispatch]
  );

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
          <Input
            placeholder="Search topic..."
            onChange={(e) => debouncedSetTitle(e.target.value)}
          />
        </ItemWrapper>
        <ItemWrapper
          className={collapsed && "mobile-invisible"}
          style={{ zIndex: 11 }}
        >
          <div>
            <div>Status</div>
            <img src="/imgs/icons/sort-by.svg" alt="" />
          </div>
          <TopicStatusSelect status={filterStatus} setStatus={setStatus} />
        </ItemWrapper>
        <ItemWrapper className={collapsed && "mobile-invisible"}>
          <div>
            <div>Rewards</div>
            <img src="/imgs/icons/treasury.svg" alt="" />
          </div>
          <AssetSelector asset={filterAsset} setAsset={setAsset} />
        </ItemWrapper>
        <MobileVisible
          className={!collapsed && "mobile-invisible"}
          style={{ flexBasis: "100%" }}
        >
          <ItemWrapper
            onClick={() => {
              setCollapsed(false);
            }}
          >
            <div>
              <div>Filter</div>
              <img src="/imgs/icons/filter.svg" alt="" />
            </div>
          </ItemWrapper>
        </MobileVisible>
      </ContentWrapper>
    </Wrapper>
  );
}
