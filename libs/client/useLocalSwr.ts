import useSWR from "swr";

let changeValue: any = {};

export default function useLocalSwr(key: string, initValue = null as any) {
  const { data, mutate } = useSWR(key, () => {
    if (initValue) {
      changeValue[key] = initValue;
      return initValue;
    } else {
      return changeValue[key];
    }
  });

  return {
    data,
    mutate: (value: any) => {
      changeValue[key] = value;
      return mutate();
    },
  };
}
