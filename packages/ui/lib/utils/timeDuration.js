import dayjs from "dayjs";
import updateLocale from "dayjs/plugin/updateLocale";
dayjs.extend(updateLocale);

export default function timeDuration(time) {
  if (!time) {
    return "Unknown time";
  }
  dayjs.updateLocale("en", {
    relativeTime: {
      future: "in %s",
      past: "%s ago",
      s: "secs",
      ss: "%ds",
      m: "1min",
      mm: "%dmin",
      h: "1h",
      hh: "%dhrs",
      d: "1d",
      dd: "%dd",
      M: "1mo",
      MM: "%dmos",
      y: "1y",
      yy: "%dy",
    },
  });
  const now = dayjs();
  if (!now.isAfter(time)) {
    return dayjs(time).fromNow();
  }
  let ss = now.diff(time, "seconds");
  let ii = now.diff(time, "minutes");
  let hh = now.diff(time, "hours");
  let dd = now.diff(time, "days");
  let mm = now.diff(time, "months");
  let yy = now.diff(time, "years");
  if (yy) {
    mm %= 12;
    if (mm) {
      return `${yy}y ${mm}mo${mm > 1 ? "s" : ""} ago`;
    }
    return `${yy}y ago`;
  }
  if (mm) {
    return `${mm}mo${mm > 1 ? "s" : ""} ago`;
  }
  if (dd) {
    hh %= 24;
    if (hh) {
      return `${dd}d ${hh}h${hh > 1 ? "rs" : ""} ago`;
    }
    return `${dd}d ago`;
  }
  if (hh) {
    ii %= 60;
    if (ii) {
      return `${hh}h${hh > 1 ? "rs" : ""} ${ii}min${ii > 1 ? "s" : ""} ago`;
    }
    return `${hh}h${hh > 1 ? "rs" : ""} ago`;
  }
  if (ii) {
    ss %= 60;
    if (ss) {
      return `${ii}min${ii > 1 ? "s" : ""} ${ss}s ago`;
    }
    return `${ii}min${ii > 1 ? "s" : ""} ago`;
  }
  return `${ss}s ago`;
}
