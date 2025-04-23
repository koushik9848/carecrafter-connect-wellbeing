
interface Medicine {
  name: string;
  dosage: {
    youth: string;
    adult: string;
    senior: string;
  };
  timing: 'before food' | 'after food' | 'with food' | 'any time';
}

interface Disease {
  name: string;
  symptoms: string[];
  medicines: Medicine[];
  foodToEat: string[];
  foodToAvoid: string[];
  duration: string;
  requiresHospital: boolean;
}

export const diseases: Disease[] = [
  {
    name: 'Common Cold',
    symptoms: ['runny nose', 'sneezing', 'congestion', 'sore throat', 'cough', 'mild fever'],
    medicines: [
      {
        name: 'Paracetamol',
        dosage: {
          youth: '250-500mg every 4-6 hours as needed',
          adult: '500-1000mg every 4-6 hours as needed',
          senior: '500mg every 6 hours as needed'
        },
        timing: 'after food'
      },
      {
        name: 'Cetirizine',
        dosage: {
          youth: '5-10mg once daily',
          adult: '10mg once daily',
          senior: '5mg once daily'
        },
        timing: 'any time'
      }
    ],
    foodToEat: ['Warm soup', 'Herbal tea with honey', 'Citrus fruits', 'Yogurt', 'Ginger'],
    foodToAvoid: ['Dairy products', 'Fried foods', 'Alcohol', 'Caffeine'],
    duration: '7-10 days',
    requiresHospital: false
  },
  {
    name: 'Fever',
    symptoms: ['high temperature', 'sweating', 'chills', 'headache', 'muscle aches', 'fatigue'],
    medicines: [
      {
        name: 'Paracetamol',
        dosage: {
          youth: '250-500mg every 4-6 hours as needed',
          adult: '500-1000mg every 4-6 hours as needed',
          senior: '500mg every 6 hours as needed'
        },
        timing: 'any time'
      },
      {
        name: 'Ibuprofen',
        dosage: {
          youth: '200mg every 6-8 hours',
          adult: '400mg every 6-8 hours',
          senior: '200mg every 8 hours'
        },
        timing: 'after food'
      }
    ],
    foodToEat: ['Clear broth', 'Rice', 'Toast', 'Bananas', 'Water', 'Coconut water'],
    foodToAvoid: ['Heavy meals', 'Spicy foods', 'Fatty foods', 'Alcohol'],
    duration: '3-7 days',
    requiresHospital: false
  },
  {
    name: 'Sore Throat',
    symptoms: ['pain when swallowing', 'dry throat', 'scratchy feeling', 'hoarseness', 'swollen glands'],
    medicines: [
      {
        name: 'Throat lozenges',
        dosage: {
          youth: '1 lozenge every 2-3 hours as needed',
          adult: '1 lozenge every 2-3 hours as needed',
          senior: '1 lozenge every 3-4 hours as needed'
        },
        timing: 'any time'
      },
      {
        name: 'Paracetamol',
        dosage: {
          youth: '250-500mg every 4-6 hours as needed',
          adult: '500-1000mg every 4-6 hours as needed',
          senior: '500mg every 6 hours as needed'
        },
        timing: 'any time'
      }
    ],
    foodToEat: ['Warm soup', 'Honey tea', 'Ice cream', 'Jello', 'Mashed potatoes', 'Smoothies'],
    foodToAvoid: ['Spicy foods', 'Citrus fruits', 'Rough foods (chips, crackers)', 'Alcohol'],
    duration: '5-7 days',
    requiresHospital: false
  },
  {
    name: 'Headache',
    symptoms: ['pain in head or neck', 'throbbing pain', 'dull ache', 'pressure', 'sensitivity to light or sound'],
    medicines: [
      {
        name: 'Ibuprofen',
        dosage: {
          youth: '200mg every 6-8 hours',
          adult: '400mg every 6-8 hours',
          senior: '200mg every 8 hours'
        },
        timing: 'after food'
      },
      {
        name: 'Paracetamol',
        dosage: {
          youth: '250-500mg every 4-6 hours as needed',
          adult: '500-1000mg every 4-6 hours as needed',
          senior: '500mg every 6 hours as needed'
        },
        timing: 'any time'
      }
    ],
    foodToEat: ['Water', 'Almonds', 'Watermelon', 'Potassium-rich foods (bananas)', 'Magnesium-rich foods (spinach)'],
    foodToAvoid: ['Alcohol', 'Aged cheeses', 'Processed meats', 'MSG', 'Chocolate', 'Caffeine'],
    duration: '4-24 hours',
    requiresHospital: false
  },
  {
    name: 'Flu (Influenza)',
    symptoms: ['fever', 'chills', 'cough', 'sore throat', 'runny nose', 'muscle aches', 'fatigue', 'headache'],
    medicines: [
      {
        name: 'Oseltamivir (Tamiflu)',
        dosage: {
          youth: 'As prescribed by doctor',
          adult: 'As prescribed by doctor',
          senior: 'As prescribed by doctor'
        },
        timing: 'with food'
      },
      {
        name: 'Paracetamol',
        dosage: {
          youth: '250-500mg every 4-6 hours as needed',
          adult: '500-1000mg every 4-6 hours as needed',
          senior: '500mg every 6 hours as needed'
        },
        timing: 'any time'
      }
    ],
    foodToEat: ['Chicken soup', 'Garlic', 'Ginger tea', 'Broth', 'Honey', 'Citrus fruits'],
    foodToAvoid: ['Alcohol', 'Caffeine', 'Fried foods', 'Dairy products'],
    duration: '7-14 days',
    requiresHospital: false
  },
  {
    name: 'Acidity',
    symptoms: ['heartburn', 'acid regurgitation', 'chest pain', 'difficulty swallowing', 'burping'],
    medicines: [
      {
        name: 'Antacid',
        dosage: {
          youth: '10-20ml as needed',
          adult: '10-20ml as needed',
          senior: '10ml as needed'
        },
        timing: 'after food'
      },
      {
        name: 'Omeprazole',
        dosage: {
          youth: 'Consult doctor',
          adult: '20mg daily',
          senior: '20mg daily'
        },
        timing: 'before food'
      }
    ],
    foodToEat: ['Oatmeal', 'Bananas', 'Melons', 'Green vegetables', 'Lean proteins', 'Non-citrus fruits'],
    foodToAvoid: ['Spicy foods', 'Citrus fruits', 'Tomatoes', 'Chocolate', 'Coffee', 'Alcohol', 'Fried foods'],
    duration: 'Variable, depends on diet changes',
    requiresHospital: false
  },
  {
    name: 'Allergic Reaction',
    symptoms: ['rash', 'hives', 'itchiness', 'swelling', 'runny nose', 'watery eyes', 'sneezing'],
    medicines: [
      {
        name: 'Cetirizine',
        dosage: {
          youth: '5-10mg once daily',
          adult: '10mg once daily',
          senior: '5mg once daily'
        },
        timing: 'any time'
      },
      {
        name: 'Loratadine',
        dosage: {
          youth: '5-10mg once daily',
          adult: '10mg once daily',
          senior: '10mg once daily'
        },
        timing: 'any time'
      }
    ],
    foodToEat: ['Anti-inflammatory foods (fruits, vegetables)', 'Omega-3 rich foods', 'Turmeric', 'Ginger'],
    foodToAvoid: ['Known allergens', 'Processed foods', 'Foods high in preservatives'],
    duration: 'Variable, depends on allergen exposure',
    requiresHospital: true
  },
  {
    name: 'Migraine',
    symptoms: ['severe headache', 'throbbing pain', 'nausea', 'vomiting', 'sensitivity to light/sound', 'visual disturbances'],
    medicines: [
      {
        name: 'Sumatriptan',
        dosage: {
          youth: 'Consult doctor',
          adult: '50-100mg at onset, max 300mg/day',
          senior: '50mg at onset, max 200mg/day'
        },
        timing: 'any time'
      },
      {
        name: 'Ibuprofen',
        dosage: {
          youth: '200-400mg as needed',
          adult: '400-800mg as needed',
          senior: '200-400mg as needed'
        },
        timing: 'after food'
      }
    ],
    foodToEat: ['Water', 'Magnesium-rich foods (spinach, nuts)', 'Riboflavin-rich foods (eggs)', 'Omega-3 fatty acids'],
    foodToAvoid: ['Aged cheeses', 'Processed meats', 'Chocolate', 'Alcohol', 'MSG', 'Artificial sweeteners', 'Caffeine'],
    duration: '4-72 hours',
    requiresHospital: false
  },
  {
    name: 'Cough',
    symptoms: ['persistent cough', 'dry throat', 'tickling in throat', 'sometimes chest pain'],
    medicines: [
      {
        name: 'Dextromethorphan syrup',
        dosage: {
          youth: '5ml every 6-8 hours',
          adult: '10ml every 6-8 hours',
          senior: '10ml every 8 hours',
        },
        timing: 'any time'
      }
    ],
    foodToEat: ['Warm fluids', 'Honey', 'Ginger', 'Turmeric milk'],
    foodToAvoid: ['Cold drinks', 'Fried food', 'Spicy food'],
    duration: '7-14 days',
    requiresHospital: false
  },
  {
    name: 'Allergies (dust, pollen, food, etc.)',
    symptoms: ['sneezing', 'runny nose', 'itchy eyes', 'hives', 'rash', 'swelling'],
    medicines: [
      {
        name: 'Loratadine',
        dosage: {
          youth: '5-10mg once daily',
          adult: '10mg once daily',
          senior: '10mg once daily'
        },
        timing: 'any time'
      }
    ],
    foodToEat: ['Anti-inflammatory foods', 'Omega-3 rich foods', 'Turmeric', 'Ginger'],
    foodToAvoid: ['Known allergens', 'Preservatives', 'Artificial colors/flavors'],
    duration: 'Variable, depends on exposure',
    requiresHospital: false
  },
  {
    name: 'Stomach Ache',
    symptoms: ['abdominal pain', 'cramps', 'bloating', 'nausea'],
    medicines: [
      {
        name: 'Dicyclomine',
        dosage: {
          youth: 'Consult doctor',
          adult: '20mg twice daily',
          senior: '10mg twice daily',
        },
        timing: 'after food'
      }
    ],
    foodToEat: ['Soft foods', 'Bananas', 'Rice', 'Applesauce', 'Toast'],
    foodToAvoid: ['Spicy food', 'Greasy food', 'Caffeine'],
    duration: '2-5 days',
    requiresHospital: false
  },
  {
    name: 'Indigestion',
    symptoms: ['bloating', 'fullness', 'belching', 'discomfort after eating'],
    medicines: [
      {
        name: 'Antacid',
        dosage: {
          youth: '10-15ml as needed',
          adult: '15-20ml as needed',
          senior: '10-15ml as needed'
        },
        timing: 'after food'
      }
    ],
    foodToEat: ['Oatmeal', 'Bananas', 'Ginger tea'],
    foodToAvoid: ['Fatty foods', 'Caffeinated drinks', 'Alcohol'],
    duration: '1-3 days',
    requiresHospital: false
  },
  {
    name: 'Diarrhea',
    symptoms: ['loose stools', 'frequent bowel movements', 'abdominal cramps'],
    medicines: [
      {
        name: 'ORS (Oral Rehydration Solution)',
        dosage: {
          youth: 'As directed on pack, after each loose stool',
          adult: 'As directed on pack, after each loose stool',
          senior: 'As directed on pack, after each loose stool'
        },
        timing: 'any time'
      },
      {
        name: 'Loperamide',
        dosage: {
          youth: 'Consult doctor',
          adult: '2mg after each loose stool (max 8mg/day)',
          senior: 'Consult doctor'
        },
        timing: 'after food'
      }
    ],
    foodToEat: ['BRAT diet (Bananas, Rice, Applesauce, Toast)', 'Yogurt'],
    foodToAvoid: ['Raw vegetables', 'Dairy', 'Spicy food'],
    duration: '2-5 days',
    requiresHospital: false
  },
  {
    name: 'Constipation',
    symptoms: ['difficulty passing stool', 'hard stools', 'infrequent stools', 'bloating'],
    medicines: [
      {
        name: 'Isabgol (Psyllium husk)',
        dosage: {
          youth: '5g with water at night',
          adult: '10g with water at night',
          senior: '5g with water at night'
        },
        timing: 'any time'
      }
    ],
    foodToEat: ['High-fiber foods', 'Fruits', 'Whole grains', 'Plenty of water'],
    foodToAvoid: ['Refined foods', 'Fried food', 'Cheese'],
    duration: 'Variable',
    requiresHospital: false
  },
  {
    name: 'Vomiting / Nausea',
    symptoms: ['vomiting', 'nausea', 'queasiness', 'loss of appetite'],
    medicines: [
      {
        name: 'Ondansetron',
        dosage: {
          youth: 'Consult doctor',
          adult: '4-8mg as needed',
          senior: '4mg as needed'
        },
        timing: 'any time'
      }
    ],
    foodToEat: ['Clear fluids', 'Bananas', 'Rice', 'Apple sauce', 'Toast'],
    foodToAvoid: ['Heavy meals', 'Spicy food', 'Fried food'],
    duration: '1-2 days',
    requiresHospital: false
  },
  {
    name: 'Skin Rashes',
    symptoms: ['redness', 'itching', 'swelling', 'bumps', 'painless lesions'],
    medicines: [
      {
        name: 'Calamine lotion',
        dosage: {
          youth: 'Apply thin layer as needed',
          adult: 'Apply thin layer as needed',
          senior: 'Apply thin layer as needed'
        },
        timing: 'any time'
      }
    ],
    foodToEat: ['Anti-inflammatory foods', 'Cucumber', 'Watermelon'],
    foodToAvoid: ['Hot/spicy foods', 'Seafood (if allergic)'],
    duration: '3-7 days',
    requiresHospital: false
  },
  {
    name: 'Acne / Pimples',
    symptoms: ['red spots', 'pustules', 'blackheads', 'whiteheads', 'oily skin'],
    medicines: [
      {
        name: 'Benzoyl Peroxide cream',
        dosage: {
          youth: 'Apply once daily',
          adult: 'Apply once or twice daily',
          senior: 'Apply once daily'
        },
        timing: 'any time'
      }
    ],
    foodToEat: ['Low-glycemic foods', 'Fruits', 'Vegetables'],
    foodToAvoid: ['Sugary foods', 'Dairy', 'Greasy food'],
    duration: 'Variable',
    requiresHospital: false
  },
  {
    name: 'Dandruff',
    symptoms: ['flaky scalp', 'itchy scalp', 'dry skin on scalp'],
    medicines: [
      {
        name: 'Ketoconazole shampoo',
        dosage: {
          youth: 'Apply twice a week',
          adult: 'Apply twice a week',
          senior: 'Apply once a week'
        },
        timing: 'any time'
      }
    ],
    foodToEat: ['Zinc-rich foods', 'Vitamin B-rich foods', 'Omega-3 fatty acids'],
    foodToAvoid: ['Sugary foods', 'Processed foods'],
    duration: 'Variable',
    requiresHospital: false
  },
  {
    name: 'Toothache',
    symptoms: ['pain in teeth', 'sensitivity to hot/cold', 'swollen gums'],
    medicines: [
      {
        name: 'Acetaminophen',
        dosage: {
          youth: '250-500mg every 6 hours',
          adult: '500-1000mg every 6 hours',
          senior: '500mg every 6 hours'
        },
        timing: 'after food'
      }
    ],
    foodToEat: ['Soft foods', 'Soup', 'Smoothies'],
    foodToAvoid: ['Sweets', 'Cold foods', 'Very hot foods'],
    duration: '1-3 days',
    requiresHospital: false
  },
  {
    name: 'Ear Pain / Infection',
    symptoms: ['ear pain', 'fullness', 'hearing loss', 'possible fever'],
    medicines: [
      {
        name: 'Paracetamol',
        dosage: {
          youth: '250-500mg every 6 hours',
          adult: '500-1000mg every 6 hours',
          senior: '500mg every 6 hours'
        },
        timing: 'any time'
      }
    ],
    foodToEat: ['No dietary restrictions'],
    foodToAvoid: ['None specific'],
    duration: '2-7 days',
    requiresHospital: false
  },
  {
    name: 'Eye Strain / Red Eyes',
    symptoms: ['red eyes', 'itchy or burning', 'fatigue', 'blurred vision'],
    medicines: [
      {
        name: 'Artificial tears',
        dosage: {
          youth: '1-2 drops as needed',
          adult: '1-2 drops as needed',
          senior: '1 drop as needed'
        },
        timing: 'any time'
      }
    ],
    foodToEat: ['Carrots', 'Leafy greens', 'Vitamin A-rich foods'],
    foodToAvoid: ['Prolonged screen time'],
    duration: '1-2 days',
    requiresHospital: false
  },
  {
    name: 'Back Pain',
    symptoms: ['lower back pain', 'stiffness', 'aches', 'limited movement'],
    medicines: [
      {
        name: 'Ibuprofen',
        dosage: {
          youth: '200mg every 8 hours',
          adult: '400mg every 8 hours',
          senior: '200mg every 8 hours'
        },
        timing: 'after food'
      }
    ],
    foodToEat: ['Magnesium-rich foods', 'Fruits', 'Vegetables'],
    foodToAvoid: ['High-sugar foods', 'Processed foods'],
    duration: '2-14 days',
    requiresHospital: false
  },
  {
    name: 'Muscle Cramps',
    symptoms: ['muscle spasms', 'tightness', 'pain'],
    medicines: [
      {
        name: 'Magnesium supplement',
        dosage: {
          youth: 'Consult doctor',
          adult: '250-300mg per day',
          senior: 'Consult doctor'
        },
        timing: 'any time'
      }
    ],
    foodToEat: ['Electrolyte-rich foods', 'Bananas', 'Spinach'],
    foodToAvoid: ['Caffeine', 'Alcohol'],
    duration: '1-3 days',
    requiresHospital: false
  },
  {
    name: 'Joint Pain / Arthritis (early signs)',
    symptoms: ['joint pain', 'stiffness', 'swelling', 'reduced movement'],
    medicines: [
      {
        name: 'Paracetamol',
        dosage: {
          youth: '250-500mg every 6 hours',
          adult: '500-1000mg every 6 hours',
          senior: '500mg every 6 hours'
        },
        timing: 'any time'
      }
    ],
    foodToEat: ['Anti-inflammatory foods', 'Omega-3 fatty acids', 'Olive oil'],
    foodToAvoid: ['Sugary foods', 'Red meat'],
    duration: 'Variable, consult doctor if persistent',
    requiresHospital: false
  },
  {
    name: 'High Blood Pressure (Hypertension)',
    symptoms: ['often none', 'sometimes headache', 'dizziness', 'nosebleeds'],
    medicines: [
      {
        name: 'Amlodipine',
        dosage: {
          youth: 'Consult doctor',
          adult: '5mg once daily',
          senior: '5mg once daily'
        },
        timing: 'any time'
      }
    ],
    foodToEat: ['Leafy greens', 'Low-salt foods', 'Whole grains'],
    foodToAvoid: ['Salty foods', 'Canned/frozen meals', 'Alcohol'],
    duration: 'Chronic, needs ongoing management',
    requiresHospital: false
  },
  {
    name: 'Low Blood Pressure (Hypotension)',
    symptoms: ['dizziness', 'fainting', 'blurred vision', 'weakness'],
    medicines: [
      {
        name: 'Fludrocortisone',
        dosage: {
          youth: 'Consult doctor',
          adult: 'As prescribed by doctor',
          senior: 'As prescribed by doctor'
        },
        timing: 'any time'
      }
    ],
    foodToEat: ['Salted foods', 'Water', 'Caffeine (in moderation)'],
    foodToAvoid: ['Alcohol', 'Large meals'],
    duration: 'Variable',
    requiresHospital: false
  },
  {
    name: 'Diabetes (Type 2 - lifestyle-related)',
    symptoms: ['increased thirst', 'frequent urination', 'fatigue', 'slow healing'],
    medicines: [
      {
        name: 'Metformin',
        dosage: {
          youth: 'Consult doctor',
          adult: '500mg twice daily',
          senior: '500mg twice daily'
        },
        timing: 'after food'
      }
    ],
    foodToEat: ['Whole grains', 'Vegetables', 'Beans', 'Lean proteins'],
    foodToAvoid: ['Sugary food', 'Soft drinks', 'Refined flour'],
    duration: 'Chronic, needs lifelong management',
    requiresHospital: false
  },
  {
    name: 'Asthma',
    symptoms: ['shortness of breath', 'wheezing', 'cough (especially at night or on exercise)', 'chest tightness'],
    medicines: [
      {
        name: 'Inhaled Salbutamol',
        dosage: {
          youth: '1-2 puffs as needed',
          adult: '2 puffs as needed',
          senior: '1-2 puffs as needed'
        },
        timing: 'any time'
      }
    ],
    foodToEat: ['Antioxidant-rich foods', 'Fruits', 'Vegetables', 'Vitamin D'],
    foodToAvoid: ['Allergens', 'Sulfite-containing foods'],
    duration: 'Chronic, needs ongoing management',
    requiresHospital: false
  },
  {
    name: 'Cold Sores',
    symptoms: ['painful blisters', 'tingling', 'ulcers near lips/mouth'],
    medicines: [
      {
        name: 'Acyclovir cream',
        dosage: {
          youth: 'Apply 5 times daily',
          adult: 'Apply 5 times daily',
          senior: 'Apply 5 times daily'
        },
        timing: 'any time'
      }
    ],
    foodToEat: ['Lysine-rich foods', 'Yogurt'],
    foodToAvoid: ['Acidic foods', 'Citrus fruits'],
    duration: '7-14 days',
    requiresHospital: false
  },
  {
    name: 'Urinary Tract Infection (UTI)',
    symptoms: ['burning urination', 'frequent urination', 'cloudy urine', 'pelvic pain'],
    medicines: [
      {
        name: 'Nitrofurantoin',
        dosage: {
          youth: 'Consult doctor',
          adult: '100mg twice daily',
          senior: '100mg twice daily'
        },
        timing: 'after food'
      }
    ],
    foodToEat: ['Plenty of water', 'Cranberry juice', 'Probiotics'],
    foodToAvoid: ['Caffeine', 'Alcohol', 'Spicy foods'],
    duration: '3-7 days',
    requiresHospital: false
  },
  {
    name: 'Sleep Disorders (like Insomnia)',
    symptoms: ['difficulty falling asleep', 'waking at night', 'fatigue', 'irritability'],
    medicines: [
      {
        name: 'Melatonin supplement',
        dosage: {
          youth: 'Consult doctor',
          adult: '3mg 30 min before bed',
          senior: '2mg 30 min before bed'
        },
        timing: 'any time'
      }
    ],
    foodToEat: ['Light dinner', 'Herbal teas (e.g. chamomile)', 'Bananas'],
    foodToAvoid: ['Caffeine', 'Heavy meals at night', 'Alcohol'],
    duration: 'Variable',
    requiresHospital: false
  }
];

