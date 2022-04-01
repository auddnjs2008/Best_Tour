import useSWR from "swr";

let changeValue = "";
export default function useLocalSwr(key: string) {
  const { data, mutate } = useSWR(key, () => {
    return changeValue;
  });

  return {
    data,
    mutate: (value: any) => {
      changeValue = value;
      return mutate();
    },
  };
}
