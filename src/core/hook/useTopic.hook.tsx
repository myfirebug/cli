import { useState, useCallback } from "react";
import { ITopicItem, API } from "@service/index";
export function useTopic() {
  const [topics, setTopics] = useState<ITopicItem[]>([]);
  const [topicsLoading, setTopicsLoading] = useState<boolean>(false);
  // 获取主题列表数据
  const getTopics = useCallback((params: any) => {
    setTopicsLoading(true);
    API.topicService
      .getTopics(params)
      .then((data) => {
        setTopics(data);
        setTopicsLoading(false);
      })
      .catch(() => {
        setTopicsLoading(false);
      });
  }, []);

  return {
    topics,
    topicsLoading,
    getTopics,
  };
}
