
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Header from '@/components/Header';
import BlogModal from '@/components/BlogModal';
import Stethoscope from '@/components/Stethoscope';
import { Clock, Calendar, Bookmark, Share, Eye } from "lucide-react";

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  image: string;
  date: string;
  author: string;
  category: string;
  readTime?: string;
  authorImage?: string;
  sections?: Array<{
    title: string;
    content: string;
    image?: {
      url: string;
      caption?: string;
      alt: string;
    };
  }>;
  references?: string[];
  authorBio?: string;
  relatedPosts?: Array<{
    id: number;
    title: string;
    excerpt: string;
  }>;
}

const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: "Effective Remedies for Common Colds: A Comprehensive Guide",
    excerpt: "Discover natural and over-the-counter solutions that can help alleviate cold symptoms and speed up recovery.",
    image: "https://images.unsplash.com/photo-1584362917165-526a968579e8?auto=format&fit=crop&w=1200&q=80",
    date: "April 18, 2025",
    author: "Dr. Priya Sharma",
    category: "Wellness",
    readTime: "15 min read",
    authorImage: "https://api.dicebear.com/7.x/initials/svg?seed=Dr.%20Priya%20Sharma",
    sections: [
      {
        title: "Introduction to Common Colds",
        content: `
          <p>The common cold, while generally mild, affects millions of people each year and is responsible for significant discomfort and lost productivity. Understanding the nature of colds - their causes, symptoms, and effective management strategies - is essential for minimizing their impact on our daily lives.</p>
          
          <p>Common colds are viral infections of the upper respiratory tract, primarily affecting the nose and throat. While there are over 200 viruses that can cause cold symptoms, rhinoviruses are the most common culprits, accounting for approximately 30-40% of all adult colds. Despite decades of research, there is still no cure for the common cold. However, numerous remedies can help alleviate symptoms and potentially shorten the duration of illness.</p>
          
          <p>This comprehensive guide explores both conventional and natural approaches to managing cold symptoms, providing evidence-based recommendations for different age groups and conditions. Whether you're dealing with a current cold or preparing for the next cold season, this information will help you make informed decisions about your health care.</p>
        `,
        image: {
          url: "https://images.unsplash.com/photo-1583947215259-38e31be8751f?auto=format&fit=crop&w=1200&q=80",
          caption: "Common cold symptoms can significantly impact daily activities and quality of life.",
          alt: "Person with cold symptoms"
        }
      },
      {
        title: "Understanding Cold Symptoms",
        content: `
          <p>Before discussing remedies, it's important to understand the typical progression of cold symptoms, which can help in determining the most effective treatment approaches at different stages of the illness.</p>
          
          <p>Cold symptoms typically develop 1-3 days after exposure to the virus and may include:</p>
          
          <ul>
            <li><strong>Initial symptoms</strong>: Sore throat, runny or stuffy nose, and sneezing</li>
            <li><strong>Later symptoms</strong>: Coughing, decreased sense of taste and smell, mild headache, slight body aches, and low-grade fever (more common in children)</li>
          </ul>
          
          <p>Most healthy adults recover from a cold within 7-10 days, although some symptoms, particularly cough, may persist for up to two weeks. The contagious period for colds typically begins before symptoms appear and continues through the first few days of illness when symptoms are most severe.</p>
          
          <p>It's crucial to differentiate between cold symptoms and those of other respiratory conditions such as the flu, allergies, or COVID-19, as treatment approaches may differ significantly. While colds typically produce milder symptoms that develop gradually, the flu often begins suddenly with more severe symptoms including high fever, pronounced body aches, and extreme fatigue.</p>
        `
      },
      {
        title: "Over-the-Counter Medications",
        content: `
          <p>Over-the-counter (OTC) medications can provide significant symptom relief when used appropriately. Here's a comprehensive breakdown of common OTC options:</p>
          
          <h3>Pain Relievers and Fever Reducers</h3>
          <p>Medications such as acetaminophen (Tylenol), ibuprofen (Advil, Motrin), and naproxen (Aleve) can help reduce fever, headaches, and minor body aches associated with colds.</p>
          
          <p><strong>Dosage considerations:</strong> Follow package instructions carefully, particularly when treating children. Acetaminophen is generally considered safer for children, but proper dosing based on weight and age is essential.</p>
          
          <p><strong>Precautions:</strong> Avoid giving aspirin to children or teenagers due to the risk of Reye's syndrome, a rare but serious condition. Those with liver disease should use acetaminophen cautiously, while individuals with certain gastrointestinal conditions or kidney disease should consult their healthcare provider before using NSAIDs like ibuprofen or naproxen.</p>
          
          <h3>Decongestants</h3>
          <p>Decongestants like pseudoephedrine (Sudafed) and phenylephrine help reduce nasal and sinus congestion by shrinking swollen blood vessels and tissues.</p>
          
          <p><strong>Forms available:</strong> Oral tablets, liquid formulations, and nasal sprays</p>
          
          <p><strong>Precautions:</strong> These medications can raise blood pressure and interfere with sleep. They should be used with caution by people with high blood pressure, heart disease, diabetes, or thyroid disorders. Nasal spray decongestants should not be used for more than 3 consecutive days to avoid rebound congestion.</p>
          
          <h3>Antihistamines</h3>
          <p>While more commonly used for allergies, first-generation antihistamines like diphenhydramine (Benadryl) and chlorpheniramine can help reduce runny nose and sneezing.</p>
          
          <p><strong>Side effects:</strong> These medications often cause drowsiness and may help with sleep during a cold. However, they may cause dry mouth, blurred vision, and urinary retention, particularly in older adults.</p>
          
          <h3>Combination Cold Medicines</h3>
          <p>Many OTC cold products combine several medications to target multiple symptoms. While convenient, these products increase the risk of duplicate dosing if not used carefully.</p>
          
          <p><strong>Selection tips:</strong> Choose products that target only your specific symptoms to minimize unnecessary medication exposure. Always check active ingredients to avoid taking multiple products with the same components.</p>
        `,
        image: {
          url: "https://images.unsplash.com/photo-1607619056574-7b8d3ee536b2?auto=format&fit=crop&w=1200&q=80",
          caption: "Over-the-counter medications can provide relief for common cold symptoms when used appropriately.",
          alt: "Over-the-counter cold medications"
        }
      },
      {
        title: "Natural Remedies",
        content: `
          <p>For those who prefer natural approaches or wish to complement conventional treatments, several evidence-supported natural remedies may help alleviate cold symptoms:</p>
          
          <h3>Hydration</h3>
          <p>Maintaining proper hydration is fundamental to cold recovery. Adequate fluid intake helps thin mucus secretions, making them easier to clear. It also prevents dehydration that might occur during fever or reduced intake due to discomfort.</p>
          
          <p><strong>Recommended fluids:</strong></p>
          <ul>
            <li><strong>Water:</strong> The best choice for basic hydration</li>
            <li><strong>Warm broths:</strong> Provide hydration and soothing comfort</li>
            <li><strong>Herbal teas:</strong> May offer additional benefits depending on the herbs used</li>
            <li><strong>Diluted fruit juices:</strong> Provide some nutrients along with fluids</li>
          </ul>
          
          <p>Aim for at least 8-10 cups of fluid daily, more if experiencing fever.</p>
          
          <h3>Honey and Lemon</h3>
          <p>This traditional remedy combines the antimicrobial properties of honey with the vitamin C and soothing qualities of lemon.</p>
          
          <p>A 2021 systematic review published in BMJ Evidence-Based Medicine found that honey was superior to usual care for improving symptoms of upper respiratory tract infections, particularly cough frequency and severity.</p>
          
          <p><strong>How to use:</strong> Mix 1-2 tablespoons of honey with fresh lemon juice in warm (not hot) water. Sip as needed for sore throat and cough. Note that honey should not be given to children under 12 months of age due to the risk of infant botulism.</p>
          
          <h3>Saline Nasal Irrigation</h3>
          <p>Rinsing the nasal passages with saline solution helps remove virus particles, bacteria, allergens, and mucus, providing significant relief from congestion.</p>
          
          <p>A 2015 Cochrane review found that nasal saline irrigation is beneficial for relieving the symptoms of acute upper respiratory tract infections.</p>
          
          <p><strong>Methods:</strong> Nasal sprays, squeeze bottles, or neti pots can be used for irrigation. If making a saline solution at home, use distilled, sterile, or previously boiled water to prevent potential infections.</p>
        `
      },
      {
        title: "Evidence-Based Herbal Supplements",
        content: `
          <p>Several herbal supplements have shown promise in scientific studies for reducing cold symptoms or duration:</p>
          
          <h3>Zinc</h3>
          <p>Zinc lozenges or syrup, when taken within 24 hours of symptom onset, may reduce the duration and severity of cold symptoms.</p>
          
          <p>A 2017 analysis published in the Journal of the Royal Society of Medicine Open concluded that zinc acetate lozenges may increase the rate of recovery from the common cold three-fold. The recommended dosage is typically 75-95 mg of zinc per day, divided into multiple doses throughout the day while symptoms persist.</p>
          
          <p><strong>Precautions:</strong> High doses of zinc can cause nausea and interfere with the absorption of certain antibiotics. Long-term use of intranasal zinc has been linked to loss of smell.</p>
          
          <h3>Vitamin C</h3>
          <p>While vitamin C doesn't appear to prevent colds in the general population, regular supplementation may reduce the duration and severity of cold symptoms.</p>
          
          <p>A 2013 Cochrane review found that regular vitamin C supplementation reduced the duration of colds by 8% in adults and 14% in children. The typical recommended dose during a cold is 1-2 grams per day.</p>
          
          <h3>Echinacea</h3>
          <p>Some studies suggest that echinacea may help reduce the duration and severity of colds when taken at the onset of symptoms.</p>
          
          <p>A 2014 review in the Cochrane Database of Systematic Reviews found that echinacea products were associated with a reduced risk of developing a cold and a reduced duration of colds.</p>
          
          <p><strong>Usage note:</strong> Different echinacea products contain different active ingredients, making standardized recommendations difficult. Follow product-specific instructions.</p>
          
          <h3>Elderberry</h3>
          <p>Elderberry extracts have shown antiviral properties and may help reduce the severity and duration of cold and flu symptoms.</p>
          
          <p>A 2019 study published in the Journal of Functional Foods found that elderberry compounds directly inhibit the flu virus's entry and replication in human cells and help strengthen a person's immune response to the virus.</p>
          
          <p><strong>Available forms:</strong> Syrups, lozenges, gummies, and capsules. Typical dosages for syrup range from 1-2 teaspoons for children to 1-2 tablespoons for adults, taken multiple times daily.</p>
        `,
        image: {
          url: "https://images.unsplash.com/photo-1543362906-acfc16c67564?auto=format&fit=crop&w=1200&q=80",
          caption: "Herbal supplements like echinacea may help reduce cold duration when taken appropriately.",
          alt: "Herbal supplements and natural remedies"
        }
      },
      {
        title: "Rest and Self-Care Strategies",
        content: `
          <p>Beyond medications and supplements, certain lifestyle adjustments and self-care practices can significantly impact recovery:</p>
          
          <h3>Adequate Rest</h3>
          <p>Rest is crucial for supporting immune function during a cold. Sleep helps regulate immune responses and promotes recovery.</p>
          
          <p>Research suggests that sleep deprivation can impair immune function and potentially prolong illness. Aim for 7-9 hours of quality sleep per night, and consider short daytime naps if needed during illness.</p>
          
          <p>Creating optimal sleeping conditions by elevating the head to improve breathing, using a humidifier, and ensuring a comfortable room temperature can enhance rest quality during a cold.</p>
          
          <h3>Humidity and Steam Therapy</h3>
          <p>Adding moisture to the air can help ease nasal and chest congestion.</p>
          
          <p><strong>Methods include:</strong></p>
          <ul>
            <li><strong>Humidifiers:</strong> Add moisture to room air (clean regularly to prevent mold growth)</li>
            <li><strong>Steam inhalation:</strong> Inhaling steam from a bowl of hot water (be careful to avoid burns)</li>
            <li><strong>Hot showers:</strong> The steam can temporarily relieve nasal congestion</li>
          </ul>
          
          <h3>Warm Compresses</h3>
          <p>Applying a warm compress to the sinuses can help ease pain and pressure.</p>
          
          <p><strong>How to use:</strong> Dampen a washcloth with warm water, apply to the face focusing on the sinus areas for 5-10 minutes, and repeat as needed.</p>
          
          <h3>Gargling</h3>
          <p>Gargling with salt water can reduce throat pain and may help clear mucus.</p>
          
          <p>A 2005 study published in the American Journal of Preventive Medicine found that simple water gargling was effective in preventing upper respiratory tract infections.</p>
          
          <p><strong>Recipe:</strong> Dissolve 1/4 to 1/2 teaspoon of salt in 8 ounces of warm water. Gargle for 15-30 seconds, then spit out. Repeat several times daily as needed.</p>
        `
      },
      {
        title: "When to Seek Medical Attention",
        content: `
          <p>While most colds resolve without medical intervention, certain circumstances warrant professional evaluation:</p>
          
          <h3>Warning Signs in Adults</h3>
          <ul>
            <li>Fever above 101.3°F (38.5°C) or fever lasting more than 3 days</li>
            <li>Shortness of breath or difficulty breathing</li>
            <li>Severe sore throat, headache, or sinus pain</li>
            <li>Persistent cough that disrupts sleep or daily activities</li>
            <li>Symptoms that worsen after 7-10 days or fail to improve</li>
            <li>Symptoms that significantly worsen after initially improving</li>
          </ul>
          
          <h3>Warning Signs in Children</h3>
          <ul>
            <li>Fever above 100.4°F (38°C) in infants younger than 3 months</li>
            <li>Fever above 102.2°F (39°C) in older children</li>
            <li>Unusual irritability, lethargy, or refusal to eat</li>
            <li>Difficulty breathing or rapid breathing</li>
            <li>Bluish skin color</li>
            <li>Ear pain, unusual drainage from the ear</li>
            <li>Persistent cough</li>
            <li>Symptoms that worsen or fail to improve</li>
          </ul>
          
          <p>Those with certain chronic conditions such as asthma, COPD, heart disease, diabetes, or compromised immune systems should have a lower threshold for seeking medical attention, as they may be at higher risk for complications.</p>
          
          <h3>Prevention Strategies</h3>
          <p>The best remedy is prevention. Consider these evidence-based approaches to reduce your risk of catching a cold:</p>
          
          <ul>
            <li><strong>Hand hygiene:</strong> Frequent handwashing with soap and water for at least 20 seconds</li>
            <li><strong>Avoid touching face:</strong> Particularly the eyes, nose, and mouth</li>
            <li><strong>Distance from sick individuals:</strong> Avoid close contact when possible</li>
            <li><strong>Disinfect high-touch surfaces:</strong> Clean commonly touched items regularly</li>
            <li><strong>Healthy lifestyle:</strong> Regular exercise, adequate sleep, stress management, and a balanced diet support immune function</li>
          </ul>
        `,
        image: {
          url: "https://images.unsplash.com/photo-1579154204601-01588f351e67?auto=format&fit=crop&w=1200&q=80",
          caption: "Know when to consult a healthcare professional for cold symptoms that may indicate complications.",
          alt: "Doctor consultation"
        }
      },
      {
        title: "Conclusion",
        content: `
          <p>Managing cold symptoms effectively requires a multifaceted approach that may include both conventional and natural remedies. While no single treatment can cure the common cold, the strategic use of appropriate remedies can significantly reduce discomfort and potentially shorten the duration of illness.</p>
          
          <p>Remember that individual responses to cold remedies vary, and what works for one person may not work for another. It's often beneficial to develop a personalized cold management plan based on your specific symptoms, medical history, and preferences.</p>
          
          <p>By understanding the evidence behind various treatment options and recognizing when to seek medical attention, you can make informed decisions about cold management for yourself and your family. With proper care, most colds resolve completely within 7-10 days, allowing you to return to your normal activities and quality of life.</p>
        `
      }
    ],
    references: [
      "Allan GM, Arroll B. Prevention and treatment of the common cold: making sense of the evidence. CMAJ. 2014;186(3):190-199.",
      "Hemilä H, Chalker E. Zinc for the common cold. Cochrane Database Syst Rev. 2013;(6):CD001364.",
      "Hemilä H, Chalker E. Vitamin C for preventing and treating the common cold. Cochrane Database Syst Rev. 2013;(1):CD000980.",
      "Karsch-Völk M, Barrett B, Kiefer D, Bauer R, Ardjomand-Woelkart K, Linde K. Echinacea for preventing and treating the common cold. Cochrane Database Syst Rev. 2014;(2):CD000530.",
      "Sexton DJ, McClain MT. The common cold in adults: Treatment and prevention. UpToDate. Accessed April 15, 2025."
    ],
    authorBio: "Dr. Priya Sharma is a board-certified family physician with over 15 years of experience in integrative medicine. She specializes in blending evidence-based conventional treatments with complementary approaches for optimal patient care.",
    relatedPosts: [
      {
        id: 2,
        title: "Top Foods That Boost Your Immune System",
        excerpt: "Learn about the nutrients and foods that can strengthen your body's natural defenses against illness."
      },
      {
        id: 4,
        title: "When to Visit a Doctor: Warning Signs You Shouldn't Ignore",
        excerpt: "Recognize the symptoms that warrant professional medical attention and when home remedies aren't enough."
      }
    ]
  },
  {
    id: 2,
    title: "Top Foods That Boost Your Immune System",
    excerpt: "Learn about the nutrients and foods that can strengthen your body's natural defenses against illness.",
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=1200&q=80",
    date: "April 12, 2025",
    author: "Dr. Vikram Singh",
    category: "Nutrition",
    readTime: "12 min read",
    authorImage: "https://api.dicebear.com/7.x/initials/svg?seed=Dr.%20Vikram%20Singh",
    sections: [
      {
        title: "The Foundation of Immune Health",
        content: `
          <p>Your immune system is your body's complex network of cells, tissues, and organs that work together to defend against harmful pathogens. While no single food or nutrient can "boost" immunity in isolation, research consistently shows that a balanced diet rich in certain nutrients can support optimal immune function.</p>
          
          <p>The connection between nutrition and immunity isn't just folk wisdom—it's backed by scientific evidence. Deficiencies in certain vitamins, minerals, and other nutrients can impair various aspects of immune response, from the production of protective antibodies to the function of immune cells that identify and eliminate threats.</p>
          
          <p>This comprehensive guide explores the scientific evidence behind immune-supporting nutrients and the foods that contain them in abundance. By incorporating these foods into your regular diet, you can provide your body with the building blocks it needs to maintain a robust immune system.</p>
        `,
        image: {
          url: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&w=1200&q=80",
          caption: "A varied diet rich in fruits, vegetables, and other whole foods provides essential nutrients for immune function.",
          alt: "Assortment of healthy foods"
        }
      },
      {
        title: "Vitamin C: Beyond the Common Cold",
        content: `
          <p>Vitamin C (ascorbic acid) is perhaps the most well-known nutrient associated with immune health. This water-soluble vitamin acts as a powerful antioxidant, protecting cells from damage caused by free radicals that can impair immune function.</p>
          
          <h3>How Vitamin C Supports Immunity:</h3>
          <ul>
            <li>Enhances the production and function of white blood cells, including neutrophils, lymphocytes, and phagocytes</li>
            <li>Supports cellular functions of both the innate and adaptive immune systems</li>
            <li>Helps maintain the integrity of skin and mucosal barriers—your first line of defense against pathogens</li>
            <li>May reduce the duration and severity of colds in some populations</li>
          </ul>
          
          <h3>Top Food Sources of Vitamin C:</h3>
          <p>While citrus fruits are famous for their vitamin C content, many other foods contain this essential nutrient in even higher amounts:</p>
          
          <ul>
            <li><strong>Red bell peppers</strong>: One medium pepper contains 152mg (169% of the Daily Value)</li>
            <li><strong>Kiwifruit</strong>: One medium fruit provides 64mg (71% DV)</li>
            <li><strong>Strawberries</strong>: One cup offers 89mg (99% DV)</li>
            <li><strong>Broccoli</strong>: One cup cooked contains 81mg (90% DV)</li>
            <li><strong>Brussels sprouts</strong>: One cup cooked provides 97mg (108% DV)</li>
            <li><strong>Oranges</strong>: One medium fruit contains 70mg (78% DV)</li>
            <li><strong>Tomatoes</strong>: One medium raw tomato offers 16mg (18% DV)</li>
          </ul>
          
          <p>For optimal benefit, consume vitamin C-rich foods daily, as this water-soluble vitamin isn't stored in significant amounts in the body. Fresh, raw consumption is ideal when possible, as vitamin C is heat-sensitive and water-soluble, meaning it can be lost during cooking.</p>
        `
      },
      {
        title: "Zinc: The Immune System's Gatekeeper",
        content: `
          <p>Zinc is a mineral that plays crucial roles in numerous aspects of cellular function, including many specific to immune health. Even mild zinc deficiency can impair immune function, and zinc status can decline with age, making adequate intake particularly important for older adults.</p>
          
          <h3>How Zinc Supports Immunity:</h3>
          <ul>
            <li>Required for the development and activation of T-lymphocytes, key players in the adaptive immune response</li>
            <li>Acts as an antioxidant, protecting against free radical damage</li>
            <li>Helps maintain the integrity of skin and mucosal membranes</li>
            <li>May reduce the duration and severity of colds when taken as a supplement within 24 hours of symptom onset</li>
            <li>Supports the function of natural killer cells that identify and eliminate infected cells</li>
          </ul>
          
          <h3>Top Food Sources of Zinc:</h3>
          <p>Animal foods provide zinc in forms that are more bioavailable (easily absorbed) than plant sources:</p>
          
          <ul>
            <li><strong>Oysters</strong>: Far exceeding other sources, six medium oysters provide 32mg (291% DV)</li>
            <li><strong>Beef</strong>: 3 ounces of cooked beef contains 5.3mg (48% DV)</li>
            <li><strong>Crab</strong>: 3 ounces of cooked crab provides 4.7mg (43% DV)</li>
            <li><strong>Lobster</strong>: 3 ounces cooked contains 3.4mg (31% DV)</li>
            <li><strong>Pumpkin seeds</strong>: 1 ounce roasted seeds offers 2.2mg (20% DV)</li>
            <li><strong>Chickpeas</strong>: 1 cup cooked provides 2.5mg (23% DV)</li>
            <li><strong>Yogurt</strong>: 8 ounces contains about 1.7mg (15% DV)</li>
            <li><strong>Cashews</strong>: 1 ounce roasted nuts offers 1.6mg (15% DV)</li>
          </ul>
          
          <p>Note that phytates in whole grains, legumes, and other plant foods can bind to zinc and reduce its absorption. Soaking, sprouting, or fermenting these foods before consumption can reduce phytate content and increase zinc bioavailability.</p>
        `,
        image: {
          url: "https://images.unsplash.com/photo-1544252890-c3de9d0de328?auto=format&fit=crop&w=1200&q=80",
          caption: "Zinc-rich foods like pumpkin seeds provide essential minerals that support immune function.",
          alt: "Pumpkin seeds and nuts"
        }
      },
      {
        title: "Vitamin D: The Sunshine Nutrient",
        content: `
          <p>Vitamin D stands out among immune-supporting nutrients because it functions more like a hormone than a typical vitamin. While it can be obtained from certain foods, our bodies also produce vitamin D when skin is exposed to sunlight. Research increasingly highlights vitamin D's critical importance for immune regulation.</p>
          
          <h3>How Vitamin D Supports Immunity:</h3>
          <ul>
            <li>Enhances the pathogen-fighting effects of monocytes and macrophages (white blood cells)</li>
            <li>Decreases inflammation and promotes anti-inflammatory cytokines</li>
            <li>Helps maintain the integrity of the physical epithelial barriers that protect against infection</li>
            <li>Plays a role in both innate and adaptive immune responses</li>
            <li>May help prevent respiratory infections, particularly in those with deficiency</li>
          </ul>
          
          <p>A 2017 meta-analysis published in the British Medical Journal found that vitamin D supplementation protected against acute respiratory infections, with the strongest benefit seen in those who were severely deficient.</p>
          
          <h3>Top Food Sources of Vitamin D:</h3>
          <p>Relatively few foods naturally contain significant amounts of vitamin D:</p>
          
          <ul>
            <li><strong>Fatty fish</strong>: 3 ounces of cooked salmon provides 570 IU (71% DV)</li>
            <li><strong>Mushrooms exposed to UV light</strong>: 1 cup offers approximately 400 IU (50% DV)</li>
            <li><strong>Egg yolks</strong>: One large egg contains about 41 IU (5% DV)</li>
            <li><strong>Fortified foods</strong>: Many milk products, orange juices, and cereals are fortified with vitamin D, typically providing 100-144 IU per serving (13-18% DV)</li>
          </ul>
          
          <p>For many people, especially those living in northern latitudes or with limited sun exposure, vitamin D supplementation may be necessary to maintain optimal levels, particularly during winter months. Consider speaking with your healthcare provider about testing your vitamin D status and appropriate supplementation if needed.</p>
        `
      },
      {
        title: "Prebiotics and Probiotics: Nurturing Gut Health",
        content: `
          <p>The connection between gut health and immunity has become increasingly clear through scientific research. Around 70% of your immune system resides in your gut-associated lymphoid tissue (GALT), making the health of your digestive system directly relevant to your overall immune function.</p>
          
          <h3>How Gut Bacteria Support Immunity:</h3>
          <ul>
            <li>Train and regulate immune cells</li>
            <li>Produce short-chain fatty acids that reduce inflammation</li>
            <li>Compete with pathogenic bacteria for resources and attachment sites</li>
            <li>Maintain the integrity of the intestinal barrier</li>
            <li>Communicate with immune cells to coordinate appropriate responses</li>
          </ul>
          
          <h3>Prebiotic Foods: Fuel for Beneficial Bacteria</h3>
          <p>Prebiotics are non-digestible food components that promote the growth of beneficial bacteria in the gut. Key sources include:</p>
          
          <ul>
            <li><strong>Garlic and onions</strong>: Rich in inulin and fructooligosaccharides (FOS)</li>
            <li><strong>Jerusalem artichokes</strong>: High in inulin fiber</li>
            <li><strong>Bananas</strong>: Particularly slightly unripe ones, contain resistant starch</li>
            <li><strong>Asparagus</strong>: Contains inulin and other prebiotic fibers</li>
            <li><strong>Oats</strong>: Provide beta-glucan fibers</li>
            <li><strong>Apples</strong>: Contain pectin, a soluble fiber with prebiotic effects</li>
            <li><strong>Flaxseeds</strong>: Offer prebiotic fibers that support beneficial bacteria</li>
          </ul>
          
          <h3>Probiotic Foods: Living Beneficial Microorganisms</h3>
          <p>Probiotic foods contain live beneficial bacteria that can temporarily colonize the gut and provide health benefits. Top sources include:</p>
          
          <ul>
            <li><strong>Yogurt</strong>: Look for varieties with "live and active cultures"</li>
            <li><strong>Kefir</strong>: A fermented milk drink with diverse probiotic strains</li>
            <li><strong>Sauerkraut</strong>: Raw, unpasteurized varieties contain living probiotics</li>
            <li><strong>Kimchi</strong>: Korean fermented vegetables rich in lactic acid bacteria</li>
            <li><strong>Tempeh</strong>: Fermented soybeans with probiotic potential</li>
            <li><strong>Miso</strong>: Fermented soybean paste used in Japanese cuisine</li>
            <li><strong>Kombucha</strong>: Fermented tea with probiotic properties</li>
          </ul>
          
          <p>To maximize benefits, consume a variety of both prebiotic and probiotic foods regularly. For probiotics specifically, choose unpasteurized versions when possible, as the heat of pasteurization kills beneficial bacteria.</p>
        `,
        image: {
          url: "https://images.unsplash.com/photo-1556707752-481d500a2c58?auto=format&fit=crop&w=1200&q=80",
          caption: "Fermented foods like kimchi contain beneficial probiotics that support gut health and immunity.",
          alt: "Fermented foods"
        }
      },
      {
        title: "Antioxidant-Rich Foods: Colorful Protection",
        content: `
          <p>Antioxidants are compounds that help neutralize free radicals—unstable molecules that can damage cells and impair immune function. Many plant foods are rich in antioxidants like vitamin E, beta-carotene, flavonoids, and polyphenols.</p>
          
          <h3>How Antioxidants Support Immunity:</h3>
          <ul>
            <li>Protect immune cells from oxidative damage</li>
            <li>Help maintain the integrity of cell membranes</li>
            <li>May enhance T-cell (white blood cell) function</li>
            <li>Support anti-inflammatory processes</li>
            <li>Some have direct antimicrobial effects</li>
          </ul>
          
          <h3>Top Antioxidant-Rich Foods:</h3>
          
          <h4>Vitamin E-Rich Foods:</h4>
          <ul>
            <li><strong>Sunflower seeds</strong>: 1 ounce provides 7.4mg (49% DV)</li>
            <li><strong>Almonds</strong>: 1 ounce offers 6.8mg (45% DV)</li>
            <li><strong>Hazelnuts</strong>: 1 ounce contains 4.3mg (29% DV)</li>
            <li><strong>Avocados</strong>: One medium fruit provides 2.7mg (18% DV)</li>
          </ul>
          
          <h4>Beta-Carotene-Rich Foods:</h4>
          <ul>
            <li><strong>Sweet potatoes</strong>: One medium, baked sweet potato contains 1,403mcg RAE</li>
            <li><strong>Carrots</strong>: One cup raw contains 1,069mcg RAE</li>
            <li><strong>Spinach</strong>: One cup cooked provides 573mcg RAE</li>
            <li><strong>Kale</strong>: One cup raw contains 90mcg RAE</li>
          </ul>
          
          <h4>Flavonoid-Rich Foods:</h4>
          <ul>
            <li><strong>Berries</strong>: Especially blueberries, blackberries, and strawberries</li>
            <li><strong>Citrus fruits</strong>: Particularly in the white pith and membranes</li>
            <li><strong>Tea</strong>: Green and black varieties</li>
            <li><strong>Dark chocolate</strong>: With high cocoa content (70%+)</li>
          </ul>
          
          <p>For maximum benefit, aim to "eat the rainbow" by consuming fruits and vegetables of various colors daily, as different colored produce contains different antioxidant compounds.</p>
        `
      },
      {
        title: "Protein: Building Blocks for Immune Cells",
        content: `
          <p>Protein is fundamentally important for immune function, as antibodies and many components of immune cells are made of protein. Additionally, protein deficiency impairs virtually all aspects of immunity.</p>
          
          <h3>How Protein Supports Immunity:</h3>
          <ul>
            <li>Provides amino acids needed to build and maintain immune cells</li>
            <li>Required for the production of antibodies</li>
            <li>Many immune signaling molecules (cytokines) are proteins</li>
            <li>Supports tissue repair following inflammation or infection</li>
          </ul>
          
          <h3>Quality Protein Sources:</h3>
          
          <h4>Animal Sources (Complete Proteins):</h4>
          <ul>
            <li><strong>Lean meats</strong>: Chicken breast (3oz) contains about 26g protein</li>
            <li><strong>Fish</strong>: Salmon (3oz) provides approximately 22g protein</li>
            <li><strong>Eggs</strong>: One large egg contains about 6g protein</li>
            <li><strong>Dairy</strong>: Greek yogurt (6oz) offers 17-20g protein</li>
          </ul>
          
          <h4>Plant Sources:</h4>
          <ul>
            <li><strong>Legumes</strong>: Lentils (1 cup cooked) provide about 18g protein</li>
            <li><strong>Tofu</strong>: 3oz contains approximately 8g protein</li>
            <li><strong>Quinoa</strong>: 1 cup cooked offers about 8g protein</li>
            <li><strong>Nuts and seeds</strong>: 1oz of almonds provides about 6g protein</li>
          </ul>
          
          <p>While plant proteins are often incomplete (missing some essential amino acids), consuming a variety of plant proteins throughout the day can provide all essential amino acids. Combining legumes with grains, seeds, or nuts creates complementary protein combinations.</p>
          
          <p>For optimal immune support, aim to distribute protein intake throughout the day rather than consuming it primarily at one meal.</p>
        `,
        image: {
          url: "https://images.unsplash.com/photo-1498654077810-12c21d4d6dc3?auto=format&fit=crop&w=1200&q=80",
          caption: "Quality protein sources provide the building blocks needed for immune cell production and function.",
          alt: "Various protein sources"
        }
      },
      {
        title: "Putting It All Together: Creating an Immune-Supporting Diet",
        content: `
          <p>Rather than focusing on single "superfoods," the most effective approach to supporting immune function through diet is to adopt an overall eating pattern rich in diverse nutrients. Here are practical strategies for implementing the research-backed principles discussed:</p>
          
          <h3>Daily Dietary Checklist for Immune Support:</h3>
          <ol>
            <li><strong>Eat the rainbow</strong>: Aim for 5+ servings of varied fruits and vegetables daily</li>
            <li><strong>Include protein at each meal</strong>: Both plant and animal sources as appropriate for your dietary preferences</li>
            <li><strong>Incorporate fermented foods</strong>: Include at least one serving of probiotic-rich food daily</li>
            <li><strong>Choose whole grains</strong>: Opt for minimally processed grains that retain their fiber and nutrients</li>
            <li><strong>Include healthy fats</strong>: Especially omega-3 rich sources like fatty fish, walnuts, and flaxseeds</li>
            <li><strong>Stay hydrated</strong>: Adequate fluid intake supports the production of lymph, which carries immune cells</li>
            <li><strong>Limit added sugars</strong>: High sugar intake may temporarily suppress immune function</li>
          </ol>
          
          <h3>Sample Day of Immune-Supporting Meals:</h3>
          
          <p><strong>Breakfast:</strong> Greek yogurt topped with berries, walnuts, and a drizzle of honey; green tea</p>
          
          <p><strong>Lunch:</strong> Quinoa bowl with roasted sweet potatoes, kale, chickpeas, avocado, and pumpkin seeds, dressed with lemon and olive oil</p>
          
          <p><strong>Snack:</strong> Red bell pepper strips with hummus; an orange</p>
          
          <p><strong>Dinner:</strong> Baked salmon with garlic, ginger, and turmeric; steamed broccoli; brown rice</p>
          
          <p><strong>Evening:</strong> Chamomile tea with a small piece of dark chocolate</p>
          
          <h3>Beyond Diet: Other Factors That Impact Immune Function</h3>
          <p>While nutrition is crucial, remember that immune health is influenced by many factors:</p>
          
          <ul>
            <li><strong>Sleep</strong>: Aim for 7-9 quality hours nightly</li>
            <li><strong>Physical activity</strong>: Moderate regular exercise supports immune function</li>
            <li><strong>Stress management</strong>: Chronic stress impairs immunity</li>
            <li><strong>Alcohol consumption</strong>: Limit intake, as excessive alcohol can suppress immune function</li>
            <li><strong>Smoking</strong>: Avoid, as it significantly impairs immunity</li>
          </ul>
          
          <p>By combining a nutrient-rich diet with these lifestyle factors, you can create an environment that supports optimal immune function year-round.</p>
        `
      },
      {
        title: "Conclusion",
        content: `
          <p>The foods we eat provide the foundation for a robust immune system. While no single food can guarantee protection against illness, a diet rich in diverse nutrients gives your body the tools it needs to maintain strong immune defenses.</p>
          
          <p>Remember that consistency matters more than occasional "superfoods." Focus on developing sustainable eating patterns that incorporate a variety of nutrients from whole food sources daily.</p>
          
          <p>Additionally, nutrition is just one piece of the immune health puzzle. Adequate sleep, regular physical activity, stress management, and other lifestyle factors work synergistically with a healthy diet to support optimal immune function.</p>
          
          <p>By making informed dietary choices based on scientific evidence, you can help your body maintain the complex, finely-tuned immune system that keeps you healthy throughout the changing seasons.</p>
        `
      }
    ],
    references: [
      "Calder PC. Nutrition, immunity and COVID-19. BMJ Nutrition, Prevention & Health. 2020;3(1):e000085.",
      "Gombart AF, Pierre A, Maggini S. A Review of Micronutrients and the Immune System-Working in Harmony to Reduce the Risk of Infection. Nutrients. 2020;12(1):236.",
      "Iddir M, Brito A, Dingeo G, et al. Strengthening the Immune System and Reducing Inflammation and Oxidative Stress through Diet and Nutrition: Considerations during the COVID-19 Crisis. Nutrients. 2020;12(6):1562.",
      "Maggini S, Pierre A, Calder PC. Immune Function and Micronutrient Requirements Change over the Life Course. Nutrients. 2018;10(10):1531.",
      "Zimmermann P, Curtis N. Factors That Influence the Immune Response to Vaccination. Clinical Microbiology Reviews. 2019;32(2):e00084-18."
    ],
    authorBio: "Dr. Vikram Singh is a clinical nutritionist and immunologist with a focus on nutrition's impact on immune health. He has published numerous peer-reviewed articles on nutritional immunology and serves as a consultant for several health organizations.",
    relatedPosts: [
      {
        id: 1,
        title: "Effective Remedies for Common Colds: A Comprehensive Guide",
        excerpt: "Discover natural and over-the-counter solutions that can help alleviate cold symptoms and speed up recovery."
      },
      {
        id: 5,
        title: "Self-Care Tips During Seasonal Changes",
        excerpt: "Practical advice for maintaining wellness during seasonal transitions, when many people experience health challenges."
      }
    ]
  },
  {
    id: 3,
    title: "Understanding Medication Dosage for Children",
    excerpt: "A comprehensive guide to safe and effective medication dosing practices for children of different age groups.",
    image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=1200&q=80",
    date: "April 5, 2025",
    author: "Dr. Ananya Desai",
    category: "Pediatrics",
    readTime: "18 min read"
  },
  {
    id: 4,
    title: "When to Visit a Doctor: Warning Signs You Shouldn't Ignore",
    excerpt: "Recognize the symptoms that warrant professional medical attention and when home remedies aren't enough.",
    image: "https://images.unsplash.com/photo-1666214280391-8ff5bd3c0bf0?auto=format&fit=crop&w=1200&q=80",
    date: "March 28, 2025",
    author: "Dr. Rajesh Kumar",
    category: "Healthcare",
    readTime: "14 min read"
  },
  {
    id: 5,
    title: "Self-Care Tips During Seasonal Changes",
    excerpt: "Practical advice for maintaining wellness during seasonal transitions, when many people experience health challenges.",
    image: "https://images.unsplash.com/photo-1518241353330-0f7941c2d9b5?auto=format&fit=crop&w=1200&q=80",
    date: "March 20, 2025",
    author: "Dr. Priya Sharma",
    category: "Wellness",
    readTime: "10 min read"
  }
];

