/*
 * Global Supplements Academy — demo content
 * ------------------------------------------------------------
 * All course content lives here so it can be edited without
 * touching the app code. Each course is made of modules of
 * three kinds:
 *   video        – { type:"video", title, duration, youtubeId?, src?, summary, keyPoints[] }
 *                  Leave youtubeId/src empty to show the demo placeholder player.
 *   presentation – { type:"presentation", title, slides:[{ heading, body?, bullets?, stat? }] }
 *   quiz         – { type:"quiz", title, passMark (0-1), questions:[{ q, options[], answer (index), explain }] }
 *
 * NOTE: copy is illustrative demo content written for the proof of
 * concept and must be reviewed by the technical team before use.
 */

window.ACADEMY = {
  brands: {
    naf: {
      id: "naf",
      name: "NAF",
      fullName: "NAF Equine",
      logo: "assets/logos/naf-logo.png",
      logoOnDark: true,
      species: "Horses",
      tagline: "Five Star nutrition for every horse",
      intro:
        "Learn the science behind NAF's Five Star supplements — from joint care and digestion to performance and the everyday needs of the horse.",
      site: "https://nafequine.com/",
    },
    nvc: {
      id: "nvc",
      name: "NVC",
      fullName: "Natural VetCare",
      logo: "assets/logos/nvc-logo.png",
      logoOnDark: false,
      species: "Dogs",
      tagline: "For waggier tails",
      intro:
        "Vet-approved, all-natural daily care for dogs. Get to know the range that keeps tums happy, joints moving and tails wagging.",
      site: "https://naturalvetcare.co.uk/",
    },
    nutrilabs: {
      id: "nutrilabs",
      name: "Nutrilabs",
      fullName: "NutriLabs",
      logo: "assets/logos/nutrilabs-logo-white.png",
      logoOnDark: true,
      species: "Dogs, cats & horses",
      tagline: "High-quality feed supplements, developed with vets",
      intro:
        "Clinically-minded supplements for veterinary practice. Build confidence recommending NutriLabs products for gastric, joint and respiratory support.",
      site: "https://nutrilabs.eu/en/",
    },
  },

  courses: [
    /* ======================= NAF ======================= */
    {
      id: "naf-joints",
      brand: "naf",
      title: "Equine Joint Health Essentials",
      level: "Foundation",
      minutes: 25,
      audience: "Retail staff, riders & yard managers",
      summary:
        "How horse joints work, why they come under pressure, and where Five Star Superflex fits in a joint-care programme.",
      cover: "joints",
      modules: [
        {
          id: "m1",
          type: "video",
          title: "Inside the equine joint",
          duration: "6:40",
          youtubeId: "",
          summary:
            "A short walkthrough of synovial joint anatomy — cartilage, synovial fluid and the joint capsule — and how training load, age and conformation affect them.",
          keyPoints: [
            "Synovial joints rely on healthy cartilage and fluid to move smoothly.",
            "Workload, age and conformation all increase wear over time.",
            "Nutritional support works best as part of a long-term programme.",
          ],
        },
        {
          id: "m2",
          type: "presentation",
          title: "Supporting joints with nutrition",
          slides: [
            {
              heading: "Why joint support matters",
              body: "Every stride puts load through the horse's limbs. Over a lifetime that adds up to millions of loading cycles.",
              stat: { value: "60%", label: "of a horse's weight is carried by the forelimbs" },
            },
            {
              heading: "Which horses benefit?",
              bullets: [
                "Performance horses in regular, demanding work",
                "Veterans with stiffness after rest",
                "Youngsters growing and starting work",
                "Horses on hard or uneven ground",
              ],
            },
            {
              heading: "Five Star Superflex",
              body: "NAF's flagship joint supplement, formulated to provide comprehensive nutritional support for healthy joints in horses of all ages and disciplines.",
              bullets: ["Daily feeding for consistency", "Loading rate for the first weeks", "Available in powder and liquid"],
            },
            {
              heading: "Talking to customers",
              bullets: [
                "Ask about age, workload and any recent changes",
                "Recommend a consistent, long-term approach",
                "Refer lameness concerns to a vet first",
                "Mention the free NAF nutritional advice line",
              ],
            },
          ],
        },
        {
          id: "m3",
          type: "quiz",
          title: "Joint health knowledge check",
          passMark: 0.8,
          questions: [
            {
              q: "Which structure helps joints move smoothly by reducing friction?",
              options: ["Hoof wall", "Synovial fluid", "Tendon sheath", "Coffin bone"],
              answer: 1,
              explain: "Synovial fluid lubricates the joint and nourishes the cartilage.",
            },
            {
              q: "Roughly how much of a horse's bodyweight do the forelimbs carry?",
              options: ["About 20%", "About 40%", "About 60%", "About 90%"],
              answer: 2,
              explain: "The forelimbs carry around 60% of bodyweight, which is why they are prone to wear.",
            },
            {
              q: "A customer's horse is suddenly lame. What should you advise first?",
              options: [
                "Double the Superflex dose",
                "Contact their vet",
                "Switch to a different supplement",
                "Turn the horse out for a week",
              ],
              answer: 1,
              explain: "Supplements support healthy joints — sudden lameness always needs a veterinary assessment first.",
            },
            {
              q: "Which horse would NOT typically be considered for joint support?",
              options: ["A veteran stiff after rest", "A busy eventer", "A youngster starting work", "None — all could benefit"],
              answer: 3,
              explain: "Horses of all ages and disciplines can benefit from nutritional joint support.",
            },
            {
              q: "What gives the best results with a joint supplement?",
              options: ["Feeding only before competitions", "Consistent, long-term daily feeding", "Feeding once a week", "Feeding only in winter"],
              answer: 1,
              explain: "Consistency is key: joint support is a long-term programme, not a quick fix.",
            },
          ],
        },
      ],
    },
    {
      id: "naf-gut",
      brand: "naf",
      title: "The Equine Digestive System",
      level: "Intermediate",
      minutes: 30,
      audience: "Retail staff & nutrition advisors",
      summary:
        "From the stomach to the hindgut: understand equine digestion and how Pink Powder and Gastro Aid support it.",
      cover: "gut",
      modules: [
        {
          id: "m1",
          type: "video",
          title: "A trickle-feeder's gut",
          duration: "8:15",
          youtubeId: "",
          summary:
            "Horses evolved to graze for up to 16 hours a day. This film explains how the small stomach, long small intestine and large fermenting hindgut work together.",
          keyPoints: [
            "The horse's stomach is small and produces acid continuously.",
            "Fibre is fermented by microbes in the hindgut.",
            "Sudden changes to diet or routine can upset the gut.",
          ],
        },
        {
          id: "m2",
          type: "presentation",
          title: "Digestive support from NAF",
          slides: [
            {
              heading: "Built to graze",
              body: "Horses evolved to eat little and often. Modern management — meals, stabling and travel — can be at odds with that design.",
              stat: { value: "16 hrs", label: "a day a horse may naturally spend foraging" },
            },
            {
              heading: "Common digestive challenges",
              bullets: ["Long gaps between forage", "High-starch hard feed", "Stress from travel and competition", "Sudden feed changes"],
            },
            {
              heading: "Pink Powder",
              body: "A long-standing NAF favourite, Pink Powder is a digestive supplement designed to support a healthy hindgut and good condition.",
            },
            {
              heading: "Gastro Aid",
              body: "Formulated to support the stomach of horses in work and those prone to stress, helping maintain a healthy gastric environment.",
            },
            {
              heading: "Management first",
              bullets: ["Maximise forage and turnout", "Feed little and often", "Make changes gradually", "Supplement to support, not replace, good management"],
            },
          ],
        },
        {
          id: "m3",
          type: "quiz",
          title: "Digestion knowledge check",
          passMark: 0.8,
          questions: [
            {
              q: "Where is fibre mainly fermented in the horse?",
              options: ["Stomach", "Small intestine", "Hindgut", "Oesophagus"],
              answer: 2,
              explain: "Microbes in the caecum and colon (the hindgut) ferment fibre.",
            },
            {
              q: "Which feeding pattern best suits a horse's digestive system?",
              options: ["Two large meals a day", "Little and often", "One big meal at night", "Fasting before exercise"],
              answer: 1,
              explain: "Horses are trickle feeders — little and often with plenty of forage is ideal.",
            },
            {
              q: "Pink Powder is primarily positioned to support…",
              options: ["Hoof growth", "The hindgut and condition", "Respiration", "Joint mobility"],
              answer: 1,
              explain: "Pink Powder is NAF's digestive supplement for a healthy hindgut and condition.",
            },
            {
              q: "Which of these is a common digestive challenge?",
              options: ["Ad-lib forage", "Gradual feed changes", "Travel and competition stress", "Daily turnout"],
              answer: 2,
              explain: "Stress from travel and competition is a well-known challenge to gut health.",
            },
            {
              q: "Which NAF product is aimed at supporting the stomach?",
              options: ["Five Star Superflex", "NAF Off", "Gastro Aid", "Magic"],
              answer: 2,
              explain: "Gastro Aid supports a healthy gastric environment.",
            },
          ],
        },
      ],
    },

    /* ======================= NVC ======================= */
    {
      id: "nvc-gut",
      brand: "nvc",
      title: "Happy Tummies: Gut Health for Dogs",
      level: "Foundation",
      minutes: 20,
      audience: "Pet retail, groomers & dog owners",
      summary:
        "The canine gut in plain English — and how Gut Balance and Firmapoo help keep tums (and poos) on track.",
      cover: "tummy",
      modules: [
        {
          id: "m1",
          type: "video",
          title: "Meet the microbiome",
          duration: "5:20",
          youtubeId: "",
          summary:
            "Trillions of friendly bacteria live in your dog's gut. Find out what they do, what upsets them and why a balanced gut matters for the whole dog.",
          keyPoints: [
            "The gut microbiome supports digestion and overall wellbeing.",
            "Diet changes, stress and scavenging can upset the balance.",
            "Poo quality is a great everyday indicator of gut health.",
          ],
        },
        {
          id: "m2",
          type: "presentation",
          title: "The Happy Tummy Toolkit",
          slides: [
            {
              heading: "Why gut health?",
              body: "A happy gut means a happy dog. It's where nutrients are absorbed and where much of the immune system lives.",
              stat: { value: "70%", label: "of the immune system is associated with the gut" },
            },
            {
              heading: "Signs of an unsettled tummy",
              bullets: ["Loose or inconsistent stools", "Wind and gurgling", "Fussiness at mealtimes", "Scooting"],
            },
            {
              heading: "Gut Balance",
              body: "A daily all-natural supplement to support a healthy, balanced gut — perfect for dogs with sensitive tummies.",
            },
            {
              heading: "Firmapoo",
              body: "Designed to support firm, healthy stools and comfortable anal glands — popular with owners and groomers alike.",
            },
            {
              heading: "Top tips for owners",
              bullets: ["Change food gradually over 7–10 days", "Keep treats sensible", "Watch for scavenging on walks", "See the vet if signs persist"],
            },
          ],
        },
        {
          id: "m3",
          type: "quiz",
          title: "Happy tummy quiz",
          passMark: 0.8,
          questions: [
            {
              q: "What is the gut microbiome?",
              options: ["A type of dog food", "The community of microbes living in the gut", "A digestive enzyme", "A part of the stomach"],
              answer: 1,
              explain: "It's the community of bacteria and other microbes that live in the gut.",
            },
            {
              q: "Over how long should you change a dog's food?",
              options: ["Overnight", "2 days", "7–10 days", "6 weeks"],
              answer: 2,
              explain: "A gradual transition over 7–10 days helps avoid tummy upsets.",
            },
            {
              q: "Which NVC product supports firm stools and anal gland comfort?",
              options: ["Calm & Settle", "Firmapoo", "Daily Dental", "Mobility"],
              answer: 1,
              explain: "Firmapoo is the go-to for firm stools and comfortable anal glands.",
            },
            {
              q: "Which could be a sign of an unsettled tummy?",
              options: ["Shiny coat", "Scooting", "Bright eyes", "Good appetite"],
              answer: 1,
              explain: "Scooting can point to anal gland discomfort, often linked to stool quality.",
            },
            {
              q: "A dog has had diarrhoea for several days. What do you suggest?",
              options: ["Wait and see", "Add more treats", "See the vet", "Change food immediately"],
              answer: 2,
              explain: "Persistent signs always warrant a trip to the vet.",
            },
          ],
        },
      ],
    },
    {
      id: "nvc-golden",
      brand: "nvc",
      title: "The Golden Years: Caring for Older Dogs",
      level: "Foundation",
      minutes: 20,
      audience: "Pet retail, groomers & dog owners",
      summary:
        "Help older dogs stay comfortable and active with Mobility, Comfort and Age Well.",
      cover: "golden",
      modules: [
        {
          id: "m1",
          type: "video",
          title: "What changes as dogs age?",
          duration: "4:50",
          youtubeId: "",
          summary:
            "From stiff mornings to a greying muzzle: the common changes older dogs go through, and what owners can do to help them age well.",
          keyPoints: [
            "Many dogs are considered senior from around 7 years.",
            "Stiffness, slowing down and weight change are common.",
            "Gentle exercise, weight control and support help a lot.",
          ],
        },
        {
          id: "m2",
          type: "presentation",
          title: "Mobility, Comfort & Age Well",
          slides: [
            {
              heading: "Be more dog — at any age",
              body: "Older dogs still love life. With the right care they can keep enjoying walks, play and cuddles.",
              stat: { value: "7+", label: "years — when many dogs are considered senior" },
            },
            {
              heading: "Spot the signs",
              bullets: ["Slow to get up after rest", "Reluctance on stairs or jumping", "Shorter walks", "Changes in mood or sleep"],
            },
            {
              heading: "Mobility & Comfort",
              body: "Natural supplements to support healthy joints and everyday comfort, so older dogs can keep moving.",
            },
            {
              heading: "Age Well",
              body: "All-round daily support for senior dogs, helping them stay bright and engaged in their golden years.",
            },
          ],
        },
        {
          id: "m3",
          type: "quiz",
          title: "Golden years quiz",
          passMark: 0.8,
          questions: [
            {
              q: "From roughly what age are many dogs considered senior?",
              options: ["1 year", "3 years", "7 years", "15 years"],
              answer: 2,
              explain: "Around 7 years, though large breeds can age sooner.",
            },
            {
              q: "Which is a common sign of joint stiffness?",
              options: ["Slow to get up after rest", "Increased appetite", "Wet nose", "Loud barking"],
              answer: 0,
              explain: "Stiffness after rest is one of the most common early signs.",
            },
            {
              q: "Which NVC products focus on joints and comfort?",
              options: ["Firmapoo & Daily Dental", "Mobility & Comfort", "Calm & Settle", "Dog Skin"],
              answer: 1,
              explain: "Mobility and Comfort support healthy joints and everyday comfort.",
            },
            {
              q: "What helps older dogs most alongside supplements?",
              options: ["Long runs", "Weight control & gentle exercise", "Extra treats", "Less time outdoors"],
              answer: 1,
              explain: "Keeping weight healthy and exercise gentle and regular makes a big difference.",
            },
          ],
        },
      ],
    },

    /* ===================== NUTRILABS ===================== */
    {
      id: "nl-gastric",
      brand: "nutrilabs",
      title: "Gastric Protection in Dogs & Horses",
      level: "Professional",
      minutes: 35,
      audience: "Veterinary surgeons, nurses & practice staff",
      summary:
        "Understanding gastric challenges and positioning ACID PROTECT® for dogs and horses in practice.",
      cover: "gastric",
      modules: [
        {
          id: "m1",
          type: "video",
          title: "Gastric challenges in practice",
          duration: "9:05",
          youtubeId: "",
          summary:
            "An overview of situations that challenge the stomach — medication, stress, fasting and exercise — in dogs and horses, and where nutritional support fits.",
          keyPoints: [
            "Medication, stress and feeding patterns can all challenge the stomach.",
            "Horses secrete gastric acid continuously, even without food.",
            "Nutritional support complements, never replaces, veterinary treatment.",
          ],
        },
        {
          id: "m2",
          type: "presentation",
          title: "ACID PROTECT® product overview",
          slides: [
            {
              heading: "The clinical picture",
              body: "Gastric discomfort is common in both companion animals and performance horses, and often linked to management or medication.",
              stat: { value: "2", label: "dedicated formats — ACID PROTECT® Dog & Horse" },
            },
            {
              heading: "When to consider gastric support",
              bullets: ["During courses of medication", "Periods of stress, travel or kennelling", "Irregular feeding patterns", "Performance horses in training"],
            },
            {
              heading: "ACID PROTECT® Dog",
              body: "Gastrointestinal tablets for dogs, designed to support the stomach during demanding periods.",
            },
            {
              heading: "ACID PROTECT® Horse",
              body: "For stomach problems in horses — supporting gastric health alongside good feeding management.",
            },
            {
              heading: "Recommending in practice",
              bullets: ["Agree a clear plan with the owner", "Explain administration — see our guide to giving tablets", "Review progress at follow-up"],
            },
          ],
        },
        {
          id: "m3",
          type: "quiz",
          title: "Gastric protection assessment",
          passMark: 0.8,
          questions: [
            {
              q: "Why are horses particularly susceptible to gastric challenges?",
              options: ["They secrete acid continuously", "They have four stomachs", "They cannot produce saliva", "They only eat once a day"],
              answer: 0,
              explain: "Horses produce gastric acid continuously, so long gaps without forage are a risk.",
            },
            {
              q: "Which situation may warrant gastric support in a dog?",
              options: ["A course of medication", "A new collar", "A sunny day", "A bath"],
              answer: 0,
              explain: "Some medications can challenge the stomach, so support may be considered.",
            },
            {
              q: "ACID PROTECT® Dog is presented as…",
              options: ["A paste", "Tablets", "A spray", "A shampoo"],
              answer: 1,
              explain: "ACID PROTECT® Dog comes as gastrointestinal tablets.",
            },
            {
              q: "Nutritional gastric support should be…",
              options: ["A replacement for veterinary treatment", "Complementary to veterinary care", "Used only after surgery", "Avoided in horses"],
              answer: 1,
              explain: "Supplements complement — never replace — veterinary diagnosis and treatment.",
            },
            {
              q: "Which management factor helps protect the equine stomach?",
              options: ["Long gaps between meals", "Frequent forage", "Exercising on an empty stomach", "High-starch meals"],
              answer: 1,
              explain: "Frequent forage buffers acid and supports gastric health.",
            },
          ],
        },
      ],
    },
    {
      id: "nl-joints",
      brand: "nutrilabs",
      title: "Canine Joint Support: CANICOX® & CANIDEX®",
      level: "Professional",
      minutes: 30,
      audience: "Veterinary surgeons, nurses & practice staff",
      summary:
        "Choosing between CANICOX®-HD, CANICOX®-GR and CANIDEX® for joint and musculoskeletal support in dogs.",
      cover: "canine-joints",
      modules: [
        {
          id: "m1",
          type: "video",
          title: "Joint problems in dogs",
          duration: "7:30",
          youtubeId: "",
          summary:
            "How breed, size, growth and age affect joint health in dogs, and the role of nutrition in a multimodal approach.",
          keyPoints: [
            "Large and fast-growing breeds are at greater risk of joint issues.",
            "Weight management is one of the most effective interventions.",
            "Supplements form part of a multimodal plan.",
          ],
        },
        {
          id: "m2",
          type: "presentation",
          title: "Choosing the right product",
          slides: [
            {
              heading: "A multimodal approach",
              bullets: ["Veterinary diagnosis and treatment", "Weight management", "Controlled exercise & physiotherapy", "Targeted nutritional support"],
            },
            {
              heading: "CANICOX®-HD",
              body: "The dietary supplement for dogs' joints — a go-to choice for joint support in dogs of all sizes.",
            },
            {
              heading: "CANICOX®-GR",
              body: "Dietary supplement tailored to the needs of older dogs.",
            },
            {
              heading: "CANIDEX®",
              body: "A comprehensive formula for the joints and the entire musculoskeletal system.",
              stat: { value: "3", label: "joint options to match each patient" },
            },
          ],
        },
        {
          id: "m3",
          type: "quiz",
          title: "Canine joint support assessment",
          passMark: 0.8,
          questions: [
            {
              q: "Which product is tailored to older dogs?",
              options: ["CANICOX®-GR", "COLOFOR®", "CIROTEX®", "BIOTIN liquid"],
              answer: 0,
              explain: "CANICOX®-GR is formulated with older dogs in mind.",
            },
            {
              q: "Which is one of the most effective interventions for joint health?",
              options: ["Weight management", "Increased treats", "Strict cage rest for life", "Daily long runs"],
              answer: 0,
              explain: "Keeping dogs lean significantly reduces load on joints.",
            },
            {
              q: "CANIDEX® is positioned for…",
              options: ["Respiratory support", "Joints and the entire musculoskeletal system", "Diarrhoea", "Hoof growth"],
              answer: 1,
              explain: "CANIDEX® supports joints and the wider musculoskeletal system.",
            },
            {
              q: "Which dogs are generally at higher risk of joint issues?",
              options: ["Small, slow-growing breeds", "Large, fast-growing breeds", "Only cats", "None"],
              answer: 1,
              explain: "Large and giant breeds that grow quickly are at higher risk.",
            },
            {
              q: "Joint supplements are best used…",
              options: ["Instead of a vet diagnosis", "As part of a multimodal plan", "Only for one week", "Only in puppies"],
              answer: 1,
              explain: "Supplements work best as one part of a multimodal management plan.",
            },
          ],
        },
      ],
    },
  ],
};
