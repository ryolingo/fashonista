import { Timestamp } from 'firebase-admin/firestore';

export interface clothingItem {
   term: string;
   timestamp: FieldValue;
   userId: string;
}
