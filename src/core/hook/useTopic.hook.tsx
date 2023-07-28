import { useState, useCallback } from "react";
import { ITopicItem, API } from "@service/index";

export function useTopic() {
  const [topics, setTopics] = useState<ITopicItem[]>([]);
  // 获取主题列表数据
  const getTopics = useCallback((params: any) => {
    API.topicService.getTopics(params).then((res) => {
      console.log(res);
    });
  }, []);

  return {
    topics,
    setTopics,
    getTopics,
  };
}
