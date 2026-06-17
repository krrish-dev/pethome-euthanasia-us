export type SeoSection = {
  heading: string;
  body: string;
  bullets?: string[];
};

export type SeoPage = {
  slug: string;
  title: string;
  description: string;
  h1: string;
  eyebrow: string;
  intro: string;
  sections: SeoSection[];
  faqs: Array<{ question: string; answer: string }>;
  cta: string;
};

export const servicePages: SeoPage[] = [
  {
    slug: 'in-home-pet-euthanasia',
    title: 'In-Home Pet Euthanasia Near Me | Peaceful At-Home Care',
    description: 'Compassionate in-home pet euthanasia for dogs and cats across Southern California. Learn what happens, how to prepare, pricing factors, and aftercare options.',
    h1: 'In-Home Pet Euthanasia Near Me',
    eyebrow: 'Most requested service',
    intro: 'When a pet is declining, families often want a calm, private option that avoids the stress of a clinic. In-home pet euthanasia allows your dog or cat to remain in a familiar place, surrounded by the people and comforts they know.',
    sections: [
      {
        heading: 'What the home visit includes',
        body: 'The visit is designed to be quiet, unhurried, and respectful. The veterinarian explains the process before anything begins, answers your questions, and moves at a pace that protects your pet’s comfort and your family’s emotional needs.',
        bullets: ['Gentle arrival and preparation', 'Comfort-focused sedation before the final medication', 'Time for family members to be present', 'Aftercare and cremation coordination when requested'],
      },
      {
        heading: 'Who this service is best for',
        body: 'This service is most helpful for elderly pets, pets with painful mobility problems, advanced disease, severe anxiety at clinics, or families who want privacy during a final goodbye.',
      },
      {
        heading: 'Aftercare planning',
        body: 'Families can choose home burial where legally appropriate, communal cremation, or private cremation with ashes returned. The doctor can explain options before the appointment so you do not have to make rushed decisions afterward.',
      },
    ],
    faqs: [
      { question: 'Is in-home pet euthanasia peaceful?', answer: 'Yes. The process uses sedation first, so the pet can become deeply relaxed and unaware before the final medication is given.' },
      { question: 'Can my family stay with my pet?', answer: 'Yes. Family members can remain close, step away, or decide what feels right for them.' },
      { question: 'Do you help with aftercare?', answer: 'Yes. Aftercare coordination and cremation options can be discussed before or during the appointment.' },
    ],
    cta: 'Call now to discuss a peaceful home visit.',
  },
  {
    slug: 'dog-euthanasia-at-home',
    title: 'Dog Euthanasia at Home | Peaceful Mobile Vet Care',
    description: 'Dog euthanasia at home for families who want a calm, familiar, and compassionate farewell. Learn signs, process, pricing factors, and aftercare options.',
    h1: 'Dog Euthanasia at Home',
    eyebrow: 'For senior and declining dogs',
    intro: 'Dogs often feel safest in familiar surroundings. At-home dog euthanasia helps avoid the stress of car rides, clinic waiting rooms, and unfamiliar smells while giving your family a private goodbye.',
    sections: [
      {
        heading: 'When families consider dog euthanasia at home',
        body: 'Many families call when their dog has more bad days than good days, cannot rest comfortably, struggles to stand, no longer enjoys food or interaction, or is living with uncontrolled pain despite treatment.',
        bullets: ['Mobility loss or collapse', 'Advanced cancer or organ failure', 'Labored breathing or severe weakness', 'Pain that is no longer controlled'],
      },
      {
        heading: 'What happens during the visit',
        body: 'The veterinarian reviews your dog’s condition, explains the steps, gives sedation for comfort, and waits until your dog is fully relaxed before the final medication.',
      },
      {
        heading: 'Planning the setting',
        body: 'Your dog can rest on a favorite bed, blanket, couch, or outdoor area if appropriate. Treats, toys, soft lighting, and familiar voices can help make the moment calmer.',
      },
    ],
    faqs: [
      { question: 'Will my dog know what is happening?', answer: 'The goal is comfort and calm. After sedation, most dogs become deeply relaxed and unaware.' },
      { question: 'Can other pets be present?', answer: 'Yes, many families allow other pets to be nearby or to say goodbye afterward.' },
      { question: 'Can large dogs be helped at home?', answer: 'Yes. Large dogs can often be more comfortable at home because they do not need stressful transport.' },
    ],
    cta: 'Call now to talk through your dog’s condition and timing.',
  },
  {
    slug: 'cat-euthanasia-at-home',
    title: 'Cat Euthanasia at Home | Gentle In-Home Farewell',
    description: 'Cat euthanasia at home for families who want a quiet, low-stress goodbye. Learn how home visits help cats avoid clinic anxiety and travel stress.',
    h1: 'Cat Euthanasia at Home',
    eyebrow: 'Quiet support for cats',
    intro: 'Cats can be especially sensitive to carriers, car rides, and unfamiliar clinical spaces. At-home cat euthanasia lets your cat stay in a familiar room with familiar smells, sounds, and people.',
    sections: [
      {
        heading: 'Why home care can be gentler for cats',
        body: 'A home visit avoids carrier stress and allows your cat to remain in a favorite bed, lap, quiet room, or sunny resting spot.',
        bullets: ['No carrier or car stress', 'Lower noise and fewer unfamiliar smells', 'Private time for your family', 'Comfort-focused sedation before final medication'],
      },
      {
        heading: 'Signs families often notice',
        body: 'Families often call when a cat stops eating, hides constantly, loses mobility, struggles to breathe, has advanced kidney disease, cancer, or other painful decline.',
      },
      {
        heading: 'How to prepare your cat',
        body: 'Keep your cat in a quiet, accessible room before the appointment. Do not force handling if it causes distress; the veterinarian will guide the safest and calmest approach.',
      },
    ],
    faqs: [
      { question: 'Should I keep my cat in one room before the visit?', answer: 'Yes, a quiet room helps prevent hiding and keeps the appointment calm.' },
      { question: 'Is the process different for cats?', answer: 'The comfort-first approach is the same, but handling is adapted to reduce feline stress.' },
      { question: 'Can my cat stay in my lap?', answer: 'Often yes, depending on comfort and safety. The veterinarian will guide you.' },
    ],
    cta: 'Call now for gentle cat end-of-life guidance.',
  },
  {
    slug: 'mobile-pet-euthanasia',
    title: 'Mobile Pet Euthanasia Near Me | Southern California Home Visits',
    description: 'Mobile pet euthanasia for dogs and cats in Southern California. A licensed veterinarian comes to your home for a calm, private end-of-life visit.',
    h1: 'Mobile Pet Euthanasia Near Me',
    eyebrow: 'Home-based veterinary support',
    intro: 'Mobile pet euthanasia brings compassionate veterinary care to your home so your pet does not have to travel during a painful or fragile stage of life.',
    sections: [
      {
        heading: 'Why mobile care matters',
        body: 'When a pet is weak, painful, or anxious, transportation can be difficult. Mobile care helps reduce stress by bringing the doctor to the pet instead of forcing the pet to the clinic.',
        bullets: ['Helpful for large or immobile dogs', 'Helpful for anxious cats', 'Private family setting', 'Aftercare coordination available'],
      },
      {
        heading: 'Service coverage',
        body: 'The service focuses on Southern California communities including High Desert, Inland Empire, Los Angeles County, Orange County, Riverside County, and San Bernardino County areas when scheduling allows.',
      },
      {
        heading: 'Scheduling expectations',
        body: 'Availability depends on route, location, pet size, aftercare needs, and doctor schedule. Same-day support may be available when timing allows.',
      },
    ],
    faqs: [
      { question: 'Do you come to my home?', answer: 'Yes. A mobile veterinarian travels to your home by appointment.' },
      { question: 'Is same-day mobile euthanasia available?', answer: 'Same-day appointments may be available depending on location and doctor schedule.' },
      { question: 'Do you cover rural areas?', answer: 'Some rural areas can be covered with additional travel planning. Call to confirm availability.' },
    ],
    cta: 'Call now to check mobile appointment availability.',
  },
  {
    slug: 'same-day-pet-euthanasia',
    title: 'Same-Day Pet Euthanasia Near Me | Urgent Home Visit Help',
    description: 'Same-day pet euthanasia may be available for urgent dog and cat end-of-life needs in Southern California. Call to confirm scheduling and aftercare options.',
    h1: 'Same-Day Pet Euthanasia Near Me',
    eyebrow: 'Urgent end-of-life support',
    intro: 'When a pet declines quickly, families may need help today. Same-day appointments depend on location, doctor availability, and the type of aftercare requested.',
    sections: [
      {
        heading: 'When urgent scheduling may be appropriate',
        body: 'Urgent help may be needed when a pet is in uncontrolled pain, struggling to breathe, unable to stand, actively declining, or unable to rest comfortably.',
      },
      {
        heading: 'What to have ready before calling',
        body: 'It helps to know your pet’s approximate weight, current symptoms, city, preferred time window, and whether you are considering private or communal cremation.',
        bullets: ['Pet name, species, and weight', 'Current condition and symptoms', 'City and cross streets', 'Aftercare preference if known'],
      },
      {
        heading: 'What if today is not available?',
        body: 'If a same-day visit is not available, the team can explain the earliest appointment options and what to monitor while you wait.'
      },
    ],
    faqs: [
      { question: 'Can I get an appointment today?', answer: 'Possibly. Same-day availability depends on doctor schedule, city, travel route, and aftercare needs.' },
      { question: 'Should I call or text?', answer: 'Call is best for urgent scheduling because timing and condition details can be discussed quickly.' },
      { question: 'Is there an after-hours fee?', answer: 'Additional fees may apply for evenings, weekends, holidays, or extended travel.' },
    ],
    cta: 'Call now for urgent availability.',
  },
  {
    slug: 'pet-hospice-care',
    title: 'Pet Hospice Care at Home | Quality-of-Life Guidance',
    description: 'Pet hospice and comfort care guidance for dogs and cats nearing end of life. Understand quality of life, pain, mobility, appetite, and timing decisions.',
    h1: 'Pet Hospice Care at Home',
    eyebrow: 'Quality-of-life support',
    intro: 'Pet hospice care helps families focus on comfort, dignity, and quality of life when a cure is no longer the goal. It can also help you understand whether it may be time to consider euthanasia.',
    sections: [
      {
        heading: 'What hospice guidance looks at',
        body: 'Comfort-focused evaluation looks at pain, breathing, appetite, hydration, mobility, hygiene, interaction, rest, and whether your pet still has meaningful good moments.',
        bullets: ['Pain and comfort', 'Eating and drinking', 'Mobility and hygiene', 'Breathing and sleep quality', 'Good days compared with bad days'],
      },
      {
        heading: 'How hospice helps families',
        body: 'Hospice guidance can reduce uncertainty by giving your family a clearer framework for observing your pet’s daily comfort and decline.'
      },
      {
        heading: 'When hospice becomes end-of-life planning',
        body: 'When comfort can no longer be maintained, a home euthanasia appointment may become the kindest option. The goal is to avoid waiting until suffering becomes severe.'
      },
    ],
    faqs: [
      { question: 'Is hospice the same as euthanasia?', answer: 'No. Hospice focuses on comfort and quality-of-life guidance. Euthanasia is considered when comfort can no longer be maintained.' },
      { question: 'Can hospice help me decide timing?', answer: 'Yes. A quality-of-life framework can make the decision clearer and less rushed.' },
      { question: 'Should I track good days and bad days?', answer: 'Yes. Tracking patterns can help reveal whether decline is becoming consistent.' },
    ],
    cta: 'Call now to discuss quality-of-life concerns.',
  },
  {
    slug: 'pet-cremation-aftercare',
    title: 'Pet Cremation & Aftercare | Private and Communal Options',
    description: 'Pet cremation and aftercare coordination after an in-home euthanasia visit. Learn private cremation, communal cremation, memorial keepsakes, and planning questions.',
    h1: 'Pet Cremation and Aftercare',
    eyebrow: 'Aftercare coordination',
    intro: 'Aftercare decisions can feel overwhelming immediately after a goodbye. Planning options in advance can make the appointment calmer and help your family choose what feels respectful.',
    sections: [
      {
        heading: 'Private cremation',
        body: 'Private cremation means your pet is cremated individually and ashes are returned according to the selected arrangement. This is often chosen by families who want a memorial urn or keepsake.'
      },
      {
        heading: 'Communal cremation',
        body: 'Communal cremation is a simple, respectful option where ashes are not returned. It can be appropriate when families want dignified aftercare without a private return.'
      },
      {
        heading: 'Questions to decide before the visit',
        body: 'Consider whether you want ashes returned, whether you prefer a memorial keepsake, and whether any family member needs time for a final goodbye before transport.',
        bullets: ['Do you want ashes returned?', 'Would a paw print or fur clipping help your family?', 'Do you need private transport coordination?', 'Are there local burial rules to check?'],
      },
    ],
    faqs: [
      { question: 'Can cremation be arranged during the home visit?', answer: 'Yes. Aftercare options can be coordinated with the appointment.' },
      { question: 'What is the difference between private and communal cremation?', answer: 'Private cremation returns ashes to the family. Communal cremation does not return individual ashes.' },
      { question: 'Can I keep my pet for home burial?', answer: 'In some areas, home burial may be possible, but local rules vary and should be checked first.' },
    ],
    cta: 'Call now to discuss aftercare options.',
  },
];

