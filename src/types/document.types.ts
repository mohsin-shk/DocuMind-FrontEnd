// ---- Nested Document Interfaces ----

export interface DocumentStorage {
  provider: string;
  url: string;
  publicId: string;
}

export type DocumentProcessingStatus = "processing" | "ready" | "failed";

export type DocumentFileExtension = "pdf" | "docx" | "txt";

// ---- Core Document Type ----

export interface Document {
  _id: string;
  owner: string;
  title: string;
  originalFileName: string;
  fileExtension: DocumentFileExtension;
  mimeType: string;
  fileSize: number;
  pageCount: number;
  processingStatus: DocumentProcessingStatus;
  processingError: string;
  storage: DocumentStorage;
  vectorNamespace: string;
  chunkCount: number;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
  processedAt?: string;
}

// ---- What frontend actually uses for display ----
// Picked fields needed for sidebar library + document preview

export type DocumentPreview = Pick<Document, "_id" | "title" | "originalFileName" | "fileExtension" | "fileSize" | "processingStatus" | "processingError" | "storage" | "createdAt">;

// ---- API Success Responses ----

export interface UploadDocumentResponse {
  statusCode: number;
  data: Document;
  message: string;
  success: boolean;
}

export interface GetAllDocumentsResponse {
  statusCode: number;
  data: {
    documents: Document[];
    count: number;
  };
  message: string;
  success: boolean;
}

export interface GetSingleDocumentResponse {
  statusCode: number;
  data: Document;
  message: string;
  success: boolean;
}

export interface DeleteDocumentResponse {
  statusCode: number;
  data: {
    documentId: string;
  };
  message: string;
  success: boolean;
}