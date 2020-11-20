import {
  DocumentData,
  QueryDocumentSnapshot,
  QuerySnapshot,
} from "../@types/external";

export const collectionToFields = <T = DocumentData>(
  data: QuerySnapshot<T>
): T[] => data.docs.map((doc: QueryDocumentSnapshot<T>) => doc.data());