export const resourcePages: SeoPage[] = [
  {
    slug: 'quality-of-life-scale',
    title: 'Pet Quality of Life Scale | Dog and Cat End-of-Life Checklist',
    description: 'Use this pet quality-of-life guide to evaluate pain, appetite, mobility, breathing, hygiene, and good days versus bad days before making end-of-life decisions.',
    h1: 'Pet Quality of Life Scale',
    eyebrow: 'Decision support guide',
    intro: 'A quality-of-life scale helps families observe comfort more clearly. It does not replace veterinary guidance, but it can organize the signs you are seeing each day.',
    sections: [
      { heading: 'Core areas to score', body: 'Look at pain, hunger, hydration, hygiene, mobility, breathing, sleep, interaction, and whether your pet still experiences moments of comfort or interest.', bullets: ['Pain control', 'Appetite and hydration', 'Mobility and hygiene', 'Breathing comfort', 'Good days versus bad days'] },
      { heading: 'How to use the scale', body: 'Score each area honestly over several days rather than judging from one isolated moment. A consistent pattern of decline can be more meaningful than a single bad day.' },
      { heading: 'When to call for help', body: 'Call when pain, breathing distress, collapse, lack of eating, or severe weakness makes you worry your pet is suffering now.' },
    ],
    faqs: [
      { question: 'Does a quality-of-life score make the decision for me?', answer: 'No. It helps organize what you are seeing so you can discuss the decision more clearly.' },
      { question: 'What matters most?', answer: 'Pain, breathing comfort, ability to rest, and whether bad days clearly outnumber good days are especially important.' },
      { question: 'Should I wait for a perfect sign?', answer: 'Many families never get one perfect sign. The pattern of suffering is often more important.' },
    ],
    cta: 'Call now if your pet’s comfort is declining.',
  },
  {
    slug: 'how-to-know-when-it-is-time',
    title: 'How to Know When It Is Time to Euthanize a Pet',
    description: 'Learn common signs that it may be time to consider pet euthanasia, including pain, breathing distress, appetite loss, mobility decline, and more bad days than good.',
    h1: 'How to Know When It Is Time',
    eyebrow: 'End-of-life decision guide',
    intro: 'The decision is rarely simple. Families often call when they feel torn between not wanting to say goodbye too soon and not wanting their pet to suffer too long.',
    sections: [
      { heading: 'Signs the body may be struggling', body: 'Watch for pain that cannot be controlled, labored breathing, repeated collapse, inability to stand, ongoing vomiting, or refusal to eat and drink.' },
      { heading: 'Emotional and behavior changes', body: 'Some pets withdraw, hide, stop enjoying favorite activities, become confused, or seem unable to rest comfortably.' },
      { heading: 'Good days versus bad days', body: 'A helpful question is whether your pet still has more comfortable, meaningful days than painful or distressed days.' },
    ],
    faqs: [
      { question: 'Is eating still a sign my pet is okay?', answer: 'Not always. Some pets continue eating while still experiencing serious pain or poor quality of life.' },
      { question: 'What if I feel guilty?', answer: 'Guilt is common. The goal is not to give up, but to prevent unnecessary suffering when comfort cannot be maintained.' },
      { question: 'Can I talk to a veterinarian first?', answer: 'Yes. A conversation can help you sort through symptoms, timing, and options.' },
    ],
    cta: 'Call now for compassionate timing guidance.',
  },
  {
    slug: 'what-to-expect-during-in-home-pet-euthanasia',
    title: 'What to Expect During In-Home Pet Euthanasia',
    description: 'A step-by-step guide to what happens during an in-home pet euthanasia appointment, from arrival and sedation to final goodbye and aftercare.',
    h1: 'What to Expect During In-Home Pet Euthanasia',
    eyebrow: 'Step-by-step process',
    intro: 'Knowing the process before the appointment can reduce fear. The visit is designed to be quiet, respectful, and focused on comfort.',
    sections: [
      { heading: 'Before the veterinarian arrives', body: 'Choose a comfortable place for your pet, gather family members who want to be present, and prepare any blanket, bed, toy, treat, or keepsake you want nearby.' },
      { heading: 'Sedation and comfort', body: 'The veterinarian gives sedation first. Your pet becomes relaxed and deeply sleepy before the final medication is given.' },
      { heading: 'After the goodbye', body: 'Your family can take time afterward. If cremation is selected, aftercare transport is handled respectfully.' },
    ],
    faqs: [
      { question: 'How long does the visit take?', answer: 'Many visits take about 45 to 60 minutes, but the pace is not rushed.' },
      { question: 'Can children be present?', answer: 'Yes, if the family feels it is appropriate. Children can also step away if needed.' },
      { question: 'Can we take time afterward?', answer: 'Yes. Families are given time for a final goodbye.' },
    ],
    cta: 'Call now to ask what to expect for your pet.',
  },
  {
    slug: 'private-vs-communal-pet-cremation',
    title: 'Private vs Communal Pet Cremation | What Families Should Know',
    description: 'Understand the difference between private and communal pet cremation, when ashes are returned, and how to choose aftercare after in-home euthanasia.',
    h1: 'Private vs Communal Pet Cremation',
    eyebrow: 'Aftercare decision guide',
    intro: 'Choosing cremation can feel difficult during grief. The main difference is whether your pet is cremated individually and whether ashes are returned.',
    sections: [
      { heading: 'Private cremation', body: 'Private cremation is selected when families want ashes returned in an urn or memorial arrangement.' },
      { heading: 'Communal cremation', body: 'Communal cremation is a respectful option where ashes are not returned individually.' },
      { heading: 'How to choose', body: 'Ask whether you want ashes returned, whether cost is a concern, and whether a physical memorial would help your family heal.' },
    ],
    faqs: [
      { question: 'Are ashes returned with communal cremation?', answer: 'No. Ashes are returned only with private cremation.' },
      { question: 'Can I decide before the appointment?', answer: 'Yes. Deciding in advance can make the visit less stressful.' },
      { question: 'Can keepsakes be requested?', answer: 'Keepsake options may be available on request.' },
    ],
    cta: 'Call now to discuss aftercare choices.',
  },
  {
    slug: 'how-to-prepare-for-at-home-pet-euthanasia',
    title: 'How to Prepare for At-Home Pet Euthanasia',
    description: 'Prepare for an at-home pet euthanasia visit with a calm space, family planning, comfort items, aftercare decisions, and questions to ask before the appointment.',
    h1: 'How to Prepare for At-Home Pet Euthanasia',
    eyebrow: 'Preparation checklist',
    intro: 'Preparation does not make goodbye easy, but it can make the day calmer. A few decisions before the appointment help your family focus on your pet.',
    sections: [
      { heading: 'Choose the space', body: 'Pick a quiet place where your pet already feels safe: a favorite bed, couch, blanket, sunny room, or protected outdoor area.' },
      { heading: 'Decide who should be present', body: 'Some families include children and other pets. Others keep the room quiet. There is no single right choice.' },
      { heading: 'Plan aftercare', body: 'Decide whether you prefer private cremation, communal cremation, or another lawful aftercare option before the visit if possible.' },
    ],
    faqs: [
      { question: 'Can my pet eat treats before the visit?', answer: 'Often yes, unless your veterinarian gives specific instructions otherwise.' },
      { question: 'Should I move my pet?', answer: 'Only if moving is comfortable and safe. The veterinarian can work in many home settings.' },
      { question: 'Should I prepare payment beforehand?', answer: 'Handling payment before the visit can reduce stress during the appointment.' },
    ],
    cta: 'Call now if you need help preparing.',
  },
  {
    slug: 'grief-support-after-pet-loss',
    title: 'Grief Support After Pet Loss | Gentle Guidance for Families',
    description: 'Pet loss grief support guidance for families after saying goodbye. Learn what grief can feel like, how to support children, and when to seek additional help.',
    h1: 'Grief Support After Pet Loss',
    eyebrow: 'After the goodbye',
    intro: 'Pet loss can be as painful as losing any close companion. Grief may include sadness, guilt, relief, anger, numbness, or all of these at different times.',
    sections: [
      { heading: 'Common grief reactions', body: 'Many families replay the decision, question the timing, or feel the home is suddenly too quiet. These reactions are common after a meaningful bond.' },
      { heading: 'Supporting children', body: 'Use simple, honest language. Let children ask questions, draw pictures, write a note, or choose a small memorial if they want.' },
      { heading: 'Creating a memorial', body: 'Photos, paw prints, a favorite blanket, a memorial shelf, or a written letter can help some families process the loss.' },
    ],
    faqs: [
      { question: 'Is guilt normal after euthanasia?', answer: 'Yes. Many loving families feel guilt even when the decision prevented suffering.' },
      { question: 'How long does pet grief last?', answer: 'There is no fixed timeline. Grief often changes gradually rather than disappearing quickly.' },
      { question: 'Should I talk to someone?', answer: 'If grief feels overwhelming or isolating, support groups or counseling can help.' },
    ],
    cta: 'Call now if you need aftercare or next-step support.',
  },
];