// Function to get disease by name
export const getDiseaseByName = (name: string): Disease | undefined => {
  return diseases.find(disease => 
    disease.name.toLowerCase() === name.toLowerCase()
  );
};

// Function to match symptoms to possible diseases
export const matchSymptoms = (userSymptoms: string[]): Disease[] => {
  const matchedDiseases: Disease[] = [];
  
  for (const disease of diseases) {
    const matchCount = disease.symptoms.filter(symptom => 
      userSymptoms.some(userSymptom => 
        userSymptom.toLowerCase().includes(symptom.toLowerCase()) || 
        symptom.toLowerCase().includes(userSymptom.toLowerCase())
      )
    ).length;
    
    if (matchCount > 0) {
      matchedDiseases.push(disease);
    }
  }
  
  return matchedDiseases.sort((a, b) => {
    const aMatchCount = a.symptoms.filter(symptom => 
      userSymptoms.some(userSymptom => 
        userSymptom.toLowerCase().includes(symptom.toLowerCase()) || 
        symptom.toLowerCase().includes(userSymptom.toLowerCase())
      )
    ).length;
    
    const bMatchCount = b.symptoms.filter(symptom => 
      userSymptoms.some(userSymptom => 
        userSymptom.toLowerCase().includes(symptom.toLowerCase()) || 
        symptom.toLowerCase().includes(userSymptom.toLowerCase())
      )
    ).length;
    
    return bMatchCount - aMatchCount;
  });
};

