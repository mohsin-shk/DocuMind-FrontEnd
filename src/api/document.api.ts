import { apiClient } from "@/api/client";

import type {
  UploadDocumentResponse,
  GetAllDocumentsResponse,
  GetSingleDocumentResponse,
  DeleteDocumentResponse,
} from "@/types/document.types";

export const uploadDocument = async (
  file: File
): Promise<UploadDocumentResponse> => {
  const formData = new FormData();

  formData.append(
    "document",
    file
  );

  const response =
    await apiClient.post(
      "/documents/upload",
      formData,
      {
        headers: {
          "Content-Type":
            "multipart/form-data",
        },
      }
    );

  return response.data;
};

export const getDocuments =
  async (): Promise<GetAllDocumentsResponse> => {
    const response =
      await apiClient.get(
        "/documents"
      );

    return response.data;
  };

export const getDocument =
  async (
    documentId: string
  ): Promise<GetSingleDocumentResponse> => {
    const response =
      await apiClient.get(
        `/documents/${documentId}`
      );

    return response.data;
  };

export const deleteDocument =
  async (
    documentId: string
  ): Promise<DeleteDocumentResponse> => {
    const response =
      await apiClient.delete(
        `/documents/${documentId}`
      );

    return response.data;
  };