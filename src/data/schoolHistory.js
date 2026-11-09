// School histories shown in a team card's History tab.
// Keyed by ESPN's team display name, which is the same in every sport
// (team ids are not: baseball and softball use different ids than football).
// To add a school, add an entry with the same shape; the tab appears on its own.
//
// Shape: { school, founded, location, facts: [[label, value]], sections: [{ id, title, body: [paragraph],
//   timeline?: [[year, text]], names?: { title, list: [[name, note]] } }], sources: [[label, url]] }

const TEXAS = {
  school: 'The University of Texas at Austin',
  founded: 1883,
  location: 'Austin, Texas',
  facts: [
    ['Opened', 'Sept. 15, 1883'],
    ['Motto', 'Disciplina Praesidium Civitatis'],
    ['Students', 'About 54,000'],
    ['Mascot', 'Bevo (since 1916)'],
  ],
  sections: [
    {
      id: 'university',
      title: 'History of the University',
      body: [
        "Texas set aside land for a university while it was still an independent republic, and the state constitution of 1876 directed the Legislature to establish \"a university of the first class.\" In 1881 Texans voted on where it should go: Austin won the main university and Galveston the medical branch.",
        'The cornerstone of the first building, Old Main, was laid on November 17, 1882, on a hill north of the Capitol known as College Hill. Classes began on September 15, 1883.',
        "For its first decades the university was land-rich and cash-poor. That changed on May 28, 1923, when the Santa Rita No. 1 well struck oil on university-owned land in West Texas. Oil and gas royalties flowed into the Permanent University Fund, which still pays for buildings and endowments across the UT and Texas A&M systems.",
        "Old Main was torn down in 1934, and in its place rose the Main Building, designed by architect Paul Philippe Cret and finished in 1937. Its 307-foot Tower became the symbol of the campus. It is lit orange after athletic wins and other milestones.",
        "In Sweatt v. Painter (1950), the U.S. Supreme Court ordered the university's law school to admit Heman Marion Sweatt, a Black applicant it had turned away. The case was an important step toward Brown v. Board of Education four years later. The first Black undergraduates enrolled in fall 1956, and dormitories were desegregated in 1965.",
        "The Harry Ransom Center, one of the great research libraries and archives in the country, was founded in 1957; among its holdings is a complete Gutenberg Bible. The LBJ Presidential Library was dedicated on campus on May 22, 1971. On March 6, 1967, the Legislature changed the school's name from The University of Texas to The University of Texas at Austin, the flagship of what had become the UT System.",
      ],
      timeline: [
        ['1876', 'State constitution calls for "a university of the first class"'],
        ['1881', 'Voters pick Austin for the university'],
        ['1883', 'Classes begin on College Hill'],
        ['1923', 'Santa Rita No. 1 strikes oil on university land'],
        ['1937', 'Main Building and Tower completed'],
        ['1950', 'Sweatt v. Painter opens the law school to Black students'],
        ['1956', 'First Black undergraduates enroll'],
        ['1966', 'Tower shooting, August 1'],
        ['1967', 'Renamed The University of Texas at Austin'],
        ['1971', 'LBJ Presidential Library dedicated'],
      ],
    },
    {
      id: 'athletics',
      title: 'Longhorn Athletics',
      body: [
        'Texas was a founding member of the Southwest Conference and played there until it joined with three other Southwest Conference schools and the Big Eight to form the Big 12 in 1996. On July 1, 2024, the Longhorns moved to the Southeastern Conference.',
        "The Longhorns have won more than 50 national championships. Football claims four (1963, 1969, 1970 and 2005), and Earl Campbell (1977) and Ricky Williams (1998) won the Heisman Trophy. Baseball has won six College World Series titles (1949, 1950, 1975, 1983, 2002 and 2005) and has made more trips to Omaha than any other program. Jody Conradt's women's basketball team went 34-0 to win the 1986 national title, and softball won its first Women's College World Series in 2025.",
        'Traditions include Bevo, the live longhorn steer mascot since 1916; the "Hook \'em Horns" hand sign, introduced in 1955; and the school song "The Eyes of Texas."',
      ],
    },
    {
      id: 'tower-1966',
      title: 'The 1966 Tower Shooting',
      body: [
        'On Monday, August 1, 1966, a 25-year-old UT student and former Marine, Charles Whitman, carried rifles and other weapons to the observation deck of the Main Building Tower. Earlier that morning he had killed his mother, Margaret, and his wife, Kathleen, at their homes in Austin.',
        'He reached the deck shortly before noon, fatally wounding the receptionist, Edna Townsley, and shooting members of a visiting family on the stairs. At 11:48 a.m. he began firing from about 231 feet above the ground on students, faculty, visitors and passersby on the South Mall, along Guadalupe Street and on nearby blocks. With few police rifles on hand, students and residents brought their own from home and fired back from the ground, which kept him from moving freely around the deck and let others drag the wounded to safety. A pilot circled the Tower with a police sharpshooter aboard.',
        'At about 1:24 p.m., roughly 96 minutes after the shooting began, Austin police officers Ramiro Martinez and Houston McCoy, joined by Allen Crum, a civilian and retired Air Force tail gunner whom Martinez deputized on the spot, reached the deck and shot and killed Whitman. Martinez and McCoy later received the City of Austin\'s Medal of Valor.',
        'Counting his mother and wife, an unborn child, and David Gunby, a student who died of his wounds in 2001, Whitman killed 17 people. At least 31 others were wounded. It was one of the first mass shootings of its kind in the United States, and it was carried live on radio and television.',
        "Whitman had asked in a note that his body be autopsied. The autopsy found a small brain tumor, and experts still disagree about whether it played any part in what he did.",
        'In 1967 the Legislature created the University of Texas police department. The observation deck reopened in 1968 but was closed in 1974 after several suicides, and it did not reopen until 1999, now only for guided tours with security screening.',
        "For decades the university said little publicly about the shooting, and survivors spoke of being left on their own. A memorial garden north of the Tower was dedicated in 2006. On the 50th anniversary, August 1, 2016, the campus held two minutes of silence at 11:48 a.m., the Tower clock was stopped for 24 hours, and the university unveiled a granite memorial engraved with the victims' names.",
      ],
      names: {
        title: 'In memory',
        list: [
          ['Margaret Whitman', 'his mother'],
          ['Kathleen Whitman', 'his wife'],
          ['Edna Townsley', '51, Tower receptionist'],
          ['Marguerite Lamport', '56, visiting'],
          ['Mark Gabour', '16, visiting'],
          ['Thomas Eckman', '18, student'],
          ['Baby Boy Wilson', 'unborn child of Claire Wilson'],
          ['Robert Boyer', '33, mathematician'],
          ['Thomas Ashton', '22, student'],
          ['Thomas Karr', '24, student'],
          ['Karen Griffith', '17, high school student'],
          ['Paul Sonntag', '18'],
          ['Claudia Rutt', '18'],
          ['Harry Walchuk', '38, graduate student'],
          ['Billy Paul Speed', '23, Austin police officer'],
          ['Roy Dell Schmidt', '29, electrician'],
          ['David Gunby', '58, wounded as a student, died 2001'],
        ],
      },
    },
  ],
  sources: [
    ['UT Austin history', 'https://www.utexas.edu/about/history'],
    ['University of Texas at Austin (Wikipedia)', 'https://en.wikipedia.org/wiki/University_of_Texas_at_Austin'],
    ['University of Texas tower shooting (Wikipedia)', 'https://en.wikipedia.org/wiki/University_of_Texas_tower_shooting'],
    ['Texas Monthly on the 50th anniversary', 'https://www.texasmonthly.com/articles/fiftieth-anniversary-tower-shooting/'],
  ],
}

const BY_TEAM = {
  'Texas Longhorns': TEXAS,
}

/** The school history for a team, or null if we don't have one yet. */
export const historyFor = (team) => BY_TEAM[team?.name] ?? null
