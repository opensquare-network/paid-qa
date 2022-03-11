import Tooltip from "../Tooltip";
import {
  abbreviateBigNumber,
  getEffectiveNumbers,
  toPrecision,
  getSymbolByChain,
  getDecimalByChain,
} from "../utils/tokenValue";
import { ReactComponent as Loading } from "../imgs/icons/loading.svg";

/**
 * Render raw data into readable crypto amount
 * @param {string | BigNumber} value - raw full precision amount
 * @param {string} chain - chain name
 * @param {boolean} showAEM - Initial of showAlmostEqualMark, default false
 */

export default function ValueDisplay({ value, chain, showAEM = false }) {
  if (!value) {
    return <Loading />;
  }
  const lostPrecision =
    getEffectiveNumbers(value) !==
    getEffectiveNumbers(abbreviateBigNumber(value));
  const decimals = getDecimalByChain(chain);
  const symbol = getSymbolByChain(chain);
  const precision = toPrecision(value, decimals);

  if (Number(precision) > 1000 || lostPrecision) {
    return (
      <Tooltip size="fit" content={`${precision} ${symbol}`}>
        <div>
          {showAEM && lostPrecision && "≈"}{" "}
          {`${abbreviateBigNumber(precision)} ${symbol}`}
        </div>
      </Tooltip>
    );
  }
  return (
    <span>
      {precision} {symbol}
    </span>
  );
}
