import Tabs from "../Tabs";

export default function ProfileTabs({ value, setValue, overview }) {
  const items = [
    // { value: "promises", suffix: overview?.promisesCount },
    { value: "funds", suffix: overview?.fundsCount },
    { value: "rewards", suffix: overview?.rewardsCount },
    { value: "topics", suffix: overview?.topicsCount },
    { value: "replies", suffix: overview?.answersCount },
  ];
  return <Tabs {...{ items, value, setValue }} />;
}