const BlogsPage = () => {
  const [selectedBlog, setSelectedBlog] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isSignupOpen, setIsSignupOpen] = useState(false);
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('carecrafter_user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const mockUser = {
      name: "Demo User",
      email: "demo@example.com",
    };
    localStorage.setItem('carecrafter_user', JSON.stringify(mockUser));
    setUser(mockUser);
    setIsLoginOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('carecrafter_user');
    setUser(null);
  };

  const handleReadMore = (blog: any) => {
    setSelectedBlog(blog);
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        currentPage="blogs"
        user={user}
        onLogout={handleLogout}
        setIsLoginOpen={setIsLoginOpen}
        setIsSignupOpen={setIsSignupOpen}
        isLoginOpen={isLoginOpen}
        isSignupOpen={isSignupOpen}
        handleLogin={handleLogin}
      />

      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <a href="/">
              <img 
                src="/placeholder.svg" 
                alt="CareCrafter Logo" 
                className="h-10 w-auto mr-3"
              />
            </a>
            <h1 className="text-xl font-bold text-blue-900">CareCrafter</h1>
          </div>
          
          <nav className="hidden md:flex space-x-6">
            <a href="/" className="text-gray-600 hover:text-blue-700">Home</a>
            <a href="/about" className="text-gray-600 hover:text-blue-700">About</a>
            <a href="/contact" className="text-gray-600 hover:text-blue-700">Contact Us</a>
            <a href="/blogs" className="text-blue-900 font-medium hover:text-blue-700">Blogs</a>
          </nav>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Health & Wellness Blog</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Expert insights and practical advice to help you take control of your health
          </p>
        </div>

        {/* Featured Blog Post */}
        <div className="mb-16">
          <Card className="overflow-hidden">
            <div className="md:flex">
              <div className="md:w-2/5">
                <img 
                  src={blogPosts[0].image} 
                  alt={blogPosts[0].title} 
                  className="w-full h-full object-cover"
                  style={{ minHeight: "400px" }}
                />
              </div>
              <div className="md:w-3/5">
                <CardHeader>
                  <div className="flex items-center text-sm text-blue-700 mb-2">
                    <span className="uppercase font-semibold">{blogPosts[0].category}</span>
                    <span className="mx-2">•</span>
                    <span className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      {blogPosts[0].readTime}
                    </span>
                    <span className="mx-2">•</span>
                    <span className="flex items-center">
                      <Calendar className="h-4 w-4 mr-1" />
                      {blogPosts[0].date}
                    </span>
                  </div>
                  <CardTitle className="text-3xl">{blogPosts[0].title}</CardTitle>
                  <CardDescription className="text-lg">
                    {blogPosts[0].excerpt}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700">
                    Common colds affect millions of people each year, but effective remedies can make a significant difference in recovery time and symptom management. From hydration to rest, and from over-the-counter medications to natural approaches, this comprehensive guide explores the best ways to combat cold symptoms.
                  </p>
                </CardContent>
                <CardFooter className="flex justify-between items-center">
                  <div className="flex items-center">
                    <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-800 font-bold text-sm mr-3 overflow-hidden">
                      <img 
                        src={blogPosts[0].authorImage || `https://api.dicebear.com/7.x/initials/svg?seed=${blogPosts[0].author}`}
                        alt={blogPosts[0].author}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <span className="font-medium text-gray-900">By {blogPosts[0].author}</span>
                  </div>
                  <button
                    onClick={() => handleReadMore(blogPosts[0])}
                    className="text-blue-700 hover:text-blue-800 font-medium flex items-center"
                  >
                    Read more
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </button>
                </CardFooter>
              </div>
            </div>
          </Card>
        </div>

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.slice(1).map(post => (
            <Card key={post.id} className="overflow-hidden flex flex-col h-full">
              <div className="h-48 overflow-hidden">
                <img 
                  src={post.image} 
                  alt={post.title} 
                  className="w-full h-full object-cover"
                />
              </div>
              <CardHeader>
                <div className="flex items-center text-sm text-blue-700 mb-2">
                  <span className="uppercase font-semibold">{post.category}</span>
                  <span className="mx-2">•</span>
                  <span className="flex items-center">
                    <Clock className="h-4 w-4 mr-1" />
                    {post.readTime || "10 min read"}
                  </span>
                </div>
                <CardTitle>{post.title}</CardTitle>
                <CardDescription>{post.excerpt}</CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-gray-700">
                  {post.sections && post.sections[0] ? 
                    post.sections[0].content.replace(/<[^>]*>?/gm, '').substring(0, 150) + "..." : 
                    "This article provides detailed information and expert insights on " + post.title.toLowerCase() + "."}
                </p>
              </CardContent>
              <CardFooter className="flex justify-between items-center">
                <div className="flex items-center">
                  <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-800 font-bold text-xs mr-3 overflow-hidden">
                    <img 
                      src={post.authorImage || `https://api.dicebear.com/7.x/initials/svg?seed=${post.author}`}
                      alt={post.author}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <span className="font-medium text-sm text-gray-900">{post.author}</span>
                </div>
                <button
                  onClick={() => handleReadMore(post)}
                  className="text-blue-700 hover:text-blue-800 font-medium text-sm flex items-center"
                >
                  Read more
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="mt-16 bg-blue-50 rounded-xl p-8 text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Subscribe to Our Newsletter</h3>
          <p className="text-gray-700 mb-6 max-w-2xl mx-auto">
            Stay updated with the latest health tips, research, and wellness advice delivered straight to your inbox.
          </p>
          <div className="flex max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-grow px-4 py-2 rounded-l-md border-y border-l border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <button className="px-4 py-2 bg-blue-800 text-white rounded-r-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
              Subscribe
            </button>
          </div>
        </div>
      </div>

      {selectedBlog && (
        <BlogModal 
          isOpen={isModalOpen} 
          onClose={() => setIsModalOpen(false)} 
          blog={selectedBlog} 
        />
      )}

      <footer className="bg-blue-900 text-white py-12 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center mb-8">
            <img src="/placeholder.svg" alt="CareCrafter Logo" className="h-12 w-auto mb-4" />
            <h2 className="text-2xl font-bold">CareCrafter</h2>
          </div>
          
          <div className="border-t border-white/20 pt-8 text-center">
            <p className="text-sm">&copy; {new Date().getFullYear()} CareCrafter. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default BlogsPage;
