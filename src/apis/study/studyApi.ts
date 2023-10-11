import instance from '@apis/instance';
import { GetStudyMembersParamType } from '@hooks/queries/useGetStudyMembers';

const studyApi = {
  getStudyGroupList: async (params = ''): Promise<StudyList> => {
    const { data } = await instance.get(`/api/v1/studygroup/studies${params}`);
    return data;
  },
  createStudy: async (formData: FormData): Promise<CreateStudy> => {
    const { data } = await instance.post(
      '/api/v1/studygroup/studies/',
      formData,
      {
        headers: { 'Content-Type': 'multipart/form-data' },
      },
    );
    return data;
  },
  getStudyDetail: async (id: string): Promise<StudyDetail> => {
    const { data } = await instance.get(`/api/v1/studygroup/studies/${id}/`);
    return data;
  },
  editStudy: async (id: string, formData: FormData): Promise<StudyDetail> => {
    const { data } = await instance.put(
      `/api/v1/studygroup/studies/${id}/`,
      formData,
      {
        headers: { 'Content-Type': 'multipart/form-data' },
      },
    );
    return data;
  },
  deleteStudy: async (id: string): Promise<void> => {
    return await instance.delete(`/api/v1/studygroup/studies/${id}/`);
  },
  getMyStudyGroupList: async (params: string): Promise<MyStudyList> => {
    const { data } = await instance.get(
      `/api/v1/auth/profiles/me/studies?${params}`,
    );
    return data;
  },
  applyStudyGroup: async (
    uuid: string,
    message: string,
  ): Promise<{ request_message: string }> => {
    const { data } = await instance.post(
      `/api/v1/studygroup/studies/${uuid}/members/`,
      { request_message: message },
    );
    return data;
  },
  getStudyGroupMemberList: async ({
    uuid,
    isApproved,
  }: GetStudyMembersParamType): Promise<StudyGroupMember[]> => {
    const { data } = await instance.get(
      `/api/v1/studygroup/studies/${uuid}/members?is_approved=${isApproved}`,
    );
    return data;
  },
};

export default studyApi;
