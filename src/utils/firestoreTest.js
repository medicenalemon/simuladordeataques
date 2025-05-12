import { firestore } from "../config/firebaseConfig";
import { collection, addDoc } from "firebase/firestore";

export async function testFirestore() {
  try {
    const docRef = await addDoc(collection(firestore, "testCollection"), {
      name: "Mauricio",
      timestamp: new Date(),
    });
    console.log("Documento escrito con ID:", docRef.id);
  } catch (e) {
    console.error("Error al escribir en Firestore:", e);
  }
}
