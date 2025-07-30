import { AIDoctorAgents } from "@/shared/list";
import { NextRequest, NextResponse } from "next/server";

function findDoctorBySymptoms(symptoms: string) {

  const specialistKeywords: Record<string, string[]> = {
    "General Physician": ["fever", "cold", "cough", "flu", "headache", "pain", "general", "health", "tired", "fatigue", "weakness"],
    "Pediatrician": ["child", "baby", "infant", "kid", "toddler", "children", "pediatric", "growth", "development"],
    "Dermatologist": ["skin", "rash", "acne", "itch", "dermatitis", "eczema", "mole", "hair", "nail", "allergy"],
    "Psychologist": ["stress", "anxiety", "depression", "mental", "mood", "sleep", "trauma", "emotion", "behavior", "panic", "fear"],
    "Nutritionist": ["diet", "weight", "nutrition", "food", "eating", "appetite", "obesity", "underweight", "meal", "vitamin", "deficiency"],
    "Cardiologist": ["heart", "chest", "pain", "blood pressure", "hypertension", "palpitation", "cardiovascular", "cholesterol"],
    "ENT Specialist": ["ear", "nose", "throat", "hearing", "sinus", "voice", "snoring", "tonsil", "neck", "smell", "taste"],
    "Orthopedic": ["bone", "joint", "muscle", "back", "spine", "knee", "shoulder", "fracture", "sprain", "arthritis", "pain"],
    "Gynecologist": ["menstrual", "period", "pregnancy", "uterus", "ovary", "vaginal", "women", "female", "reproductive", "pelvic"],
    "Dentist": ["tooth", "teeth", "gum", "dental", "mouth", "jaw", "bite", "cavity", "oral", "tongue"]
  };


  const lowercaseSymptoms = symptoms.toLowerCase();


  const matchCounts: Record<string, number> = {};

  Object.entries(specialistKeywords).forEach(([specialist, keywords]) => {
    matchCounts[specialist] = keywords.filter(keyword =>
      lowercaseSymptoms.includes(keyword.toLowerCase())
    ).length;
  });


  let bestMatch = "General Physician"; 
  let highestCount = 0;

  Object.entries(matchCounts).forEach(([specialist, count]) => {
    if (count > highestCount) {
      highestCount = count;
      bestMatch = specialist;
    }
  });


  const doctor = AIDoctorAgents.find(doc => doc.specialist === bestMatch);


  return doctor || AIDoctorAgents[0];
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { notes } = body;

    if (!notes) {
      return NextResponse.json({ error: "Notes are required" }, { status: 400 });
    }


    if (notes.trim().length < 5) {
      const defaultDoctor = AIDoctorAgents[0];

      if (!defaultDoctor.image.startsWith("http")) {
        defaultDoctor.image = defaultDoctor.image || "/doctor1.png";
      }
      return NextResponse.json(defaultDoctor);
    }


    const matchedDoctor = findDoctorBySymptoms(notes);


    if (matchedDoctor && !matchedDoctor.image.startsWith("http")) {
      matchedDoctor.image = matchedDoctor.image || "/doctor1.png";
    }

    return NextResponse.json(matchedDoctor);
  } catch (error) {
    console.error("Request processing error:", error);

    const defaultDoctor = AIDoctorAgents[0];
    if (defaultDoctor.image && !defaultDoctor.image.startsWith("http")) {
      defaultDoctor.image = defaultDoctor.image || "/doctor1.png";
    }
    return NextResponse.json(defaultDoctor);
  }
}