export const getRecommendation = (disease: Disease, ageGroup: 'youth' | 'adult' | 'senior'): string => {
  const medicines = disease.medicines.map(med => 
    `${med.name}: ${med.dosage[ageGroup]} (take ${med.timing})`
  ).join('\n');

  const foodToEat = disease.foodToEat.join(', ');
  const foodToAvoid = disease.foodToAvoid.join(', ');

  return `
Based on your symptoms, you may have ${disease.name}.

RECOMMENDED TREATMENT:
- Medicines:
${medicines}

- Foods to eat: ${foodToEat}
- Foods to avoid: ${foodToAvoid}

- Expected duration: ${disease.duration}

${disease.requiresHospital ? '⚠ NOTE: This condition may require medical attention. Please consult a healthcare professional if symptoms worsen.' : ''}
`;
};

export const getHospitalRecommendation = (): string => {
  return `
I'm concerned about your persistent symptoms. I recommend visiting a healthcare facility for proper diagnosis and treatment.

NEARBY HOSPITALS:
1. City General Hospital - 2.3 miles away
2. Community Medical Center - 3.1 miles away
3. University Health Clinic - 5.7 miles away

Please don't delay seeking medical attention. Would you like me to provide directions to any of these facilities?
`;
};

// Helper to extract duration in days from user message (supports: days, weeks, months)
const extractUserDuration = (message: string): number | null => {
  // Common patterns: 'for 2 weeks', 'since 10 days', 'for 1 month', etc.
  const regex = /(for|since)\s+(\d+)\s*(day|days|week|weeks|month|months)/;
  const match = message.match(regex);
  if (match) {
    const num = parseInt(match[2]);
    const unit = match[3].toLowerCase();
    if (unit.startsWith("day")) return num;
    if (unit.startsWith("week")) return num * 7;
    if (unit.startsWith("month")) return num * 30; // Approximate month as 30 days
  }
  return null;
};

