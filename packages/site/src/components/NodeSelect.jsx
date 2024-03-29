import styled, { css } from "styled-components";
import { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useWindowSize, useOnClickOutside } from "@osn/common/utils/hooks.js";
import {
  setCurrentNode,
  chainNodesSelector,
  activeChainNodeSelector,
} from "store/reducers/nodeSlice";
import { DEFAULT_NODES } from "utils/constants";
import Flex from "@osn/common-ui/es/styled/Flex";
import FlexCenter from "@osn/common-ui/es/styled/FlexCenter";

const Wrapper = styled.div`
  position: relative;
`;

const SmallSelect = styled(FlexCenter)`
  width: 40px;
  height: 40px;
  border: 1px solid #e2e8f0;
  padding: 8px;
  cursor: pointer;
  > img {
    width: 24px;
    height: 24px;
  }
`;

const Select = styled(Flex)`
  border: 1px solid #e0e4eb;
  border-radius: 4px;
  height: 38px;
  padding: 0 12px;
  cursor: pointer;
  font-weight: 500;
  font-size: 14px;
  line-height: 100%;
  > :not(:first-child) {
    margin-left: 8px;
  }
  > div {
    flex-grow: 1;
  }
  > img.signal {
    width: 24px;
    height: 24px;
    flex: 0 0 24px;
  }
`;

const Options = styled.div`
  background: #ffffff;
  box-shadow: 0px 6px 22px rgba(30, 33, 52, 0.11),
    0px 1.34018px 4.91399px rgba(30, 33, 52, 0.0655718),
    0px 0.399006px 1.46302px rgba(30, 33, 52, 0.0444282);
  border-radius: 4px;
  position: absolute;
  right: 0;
  margin-top: 4px;
  padding: 8px 0;
  width: 100%;
  z-index: 1;
  ${(p) =>
    p.small &&
    css`
      width: auto;
      min-width: 192px;
    `}
`;

const Item = styled(Flex)`
  padding: 6px 12px;
  font-weight: 500;
  font-size: 14px;
  line-height: 100%;
  cursor: pointer;
  white-space: nowrap;
  color: #506176;
  :hover {
    background: #f6f7fa;
  }
  > img {
    width: 24px;
    height: 24px;
  }
  > :not(:last-child) {
    margin-right: 8px;
  }
  .delay {
    margin-left: auto;
    color: ${(p) => p.color};
  }
  ${(p) =>
    p.active &&
    css`
      color: #1e2134;
      background: #f6f7fa;
    `}
`;

export default function NodeSelect({ small, chain }) {
  const [show, setShow] = useState(false);
  const ref = useRef();
  const windowSize = useWindowSize();
  const currentNode = useSelector(activeChainNodeSelector(chain));
  const nodes = useSelector(chainNodesSelector(chain));

  const [currentNodeSetting, setCurrentNodeSetting] = useState(
    DEFAULT_NODES[chain],
  );
  const dispatch = useDispatch();

  useOnClickOutside(ref, () => setShow(false));

  useEffect(() => {
    if (small && windowSize.width && windowSize.width <= 768) {
      setShow(false);
    }
  }, [small, windowSize]);

  useEffect(() => {
    if (currentNode) {
      const nodeSetting = (nodes || []).find(
        (item) => item.url === currentNode,
      );
      setCurrentNodeSetting(nodeSetting);
    }
  }, [currentNode, nodes]);

  const getSignalImg = (delay) => {
    if (!delay || isNaN(delay)) return "signal-default.png";
    if (delay >= 300) return "signal-slow.png";
    if (delay >= 100) return "signal-medium.png";
    return "signal-fast.png";
  };

  const getSignalColor = (delay) => {
    if (!delay || isNaN(delay)) return "#C2C8D5";
    if (delay >= 300) return "#F44336";
    if (delay >= 100) return "#FF9800";
    return "#4CAF50";
  };

  if (!currentNodeSetting) {
    return null;
  }

  return (
    <Wrapper ref={ref}>
      {small && (
        <SmallSelect onClick={() => setShow(!show)}>
          <img
            alt=""
            src={`/imgs/icons/${getSignalImg(currentNodeSetting?.delay)}`}
            width={24}
            height={24}
          />
        </SmallSelect>
      )}
      {!small && (
        <Select onClick={() => setShow(!show)}>
          <img
            alt=""
            src={`/imgs/icons/${getSignalImg(currentNodeSetting?.delay)}`}
            className="signal"
            width={24}
            height={24}
          />
          <div>{currentNodeSetting?.name}</div>
          <img src="/imgs/icons/caret-down.svg" alt="" width={14} height={14} />
        </Select>
      )}
      {show && (
        <Options small={small}>
          {(nodes || []).map((item, index) => (
            <Item
              key={index}
              onClick={() => {
                if (item.url === currentNodeSetting.url) {
                  setShow(false);
                  return;
                }
                dispatch(setCurrentNode({ chain, url: item.url }));
                setShow(false);
              }}
              active={item.url === currentNodeSetting.url}
              color={getSignalColor(item?.delay)}
            >
              <img
                alt=""
                src={`/imgs/icons/${getSignalImg(item?.delay)}`}
                width={24}
                height={24}
              />
              <div>{`${item?.name}`}</div>
              <div className="delay">
                {item?.delay && !isNaN(item?.delay) ? `${item.delay} ms` : ""}
              </div>
            </Item>
          ))}
        </Options>
      )}
    </Wrapper>
  );
}
