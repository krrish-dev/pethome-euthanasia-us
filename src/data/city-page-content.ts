export type CityFaq = { question: string; answer: string };
export type CitySection = { heading: string; body: string; bullets?: string[] };
export type CityPageContent = {
  slug: string;
  name: string;
  county: string;
  region: string;
  nearby: string[];
  title: string;
  description: string;
  hero: string;
  intro: string;
  sections: CitySection[];
  faqs: CityFaq[];
};

export const priorityCities: CityPageContent[] = [
  {
    slug: 'victorville',
    name: 'Victorville',
    county: 'San Bernardino County',
    region: 'High Desert',
    nearby: ['Apple Valley', 'Hesperia', 'Phelan'],
    title: 'In-Home Pet Euthanasia in Victorville, CA | Same-Day Help When Available',
    description: 'Compassionate in-home pet euthanasia in Victorville, CA for dogs and cats. Mobile veterinarian visits, aftercare planning, cremation options, and clear local guidance.',
    hero: 'In-Home Pet Euthanasia in Victorville, CA',
    intro: 'Victorville families often need end-of-life help that is calm, practical, and respectful of High Desert travel timing. When a dog or cat is too weak, painful, anxious, or fragile for a clinic visit, an in-home appointment can make the final goodbye quieter and less stressful.',
    sections: [
      { heading: 'Local home-visit planning in Victorville', body: 'Victorville covers spread-out neighborhoods, desert routes, and nearby communities where travel windows matter. Calling with your pet’s approximate weight, current symptoms, cross streets, and aftercare preference helps the team confirm what timing is realistic and whether same-day support may be available.' },
      { heading: 'Dog euthanasia at home in Victorville', body: 'For large or senior dogs, a home visit can prevent the strain of lifting, car travel, and waiting-room anxiety. Families can prepare a favorite bed, blanket, shaded patio, or quiet living room so the dog remains in a familiar place while the veterinarian explains each step.', bullets: ['Helpful for mobility loss or collapse', 'Comfort-focused sedation first', 'Family can stay close or step away', 'Aftercare can be discussed before the visit'] },
      { heading: 'Cat euthanasia at home in Victorville', body: 'Cats often hide discomfort and may become extremely stressed by carriers or car rides. A home visit lets the cat remain in a quiet room, on a familiar blanket, or near the person they trust most. The approach is adapted to reduce handling stress and protect comfort.' },
      { heading: 'Aftercare and cremation options', body: 'Victorville families can ask about private cremation, communal cremation, memorial keepsakes, and whether home burial is appropriate under local rules. Deciding before the appointment can make the goodbye calmer and reduce pressure afterward.' },
      { heading: 'Nearby service context', body: 'Victorville appointments are commonly coordinated alongside Apple Valley, Hesperia, and Phelan routes. If you are near the edge of the city or in a rural pocket, confirm travel details by phone before scheduling.' },
    ],
    faqs: [
      { question: 'Do you provide in-home pet euthanasia throughout Victorville?', answer: 'Yes, Victorville is a priority High Desert service area. Availability depends on route timing, doctor schedule, and aftercare needs.' },
      { question: 'Can same-day euthanasia be arranged in Victorville?', answer: 'Same-day help may be possible when the veterinarian has route availability. Calling is best for urgent timing.' },
      { question: 'Can large dogs be helped at home?', answer: 'Yes. Home care is often especially helpful for large dogs that are painful, weak, or difficult to transport.' },
      { question: 'Is cat euthanasia at home available in Victorville?', answer: 'Yes. The visit can be planned to reduce carrier stress, hiding, and handling anxiety.' },
      { question: 'Do you coordinate cremation after the visit?', answer: 'Yes. Private and communal cremation options can be discussed before or during scheduling.' },
    ],
  },
  {
    slug: 'apple-valley',
    name: 'Apple Valley',
    county: 'San Bernardino County',
    region: 'High Desert',
    nearby: ['Victorville', 'Hesperia', 'Phelan'],
    title: 'In-Home Pet Euthanasia in Apple Valley, CA | Peaceful Mobile Vet Care',
    description: 'Gentle in-home pet euthanasia in Apple Valley, CA for dogs and cats. Mobile home visits, quality-of-life guidance, cremation planning, and local scheduling support.',
    hero: 'In-Home Pet Euthanasia in Apple Valley, CA',
    intro: 'Apple Valley families often choose home euthanasia because it allows a pet to remain in a quiet, familiar setting without the stress of transport. For elderly dogs, anxious cats, or pets with serious pain, the home environment can be the most compassionate place to say goodbye.',
    sections: [
      { heading: 'Why Apple Valley families choose home care', body: 'Many Apple Valley homes have calm indoor rooms, patios, or single-level spaces that make it easier to keep a fragile pet comfortable. A home visit also gives the family time to ask questions privately and avoid the emotional pressure of a busy clinic environment.' },
      { heading: 'Preparing a dog for a home visit', body: 'If your dog has trouble standing, walking, or getting into the car, choose a resting spot where they already feel safe. The veterinarian can usually work around your pet’s comfort rather than forcing the pet into a different position.', bullets: ['Favorite bed or blanket', 'Soft lighting and quiet voices', 'Treats if your pet still wants them', 'A clear path for respectful aftercare transport'] },
      { heading: 'Preparing a cat for a home visit', body: 'Cats in Apple Valley homes may hide if the day becomes busy. Keep your cat in one quiet, accessible room before the appointment. Avoid chasing or forcing handling; the veterinarian will guide the safest way to keep the visit calm.' },
      { heading: 'Quality-of-life questions', body: 'Families often call when they notice appetite loss, weakness, breathing changes, hiding, confusion, or more bad days than good. A quality-of-life conversation can help organize the signs you are seeing and make timing feel less uncertain.' },
      { heading: 'Aftercare in Apple Valley', body: 'Private cremation, communal cremation, and memorial options can be planned during scheduling. If you are considering home burial, check local property and county rules first.' },
    ],
    faqs: [
      { question: 'Do you serve Apple Valley neighborhoods?', answer: 'Yes. Apple Valley is part of the High Desert service area, with scheduling based on availability and route timing.' },
      { question: 'What information should I provide when calling?', answer: 'Share your pet’s species, approximate weight, symptoms, location, urgency, and aftercare preference if known.' },
      { question: 'Can my pet stay outside?', answer: 'Sometimes, if the weather, privacy, and safety are appropriate. A shaded and calm setting is important.' },
      { question: 'Do other pets need to leave the room?', answer: 'Not always. Some families include other pets briefly, especially afterward, if it helps them understand the loss.' },
      { question: 'Can cremation be arranged from Apple Valley?', answer: 'Yes. Aftercare options can be coordinated with the appointment.' },
    ],
  },
  {
    slug: 'hesperia',
    name: 'Hesperia',
    county: 'San Bernardino County',
    region: 'High Desert',
    nearby: ['Victorville', 'Apple Valley', 'Phelan'],
    title: 'In-Home Pet Euthanasia in Hesperia, CA | At-Home Dog & Cat Care',
    description: 'In-home pet euthanasia in Hesperia, CA with compassionate mobile vet care for dogs and cats, aftercare coordination, and local High Desert scheduling guidance.',
    hero: 'In-Home Pet Euthanasia in Hesperia, CA',
    intro: 'Hesperia pet owners often call when a beloved dog or cat is declining and travel to a clinic feels too hard. In-home euthanasia gives families a way to protect comfort, privacy, and dignity during a difficult final decision.',
    sections: [
      { heading: 'Local scheduling in Hesperia', body: 'Hesperia routes can involve different parts of the High Desert, so exact availability depends on timing and doctor schedule. When calling, share whether your pet is still mobile, whether breathing is comfortable, and whether you are looking for same-day help.' },
      { heading: 'A quieter goodbye for dogs', body: 'Dogs with arthritis, cancer, neurological decline, or severe weakness may become distressed when lifted into a car. A home visit can happen where the dog already rests, reducing unnecessary pain and confusion.', bullets: ['Useful for senior dogs', 'Useful for large or painful dogs', 'No clinic waiting room', 'Family-controlled environment'] },
      { heading: 'Low-stress support for cats', body: 'Many cats in end-of-life decline hide, stop eating, or become fearful of handling. A home appointment allows the veterinarian to work in a familiar space and adapt the process to the cat’s stress level.' },
      { heading: 'What the visit feels like', body: 'The veterinarian explains the process, gives sedation first, and waits until your pet is deeply relaxed before the final medication. Families can remain close, speak softly, or step away depending on what feels right.' },
      { heading: 'Aftercare choices', body: 'Hesperia families can ask about communal cremation, private cremation, ashes returned, and memorial keepsakes. Planning aftercare early helps the final minutes stay focused on your pet.' },
    ],
    faqs: [
      { question: 'Is Hesperia included in your service area?', answer: 'Yes. Hesperia is included in the High Desert service area, subject to route and schedule availability.' },
      { question: 'Can I schedule if my pet is actively declining?', answer: 'Call directly. The team can explain the earliest realistic appointment window and what details are needed.' },
      { question: 'Will the veterinarian rush the appointment?', answer: 'No. The goal is a calm visit with enough time for questions and goodbye.' },
      { question: 'Can my family choose the room?', answer: 'Yes. Choose the calmest and most comfortable location for your pet.' },
      { question: 'Are aftercare options explained before the visit?', answer: 'Yes. Aftercare can be discussed when scheduling so the family is prepared.' },
    ],
  },
  {
    slug: 'rancho-cucamonga',
    name: 'Rancho Cucamonga',
    county: 'San Bernardino County',
    region: 'Inland Empire',
    nearby: ['Upland', 'Fontana', 'San Bernardino'],
    title: 'In-Home Pet Euthanasia in Rancho Cucamonga, CA | Mobile Vet Visit',
    description: 'Compassionate in-home pet euthanasia in Rancho Cucamonga, CA for dogs and cats. Mobile vet appointments, same-day help when available, and aftercare planning.',
    hero: 'In-Home Pet Euthanasia in Rancho Cucamonga, CA',
    intro: 'Rancho Cucamonga families often want a private, organized, and compassionate end-of-life plan. When a pet is too weak or anxious for a clinic visit, mobile euthanasia can bring veterinary care directly to the home.',
    sections: [
      { heading: 'Local appointment planning', body: 'Rancho Cucamonga is a central Inland Empire service area, so scheduling may coordinate with nearby Upland, Fontana, and San Bernardino routes. Calling early helps confirm timing, aftercare preferences, and whether a same-day appointment is possible.' },
      { heading: 'Dog euthanasia at home', body: 'For dogs with mobility decline, pain, cancer, organ failure, or severe anxiety, staying home can reduce distress. Families can choose a favorite space and avoid moving the dog more than necessary.', bullets: ['Comfort-first approach', 'Sedation before final medication', 'No stressful car ride', 'Aftercare coordination available'] },
      { heading: 'Cat euthanasia at home', body: 'Cats often become frightened by carriers and unfamiliar smells. Home care lets the cat stay in a quiet room and allows the veterinarian to use a gentle, patient approach.' },
      { heading: 'What to prepare', body: 'Have your pet’s weight estimate, current medications, symptoms, and preferred aftercare choice ready. If your building has parking or access instructions, mention them when scheduling.' },
      { heading: 'Aftercare and memorial choices', body: 'Families can discuss private cremation, communal cremation, ashes returned, fur clipping, paw prints, or other keepsake preferences before the visit.' },
    ],
    faqs: [
      { question: 'Do you provide home euthanasia in Rancho Cucamonga?', answer: 'Yes. Rancho Cucamonga is a key Inland Empire service area.' },
      { question: 'Can apartments or gated communities be served?', answer: 'Yes, but provide access, parking, and gate details during scheduling.' },
      { question: 'Can the appointment be same-day?', answer: 'Same-day help may be available depending on schedule and route.' },
      { question: 'Do you help both dogs and cats?', answer: 'Yes. Home visits are available for dogs and cats.' },
      { question: 'Can aftercare be arranged with the visit?', answer: 'Yes. Cremation and transport details can be coordinated.' },
    ],
  },
  {
    slug: 'riverside',
    name: 'Riverside',
    county: 'Riverside County',
    region: 'Inland Empire',
    nearby: ['San Bernardino', 'Redlands', 'Fontana'],
    title: 'In-Home Pet Euthanasia in Riverside, CA | Dog & Cat Home Care',
    description: 'In-home pet euthanasia in Riverside, CA for dogs and cats. Mobile veterinarian support, quality-of-life guidance, urgent scheduling when available, and cremation options.',
    hero: 'In-Home Pet Euthanasia in Riverside, CA',
    intro: 'Riverside families often need a practical and compassionate plan when a pet’s condition changes quickly. A home visit can reduce travel stress and let the family say goodbye in a familiar, private place.',
    sections: [
      { heading: 'Riverside local service context', body: 'Riverside appointments may be coordinated with nearby Inland Empire routes, including San Bernardino, Redlands, and Fontana. Traffic, distance, aftercare needs, and doctor availability can affect the schedule, so direct phone confirmation is best.' },
      { heading: 'For dogs who cannot travel comfortably', body: 'A large or painful dog may struggle with stairs, car entry, or clinic handling. Home euthanasia lets the dog rest where they already feel safe while the veterinarian explains the process to the family.', bullets: ['Avoids lifting when possible', 'Private family environment', 'Gentle sedation', 'Respectful aftercare planning'] },
      { heading: 'For cats with stress or advanced decline', body: 'Cats may hide, stop eating, or become distressed by a carrier. A home visit can be planned in a quiet room where the cat is accessible but not overwhelmed.' },
      { heading: 'Quality-of-life support', body: 'If you are uncertain, use signs such as pain, appetite, hydration, mobility, breathing, and good days versus bad days. The team can discuss what you are seeing before you schedule.' },
      { heading: 'Cremation and aftercare', body: 'Riverside families can ask about private cremation with ashes returned, communal cremation, and memorial keepsakes. Planning these details ahead of time can reduce emotional pressure during the visit.' },
    ],
    faqs: [
      { question: 'Is Riverside served by appointment?', answer: 'Yes. Riverside is served by appointment, with availability based on routing and schedule.' },
      { question: 'Can you help if my pet is declining today?', answer: 'Call directly to check the earliest appointment window and urgent availability.' },
      { question: 'What if I am not sure it is time?', answer: 'A quality-of-life conversation can help you evaluate pain, breathing, appetite, mobility, and comfort.' },
      { question: 'Can private cremation be arranged?', answer: 'Yes. Private cremation can be discussed when scheduling.' },
      { question: 'Can children be present?', answer: 'Yes, if your family feels it is appropriate. The visit can be explained in simple, gentle terms.' },
    ],
  },
  {
    slug: 'los-angeles',
    name: 'Los Angeles',
    county: 'Los Angeles County',
    region: 'Greater Los Angeles',
    nearby: ['Orange', 'Riverside', 'San Bernardino'],
    title: 'In-Home Pet Euthanasia in Los Angeles, CA | Mobile Dog & Cat Care',
    description: 'Compassionate in-home pet euthanasia in Los Angeles for dogs and cats. Mobile vet appointments, local scheduling guidance, aftercare planning, and cremation options.',
    hero: 'In-Home Pet Euthanasia in Los Angeles, CA',
    intro: 'Los Angeles families often need end-of-life care that accounts for traffic, parking, building access, and a pet’s fragile condition. A home visit can protect privacy and reduce the stress of moving a sick dog or cat through the city.',
    sections: [
      { heading: 'Los Angeles scheduling details', body: 'Because Los Angeles routes can be affected by traffic and access details, the most accurate appointment information comes from a direct call. Share your neighborhood, cross streets, parking instructions, pet size, symptoms, and aftercare preference.' },
      { heading: 'Dog euthanasia at home in Los Angeles', body: 'For dogs with painful mobility, advanced illness, or severe anxiety, staying home can be far gentler than traveling across the city. Families can choose a quiet room, favorite bed, or calm outdoor space if appropriate.', bullets: ['Good for large or immobile dogs', 'Avoids clinic stress', 'Sedation-first comfort', 'Private goodbye at home'] },
      { heading: 'Cat euthanasia at home in Los Angeles', body: 'Cats may become frightened by apartment hallways, carriers, elevators, and traffic noise. A home visit lets your cat remain in a familiar room while the veterinarian uses a patient, comfort-focused approach.' },
      { heading: 'Apartment and access planning', body: 'If you live in an apartment, condo, or gated building, provide parking, gate, elevator, or doorman instructions. This helps the veterinarian arrive calmly and keeps the appointment focused on your pet.' },
      { heading: 'Aftercare in Los Angeles', body: 'Families can discuss private cremation, communal cremation, memorial keepsakes, and transport coordination. If you are comparing options, decide whether having ashes returned is important to your family.' },
    ],
    faqs: [
      { question: 'Do you serve Los Angeles homes and apartments?', answer: 'Yes, depending on schedule and route availability. Provide parking and building access details when calling.' },
      { question: 'Can same-day appointments be available in Los Angeles?', answer: 'They may be available, but traffic, distance, and doctor schedule affect timing.' },
      { question: 'Can my cat stay in one room?', answer: 'Yes. A quiet accessible room is often best for cats.' },
      { question: 'What should I prepare before the visit?', answer: 'Prepare your pet’s resting space, access details, aftercare preference, and any comfort items you want nearby.' },
      { question: 'Is private cremation available?', answer: 'Yes. Private cremation and ashes returned can be discussed during scheduling.' },
    ],
  },
];

export function getCityPage(slug: string): CityPageContent {
  const city = priorityCities.find((item) => item.slug === slug);
  if (!city) throw new Error(`Unknown city page: ${slug}`);
  return city;
}