// Helper to extract duration in days from the disease info (works for formats: "7-10 days", "5-7 days", "3-7 days", etc.)
const extractDiseaseMaxDuration = (durationStr: string): number | null => {
  // Examples: "7-10 days", "4-24 hours", "7-14 days", "4-72 hours"
  const dayRegex = /(\d+)(?:-(\d+))?\s*day/;
  const weekRegex = /(\d+)(?:-(\d+))?\s*week/;
  const monthRegex = /(\d+)(?:-(\d+))?\s*month/;
  if (dayRegex.test(durationStr)) {
    const match = durationStr.match(dayRegex)!;
    return match[2] ? parseInt(match[2]) : parseInt(match[1]);
  }
  if (weekRegex.test(durationStr)) {
    const match = durationStr.match(weekRegex)!;
    return match[2] ? parseInt(match[2]) * 7 : parseInt(match[1]) * 7;
  }
  if (monthRegex.test(durationStr)) {
    const match = durationStr.match(monthRegex)!;
    return match[2] ? parseInt(match[2]) * 30 : parseInt(match[1]) * 30;
  }
  return null;
};

export const generateResponse = (message: string, ageGroup: 'youth' | 'adult' | 'senior'): string => {
  const lowerMessage = message.toLowerCase();
  
  // Check for emergency keywords
  if (
    lowerMessage.includes('emergency') || 
    lowerMessage.includes('severe pain') || 
    lowerMessage.includes("can't breathe") || 
    lowerMessage.includes('chest pain')
  ) {
    return "This sounds like an emergency. Please call emergency services (911) immediately or go to the nearest emergency room.";
  }

  // Check for symptom persistence
  if (
    lowerMessage.includes('still having') || 
    lowerMessage.includes('not getting better') || 
    lowerMessage.includes('persists') || 
    lowerMessage.includes('worsening') ||
    lowerMessage.includes('not working')
  ) {
    return getHospitalRecommendation();
  }
  
  // User stated duration of disease
  const userDuration = extractUserDuration(lowerMessage);

  // Check for specific disease
  for (const disease of diseases) {
    if (lowerMessage.includes(disease.name.toLowerCase())) {
      // Check duration if detected in message
      if (userDuration) {
        const diseaseDuration = extractDiseaseMaxDuration(disease.duration);
        if (diseaseDuration && userDuration > diseaseDuration) {
          return "It is advisable to consult a doctor.";
        }
      }
      return getRecommendation(disease, ageGroup);
    }
  }

  // Extract symptoms
  const userSymptoms = lowerMessage.split(/[.,;]|\band\b/).map(s => s.trim()).filter(s => s.length > 0);

  // Match symptoms to diseases
  const matchedDiseases = matchSymptoms(userSymptoms);
  
  if (matchedDiseases.length > 0) {
    // If user gave a duration, check all potential diseases
    if (userDuration) {
      for (const disease of matchedDiseases) {
        const diseaseDuration = extractDiseaseMaxDuration(disease.duration);
        if (diseaseDuration && userDuration > diseaseDuration) {
          return "It is advisable to consult a doctor.";
        }
      }
    }
    if (matchedDiseases.length === 1) {
      return getRecommendation(matchedDiseases[0], ageGroup);
    } else {
      const diseaseNames = matchedDiseases.slice(0, 3).map(d => d.name).join(', ');
      return `Based on your symptoms, you might be experiencing one of the following: ${diseaseNames}. Can you provide more details about your symptoms?`;
    }
  }
  
  return "I'm not able to determine your condition based on the information provided. Could you please describe your symptoms in more detail?";
};
