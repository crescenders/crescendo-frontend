import instance from '@apis/instance';

const tagApi = {
  getTags: async (count = 3): Promise<Tag[]> => {
    const { data } = await instance.get(
      `/api/v1/studygroup/tags/?random_count=${count}`,
    );

    return data;
  },
};

export default tagApi;
